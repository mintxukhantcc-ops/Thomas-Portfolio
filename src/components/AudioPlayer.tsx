import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  Volume1, 
  VolumeX, 
  Mic, 
  Languages, 
  Copy, 
  Check, 
  Sparkles,
  Radio
} from 'lucide-react';
import { initialVoiceTracks } from '../data/initialData';
import { AudioTrack } from '../types';

export type { AudioTrack };

interface AudioPlayerProps {
  tracks?: AudioTrack[];
  activeTrackId?: string;
  compact?: boolean;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  tracks = initialVoiceTracks,
  activeTrackId,
  compact = false,
}) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(() => {
    if (activeTrackId) {
      const idx = tracks.findIndex((t) => t.id === activeTrackId);
      return idx >= 0 ? idx : 0;
    }
    return 0;
  });

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(38);
  const [volume, setVolume] = useState<number>(0.85);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [copiedSnippet, setCopiedSnippet] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const currentTrack = tracks[currentTrackIndex] || tracks[0];

  // Parse duration string "0:35" into seconds
  const parseDurationSec = useCallback((durStr: string) => {
    const parts = durStr.split(':').map(Number);
    if (parts.length === 2) {
      return parts[0] * 60 + parts[1];
    }
    return 35;
  }, []);

  useEffect(() => {
    setDuration(parseDurationSec(currentTrack.duration));
    setCurrentTime(0);
    if (isPlaying) {
      // restart synth playback for new track
      startSynthTone();
    }
  }, [currentTrackIndex, currentTrack.duration, parseDurationSec]);

  // Audio synthesis simulation for authentic audio feedback
  const startSynthTone = () => {
    try {
      if (!audioContextRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioCtx) {
          audioContextRef.current = new AudioCtx();
        }
      }

      if (audioContextRef.current) {
        if (audioContextRef.current.state === 'suspended') {
          audioContextRef.current.resume();
        }

        // Clean previous oscillator
        if (oscillatorRef.current) {
          oscillatorRef.current.stop();
          oscillatorRef.current.disconnect();
        }

        const osc = audioContextRef.current.createOscillator();
        const gain = audioContextRef.current.createGain();

        // Warm pleasant acoustic frequency based on language and track
        const baseFreq = currentTrack.language === 'Burmese' ? 220 : 196;
        osc.type = 'sine';
        osc.frequency.setValueAtTime(baseFreq, audioContextRef.current.currentTime);
        
        // Soft volume envelope
        gain.gain.setValueAtTime(isMuted ? 0 : volume * 0.08, audioContextRef.current.currentTime);

        osc.connect(gain);
        gain.connect(audioContextRef.current.destination);
        osc.start();

        oscillatorRef.current = osc;
        gainNodeRef.current = gain;
      }
    } catch {
      // Ignore web audio limitations gracefully
    }
  };

  const stopSynthTone = () => {
    try {
      if (gainNodeRef.current && audioContextRef.current) {
        gainNodeRef.current.gain.setTargetAtTime(0, audioContextRef.current.currentTime, 0.05);
      }
      setTimeout(() => {
        if (oscillatorRef.current) {
          oscillatorRef.current.stop();
          oscillatorRef.current.disconnect();
          oscillatorRef.current = null;
        }
      }, 60);
    } catch {
      // Silent catch
    }
  };

  // Playback timer & simulated progress
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false);
            stopSynthTone();
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  // Handle Play/Pause
  const togglePlayPause = () => {
    if (isPlaying) {
      setIsPlaying(false);
      stopSynthTone();
      if (audioRef.current) {
        audioRef.current.pause();
      }
    } else {
      setIsPlaying(true);
      startSynthTone();
      if (audioRef.current && currentTrack.audioSrc) {
        audioRef.current.play().catch(() => {
          // HTML5 audio src fallback to synthetic
        });
      }
    }
  };

  // Skip Tracks
  const handlePrev = () => {
    const prevIdx = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    setCurrentTrackIndex(prevIdx);
  };

  const handleNext = () => {
    const nextIdx = (currentTrackIndex + 1) % tracks.length;
    setCurrentTrackIndex(nextIdx);
  };

  // Seek Control
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const percentage = Math.max(0, Math.min(1, clickX / width));
    setCurrentTime(Math.floor(percentage * duration));
  };

  // Volume Change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    setIsMuted(val === 0);
    if (gainNodeRef.current && audioContextRef.current) {
      gainNodeRef.current.gain.setValueAtTime(val === 0 ? 0 : val * 0.08, audioContextRef.current.currentTime);
    }
    if (audioRef.current) {
      audioRef.current.volume = val;
    }
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (gainNodeRef.current && audioContextRef.current) {
      gainNodeRef.current.gain.setValueAtTime(nextMuted ? 0 : volume * 0.08, audioContextRef.current.currentTime);
    }
    if (audioRef.current) {
      audioRef.current.muted = nextMuted;
    }
  };

  const copyScript = () => {
    navigator.clipboard.writeText(currentTrack.scriptSnippet);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // 32-bar waveform columns
  const waveformBars = [
    30, 45, 75, 90, 60, 40, 85, 95, 70, 50, 65, 80, 100, 75, 45, 30,
    55, 85, 90, 65, 40, 70, 85, 60, 45, 75, 95, 80, 50, 35, 60, 40
  ];

  return (
    <div className={`w-full rounded-2xl bg-[#121217] border border-white/10 overflow-hidden shadow-2xl ${compact ? 'p-4' : 'p-6 sm:p-8'}`}>
      
      {/* Hidden native HTML5 audio for real audio streaming */}
      <audio
        ref={audioRef}
        src={currentTrack.audioSrc}
        onEnded={() => {
          setIsPlaying(false);
          stopSynthTone();
        }}
      />

      {/* Header bar: studio badge & track counter */}
      <div className="flex items-center justify-between gap-2 pb-4 mb-5 border-b border-white/10 text-xs font-mono-tech">
        <div className="flex items-center gap-2 text-indigo-400">
          <Radio className={`w-4 h-4 ${isPlaying ? 'animate-pulse text-emerald-400' : 'text-neutral-500'}`} />
          <span className="tracking-wider uppercase font-semibold">
            {isPlaying ? 'ACTIVE BROADCAST PLAYBACK' : 'VOICE & AUDIO WORKSTATION'}
          </span>
        </div>
        <div className="flex items-center gap-2 text-neutral-400">
          <span>TRACK {currentTrackIndex + 1} OF {tracks.length}</span>
        </div>
      </div>

      {/* Track Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
        {tracks.map((track, idx) => {
          const isSelected = idx === currentTrackIndex;
          return (
            <button
              key={track.id}
              onClick={() => {
                setCurrentTrackIndex(idx);
                if (isPlaying) {
                  startSynthTone();
                }
              }}
              className={`p-2.5 rounded-xl text-left border transition-all duration-200 ${
                isSelected
                  ? 'bg-indigo-950/60 border-indigo-500 text-white shadow-lg'
                  : 'bg-white/[0.02] border-white/5 text-neutral-400 hover:border-white/20 hover:text-neutral-200'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-mono-tech mb-1">
                <span className={isSelected ? 'text-indigo-300' : 'text-neutral-500'}>
                  0{idx + 1}
                </span>
                <span className="px-1.5 py-0.2 rounded text-[9px] bg-white/10 uppercase">
                  {track.language}
                </span>
              </div>
              <p className="text-xs font-display font-medium truncate">
                {track.title}
              </p>
            </button>
          );
        })}
      </div>

      {/* Main Track Detail Display */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono-tech tracking-wider uppercase bg-white/10 text-indigo-300 border border-indigo-500/30">
              {currentTrack.category}
            </span>
            <span className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono-tech tracking-wider uppercase bg-neutral-800 text-neutral-300">
              <Languages className="w-3 h-3 text-indigo-400" />
              {currentTrack.language}
            </span>
            <span className="text-[11px] font-mono-tech text-neutral-400">
              Tone: <strong className="text-white font-normal">{currentTrack.tone}</strong>
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight">
            {currentTrack.title}
          </h3>
        </div>

        {/* Copy Script Snippet CTA */}
        <button
          onClick={copyScript}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-white/30 text-xs font-mono-tech text-neutral-300 hover:text-white transition-all active:scale-95"
          title="Copy narration script text to clipboard"
        >
          {copiedSnippet ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-300">COPIED SCRIPT</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-neutral-400" />
              <span>COPY SCRIPT</span>
            </>
          )}
        </button>
      </div>

      {/* Script Snippet Teleprompter Box */}
      <div className="relative p-4 rounded-xl bg-[#0b0b0e] border border-white/10 mb-6 group">
        <div className="flex items-center gap-2 text-[10px] font-mono-tech tracking-wider uppercase text-neutral-400 mb-2">
          <Mic className="w-3 h-3 text-indigo-400" />
          <span>BROADCAST SCRIPT EXCERPT</span>
        </div>
        <p className="text-sm sm:text-base text-neutral-200 font-sans leading-relaxed italic">
          &ldquo;{currentTrack.scriptSnippet}&rdquo;
        </p>
      </div>

      {/* Interactive Audio Waveform Visualizer */}
      <div className="mb-4">
        <div
          onClick={handleSeek}
          className="relative h-14 w-full flex items-end justify-between gap-1 px-2 py-1.5 bg-[#09090c] rounded-xl border border-white/10 cursor-pointer overflow-hidden group hover:border-indigo-500/50 transition-colors"
          title="Click waveform to seek"
        >
          {/* Progress fill tint */}
          <div
            className="absolute inset-y-0 left-0 bg-indigo-500/10 pointer-events-none transition-all duration-200"
            style={{ width: `${(currentTime / duration) * 100}%` }}
          />

          {waveformBars.map((heightPercent, barIdx) => {
            const barProgress = (barIdx / waveformBars.length) * duration;
            const isPassed = currentTime >= barProgress;
            // dynamic wave animation when playing
            const dynamicScale = isPlaying
              ? Math.sin((currentTime * 3 + barIdx) * 0.4) * 0.35 + 0.65
              : 0.5;

            const finalHeight = Math.max(15, Math.min(100, heightPercent * dynamicScale));

            return (
              <div
                key={barIdx}
                className={`w-full rounded-full transition-all duration-150 ${
                  isPassed
                    ? 'bg-gradient-to-t from-indigo-500 to-cyan-400 shadow-sm'
                    : 'bg-white/15 group-hover:bg-white/25'
                }`}
                style={{ height: `${finalHeight}%` }}
              />
            );
          })}
        </div>

        {/* Time Stamp Row */}
        <div className="flex items-center justify-between text-xs font-mono-tech text-neutral-400 mt-2 px-1">
          <span>{formatTime(currentTime)}</span>
          <span className="text-[11px] text-neutral-500">CLICK WAVEFORM TO SCRUB</span>
          <span>{currentTrack.duration}</span>
        </div>
      </div>

      {/* Controls Bar: Prev, Play/Pause, Next, Volume */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-white/5">
        
        {/* Playback Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrev}
            className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition-all active:scale-95 border border-white/10"
            title="Previous sample"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          <button
            onClick={togglePlayPause}
            className={`flex items-center justify-center w-12 h-12 rounded-full transition-all active:scale-95 shadow-xl ${
              isPlaying
                ? 'bg-emerald-500 text-black shadow-emerald-500/25 hover:bg-emerald-400'
                : 'bg-white text-black shadow-white/20 hover:bg-neutral-200'
            }`}
            title={isPlaying ? 'Pause' : 'Play narration sample'}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 fill-current" />
            ) : (
              <Play className="w-5 h-5 fill-current ml-0.5" />
            )}
          </button>

          <button
            onClick={handleNext}
            className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition-all active:scale-95 border border-white/10"
            title="Next sample"
          >
            <SkipForward className="w-4 h-4" />
          </button>

          <span className="text-xs font-mono-tech text-neutral-400 ml-2">
            {isPlaying ? (
              <span className="text-emerald-400 flex items-center gap-1.5 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                PLAYING PREVIEW
              </span>
            ) : (
              'READY'
            )}
          </span>
        </div>

        {/* Volume & Mute Controls */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <button
            onClick={toggleMute}
            className="p-2 rounded-lg text-neutral-400 hover:text-white transition-colors"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="w-4 h-4 text-red-400" />
            ) : volume < 0.5 ? (
              <Volume1 className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4 text-indigo-400" />
            )}
          </button>

          <div className="flex items-center gap-2">
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-24 sm:w-28 h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-indigo-400"
              title="Volume Slider"
            />
            <span className="text-[11px] font-mono-tech text-neutral-500 w-8 text-right">
              {isMuted ? '0%' : `${Math.round(volume * 100)}%`}
            </span>
          </div>
        </div>

      </div>

    </div>
  );
};
