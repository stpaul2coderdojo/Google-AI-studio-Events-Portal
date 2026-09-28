import React, { useState, useEffect, useRef } from 'react';
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  Radio,
  Sparkles,
  Waves,
  Cpu,
  Activity,
  CheckCircle2,
  Sliders,
  Layers,
  Zap,
  Info
} from 'lucide-react';

interface AudioSample {
  id: string;
  name: string;
  species: string;
  scientificName: string;
  biome: string;
  frequencyRange: string;
  dominantFreq: number;
  confidenceScore: number;
  model: string;
  ispaToken?: string;
  waveformPattern: number[];
  color: string;
  bgGradient: string;
}

const AUDIO_SAMPLES: AudioSample[] = [
  {
    id: 'gharial_ispa',
    name: 'Gharial Acoustic Infrasound & Jaw-Slap',
    species: 'Gavialis gangeticus (Gharial)',
    scientificName: 'Gavialis gangeticus',
    biome: 'Riparian Watershed • MCBT',
    frequencyRange: '18 Hz – 240 Hz',
    dominantFreq: 42,
    confidenceScore: 0.964,
    model: 'Sparrow Studio ISPA Tokenizer v2.1',
    ispaToken: '[ISPA-CROCODILIAN:SUBMERGED_TERRITORIAL_RUMBLE]',
    waveformPattern: [12, 18, 35, 80, 95, 88, 70, 45, 90, 100, 75, 40, 20, 15, 12, 10, 8, 5],
    color: '#10b981',
    bgGradient: 'from-emerald-950/80 via-teal-950/40 to-[#0f1712]'
  },
  {
    id: 'hornbill_call',
    name: 'Malabar Grey Hornbill Resonant Calling',
    species: 'Ocyceros griseus (Malabar Grey Hornbill)',
    scientificName: 'Ocyceros griseus',
    biome: 'Old-Growth Rainforest • Agumbe',
    frequencyRange: '1.2 kHz – 3.8 kHz',
    dominantFreq: 2150,
    confidenceScore: 0.988,
    model: 'Cornell BirdNET v2.4 + MegaDetector',
    ispaToken: '[ISPA-AVIAN:CANOPY_CONTACT_DUET]',
    waveformPattern: [5, 12, 28, 65, 82, 45, 20, 75, 92, 85, 30, 15, 60, 78, 40, 18, 10, 5],
    color: '#06b6d4',
    bgGradient: 'from-cyan-950/80 via-sky-950/40 to-[#0f1712]'
  },
  {
    id: 'king_cobra_hiss',
    name: 'King Cobra Acoustic Growl-Hiss Resonator',
    species: 'Ophiophagus hannah (King Cobra)',
    scientificName: 'Ophiophagus hannah',
    biome: 'Agumbe Rainforest Research Base',
    frequencyRange: '600 Hz – 2.5 kHz',
    dominantFreq: 1100,
    confidenceScore: 0.942,
    model: 'Sparrow BioAcoustics Multi-Modal',
    ispaToken: '[ISPA-SERPENTINE:TRACHEAL_DIVERTICULA_GROWL]',
    waveformPattern: [8, 15, 30, 50, 70, 85, 90, 85, 75, 65, 55, 45, 35, 25, 15, 10, 8, 4],
    color: '#f59e0b',
    bgGradient: 'from-amber-950/80 via-yellow-950/40 to-[#0f1712]'
  },
  {
    id: 'driftwood_hydrophone',
    name: 'Riparian Watershed Submerged Macroinvertebrate Chorus',
    species: 'Hydropsyche & Freshwater Micro-Fauna',
    scientificName: 'Hydropsychidae spp.',
    biome: 'Seeed Studio XIAO Hydrophone Mesh',
    frequencyRange: '8 kHz – 32 kHz',
    dominantFreq: 14200,
    confidenceScore: 0.915,
    model: 'RavaTTT Edge Bioacoustic Transformer',
    ispaToken: '[ISPA-AQUATIC:BENTHIC_HYDRODYNAMIC_STRIDULATION]',
    waveformPattern: [20, 45, 60, 40, 75, 90, 85, 60, 80, 95, 70, 50, 85, 65, 40, 30, 20, 15],
    color: '#8b5cf6',
    bgGradient: 'from-purple-950/80 via-indigo-950/40 to-[#0f1712]'
  }
];

export const BioacousticSpectrogramWidget: React.FC = () => {
  const [selectedSample, setSelectedSample] = useState<AudioSample>(AUDIO_SAMPLES[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackProgress, setPlaybackProgress] = useState(0);
  const [gainLevel, setGainLevel] = useState(85);
  const [isAudioSimulated, setIsAudioSimulated] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Synthesize pleasant synthetic sound waves using Web Audio API when user clicks play
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const startSyntheticAudio = (freq: number) => {
    try {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtxClass) return;

      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtxClass();
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      // Stop previous
      stopSyntheticAudio();

      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      // Moderate pitch based on sample
      let targetPitch = freq;
      if (freq > 4000) targetPitch = 880;
      else if (freq < 100) targetPitch = 120;

      osc.type = freq < 100 ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(targetPitch, ctx.currentTime);

      // Low volume for comfortable UX
      const vol = (gainLevel / 100) * 0.04;
      gainNode.gain.setValueAtTime(vol, ctx.currentTime);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      osc.start();

      oscRef.current = osc;
      gainNodeRef.current = gainNode;
    } catch (e) {
      console.warn('Audio Context initialized in silent fallback mode');
    }
  };

  const stopSyntheticAudio = () => {
    if (oscRef.current) {
      try {
        oscRef.current.stop();
        oscRef.current.disconnect();
      } catch (e) {}
      oscRef.current = null;
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      stopSyntheticAudio();
    } else {
      setIsPlaying(true);
      startSyntheticAudio(selectedSample.dominantFreq);
    }
  };

  // Canvas Spectrogram Animation
  useEffect(() => {
    let tick = 0;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = () => {
      tick += isPlaying ? 0.08 : 0.015;
      const width = canvas.width;
      const height = canvas.height;

      // Clear with dark atmospheric background
      ctx.fillStyle = '#0a100d';
      ctx.fillRect(0, 0, width, height);

      // Draw frequency grid lines
      ctx.strokeStyle = '#1e2b22';
      ctx.lineWidth = 1;
      for (let y = 20; y < height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw simulated spectrogram spectral columns
      const barCount = 48;
      const barWidth = width / barCount;

      for (let i = 0; i < barCount; i++) {
        const factor = Math.sin(i * 0.25 + tick) * 0.5 + 0.5;
        const patternVal = selectedSample.waveformPattern[i % selectedSample.waveformPattern.length] / 100;
        const intensity = isPlaying
          ? Math.min(1, patternVal * 0.7 + factor * 0.5)
          : patternVal * 0.35 + Math.sin(i * 0.1 + tick * 0.5) * 0.1;

        const barHeight = intensity * (height - 25);
        const x = i * barWidth;
        const y = height - barHeight;

        // Gradient for spectrogram heat
        const grad = ctx.createLinearGradient(0, height, 0, 0);
        if (selectedSample.id === 'gharial_ispa') {
          grad.addColorStop(0, '#064e3b');
          grad.addColorStop(0.5, '#10b981');
          grad.addColorStop(1, '#6ee7b7');
        } else if (selectedSample.id === 'hornbill_call') {
          grad.addColorStop(0, '#0e7490');
          grad.addColorStop(0.5, '#06b6d4');
          grad.addColorStop(1, '#a5f3fc');
        } else if (selectedSample.id === 'king_cobra_hiss') {
          grad.addColorStop(0, '#78350f');
          grad.addColorStop(0.5, '#f59e0b');
          grad.addColorStop(1, '#fde68a');
        } else {
          grad.addColorStop(0, '#4c1d95');
          grad.addColorStop(0.5, '#8b5cf6');
          grad.addColorStop(1, '#ddd6fe');
        }

        ctx.fillStyle = grad;
        ctx.fillRect(x + 1, y, barWidth - 2, barHeight);

        // Peak highlights
        if (intensity > 0.6) {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(x + 1, y - 2, barWidth - 2, 2);
        }
      }

      // Draw high-frequency overlay waveform
      ctx.beginPath();
      ctx.strokeStyle = isPlaying ? selectedSample.color : '#4ade8055';
      ctx.lineWidth = isPlaying ? 2 : 1;
      for (let x = 0; x < width; x += 3) {
        const normalized = x / width;
        const wave = Math.sin(normalized * 30 + tick * 2) * Math.cos(normalized * 15 - tick) * (isPlaying ? 22 : 6);
        const y = height / 2 + wave;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isPlaying, selectedSample]);

  // Progress ticker when playing
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setPlaybackProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            stopSyntheticAudio();
            return 0;
          }
          return prev + 2;
        });
      }, 100);
    } else {
      setPlaybackProgress(0);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="bg-[#101713] rounded-3xl border border-[#2d3a30] shadow-2xl p-5 sm:p-7 text-[#e0e7e1] overflow-hidden relative">
      {/* Background Glow */}
      <div
        className={`absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl ${selectedSample.bgGradient} rounded-full blur-3xl opacity-30 pointer-events-none -mr-20 -mt-20`}
      />

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#243329] pb-5 relative z-10">
        <div className="flex items-center gap-3">
          <div
            className="p-3 rounded-2xl border shadow-inner transition-colors duration-300"
            style={{
              backgroundColor: `${selectedSample.color}15`,
              borderColor: `${selectedSample.color}40`,
              color: selectedSample.color
            }}
          >
            <Waves className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-black text-[#e0e7e1] tracking-tight">
                Live Bioacoustic Spectrogram & ISPA Tokenizer
              </h3>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                DSP Telemetry
              </span>
            </div>
            <p className="text-xs text-[#8c9e92] mt-0.5">
              Real-time neural audio classification deployed with Microsoft Sparrow Studio & Cornell BirdNET.
            </p>
          </div>
        </div>

        {/* Live Status Indicators */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#17221b] border border-[#2d3a30] text-xs font-mono text-emerald-400">
            <Radio className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
            <span>96kHz / 24-bit Stream</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#17221b] border border-[#2d3a30] text-xs font-semibold text-[#c2d1c6]">
            <Cpu className="w-3.5 h-3.5 text-teal-400" />
            <span>XIAO Edge Inference: 14ms</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Sample Selector & Spectrogram Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 relative z-10">
        {/* Sample Selection List (4 cols) */}
        <div className="lg:col-span-4 space-y-2.5">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#8c9e92] px-1 mb-1">
            <span>Bioacoustic Streams</span>
            <span>4 Active Channels</span>
          </div>

          {AUDIO_SAMPLES.map((sample) => {
            const isSelected = sample.id === selectedSample.id;
            return (
              <button
                key={sample.id}
                onClick={() => {
                  stopSyntheticAudio();
                  setSelectedSample(sample);
                  setIsPlaying(false);
                }}
                className={`w-full text-left p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col gap-1.5 relative overflow-hidden ${
                  isSelected
                    ? 'bg-[#18261e] border-emerald-500/50 shadow-lg shadow-emerald-950/40 text-white'
                    : 'bg-[#131c16]/70 border-[#253328] hover:bg-[#18231c] text-[#a1b3a6]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#e0e7e1] truncate pr-2">
                    {sample.name}
                  </span>
                  <span
                    className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md shrink-0"
                    style={{
                      backgroundColor: `${sample.color}20`,
                      color: sample.color,
                      borderColor: `${sample.color}40`
                    }}
                  >
                    {Math.round(sample.confidenceScore * 100)}% Match
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px] text-[#788a7e]">
                  <span>{sample.scientificName}</span>
                  <span className="font-mono text-[10px]">{sample.frequencyRange}</span>
                </div>

                {isSelected && (
                  <div
                    className="absolute left-0 top-0 bottom-0 w-1"
                    style={{ backgroundColor: sample.color }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Spectrogram Canvas & Audio Player (8 cols) */}
        <div className="lg:col-span-8 flex flex-col justify-between bg-[#0a100d] rounded-2xl border border-[#243329] p-4 sm:p-5 shadow-inner">
          {/* Canvas Spectrogram Header */}
          <div className="flex items-center justify-between text-xs text-[#8c9e92] mb-3 pb-2 border-b border-[#1c2920]">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400" />
              <span className="font-bold text-[#e0e7e1]">{selectedSample.species}</span>
              <span className="text-[10px] text-[#6d7e73] font-mono">({selectedSample.biome})</span>
            </div>
            <div className="flex items-center gap-2 font-mono text-[11px] text-teal-300">
              <span>Peak: {selectedSample.dominantFreq} Hz</span>
            </div>
          </div>

          {/* Canvas Display */}
          <div className="relative rounded-xl overflow-hidden border border-[#1b261e] bg-[#070b09] h-48 sm:h-56">
            <canvas
              ref={canvasRef}
              width={640}
              height={220}
              className="w-full h-full block"
            />

            {/* Infrasound / Token Badge */}
            {selectedSample.ispaToken && (
              <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-emerald-500/30 text-[10px] font-mono text-emerald-300 flex items-center gap-1.5 shadow-md">
                <Sparkles className="w-3 h-3 text-emerald-400" />
                <span>{selectedSample.ispaToken}</span>
              </div>
            )}

            {/* Classification Pill */}
            <div className="absolute bottom-3 right-3 bg-black/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#2d3a30] text-xs font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="text-[#e0e7e1]">{selectedSample.model}</span>
            </div>
          </div>

          {/* Audio Controls & Progress Bar */}
          <div className="mt-4 pt-3 border-t border-[#1c2920] flex flex-col gap-3">
            {/* Progress Track */}
            <div className="w-full bg-[#17221b] h-1.5 rounded-full overflow-hidden">
              <div
                className="h-full transition-all duration-100 rounded-full"
                style={{
                  width: `${playbackProgress}%`,
                  backgroundColor: selectedSample.color
                }}
              />
            </div>

            {/* Playback Button & Gain Slider */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={togglePlay}
                  className="flex items-center gap-2 px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-950/50 transition-all cursor-pointer"
                  id="btn-play-bioacoustic-sample"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-4 h-4" />
                      <span>Pause Synthesis</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-current" />
                      <span>Synthesize Bioacoustic Signal</span>
                    </>
                  )}
                </button>

                <div className="text-xs text-[#8c9e92]">
                  {isPlaying ? 'Acoustic stream active...' : 'Ready for playback & analysis'}
                </div>
              </div>

              {/* Volume Gain Control */}
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-[#8c9e92]" />
                <input
                  type="range"
                  min={10}
                  max={100}
                  value={gainLevel}
                  onChange={(e) => {
                    const newGain = Number(e.target.value);
                    setGainLevel(newGain);
                    if (gainNodeRef.current && audioCtxRef.current) {
                      gainNodeRef.current.gain.setValueAtTime(
                        (newGain / 100) * 0.04,
                        audioCtxRef.current.currentTime
                      );
                    }
                  }}
                  className="w-24 accent-emerald-500 cursor-pointer h-1.5 bg-[#1f2d24] rounded-lg"
                  title="DSP Gain Control"
                />
                <span className="text-[11px] font-mono text-[#8c9e92] w-8 text-right">
                  {gainLevel}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
