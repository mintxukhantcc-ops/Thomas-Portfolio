import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// ---------------------------------------------------------------------------
// DATA PERSISTENCE & IN-MEMORY STORE
// ---------------------------------------------------------------------------
const DATA_DIR = path.join(process.cwd(), 'data');
const PORTFOLIO_FILE = path.join(DATA_DIR, 'portfolio-data.json');
const INQUIRIES_FILE = path.join(DATA_DIR, 'inquiries.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  } catch (err) {
    console.warn('Could not create data directory:', err);
  }
}

interface Inquiry {
  id: string;
  name: string;
  email: string;
  scopes: string[];
  message: string;
  createdAt: string;
  status: 'unread' | 'read' | 'archived';
}

function loadInquiries(): Inquiry[] {
  try {
    if (fs.existsSync(INQUIRIES_FILE)) {
      const content = fs.readFileSync(INQUIRIES_FILE, 'utf-8');
      return JSON.parse(content);
    }
  } catch (err) {
    console.warn('Could not read inquiries file:', err);
  }
  return [];
}

function saveInquiries(inquiries: Inquiry[]) {
  try {
    fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(inquiries, null, 2), 'utf-8');
  } catch (err) {
    console.warn('Could not write inquiries file:', err);
  }
}

function loadPortfolioData(): Record<string, any> | null {
  try {
    if (fs.existsSync(PORTFOLIO_FILE)) {
      const content = fs.readFileSync(PORTFOLIO_FILE, 'utf-8');
      return JSON.parse(content);
    }
  } catch (err) {
    console.warn('Could not read portfolio file:', err);
  }
  return null;
}

function savePortfolioData(data: Record<string, any>) {
  try {
    fs.writeFileSync(PORTFOLIO_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.warn('Could not write portfolio file:', err);
  }
}

// ---------------------------------------------------------------------------
// LAZY GEMINI AI INITIALIZATION
// ---------------------------------------------------------------------------
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  if (!aiClient) {
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
}

// ---------------------------------------------------------------------------
// API ENDPOINTS
// ---------------------------------------------------------------------------

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    geminiEnabled: Boolean(process.env.GEMINI_API_KEY),
  });
});

// Contact Inquiries: Submit new message
app.post('/api/contact', (req, res) => {
  try {
    const { name, email, scopes, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required.' });
    }

    const inquiries = loadInquiries();
    const newInquiry: Inquiry = {
      id: `inq_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      name: String(name).trim(),
      email: String(email).trim(),
      scopes: Array.isArray(scopes) ? scopes : [],
      message: String(message).trim(),
      createdAt: new Date().toISOString(),
      status: 'unread',
    };

    inquiries.unshift(newInquiry);
    saveInquiries(inquiries);

    console.log(`[Contact API] Received inquiry from ${newInquiry.name} <${newInquiry.email}>`);
    return res.status(201).json({ success: true, inquiry: newInquiry });
  } catch (err: any) {
    console.error('[Contact API Error]:', err);
    return res.status(500).json({ error: 'Failed to process inquiry.' });
  }
});

// Contact Inquiries: Retrieve all (Admin Dashboard)
app.get('/api/contact', (req, res) => {
  try {
    const inquiries = loadInquiries();
    return res.json({ success: true, inquiries });
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to load inquiries.' });
  }
});

// Contact Inquiries: Update inquiry status / Delete
app.patch('/api/contact/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const inquiries = loadInquiries();
    const target = inquiries.find((item) => item.id === id);
    if (!target) {
      return res.status(404).json({ error: 'Inquiry not found.' });
    }
    if (status) target.status = status;
    saveInquiries(inquiries);
    return res.json({ success: true, inquiry: target });
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to update inquiry.' });
  }
});

app.delete('/api/contact/:id', (req, res) => {
  try {
    const { id } = req.params;
    let inquiries = loadInquiries();
    const initialLen = inquiries.length;
    inquiries = inquiries.filter((item) => item.id !== id);
    if (inquiries.length === initialLen) {
      return res.status(404).json({ error: 'Inquiry not found.' });
    }
    saveInquiries(inquiries);
    return res.json({ success: true });
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to delete inquiry.' });
  }
});

// Portfolio Data Sync: Get persisted data
app.get('/api/portfolio', (req, res) => {
  try {
    const data = loadPortfolioData();
    if (data) {
      return res.json({ success: true, data });
    }
    return res.json({ success: false, data: null, message: 'No server-saved portfolio state.' });
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to load portfolio data.' });
  }
});

// Portfolio Data Sync: Save from Admin Dashboard
app.post('/api/portfolio', (req, res) => {
  try {
    const portfolioPayload = req.body;
    savePortfolioData(portfolioPayload);
    console.log('[Portfolio API] Successfully saved latest portfolio data from Admin.');
    return res.json({ success: true, timestamp: new Date().toISOString() });
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to save portfolio data.' });
  }
});

// AI Feature Enhancement (Gemini Server-Side)
app.post('/api/ai/enhance', async (req, res) => {
  try {
    const { prompt, type, context } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.status(503).json({
        error: 'Gemini API Key is not configured on the server.',
        fallback: 'Creative Technologist bridging storytelling, media production, and full-stack web systems.',
      });
    }

    const systemInstruction =
      'You are a senior creative strategist and copy editor assisting Min Thu Khant (Thomas) with his portfolio content. Output concise, punchy, sophisticated text matching his positioning: "Logically Play The Creativity". Avoid generic buzzwords.';

    const userPrompt = `Type: ${type || 'general'}\nContext: ${context || 'Portfolio description'}\nTask: ${prompt}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: userPrompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const generatedText = response.text || '';
    return res.json({ success: true, text: generatedText.trim(), enhancedText: generatedText.trim() });
  } catch (err: any) {
    console.error('[Gemini AI Error]:', err);
    // Provide a smart strategic fallback enhancement so the user is never blocked
    const fallbackText = `${req.body.prompt ? String(req.body.prompt).trim() : ''} Engineered with narrative clarity, strategic positioning, and measurable digital impact.`;
    return res.json({ 
      success: true, 
      text: fallbackText, 
      enhancedText: fallbackText,
      fallback: true,
      note: 'Applied strategic enhancement fallback.'
    });
  }
});

// ---------------------------------------------------------------------------
// VITE MIDDLEWARE & STATIC ASSETS
// ---------------------------------------------------------------------------
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT} [Mode: ${process.env.NODE_ENV || 'development'}]`);
  });
}

startServer();
