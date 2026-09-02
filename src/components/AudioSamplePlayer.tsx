import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, Sparkles } from 'lucide-react';
import { VoiceoverSample } from '../types';

interface AudioSamplePlayerProps {
  samples: VoiceoverSample[];
}

export const AudioSamplePlayer: React.FC<AudioSamplePlayerProps> = ({ samples }) => {
  const [activeSampleId, setActiveSampleId] = useState<string>(samples[0]?.id || '');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const animFrameRef = useRef<number | null>(null);

  const currentSample = samples.find((s) => s.id === activeSampleId) || samples[0];

  useEffect(() => {
    // Stop playback if sample changes
    setIsPlaying(false);
    setProgress(0);
    stopSynth();
  }, [activeSampleId]);

  const startSynth = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      // Check if browser has SpeechSynthesis for natural voice simulation!
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(currentSample.scriptSnippet);
        utterance.rate = 0.95;
        utterance.pitch = currentSample.language === 'Burmese' ? 1.0 : 0.98;
        utterance.lang = currentSample.language === 'Burmese' ? 'my-MM' : 'en-US';

        utterance.onend = () => {
          setIsPlaying(false);
          setProgress(100);
        };
        utterance.onerror = () => {
          // Fallback to frequency tone simulation
          playWarmToneFallback();
        };
        window.speechSynthesis.speak(utterance);
      } else {
        playWarmToneFallback();
      }
    } catch {
      playWarmToneFallback();
    }
  };

  const playWarmToneFallback = () => {
    if (!audioCtxRef.current) return;
    const osc = audioCtxRef.current.createOscillator();
    const gain = audioCtxRef.current.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(160, audioCtxRef.current.currentTime);
    gain.gain.setValueAtTime(0.08, audioCtxRef.current.currentTime);

    osc.connect(gain);
    gain.connect(audioCtxRef.current.destination);

    osc.start();
    oscillatorRef.current = osc;
    gainNodeRef.current = gain;
  };

  const stopSynth = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (oscillatorRef.current) {
      try {
        oscillatorRef.current.stop();
        oscillatorRef.current.disconnect();
      } catch {
        // ignore
      }
      oscillatorRef.current = null;
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      stopSynth();
    } else {
      setIsPlaying(true);
      startSynth();
    }
  };

  // Progress ticker
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 99) {
            setIsPlaying(false);
            stopSynth();
            return 0;
          }
          return prev + 2.5;
        });
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div id="audio-sample-player" className="rounded-2xl border border-white/10 bg-[#141418] p-5 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-mono-tech tracking-wider uppercase text-neutral-400">
            Studio Audio Master Sample
          </span>
        </div>
        <div className="flex rounded-lg bg-black/40 p-1 border border-white/5">
          {samples.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveSampleId(s.id)}
              className={`px-3 py-1.5 text-xs font-mono-tech rounded-md transition-all ${
                activeSampleId === s.id
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium shadow'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {s.language} ({s.duration})
            </button>
          ))}
        </div>
      </div>

      {/* Main Track Details */}
      <div className="bg-black/50 border border-white/5 rounded-xl p-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-base font-display font-medium text-white tracking-wide">
            {currentSample.title}
          </h4>
          <span className="text-xs font-mono-tech px-2 py-0.5 rounded bg-white/10 text-indigo-300 border border-indigo-500/20">
            {currentSample.tone}
          </span>
        </div>

        {/* Script excerpt */}
        <div className="text-sm text-neutral-300 italic border-l-2 border-indigo-500/40 pl-3 my-3 font-sans leading-relaxed">
          &ldquo;{currentSample.scriptSnippet}&rdquo;
        </div>

        {/* Equalizer Visualizer Bars */}
        <div className="flex items-end gap-1 h-8 my-3 px-1">
          {[40, 75, 55, 90, 60, 30, 85, 95, 70, 45, 80, 65, 90, 50, 75, 40, 85, 60, 95, 30].map(
            (height, i) => {
              const activeHeight = isPlaying ? Math.min(100, Math.max(15, height + (i % 3) * 10)) : 18;
              return (
                <div
                  key={i}
                  style={{
                    height: `${activeHeight}%`,
                    transition: isPlaying ? 'height 0.15s ease-in-out' : 'height 0.5s ease',
                  }}
                  className={`flex-1 rounded-full transition-all ${
                    isPlaying
                      ? 'bg-gradient-to-t from-blue-500 via-indigo-400 to-cyan-300'
                      : 'bg-white/15'
                  }`}
                />
              );
            }
          )}
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mb-2">
          <div
            className="bg-gradient-to-r from-blue-500 to-indigo-400 h-full transition-all duration-300 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-xs font-mono-tech text-neutral-400">
          <span>{isPlaying ? 'Streaming Broadcast Master' : 'Click Play to Listen'}</span>
          <span>{currentSample.duration}</span>
        </div>
      </div>

      {/* Playback Controls */}
      <div className="flex items-center justify-between">
        <button
          onClick={togglePlay}
          className="flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-white text-black font-mono-tech text-xs tracking-wider uppercase font-semibold hover:bg-neutral-200 transition-all active:scale-95 shadow-lg shadow-white/5"
        >
          {isPlaying ? (
            <>
              <Pause className="w-4 h-4 text-black fill-current" />
              <span>Pause Track</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 text-black fill-current" />
              <span>Preview Voiceover Audio</span>
            </>
          )}
        </button>

        <div className="flex items-center gap-2 text-xs text-neutral-400 font-mono-tech">
          <Volume2 className="w-3.5 h-3.5 text-indigo-400" />
          <span className="hidden sm:inline">Studio Master · Synchronized Visual Cues</span>
        </div>
      </div>
    </div>
  );
};
