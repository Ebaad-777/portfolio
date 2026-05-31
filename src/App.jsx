import React, { useState, useEffect } from 'react';
import { Sun, Moon, Coffee, Sparkles, MessageSquare, Terminal, Award } from 'lucide-react';
import CoffeeCup from './components/CoffeeCup';
import LofiPlayer from './components/LofiPlayer';
import ChalkboardSkills from './components/ChalkboardSkills';
import ProjectDisplay from './components/ProjectDisplay';
import ExperienceTimeline from './components/ExperienceTimeline';
import OrderForm from './components/OrderForm';

export default function App() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('cozy_portfolio_theme');
    return saved || 'morning';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('cozy_portfolio_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'morning' ? 'night' : 'morning'));
  };

  // Quick stats counters
  const stats = [
    { value: '6', label: 'AI & Web Projects' },
    { value: 'SSUET', label: 'Sir Syed University Student' },
    { value: 'Contract', label: 'Freelance Basis' },
    { value: '100%', label: 'Caffeine Fueled' }
  ];

  return (
    <div className="app-container">
      {/* Header */}
      <header>
        <div className="logo-section">
          <Coffee size={28} className="logo-icon" style={{ color: 'var(--color-accent)' }} />
          <div>
            <h1 className="logo-title">Ebaad Siddiqui</h1>
            <span className="logo-sub">Software Engineer</span>
          </div>
        </div>

        <nav>
          <ul>
            <li><a href="#about">About</a></li>
            <li><a href="#menu">Skills Menu</a></li>
            <li><a href="#projects">Showcase</a></li>
            <li><a href="#journey">Journey</a></li>
            <li><a href="#contact">Order Counter</a></li>
          </ul>
        </nav>

        <button 
          onClick={toggleTheme} 
          className="theme-toggle-btn"
          aria-label={`Switch to ${theme === 'morning' ? 'Cozy Night' : 'Cozy Morning'} theme`}
        >
          {theme === 'morning' ? (
            <>
              <Moon size={16} fill="currentColor" />
              <span>Night Shift</span>
            </>
          ) : (
            <>
              <Sun size={16} fill="currentColor" />
              <span>Morning Shift</span>
            </>
          )}
        </button>
      </header>

      {/* Hero Section */}
      <main id="about" className="hero-section">
        <div className="hero-grid">
          {/* Hero Left Content */}
          <div className="hero-content">
            <div className="welcome-tag">
              <Sparkles size={14} />
              <span>STUDENT & CONTRACT DEVELOPER</span>
            </div>
            
            <h2 className="hero-headline">
              Muhammad Ebaad <br/>
              Siddiqui
            </h2>
            
            <p className="hero-bio">
              Welcome to my digital workspace! I'm a software engineering student at <strong>Sir Syed University (SSUET)</strong>. 
              I specialize in designing chatting applications, custom ERP modules, and AI-powered legal or healthcare assistants 
              on a remote contract basis.
            </p>

            <div className="hero-actions">
              <a 
                href="https://www.linkedin.com/in/ebaad-siddiqui-4752332a3" 
                target="_blank" 
                rel="noreferrer" 
                className="cozy-button"
              >
                <span>LinkedIn Profile</span>
              </a>
              <a 
                href="https://github.com/Ebaad-777" 
                target="_blank" 
                rel="noreferrer" 
                className="cozy-button secondary-btn"
              >
                <span>GitHub Repos</span>
              </a>
            </div>
          </div>

          {/* Hero Right Interactive Station */}
          <div className="interactive-station">
            <div className="cozy-card station-card">
              <div className="card-ambient-glow"></div>
              <h3 className="station-title">THE BARISTA STATION</h3>
              <p className="station-subtitle">Take a sip of coffee & play some tunes</p>
              
              <div className="station-interactives">
                <CoffeeCup />
                <LofiPlayer />
              </div>
            </div>
          </div>
        </div>

        {/* Cafe Stats Grid */}
        <div className="stats-grid">
          {stats.map((stat, idx) => (
            <div key={idx} className="cozy-card stat-card">
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </main>

      {/* Main Content Sections */}
      <ChalkboardSkills />
      
      <ProjectDisplay />
      
      <ExperienceTimeline />
      
      <OrderForm />

      {/* Footer */}
      <footer>
        <p>© {new Date().getFullYear()} Muhammad Ebaad Siddiqui. Handcrafted in React & CSS.</p>
        <p style={{ marginTop: '6px', fontSize: '12px' }}>
          Open for contract opportunities. Soundscape synthesized live via Web Audio API.
        </p>
      </footer>

      <style>{`
        /* Smooth Scroll behavior on root HTML */
        :global(html) {
          scroll-behavior: smooth;
        }

        .hero-section {
          padding: 60px 0;
          border-bottom: 1px dashed var(--color-border);
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 40px;
          align-items: center;
        }

        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 50px;
          }
          
          .hero-actions {
            justify-content: center;
          }
          
          .station-interactives {
            flex-direction: column;
            align-items: center;
          }
        }

        .welcome-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 700;
          color: var(--color-accent);
          background-color: var(--color-tag-bg);
          padding: 4px 12px;
          border-radius: 4px;
          margin-bottom: 16px;
          letter-spacing: 1.5px;
        }

        .hero-headline {
          font-size: 48px;
          line-height: 1.15;
          margin-bottom: 20px;
          letter-spacing: -1px;
        }

        @media (max-width: 600px) {
          .hero-headline {
            font-size: 36px;
          }
        }

        .hero-bio {
          font-size: 17px;
          color: var(--color-text);
          margin-bottom: 30px;
          max-width: 500px;
          line-height: 1.6;
        }

        @media (max-width: 900px) {
          .hero-bio {
            margin-left: auto;
            margin-right: auto;
          }
        }

        .hero-actions {
          display: flex;
          gap: 16px;
        }

        .secondary-btn {
          background-color: transparent;
          color: var(--color-text);
          border: 1px solid var(--color-border);
          box-shadow: none;
        }

        .secondary-btn:hover {
          background-color: var(--color-tag-bg);
          color: var(--color-accent);
          border-color: var(--color-accent);
        }

        /* Interactive Station (Right Hero card) */
        .interactive-station {
          width: 100%;
        }

        .station-card {
          position: relative;
          overflow: hidden;
          padding: 24px;
          border: 1px solid var(--color-border);
        }

        .card-ambient-glow {
          position: absolute;
          top: -20%;
          left: 50%;
          width: 150px;
          height: 150px;
          background: radial-gradient(circle, var(--color-steamy) 0%, transparent 70%);
          transform: translate(-50%, 0);
          pointer-events: none;
        }

        .station-title {
          font-size: 16px;
          font-weight: 700;
          letter-spacing: 2px;
          text-align: center;
          margin-bottom: 2px;
          color: var(--color-heading);
        }

        .station-subtitle {
          font-size: 12px;
          color: var(--color-text-muted);
          text-align: center;
          margin-bottom: 24px;
        }

        .station-interactives {
          display: flex;
          justify-content: space-around;
          align-items: center;
          gap: 20px;
        }

        /* Stats Grid */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-top: 50px;
        }

        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .stat-card {
          text-align: center;
          padding: 16px 8px;
        }

        .stat-value {
          display: block;
          font-family: var(--font-serif);
          font-size: 32px;
          font-weight: 700;
          color: var(--color-accent);
          margin-bottom: 2px;
        }

        .stat-label {
          font-size: 12px;
          color: var(--color-text-muted);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
      `}</style>
    </div>
  );
}
