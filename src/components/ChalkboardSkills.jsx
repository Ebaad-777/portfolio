import React, { useState } from 'react';
import { Sparkles, Terminal, Palette, Flame } from 'lucide-react';

const SKILLS_DATA = {
  brewed: {
    title: 'Espresso Brews',
    subtitle: 'Core Web Development',
    icon: <Terminal size={18} className="chalk-icon" />,
    items: [
      { name: 'React.js', level: 'Expert', desc: 'Crafting highly interactive, responsive component architectures with React 19 and modern hooks.' },
      { name: 'JavaScript (ES6+)', level: 'Advanced', desc: 'Asynchronous workflows, Web APIs, and canvas graphics scripting.' },
      { name: 'HTML5 & CSS3', level: 'Expert', desc: 'Semantic layouts, customized responsive grids, CSS animations, and theme contexts.' },
      { name: 'Vite & Build Tools', level: 'Advanced', desc: 'Hot-module replacement, tree shaking, and lighting fast bundling configurations.' },
      { name: 'Node.js & APIs', level: 'Intermediate', desc: 'Building simple backend routers, middleware pipelines, and API integrations.' }
    ]
  },
  syrups: {
    title: 'Sweet Syrups',
    subtitle: 'Graphic Design & Video Editing',
    icon: <Palette size={18} className="chalk-icon" />,
    items: [
      { name: 'Graphic Design', level: 'Expert', desc: 'Vector art, layout grids, cozy branding systems, and modern visual design principles.' },
      { name: 'Reel/Video Editing', level: 'Expert', desc: 'High-retention editing, dynamic transitions, pacing, audio mixing, and captioning for short-form content.' },
      { name: 'Adobe Suite', level: 'Advanced', desc: 'Proficient in Photoshop, Illustrator, Premiere Pro, and After Effects for assets creation.' },
      { name: 'Motion Graphics', level: 'Advanced', desc: 'Keyframe animations, visual effects, title cards, and engaging micro-animations.' }
    ]
  },
  special: {
    title: 'Special Blends',
    subtitle: 'AI Tools & Workflows',
    icon: <Sparkles size={18} className="chalk-icon" />,
    items: [
      { name: 'AI Engineering', level: 'Advanced', desc: 'Leveraging LLMs, structured prompts, agentic workflows, and prompt chaining to build smart tools.' },
      { name: 'Workflow Automation', level: 'Advanced', desc: 'Using AI to automate redundant design tasks, write scripts, and accelerate software creation.' },
      { name: 'Deployment & Cloud', level: 'Intermediate', desc: 'Deploying optimized web application bundles via Vercel, Netlify, and Firebase.' }
    ]
  }
};

export default function ChalkboardSkills() {
  const [selectedSkill, setSelectedSkill] = useState(null);

  return (
    <section id="menu" className="chalkboard-section">
      <div className="section-intro">
        <h2 className="cozy-section-title">Today's Specials Menu</h2>
        <p className="cozy-section-subtitle">Chalked up skill sets and ingredients I work with</p>
      </div>

      <div className="chalkboard-container">
        <div className="chalkboard-board">
          <div className="board-header">
            <h3 className="chalk-main-title chalk-text">DAILY INGREDIENT LIST</h3>
            <span className="chalk-divider chalk-text">~~~~ * ~~~~</span>
          </div>

          <div className="board-columns">
            {Object.entries(SKILLS_DATA).map(([key, category]) => (
              <div key={key} className="board-column">
                <div className="column-title-wrapper">
                  {category.icon}
                  <h4 className="column-title chalk-text">{category.title}</h4>
                </div>
                <p className="column-subtitle chalk-text">{category.subtitle}</p>
                <div className="column-divider"></div>
                
                <ul className="chalk-list">
                  {category.items.map((item, idx) => (
                    <li 
                      key={idx} 
                      className={`chalk-item chalk-text ${selectedSkill?.name === item.name ? 'item-active' : ''}`}
                      onClick={() => setSelectedSkill(item)}
                      role="button"
                      tabIndex="0"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          setSelectedSkill(item);
                        }
                      }}
                    >
                      <span className="item-name">{item.name}</span>
                      <span className="item-dots">. . . . . .</span>
                      <span className="item-level">{item.level}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="chalkboard-footer">
            <p className="chalk-text">* Tap any special to see the brewing recipe details *</p>
          </div>
        </div>
      </div>

      {/* Selected Skill Detail Note */}
      {selectedSkill && (
        <div className="recipe-note-wrapper">
          <div className="recipe-note">
            <button className="close-note" onClick={() => setSelectedSkill(null)}>&times;</button>
            <div className="recipe-ring-stain"></div>
            <div className="recipe-content">
              <span className="recipe-tag">Recipe Card</span>
              <h5 className="recipe-title">{selectedSkill.name}</h5>
              <div className="recipe-meta">
                <span><strong>Concentration:</strong> {selectedSkill.level}</span>
              </div>
              <p className="recipe-description">{selectedSkill.desc}</p>
              <div className="recipe-signature">Cozy Corner Cafe</div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .chalkboard-section {
          margin: 60px 0;
        }

        .section-intro {
          text-align: center;
          margin-bottom: 30px;
        }

        .cozy-section-title {
          font-size: 32px;
          margin-bottom: 6px;
        }

        .cozy-section-subtitle {
          font-family: var(--font-handwritten);
          font-size: 20px;
          color: var(--color-accent);
        }

        .board-header {
          text-align: center;
          margin-bottom: 24px;
        }

        .chalk-main-title {
          font-size: 26px;
          font-weight: 700;
          color: var(--color-chalk);
          letter-spacing: 2px;
        }

        .chalk-divider {
          font-size: 18px;
          color: var(--color-chalk-dust);
          display: block;
          margin-top: -4px;
        }

        .board-columns {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        @media (max-width: 900px) {
          .board-columns {
            grid-template-columns: 1fr;
            gap: 30px;
          }
        }

        .board-column {
          display: flex;
          flex-direction: column;
        }

        .column-title-wrapper {
          display: flex;
          align-items: center;
          gap: 8px;
          justify-content: center;
        }

        .chalk-icon {
          color: var(--color-chalk);
          opacity: 0.8;
        }

        .column-title {
          font-size: 22px;
          font-weight: 600;
          text-transform: uppercase;
        }

        .column-subtitle {
          font-size: 14px;
          color: var(--color-chalk-dust);
          text-align: center;
          margin-top: -2px;
          margin-bottom: 10px;
        }

        .column-divider {
          height: 1px;
          border-bottom: 1px dashed var(--color-chalk-dust);
          margin-bottom: 16px;
        }

        .chalk-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .chalk-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          font-size: 18px;
          padding: 4px 8px;
          border-radius: 4px;
          transition: all 0.2s ease;
          border: 1px solid transparent;
        }

        .chalk-item:hover {
          background-color: var(--color-chalk-dust);
          transform: scale(1.03);
          border-color: rgba(255,255,255,0.2);
        }

        .chalk-item.item-active {
          border-color: var(--color-chalk);
          background-color: rgba(255,255,255,0.15);
          text-shadow: 0 0 5px rgba(255, 255, 255, 0.6);
        }

        .item-name {
          font-weight: 600;
        }

        .item-dots {
          flex-grow: 1;
          text-align: center;
          color: var(--color-chalk-dust);
          overflow: hidden;
          margin: 0 8px;
        }

        .item-level {
          color: var(--color-accent);
          font-weight: bold;
        }

        .chalkboard-footer {
          text-align: center;
          margin-top: 30px;
          border-top: 1px dashed var(--color-chalk-dust);
          padding-top: 16px;
          font-size: 15px;
          color: var(--color-chalk-dust);
        }

        /* Recipe Note Styling */
        .recipe-note-wrapper {
          display: flex;
          justify-content: center;
          margin-top: 30px;
          animation: slideDown 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-15px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .recipe-note {
          background-color: #fff9e6; /* Cozy paper card color */
          border: 1px solid #e3dac9;
          border-radius: 8px;
          width: 100%;
          max-width: 450px;
          padding: 24px;
          box-shadow: 5px 8px 20px rgba(0,0,0,0.06), 0 2px 5px rgba(0,0,0,0.05);
          position: relative;
          color: #4A3E3D;
          overflow: hidden;
        }

        [data-theme='night'] .recipe-note {
          background-color: #241D1A;
          border-color: #3b2b25;
          color: #E5DDD9;
          box-shadow: 5px 8px 25px rgba(0,0,0,0.5);
        }

        .recipe-ring-stain {
          position: absolute;
          width: 120px;
          height: 120px;
          border: 4px double rgba(192, 138, 88, 0.15);
          border-radius: 50%;
          bottom: -20px;
          right: -20px;
          pointer-events: none;
        }

        [data-theme='night'] .recipe-ring-stain {
          border-color: rgba(226, 160, 110, 0.1);
        }

        .close-note {
          position: absolute;
          top: 10px;
          right: 14px;
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: var(--color-text-muted);
          transition: var(--transition);
        }
        .close-note:hover {
          color: var(--color-accent);
        }

        .recipe-tag {
          font-family: var(--font-sans);
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 2px;
          font-weight: 700;
          color: var(--color-accent);
          border: 1px solid var(--color-accent);
          padding: 2px 8px;
          border-radius: 4px;
        }

        .recipe-title {
          font-family: var(--font-serif);
          font-size: 24px;
          margin-top: 10px;
          margin-bottom: 6px;
          color: var(--color-heading);
        }

        .recipe-meta {
          font-size: 13px;
          margin-bottom: 12px;
          color: var(--color-text-muted);
          border-bottom: 1px dashed var(--color-border);
          padding-bottom: 6px;
        }

        .recipe-description {
          font-family: var(--font-sans);
          font-size: 15px;
          line-height: 1.5;
        }

        .recipe-signature {
          font-family: var(--font-handwritten);
          font-size: 20px;
          color: var(--color-accent);
          text-align: right;
          margin-top: 16px;
        }
      `}</style>
    </section>
  );
}
