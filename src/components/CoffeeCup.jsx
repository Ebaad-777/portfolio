import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

const LATTE_ART = [
  {
    name: 'Cozy Heart',
    path: 'M 40 45 C 30 30, 15 45, 40 65 C 65 45, 50 30, 40 45 Z',
    desc: 'Made with love & care.'
  },
  {
    name: 'Sage Fern',
    path: 'M 40 65 Q 40 35, 40 30 M 40 60 Q 30 50, 40 45 Q 50 50, 40 45 M 40 50 Q 32 42, 40 38 Q 48 42, 40 38',
    desc: 'Organic growth and learning.'
  },
  {
    name: 'Spark Star',
    path: 'M 40 30 L 44 42 L 56 42 L 46 50 L 50 62 L 40 54 L 30 62 L 34 50 L 24 42 L 36 42 Z',
    desc: 'Creativity that shines bright.'
  },
  {
    name: 'Classic Brew',
    path: 'M 25 45 Q 40 35, 55 45 Q 40 55, 25 45',
    desc: 'Pure, rich, and concentrated.'
  }
];

export default function CoffeeCup() {
  const [sips, setSips] = useState(() => {
    const saved = localStorage.getItem('cozy_coffee_sips');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [latteArtIndex, setLatteArtIndex] = useState(0);
  const [isSipping, setIsSipping] = useState(false);
  const [floaters, setFloaters] = useState([]); // Array of { id, x, y }

  useEffect(() => {
    localStorage.setItem('cozy_coffee_sips', sips);
  }, [sips]);

  // Synthesize a cute tiny liquid gulp/sip chime sound
  const playSipSound = () => {
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContextClass();
      const now = ctx.currentTime;

      // 1. Chime oscillator
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, now);
      // Sweeping frequency up to sound like a droplet
      osc.frequency.exponentialRampToValueAtTime(1200, now + 0.15);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.2);

      // 2. Soft noise burst for gulp/splash
      const bufferSize = ctx.sampleRate * 0.05;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 800;

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.05, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(ctx.destination);

      noise.start(now);
      noise.stop(now + 0.05);
    } catch (e) {
      console.warn("Audio Context blocked or not supported:", e);
    }
  };

  const handleSip = (e) => {
    if (isSipping) return;
    setIsSipping(true);
    playSipSound();

    // Increment sips
    const newSips = sips + 1;
    setSips(newSips);

    // Toggle latte art on every 3 sips
    if (newSips % 3 === 0) {
      setLatteArtIndex((prev) => (prev + 1) % LATTE_ART.length);
    }

    // Trigger confetti on milestones (every 10 sips)
    if (newSips % 10 === 0) {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#C08A58', '#EADEC9', '#8E7A71', '#8A9A86']
        });
      } catch (err) {}
    }

    // Spawn floating "+1 Sip" text
    const rect = e.currentTarget.getBoundingClientRect();
    const id = Date.now() + Math.random();
    const newFloater = {
      id,
      x: Math.floor(Math.random() * 40) - 20, // offset
      y: -20
    };
    setFloaters((prev) => [...prev, newFloater]);

    // Clean up floaters
    setTimeout(() => {
      setFloaters((prev) => prev.filter((f) => f.id !== id));
    }, 1500);

    setTimeout(() => {
      setIsSipping(false);
    }, 400);
  };

  const activeArt = LATTE_ART[latteArtIndex];

  return (
    <div className="cozy-coffee-container">
      <div 
        className={`coffee-cup-wrapper ${isSipping ? 'sip-anim' : ''}`}
        onClick={handleSip}
        role="button"
        tabIndex="0"
        title="Click to take a sip of coffee!"
        aria-label="Interactive coffee cup. Click to take a sip."
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleSip(e);
          }
        }}
      >
        {/* Steam paths */}
        <svg className="steam-svg" viewBox="0 0 100 60" width="100" height="60">
          <path 
            className="steam-path" 
            d="M 30 50 Q 20 35, 30 20 T 20 0" 
            fill="none" 
            stroke="var(--color-steamy)" 
            strokeWidth="3" 
            strokeLinecap="round" 
          />
          <path 
            className="steam-path-2" 
            d="M 50 55 Q 60 38, 50 22 T 60 2" 
            fill="none" 
            stroke="var(--color-steamy)" 
            strokeWidth="3.5" 
            strokeLinecap="round" 
          />
          <path 
            className="steam-path-3" 
            d="M 70 52 Q 62 33, 70 18 T 62 -2" 
            fill="none" 
            stroke="var(--color-steamy)" 
            strokeWidth="2.8" 
            strokeLinecap="round" 
          />
        </svg>

        {/* Coffee Cup and Saucer */}
        <svg className="cup-svg" viewBox="0 0 160 120" width="160" height="120">
          {/* Saucer */}
          <ellipse cx="80" cy="102" rx="60" ry="12" fill="var(--color-border)" />
          <ellipse cx="80" cy="100" rx="58" ry="10" fill="var(--bg-card)" stroke="var(--color-border)" strokeWidth="2" />

          {/* Cup Handle */}
          <path 
            d="M 115 50 C 135 50, 135 80, 115 80" 
            fill="none" 
            stroke="var(--color-accent)" 
            strokeWidth="7" 
            strokeLinecap="round" 
          />
          <path 
            d="M 115 52 C 130 52, 130 78, 115 78" 
            fill="none" 
            stroke="var(--bg-card)" 
            strokeWidth="3" 
            strokeLinecap="round" 
          />

          {/* Cup Body */}
          <path 
            d="M 45 42 L 115 42 Q 115 90, 80 90 Q 45 90, 45 42 Z" 
            fill="var(--color-accent)" 
          />
          
          {/* Cup Front Overlay */}
          <path 
            d="M 47 44 L 113 44 Q 113 87, 80 87 Q 47 87, 47 44 Z" 
            fill="var(--bg-card)" 
            stroke="var(--color-border)" 
            strokeWidth="2" 
          />

          {/* Coffee Liquid (Top Oval) */}
          <ellipse cx="80" cy="44" rx="31" ry="8" fill="#5A3A21" />

          {/* Latte Froth (Inner Oval) */}
          <ellipse cx="80" cy="44" rx="26" ry="6" fill="#ECCBB0" />

          {/* Dynamic Latte Art */}
          <path 
            d={activeArt.path} 
            fill="none" 
            stroke="#FFF5EB" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>

        {/* Floating "+1 Sip" effects */}
        {floaters.map((f) => (
          <div 
            key={f.id} 
            className="sip-floater"
            style={{ transform: `translate(calc(-50% + ${f.x}px), ${f.y}px)` }}
          >
            +1 Sip
          </div>
        ))}
      </div>

      <div className="coffee-stats">
        <div className="sips-counter">Sips taken: <span>{sips}</span></div>
        <div className="latte-art-desc">
          <strong>Latte Art:</strong> {activeArt.name} <br/>
          <span className="art-subtitle">"{activeArt.desc}"</span>
        </div>
      </div>

      <style>{`
        .cozy-coffee-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          margin: 20px 0;
        }

        .coffee-cup-wrapper {
          position: relative;
          cursor: pointer;
          transition: transform 0.2s ease;
          outline: none;
        }

        .coffee-cup-wrapper:focus-visible {
          outline: 2px solid var(--color-accent);
          outline-offset: 4px;
          border-radius: var(--radius-md);
        }

        .coffee-cup-wrapper:hover {
          transform: scale(1.05);
        }

        .sip-anim {
          animation: drink 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        @keyframes drink {
          0% { transform: scale(1) rotate(0deg); }
          40% { transform: scale(0.95) translateY(6px) rotate(-4deg); }
          70% { transform: scale(1.02) translateY(-4px) rotate(2deg); }
          100% { transform: scale(1) rotate(0deg); }
        }

        .steam-svg {
          display: block;
          margin: 0 auto -20px auto;
          overflow: visible;
          pointer-events: none;
        }

        .cup-svg {
          display: block;
          filter: drop-shadow(0 6px 10px var(--color-shadow));
        }

        .sip-floater {
          position: absolute;
          top: 30px;
          left: 50%;
          font-family: var(--font-handwritten);
          font-size: 24px;
          font-weight: 700;
          color: var(--color-accent);
          pointer-events: none;
          animation: floatUp 1.2s cubic-bezier(0.25, 1, 0.5, 1) forwards;
          text-shadow: 0 1px 3px var(--bg-card);
        }

        @keyframes floatUp {
          0% {
            opacity: 1;
            transform: translate(-50%, 0) scale(0.8);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -60px) scale(1.2);
          }
        }

        .coffee-stats {
          text-align: center;
          font-family: var(--font-sans);
        }

        .sips-counter {
          font-size: 16px;
          font-weight: 700;
          color: var(--color-heading);
        }

        .sips-counter span {
          background: var(--color-accent);
          color: white;
          padding: 2px 8px;
          border-radius: 20px;
          font-size: 14px;
          display: inline-block;
          margin-left: 4px;
        }

        .latte-art-desc {
          margin-top: 4px;
          font-size: 12px;
          color: var(--color-text-muted);
          line-height: 1.3;
        }

        .art-subtitle {
          font-style: italic;
          font-family: var(--font-handwritten);
          font-size: 14px;
          color: var(--color-accent);
        }
      `}</style>
    </div>
  );
}
