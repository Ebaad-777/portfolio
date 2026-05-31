import React, { useState } from 'react';
import { ExternalLink, Github, Eye, X, BookOpen } from 'lucide-react';

const PROJECTS = [
  {
    id: 1,
    title: 'SehatGuide Healthcare Hub',
    category: 'ai',
    tagText: 'AI Aromas',
    subtitle: 'React, LLM API, Node.js, Health Metrics',
    description: 'An AI-powered healthcare assistant providing triage guidance, healthy diet recommendations, and medical directory resources.',
    details: 'Developed SehatGuide to solve medical access gaps. The tool utilizes an LLM integration to assist users with symptoms classification, suggests personalized wellness recipes based on caloric goals, and navigates local doctor directory information.',
    link: 'https://github.com/Ebaad-777',
    demo: 'https://github.com/Ebaad-777',
    color: '#8A9A86',
    iconText: '🏥'
  },
  {
    id: 2,
    title: 'JARVIS Voice Assistant',
    category: 'ai',
    tagText: 'AI Aromas',
    subtitle: 'Python, Speech APIs, AI Agents',
    description: 'A custom personal voice agent inspired by Iron Man. Performs triggers, reads desktop logs, and controls system commands.',
    details: 'Built JARVIS as a voice interface utility. Utilizes offline speech recognition models, speech-to-text API chains, and triggers local scripts for automation. Connects to custom LLM agents to execute tasks and summarize daily workspace operations.',
    link: 'https://github.com/Ebaad-777',
    demo: 'https://github.com/Ebaad-777',
    color: '#C08A58',
    iconText: '🎙️'
  },
  {
    id: 3,
    title: 'Chatting Application',
    category: 'web',
    tagText: 'Sweet Code',
    subtitle: 'React, Firebase Firestore, WebSockets',
    description: 'A real-time chatting portal with channels, persistent media sharing, and instant direct messaging rooms.',
    details: 'Constructed a chatting portal leveraging React hooks and Firebase. Supports secure authentication, real-time message syncing via WebSockets and Firestore databases, media file storage, and multiple group channels.',
    link: 'https://github.com/Ebaad-777',
    demo: 'https://github.com/Ebaad-777',
    color: '#EADEC9',
    iconText: '💬'
  },
  {
    id: 4,
    title: 'Xyra AI Powered Classroom',
    category: 'ai',
    tagText: 'AI Aromas',
    subtitle: 'React, Express, OpenAI API, Study Deck',
    description: 'An interactive virtual classroom tool offering student grading assistance, question answering decks, and quiz generation.',
    details: 'Built Xyra to enhance remote learning systems. Features an AI tutor module that answers student questions, auto-grades essay submissions with detailed feedback, and creates flashcards or study decks for exam preparation.',
    link: 'https://github.com/Ebaad-777',
    demo: 'https://github.com/Ebaad-777',
    color: '#D4A373',
    iconText: '🎓'
  },
  {
    id: 5,
    title: 'Krinex Custom ERP Solution',
    category: 'web',
    tagText: 'Sweet Code',
    subtitle: 'React, Tailwind, Node.js, PostgreSQL',
    description: 'A custom ERP system built for business inventory control, invoice receipt printing, and sales analytical dashboards.',
    details: 'Developed Krinex on a contract basis. The ERP solution helps small businesses track product stock levels, print thermal waiter receipts, log customer transactions, and view interactive sales revenue charts.',
    link: 'https://github.com/Ebaad-777',
    demo: 'https://github.com/Ebaad-777',
    color: '#C08A58',
    iconText: '📊'
  },
  {
    id: 6,
    title: 'Aurat Muhafiz LegalAI Assistant',
    category: 'ai',
    tagText: 'AI Aromas',
    subtitle: 'React, Python, Legal Document RAG, AI Agent',
    description: 'An AI assistant platform advocating legal rights, summarizing legal documents, and listing defense directories.',
    details: 'Designed Aurat Muhafiz to empower women in Pakistan. Integrates a RAG-based AI model (Retrieval-Augmented Generation) trained on legal code to summarize document clauses, explain legal rights, and match users with defense lawyers or local support helpdesks.',
    link: 'https://github.com/Ebaad-777',
    demo: 'https://github.com/Ebaad-777',
    color: '#8A9A86',
    iconText: '⚖️'
  }
];

export default function ProjectDisplay() {
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = filter === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === filter);

  return (
    <section id="projects" className="bakery-section">
      <div className="section-intro">
        <h2 className="cozy-section-title">Today's Baked Creations</h2>
        <p className="cozy-section-subtitle">A showcase of code, designs, and videos served fresh</p>
      </div>

      {/* Showcase Filter cabinet tabs */}
      <div className="cabinet-tabs">
        <button 
          className={`cabinet-tab ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All Delights
        </button>
        <button 
          className={`cabinet-tab ${filter === 'web' ? 'active' : ''}`}
          onClick={() => setFilter('web')}
        >
          Sweet Code
        </button>
        <button 
          className={`cabinet-tab ${filter === 'ai' ? 'active' : ''}`}
          onClick={() => setFilter('ai')}
        >
          AI Aromas
        </button>
      </div>

      {/* Bakery Showcase Grid */}
      <div className="cozy-grid">
        {filteredProjects.map((project) => (
          <div key={project.id} className="cozy-card bakery-card">
            {/* Visual Header / Mock Graphic */}
            <div className="bakery-graphic" style={{ backgroundColor: project.color }}>
              <span className="bakery-icon">{project.iconText}</span>
              <span className="bakery-tag">{project.tagText}</span>
            </div>

            <div className="bakery-body">
              <h3 className="bakery-title">{project.title}</h3>
              <span className="bakery-subtitle">{project.subtitle}</span>
              <p className="bakery-desc">{project.description}</p>
              
              <button 
                className="view-recipe-btn"
                onClick={() => setSelectedProject(project)}
              >
                <BookOpen size={16} />
                <span>View Recipe</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Recipe Detail Booklet Modal */}
      {selectedProject && (
        <div className="modal-backdrop" onClick={() => setSelectedProject(null)}>
          <div 
            className="menu-booklet-modal" 
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <button 
              className="modal-close-btn" 
              onClick={() => setSelectedProject(null)}
              aria-label="Close details"
            >
              <X size={20} />
            </button>

            <div className="booklet-left" style={{ backgroundColor: selectedProject.color }}>
              <span className="booklet-large-icon">{selectedProject.iconText}</span>
              <span className="booklet-category-tag">{selectedProject.tagText}</span>
            </div>

            <div className="booklet-right">
              <div className="booklet-header">
                <span className="booklet-brand">SPECIAL DELIGHT</span>
                <h3 id="modal-title" className="booklet-title">{selectedProject.title}</h3>
                <span className="booklet-ingredients">{selectedProject.subtitle}</span>
              </div>

              <div className="booklet-divider"></div>

              <div className="booklet-body">
                <h4>Description:</h4>
                <p>{selectedProject.description}</p>
                
                <h4>Brewing & Assembly Details:</h4>
                <p className="booklet-details-text">{selectedProject.details}</p>
              </div>

              <div className="booklet-actions">
                <a 
                  href={selectedProject.demo} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="cozy-button action-btn"
                >
                  <ExternalLink size={16} />
                  <span>Taste Demo</span>
                </a>
                <a 
                  href={selectedProject.link} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="cozy-button action-btn alt-btn"
                >
                  <Github size={16} />
                  <span>View Source</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .bakery-section {
          margin: 60px 0;
        }

        .cabinet-tabs {
          display: flex;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 30px;
        }

        .cabinet-tab {
          background: var(--bg-card);
          border: 1px solid var(--color-border);
          color: var(--color-text);
          padding: 8px 16px;
          border-radius: 50px;
          cursor: pointer;
          font-family: var(--font-sans);
          font-weight: 600;
          transition: var(--transition-cozy);
          box-shadow: 0 4px 10px var(--color-shadow);
        }

        .cabinet-tab:hover {
          border-color: var(--color-accent);
          transform: translateY(-2px);
        }

        .cabinet-tab.active {
          background: var(--color-accent);
          color: white;
          border-color: var(--color-accent);
        }

        .bakery-card {
          padding: 0;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .bakery-graphic {
          height: 160px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          border-bottom: 1px solid var(--color-border);
        }

        .bakery-icon {
          font-size: 54px;
          filter: drop-shadow(0 4px 6px rgba(0,0,0,0.1));
        }

        .bakery-tag {
          position: absolute;
          top: 12px;
          left: 12px;
          font-size: 11px;
          font-weight: 700;
          background: rgba(255, 255, 255, 0.9);
          color: #2D1A12;
          padding: 3px 8px;
          border-radius: 4px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }

        .bakery-body {
          padding: 20px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .bakery-title {
          font-size: 20px;
          margin-bottom: 2px;
        }

        .bakery-subtitle {
          font-size: 12px;
          color: var(--color-text-muted);
          font-weight: 600;
          margin-bottom: 12px;
          display: block;
        }

        .bakery-desc {
          font-size: 14px;
          color: var(--color-text);
          line-height: 1.5;
          margin-bottom: 20px;
          flex-grow: 1;
        }

        .view-recipe-btn {
          background: none;
          border: 1px dashed var(--color-accent);
          color: var(--color-accent);
          padding: 10px;
          border-radius: var(--radius-sm);
          font-family: var(--font-sans);
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          transition: var(--transition);
          width: 100%;
        }

        .view-recipe-btn:hover {
          background: var(--color-tag-bg);
          border-style: solid;
        }

        /* Booklet Modal Backdrop */
        .modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(45, 26, 18, 0.4);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        /* Menu Booklet Modal */
        .menu-booklet-modal {
          background: var(--bg-card);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          max-width: 750px;
          width: 100%;
          display: flex;
          box-shadow: 0 20px 50px rgba(45, 26, 18, 0.15);
          position: relative;
          overflow: hidden;
          animation: scaleUp 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.2);
        }

        @keyframes scaleUp {
          from { transform: scale(0.92); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        .modal-close-btn {
          position: absolute;
          top: 15px;
          right: 15px;
          background: var(--bg-card);
          border: 1px solid var(--color-border);
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: var(--color-text);
          transition: var(--transition-cozy);
          z-index: 10;
        }

        .modal-close-btn:hover {
          color: var(--color-accent);
          transform: rotate(90deg);
        }

        .booklet-left {
          width: 220px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          border-right: 1px solid var(--color-border);
        }

        .booklet-large-icon {
          font-size: 80px;
          filter: drop-shadow(0 8px 12px rgba(0,0,0,0.15));
        }

        .booklet-category-tag {
          margin-top: 16px;
          font-size: 11px;
          font-weight: 700;
          background: rgba(255,255,255,0.9);
          color: #2D1A12;
          padding: 4px 10px;
          border-radius: 4px;
        }

        .booklet-right {
          flex: 1;
          padding: 36px;
          display: flex;
          flex-direction: column;
          max-height: 80vh;
          overflow-y: auto;
        }

        .booklet-header {
          display: flex;
          flex-direction: column;
        }

        .booklet-brand {
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 2px;
          color: var(--color-accent);
        }

        .booklet-title {
          font-size: 28px;
          margin-top: 4px;
          margin-bottom: 2px;
        }

        .booklet-ingredients {
          font-size: 13px;
          color: var(--color-text-muted);
          font-weight: 600;
        }

        .booklet-divider {
          height: 1px;
          border-bottom: 1px dashed var(--color-border);
          margin: 20px 0;
        }

        .booklet-body h4 {
          font-size: 14px;
          color: var(--color-accent);
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-top: 16px;
          margin-bottom: 6px;
        }

        .booklet-body p {
          font-size: 15px;
          line-height: 1.5;
          color: var(--color-text);
        }

        .booklet-details-text {
          background: var(--bg-cafe);
          padding: 12px;
          border-radius: var(--radius-sm);
          font-size: 14px !important;
          border-left: 3px solid var(--color-accent);
        }

        .booklet-actions {
          display: flex;
          gap: 12px;
          margin-top: 30px;
        }

        .action-btn {
          flex: 1;
          font-size: 14px;
          padding: 10px 16px;
        }

        .alt-btn {
          background-color: transparent;
          color: var(--color-text);
          border: 1px solid var(--color-border);
          box-shadow: none;
        }

        .alt-btn:hover {
          background-color: var(--color-tag-bg);
          color: var(--color-accent);
        }

        @media (max-width: 768px) {
          .menu-booklet-modal {
            flex-direction: column;
          }
          
          .booklet-left {
            width: 100%;
            height: 120px;
            border-right: none;
            border-bottom: 1px solid var(--color-border);
          }
          
          .booklet-large-icon {
            font-size: 48px;
          }
          
          .booklet-category-tag {
            margin-top: 6px;
          }
          
          .booklet-right {
            padding: 24px;
          }
          
          .booklet-actions {
            flex-direction: column;
          }
        }
      `}</style>
    </section>
  );
}
