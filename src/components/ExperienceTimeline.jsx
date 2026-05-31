import React, { useState } from 'react';
import { Calendar, Briefcase, ChevronDown, Award } from 'lucide-react';

const MILESTONES = [
  {
    id: 1,
    phase: 'Harvesting',
    role: 'Software Engineering Student',
    time: '2022 - Present',
    company: 'Sir Syed University of Eng. & Tech (SSUET)',
    beanIcon: '🌱',
    summary: 'Acquiring core engineering concepts. Mastered OOP, database management, and algorithm patterns.',
    details: 'Began my academic foundation in software engineering at SSUET. Focused heavily on data structures, compiler labs, backend routing architectures, and collaborating on student coding portfolios.',
    achievements: ['Core team lead for database and scripting lab groups.', 'Built foundational coding modules and CLI assistants.']
  },
  {
    id: 2,
    phase: 'Drying',
    role: 'Contract Software Developer',
    time: '2023 - 2024',
    company: 'Freelance / Remote Contracts',
    beanIcon: '☀️',
    summary: 'Brewed customer-facing systems. Built chatting portals and inventory systems on a contract basis.',
    details: 'Took on freelance programming contracts to build custom software for local business owners. Designed robust interfaces, managed state pipelines, and deployed backend integrations.',
    achievements: ['Designed and shipped Krinex Custom ERP for small business inventory.', 'Developed a WebSocket Chatting Application with instant sync.']
  },
  {
    id: 3,
    phase: 'Roasting',
    role: 'AI Tool Integration Engineer',
    time: '2024 - 2025',
    company: 'Specialized Contracts',
    beanIcon: '🔥',
    summary: 'Combined LLMs and speech processing to build intelligent assistants.',
    details: 'Ventured deep into AI engineering. Connected OpenAI models, engineered RAG vectors (Retrieval-Augmented Generation), and developed speech-to-command agents.',
    achievements: ['Brewed SehatGuide Healthcare Hub with custom diagnostic recommendation feeds.', 'Created Aurat Muhafiz LegalAI Assistant aiding women on Pakistani law.']
  },
  {
    id: 4,
    phase: 'Brewing',
    role: 'Contract Developer (Open for Roles)',
    time: 'Present',
    company: 'Seeking Full-Time Opportunities',
    beanIcon: '☕',
    summary: 'Operating as a contract developer while studying. Ready to join a creative engineering team full-time.',
    details: 'Actively taking on freelance software contracts while completing my degree at Sir Syed University. Eager to bring my web programming, design sensibilities, and AI operating capabilities to a full-time engineering role.',
    achievements: ['Currently maintaining 6 active AI and Fullstack repositories on GitHub.', 'Ready to transition into a permanent Software Engineer role.']
  }
];

export default function ExperienceTimeline() {
  const [expandedId, setExpandedId] = useState(4); // Default expand current brewing phase

  return (
    <section id="journey" className="journey-section">
      <div className="section-intro">
        <h2 className="cozy-section-title">The Roasting Process</h2>
        <p className="cozy-section-subtitle">How my skills evolved from raw green beans to a refined brew</p>
      </div>

      <div className="timeline-container">
        {/* Central connecting line */}
        <div className="timeline-line"></div>

        <div className="timeline-list">
          {MILESTONES.map((step) => {
            const isExpanded = expandedId === step.id;
            return (
              <div 
                key={step.id} 
                className={`timeline-item ${isExpanded ? 'item-expanded' : ''}`}
              >
                {/* Timeline Node */}
                <div 
                  className={`timeline-node ${isExpanded ? 'node-active' : ''}`}
                  onClick={() => setExpandedId(isExpanded ? null : step.id)}
                  title={`Click to view ${step.phase} details`}
                  role="button"
                  tabIndex="0"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setExpandedId(isExpanded ? null : step.id);
                    }
                  }}
                >
                  <span className="node-bean">{step.beanIcon}</span>
                </div>

                {/* Timeline Card Content */}
                <div className="cozy-card timeline-card">
                  <div className="timeline-card-header" onClick={() => setExpandedId(isExpanded ? null : step.id)}>
                    <div className="header-left">
                      <span className="phase-badge">{step.phase} Phase</span>
                      <h3 className="timeline-role">{step.role}</h3>
                      <div className="timeline-meta">
                        <span className="meta-item"><Briefcase size={14} /> {step.company}</span>
                        <span className="meta-item"><Calendar size={14} /> {step.time}</span>
                      </div>
                    </div>
                    <button className="expand-btn" aria-label="Toggle details">
                      <ChevronDown size={20} className={`chevron-icon ${isExpanded ? 'rotate-180' : ''}`} />
                    </button>
                  </div>

                  <p className="timeline-summary">{step.summary}</p>

                  {isExpanded && (
                    <div className="timeline-card-details">
                      <div className="details-divider"></div>
                      <h4 className="details-title">Detailed Journey:</h4>
                      <p className="details-text">{step.details}</p>
                      
                      <h4 className="details-title">Key Milestones:</h4>
                      <ul className="achievements-list">
                        {step.achievements.map((ach, idx) => (
                          <li key={idx}>
                            <Award size={14} className="ach-icon" />
                            <span>{ach}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .journey-section {
          margin: 60px 0;
        }

        .timeline-container {
          position: relative;
          max-width: 800px;
          margin: 40px auto 0 auto;
          padding: 0 10px;
        }

        /* Connecting vertical line */
        .timeline-line {
          position: absolute;
          left: 30px;
          top: 20px;
          bottom: 20px;
          width: 4px;
          background-color: var(--color-border);
          border-radius: 2px;
          pointer-events: none;
        }

        .timeline-list {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        .timeline-item {
          position: relative;
          display: flex;
          gap: 30px;
        }

        /* Timeline Node/Bean Styling */
        .timeline-node {
          width: 44px;
          height: 44px;
          background-color: var(--bg-card);
          border: 3px solid var(--color-border);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 2;
          transition: var(--transition-cozy);
          box-shadow: 0 4px 10px var(--color-shadow);
          margin-left: 10px;
          flex-shrink: 0;
          outline: none;
        }

        .timeline-node:hover {
          transform: scale(1.15);
          border-color: var(--color-accent);
        }

        .timeline-node:focus-visible {
          outline: 2px solid var(--color-accent);
          outline-offset: 4px;
        }

        .timeline-node.node-active {
          background-color: var(--color-accent);
          border-color: var(--color-accent);
          box-shadow: 0 0 15px rgba(226, 160, 110, 0.4);
        }

        .node-bean {
          font-size: 20px;
        }

        .timeline-node.node-active .node-bean {
          filter: drop-shadow(0 0 2px white);
        }

        /* Timeline Card */
        .timeline-card {
          flex: 1;
          padding: 20px;
          text-align: left;
        }

        .timeline-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          cursor: pointer;
        }

        .phase-badge {
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: var(--color-accent);
        }

        .timeline-role {
          font-size: 20px;
          margin-top: 4px;
          margin-bottom: 4px;
        }

        .timeline-meta {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          font-size: 13px;
          color: var(--color-text-muted);
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .expand-btn {
          background: none;
          border: none;
          color: var(--color-text-muted);
          cursor: pointer;
          padding: 4px;
          transition: var(--transition);
        }
        .expand-btn:hover {
          color: var(--color-accent);
        }

        .chevron-icon {
          transition: transform 0.3s ease;
        }

        .chevron-icon.rotate-180 {
          transform: rotate(180deg);
        }

        .timeline-summary {
          font-size: 15px;
          color: var(--color-text);
          margin-top: 12px;
          line-height: 1.5;
        }

        /* Card details section */
        .timeline-card-details {
          margin-top: 16px;
          animation: fadeSlideDown 0.35s ease;
        }

        @keyframes fadeSlideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .details-divider {
          height: 1px;
          border-bottom: 1px dashed var(--color-border);
          margin-bottom: 16px;
        }

        .details-title {
          font-size: 14px;
          color: var(--color-accent);
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-top: 14px;
          margin-bottom: 6px;
        }

        .details-text {
          font-size: 14.5px;
          line-height: 1.5;
        }

        .achievements-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-top: 6px;
        }

        .achievements-list li {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 14px;
        }

        .ach-icon {
          color: var(--color-accent);
          margin-top: 3px;
          flex-shrink: 0;
        }

        @media (max-width: 600px) {
          .timeline-line {
            left: 20px;
          }
          
          .timeline-node {
            width: 36px;
            height: 36px;
            margin-left: 0;
          }
          
          .node-bean {
            font-size: 16px;
          }
          
          .timeline-item {
            gap: 16px;
          }
        }
      `}</style>
    </section>
  );
}
