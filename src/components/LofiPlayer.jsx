import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, CloudRain, Disc } from 'lucide-react';

// Cozy lo-fi chords: Fmaj9, G6, Em9, Am9
const CHORD_PROGRESSION = [
  // Fmaj9: F2 (87.31), A3 (220.00), C4 (261.63), E4 (329.63), G4 (392.00)
  [87.31, 220.00, 261.63, 329.63, 392.00],
  // G6: G2 (98.00), B3 (246.94), D4 (293.66), E4 (329.63), G4 (392.00)
  [98.00, 246.94, 293.66, 329.63, 392.00],
  // Em9: E2 (82.41), G3 (196.00), B3 (246.94), D4 (293.66), 369.99 (F#4)
  [82.41, 196.00, 246.94, 293.66, 369.99],
  // Am9: A2 (110.00), C3 (130.81), E3 (164.81), G3 (196.00), B3 (246.94)
  [110.00, 130.81, 164.81, 196.00, 246.94]
];

export default function LofiPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [musicVol, setMusicVol] = useState(0.4);
  const [rainVol, setRainVol] = useState(0.3);
  const [currentTrackName, setCurrentTrackName] = useState('Lo-Fi Brew (Synthesized)');
  const [equalizerBars, setEqualizerBars] = useState([10, 10, 10, 10, 10]);

  const audioCtxRef = useRef(null);
  
  // Audio Nodes References
  const mainGainRef = useRef(null);
  const rainGainRef = useRef(null);
  const rainSourceRef = useRef(null);
  const chordIntervalRef = useRef(null);
  const activeOscillatorsRef = useRef([]);

  // Setup/Tear down Web Audio Context
  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);

  // Update volume gain nodes when sliders change
  useEffect(() => {
    if (mainGainRef.current) {
      mainGainRef.current.gain.setValueAtTime(musicVol, audioCtxRef.current.currentTime);
    }
  }, [musicVol]);

  useEffect(() => {
    if (rainGainRef.current) {
      rainGainRef.current.gain.setValueAtTime(rainVol, audioCtxRef.current.currentTime);
    }
  }, [rainVol]);

  // Animate Equalizer Bars when playing
  useEffect(() => {
    let animId;
    if (isPlaying) {
      const updateEq = () => {
        setEqualizerBars(
          Array.from({ length: 5 }, () => Math.floor(Math.random() * 30) + 5)
        );
        animId = setTimeout(updateEq, 150);
      };
      updateEq();
    } else {
      setEqualizerBars([5, 5, 5, 5, 5]);
    }
    return () => clearTimeout(animId);
  }, [isPlaying]);

  const initAudio = () => {
    if (!audioCtxRef.current) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      audioCtxRef.current = new AudioContextClass();
    }

    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }

    // Create Main gain nodes if they don't exist
    if (!mainGainRef.current) {
      mainGainRef.current = audioCtxRef.current.createGain();
      mainGainRef.current.gain.setValueAtTime(musicVol, audioCtxRef.current.currentTime);
      mainGainRef.current.connect(audioCtxRef.current.destination);
    }

    if (!rainGainRef.current) {
      rainGainRef.current = audioCtxRef.current.createGain();
      rainGainRef.current.gain.setValueAtTime(rainVol, audioCtxRef.current.currentTime);
      rainGainRef.current.connect(audioCtxRef.current.destination);
    }
  };

  // Generate continuous Rain Noise
  const startRain = () => {
    if (!audioCtxRef.current) return;
    
    // Create a 2-second stereo buffer filled with brown/white noise
    const bufferSize = audioCtxRef.current.sampleRate * 2;
    const noiseBuffer = audioCtxRef.current.createBuffer(1, bufferSize, audioCtxRef.current.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    
    // Simple filter coefficients for brown-like noise (softer than white)
    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      // Brown noise integration
      output[i] = (lastOut + (0.02 * white)) / 1.02;
      lastOut = output[i];
      // Boost the volume slightly
      output[i] *= 3.5;
    }

    const source = audioCtxRef.current.createBufferSource();
    source.buffer = noiseBuffer;
    source.loop = true;

    // Create low-pass filter to make rain sound softer/muffled, like outside a coffee shop
    const rainFilter = audioCtxRef.current.createBiquadFilter();
    rainFilter.type = 'lowpass';
    rainFilter.frequency.setValueAtTime(1000, audioCtxRef.current.currentTime);

    // Create band-pass filter to give the rain a window-pattering quality
    const rainPatterFilter = audioCtxRef.current.createBiquadFilter();
    rainPatterFilter.type = 'bandpass';
    rainPatterFilter.frequency.setValueAtTime(1500, audioCtxRef.current.currentTime);
    rainPatterFilter.Q.setValueAtTime(0.5, audioCtxRef.current.currentTime);

    // Connect source -> patter -> lowpass -> rainGain
    source.connect(rainPatterFilter);
    rainPatterFilter.connect(rainFilter);
    rainFilter.connect(rainGainRef.current);
    
    source.start(0);
    rainSourceRef.current = source;
  };

  // Play a single soft chord with slow attack and release
  const playChord = (chordFrequencies) => {
    if (!audioCtxRef.current || audioCtxRef.current.state === 'suspended') return;

    const ctx = audioCtxRef.current;
    const now = ctx.currentTime;
    const duration = 5.0; // Let chords overlap slightly
    const attack = 1.2;  // Soft, rising attack
    const release = 1.8; // Long trailing release

    // Create a central chord gain node
    const chordGain = ctx.createGain();
    chordGain.gain.setValueAtTime(0, now);
    // Smooth attack
    chordGain.gain.linearRampToValueAtTime(0.3, now + attack);
    // Keep sustaining
    chordGain.gain.setValueAtTime(0.3, now + duration - release);
    // Smooth decay
    chordGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    // Master low-pass filter for cozy warmth (removes harsh high harmonics)
    const lowpass = ctx.createBiquadFilter();
    lowpass.type = 'lowpass';
    lowpass.frequency.setValueAtTime(650, now);

    // Dynamic filter modulation - makes the sound feel organic
    lowpass.frequency.exponentialRampToValueAtTime(450, now + duration);

    chordGain.connect(lowpass);
    lowpass.connect(mainGainRef.current);

    // Pitch modulation (Tape Warble / Vibrato LFO)
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.setValueAtTime(4.2, now); // 4.2Hz warble
    lfoGain.gain.setValueAtTime(4.5, now);   // Pitch detune intensity

    lfo.connect(lfoGain);

    const oscillators = [];

    // Synthesize each note of the chord
    chordFrequencies.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      // Triangle wave has a very soft, woody flutey tone, perfect for Rhodes/Lofi
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      // Connect LFO to pitch detune for warble vibe
      lfoGain.connect(osc.detune);

      osc.connect(chordGain);
      osc.start(now);
      osc.stop(now + duration);
      oscillators.push(osc);
    });

    lfo.start(now);
    lfo.stop(now + duration);

    // Save oscillators so we can kill them if paused
    activeOscillatorsRef.current.push({
      oscillators,
      lfo,
      gainNode: chordGain
    });

    // Cleanup reference after note is complete
    setTimeout(() => {
      activeOscillatorsRef.current = activeOscillatorsRef.current.filter(item => item.gainNode !== chordGain);
    }, duration * 1000);
  };

  const startMusicLoop = () => {
    let currentChordIndex = 0;
    
    // Play immediately
    playChord(CHORD_PROGRESSION[currentChordIndex]);
    
    chordIntervalRef.current = setInterval(() => {
      currentChordIndex = (currentChordIndex + 1) % CHORD_PROGRESSION.length;
      playChord(CHORD_PROGRESSION[currentChordIndex]);
    }, 4500); // Trigger every 4.5 seconds
  };

  const handleTogglePlay = () => {
    if (isPlaying) {
      stopAudio();
      setIsPlaying(false);
    } else {
      initAudio();
      startRain();
      startMusicLoop();
      setIsPlaying(true);
    }
  };

  const stopAudio = () => {
    // Clear playback interval
    if (chordIntervalRef.current) {
      clearInterval(chordIntervalRef.current);
      chordIntervalRef.current = null;
    }

    // Stop rain
    if (rainSourceRef.current) {
      try {
        rainSourceRef.current.stop();
      } catch (e) {}
      rainSourceRef.current = null;
    }

    // Stop all active chord notes immediately with quick fade
    activeOscillatorsRef.current.forEach(({ oscillators, lfo, gainNode }) => {
      try {
        if (audioCtxRef.current) {
          gainNode.gain.cancelScheduledValues(audioCtxRef.current.currentTime);
          gainNode.gain.setValueAtTime(gainNode.gain.value, audioCtxRef.current.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtxRef.current.currentTime + 0.1);
          setTimeout(() => {
            oscillators.forEach(osc => osc.disconnect());
            lfo.disconnect();
          }, 150);
        }
      } catch (e) {}
    });
    activeOscillatorsRef.current = [];
  };

  return (
    <div className="lofi-player-card">
      <div className="cassette-body">
        {/* Cassette Tape Decorative Graphic */}
        <div className="cassette-label">
          <div className="cassette-brand">COZY BEATS</div>
          <div className="cassette-window">
            <div className="window-reels">
              <Disc 
                className={`reel-icon ${isPlaying ? 'spin-reel-slow' : ''}`} 
                size={28} 
              />
              <Disc 
                className={`reel-icon ${isPlaying ? 'spin-reel-slow' : ''}`} 
                size={28} 
              />
            </div>
            <div className="window-progress">
              {equalizerBars.map((val, idx) => (
                <div 
                  key={idx} 
                  className="eq-bar" 
                  style={{ height: `${val}px` }} 
                />
              ))}
            </div>
          </div>
          <div className="cassette-tracktext">{currentTrackName}</div>
        </div>

        {/* Cassette Controls Area */}
        <div className="cassette-controls">
          <button 
            onClick={handleTogglePlay} 
            className={`play-pause-btn ${isPlaying ? 'playing' : ''}`}
            title={isPlaying ? 'Pause music' : 'Play cozy lo-fi soundscape'}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} fill="currentColor" />}
            <span>{isPlaying ? 'Pause' : 'Play Ambient'}</span>
          </button>
        </div>
      </div>

      {/* Vol sliders */}
      <div className="sliders-section">
        <div className="slider-group">
          <div className="slider-label">
            <Volume2 size={14} />
            <span>Rhodes Synth</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="0.8" 
            step="0.05"
            value={musicVol} 
            onChange={(e) => setMusicVol(parseFloat(e.target.value))}
            className="cozy-slider"
          />
        </div>

        <div className="slider-group">
          <div className="slider-label">
            <CloudRain size={14} />
            <span>Cafe Rain</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="0.8" 
            step="0.05"
            value={rainVol} 
            onChange={(e) => setRainVol(parseFloat(e.target.value))}
            className="cozy-slider"
          />
        </div>
      </div>

      <style>{`
        .lofi-player-card {
          background: var(--bg-card);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          padding: 16px;
          box-shadow: 0 8px 20px var(--color-shadow);
          max-width: 320px;
          width: 100%;
        }

        .cassette-body {
          background: #2e2622;
          border-radius: 8px;
          padding: 12px;
          border: 4px solid #4a3e37;
          box-shadow: inset 0 2px 5px rgba(0,0,0,0.5);
          position: relative;
        }

        .cassette-label {
          background: #ebe4d8;
          border-radius: 4px;
          padding: 8px;
          border: 1px solid #c7bca1;
          color: #2D1A12;
        }

        .cassette-brand {
          font-family: var(--font-sans);
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 2px;
          text-align: center;
          border-bottom: 2px double #c7bca1;
          padding-bottom: 2px;
          margin-bottom: 6px;
        }

        .cassette-window {
          background: #1C1513;
          height: 38px;
          border-radius: 4px;
          margin: 6px auto;
          width: 70%;
          border: 2px solid #4a3e37;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 10px;
          position: relative;
        }

        .window-reels {
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          display: flex;
          justify-content: space-around;
          align-items: center;
          padding: 0 15px;
          pointer-events: none;
        }

        .reel-icon {
          color: #5a4b41;
        }

        .spin-reel-slow {
          animation: spin 6s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .window-progress {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          gap: 3px;
          padding-bottom: 4px;
          z-index: 1;
        }

        .eq-bar {
          width: 3px;
          background: var(--color-accent);
          transition: height 0.15s ease;
          border-radius: 1px;
        }

        .cassette-tracktext {
          font-family: var(--font-handwritten);
          font-size: 14px;
          text-align: center;
          font-weight: 600;
          color: #5c473c;
          margin-top: 4px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .cassette-controls {
          display: flex;
          justify-content: center;
          margin-top: 10px;
        }

        .play-pause-btn {
          background: #c08a58;
          color: white;
          border: none;
          padding: 6px 16px;
          border-radius: 4px;
          font-family: var(--font-sans);
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: background 0.2s;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }

        .play-pause-btn:hover {
          background: #a36f3f;
        }

        .play-pause-btn.playing {
          background: #8A9A86;
        }

        .play-pause-btn.playing:hover {
          background: #73846e;
        }

        .sliders-section {
          margin-top: 12px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .slider-group {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .slider-label {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 11px;
          font-weight: 600;
          color: var(--color-text-muted);
        }

        .cozy-slider {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 4px;
          border-radius: 2px;
          background: var(--color-border);
          outline: none;
          transition: background 0.3s;
        }

        .cozy-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: var(--color-accent);
          cursor: pointer;
          border: 1px solid var(--bg-card);
          box-shadow: 0 1px 3px rgba(0,0,0,0.2);
          transition: transform 0.2s;
        }

        .cozy-slider::-webkit-slider-thumb:hover {
          transform: scale(1.2);
        }

        .cozy-slider::-moz-range-thumb {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: var(--color-accent);
          cursor: pointer;
          border: 1px solid var(--bg-card);
          box-shadow: 0 1px 3px rgba(0,0,0,0.2);
          transition: transform 0.2s;
        }
      `}</style>
    </div>
  );
}
