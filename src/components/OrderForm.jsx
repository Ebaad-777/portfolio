import React, { useState } from 'react';
import { Send, FileText, CheckCircle, Copy } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function OrderForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [receipt, setReceipt] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Synthesize receipt printer sound: multiple short buzzes
  const playPrinterSound = () => {
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContextClass();
      const now = ctx.currentTime;

      // Create a chain of fast buzzy pulses mimicking a thermal printer motor
      const duration = 1.0;
      const pulsesCount = 12;
      const pulseLen = 0.05;
      const gapLen = 0.03;

      for (let i = 0; i < pulsesCount; i++) {
        const pulseStart = now + (i * (pulseLen + gapLen));
        
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        // Square wave has that retro buzzy tone
        osc.type = 'square';
        // Randomize frequency slightly to simulate paper mechanical jitter
        osc.frequency.setValueAtTime(280 + Math.random() * 40, pulseStart);

        // Muffle the harshness of the square wave
        filter.type = 'lowpass';
        filter.frequency.value = 1000;

        gain.gain.setValueAtTime(0, pulseStart);
        gain.gain.linearRampToValueAtTime(0.04, pulseStart + 0.01);
        gain.gain.setValueAtTime(0.04, pulseStart + pulseLen - 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, pulseStart + pulseLen);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(pulseStart);
        osc.stop(pulseStart + pulseLen);
      }
    } catch (e) {
      console.warn("Audio Context blocked or not supported:", e);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    playPrinterSound();

    // Simulate printing latency
    setTimeout(() => {
      const orderId = Math.floor(100000 + Math.random() * 900000);
      const today = new Date().toLocaleString();
      
      setReceipt({
        id: orderId,
        date: today,
        name: formData.name,
        email: formData.email,
        message: formData.message
      });
      setIsSubmitting(false);

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 80,
          origin: { y: 0.7 },
          colors: ['#C08A58', '#8A9A86', '#EADEC9']
        });
      } catch (err) {}
      
      // Reset form
      setFormData({ name: '', email: '', message: '' });
    }, 1200);
  };

  const handleCopyReceipt = () => {
    if (!receipt) return;
    const text = `--- COZY CORNER INVOICE --- \nOrder ID: #${receipt.id}\nDate: ${receipt.date}\nCustomer: ${receipt.name}\nEmail: ${receipt.email}\nOrder Details: ${receipt.message}\n---------------------------`;
    navigator.clipboard.writeText(text);
    alert('Invoice details copied to clipboard!');
  };

  return (
    <section id="contact" className="contact-section">
      <div className="section-intro">
        <h2 className="cozy-section-title">Order Counter</h2>
        <p className="cozy-section-subtitle">Leave a tip, ask a question, or submit a project order</p>
        <a href="mailto:ebaad2016@gmail.com" className="contact-email-chip">
          <span>✉️</span>
          <span>ebaad2016@gmail.com</span>
        </a>
      </div>

      <div className="order-grid">
        {/* Left Side: Order Pad Form */}
        <div className="order-pad-container">
          <form className="order-pad" onSubmit={handleSubmit}>
            <div className="pad-binder">
              <div className="binder-ring"></div>
              <div className="binder-ring"></div>
              <div className="binder-ring"></div>
              <div className="binder-ring"></div>
            </div>
            
            <h3 className="pad-title">WAITER ORDER PAD</h3>
            <p className="pad-tagline">Enter your details and instructions below:</p>
            
            <div className="pad-field">
              <label htmlFor="name">1. Customer Name</label>
              <input 
                type="text" 
                id="name"
                name="name" 
                required 
                value={formData.name}
                onChange={handleChange}
                placeholder="What should we call you?"
                className="cozy-input pad-input"
              />
            </div>

            <div className="pad-field">
              <label htmlFor="email">2. Return Email</label>
              <input 
                type="email" 
                id="email"
                name="email" 
                required 
                value={formData.email}
                onChange={handleChange}
                placeholder="Where should we send updates?"
                className="cozy-input pad-input"
              />
            </div>

            <div className="pad-field">
              <label htmlFor="message">3. Special Orders / Message</label>
              <textarea 
                id="message"
                name="message" 
                rows="4" 
                required
                value={formData.message}
                onChange={handleChange}
                placeholder="Describe your design, editing, or web coding order..."
                className="cozy-input pad-input pad-textarea"
              />
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="cozy-button submit-order-btn"
            >
              <Send size={16} />
              <span>{isSubmitting ? 'Submitting Order...' : 'Submit Order'}</span>
            </button>
          </form>
        </div>

        {/* Right Side: Print Output Receipt */}
        <div className="receipt-output-container">
          {receipt ? (
            <div className="receipt-paper animate-print">
              <div className="receipt-header">
                <div className="receipt-shop-name">COZY CORNER CAFE</div>
                <div className="receipt-address">127.0.0.1 DIGITAL SPACE</div>
                <div className="receipt-divider">* * * * * * * * * * * * * *</div>
                <div className="receipt-meta">
                  <span>ORDER: #{receipt.id}</span>
                  <span>DATE: {receipt.date}</span>
                </div>
                <div className="receipt-divider">* * * * * * * * * * * * * *</div>
              </div>

              <div className="receipt-bill-details">
                <div className="receipt-row">
                  <span className="label">1x CUST_NAME</span>
                  <span className="value">{receipt.name}</span>
                </div>
                <div className="receipt-row">
                  <span className="label">1x CONTACT_EMAIL</span>
                  <span className="value">{receipt.email}</span>
                </div>
                
                <div className="receipt-divider-short">-----------------</div>
                
                <div className="receipt-msg-box">
                  <div className="label">SPECIAL_INSTRUCTIONS:</div>
                  <p className="receipt-msg-text">"{receipt.message}"</p>
                </div>
              </div>

              <div className="receipt-footer">
                <div className="receipt-divider">* * * * * * * * * * * * * *</div>
                <div className="receipt-thanks">THANK YOU FOR VISITING!</div>
                <div className="receipt-signature">Brewed by Creative AI</div>
                <div className="receipt-divider">* * * * * * * * * * * * * *</div>
                <div className="receipt-cut-edge"></div>
              </div>

              <div className="receipt-actions">
                <button 
                  onClick={handleCopyReceipt} 
                  className="receipt-action-btn"
                  title="Copy receipt details to clipboard"
                >
                  <Copy size={14} />
                  <span>Copy Receipt</span>
                </button>
                <button 
                  onClick={() => setReceipt(null)} 
                  className="receipt-action-btn clear-btn"
                >
                  Clear
                </button>
              </div>
            </div>
          ) : (
            <div className="receipt-placeholder">
              <FileText size={48} className="receipt-icon-placeholder" />
              <h4>Receipt Printer Offline</h4>
              <p>Your invoice receipt will print out automatically here once you press "Submit Order".</p>
              <div className="printer-slot"></div>
              <div className="direct-email-note">
                <span>Or reach me directly at:</span>
                <a href="mailto:ebaad2016@gmail.com" className="direct-email-link">ebaad2016@gmail.com</a>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .contact-section {
          margin: 60px 0;
        }

        .order-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 40px;
          align-items: start;
          max-width: 900px;
          margin: 30px auto 0 auto;
        }

        @media (max-width: 800px) {
          .order-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }

        /* Order Pad Styling */
        .order-pad-container {
          position: relative;
        }

        .order-pad {
          background-color: #FAF4E5; /* Lined notebook yellow */
          border: 1px solid #E5DBC5;
          border-radius: var(--radius-sm);
          padding: 30px 24px 24px 24px;
          color: #4A3E3D;
          box-shadow: 4px 6px 15px var(--color-shadow);
          background-image: linear-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px);
          background-size: 100% 28px;
          position: relative;
        }

        [data-theme='night'] .order-pad {
          background-color: #26211C;
          border-color: #3b322a;
          color: #E5DDD9;
          background-image: linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px);
        }

        .pad-binder {
          position: absolute;
          top: -12px;
          left: 0;
          right: 0;
          display: flex;
          justify-content: space-around;
          padding: 0 40px;
        }

        .binder-ring {
          width: 14px;
          height: 24px;
          background: linear-gradient(to right, #999, #ccc, #777);
          border-radius: 7px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }

        .pad-title {
          font-family: var(--font-handwritten);
          font-size: 24px;
          font-weight: 800;
          text-align: center;
          color: var(--color-accent);
          margin-bottom: 2px;
          letter-spacing: 2px;
        }

        .pad-tagline {
          font-family: var(--font-sans);
          font-size: 11px;
          text-transform: uppercase;
          text-align: center;
          color: var(--color-text-muted);
          margin-bottom: 20px;
          letter-spacing: 1px;
        }

        .pad-field {
          margin-bottom: 20px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .pad-field label {
          font-family: var(--font-handwritten);
          font-size: 20px;
          font-weight: 700;
          color: var(--color-heading);
        }

        .pad-input {
          background-color: transparent !important;
          border: none;
          border-bottom: 1px solid rgba(192, 138, 88, 0.3);
          border-radius: 0;
          font-family: var(--font-handwritten);
          font-size: 22px;
          padding: 2px 4px;
          color: inherit;
        }

        .pad-input:focus {
          border-bottom-color: var(--color-accent);
          box-shadow: none;
        }

        .pad-textarea {
          resize: none;
          line-height: 28px; /* sync with lines */
          background-attachment: local;
        }

        .submit-order-btn {
          width: 100%;
          margin-top: 10px;
        }

        /* Receipt Paper Styling */
        .receipt-output-container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          min-height: 380px;
        }

        .receipt-placeholder {
          background: var(--bg-card);
          border: 1px dashed var(--color-border);
          border-radius: var(--radius-md);
          padding: 40px 24px;
          text-align: center;
          color: var(--color-text-muted);
          max-width: 320px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .receipt-icon-placeholder {
          opacity: 0.3;
          color: var(--color-accent);
        }

        .contact-email-chip {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-top: 10px;
          background: var(--color-tag-bg);
          border: 1px dashed var(--color-accent);
          color: var(--color-accent);
          padding: 6px 16px;
          border-radius: 50px;
          font-family: var(--font-sans);
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
          transition: var(--transition);
        }

        .contact-email-chip:hover {
          background: var(--color-accent);
          color: white;
          border-style: solid;
          transform: translateY(-1px);
        }

        .direct-email-note {
          margin-top: 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          font-size: 11px;
          color: var(--color-text-muted);
        }

        .direct-email-link {
          color: var(--color-accent);
          font-weight: 700;
          font-size: 12px;
          text-decoration: none;
          border-bottom: 1px dashed var(--color-accent);
          transition: var(--transition);
        }

        .direct-email-link:hover {
          color: var(--color-accent-hover);
          border-bottom-style: solid;
        }

        .printer-slot {
          width: 80%;
          height: 6px;
          background: #333;
          border-radius: 3px;
          margin-top: 20px;
          box-shadow: inset 0 2px 4px rgba(0,0,0,0.5);
        }

        .receipt-paper {
          background-color: #FCFCFA;
          border: 1px solid #ECEBE6;
          border-bottom: none;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
          width: 290px;
          padding: 24px 20px;
          font-family: monospace;
          color: #2D1A12;
          position: relative;
        }

        [data-theme='night'] .receipt-paper {
          background-color: #F8F8F5;
          border-color: #E2E1D9;
          color: #111;
        }

        /* Animation: Receipt printing slide down */
        .animate-print {
          animation: printOut 1.2s cubic-bezier(0.19, 1, 0.22, 1) forwards;
          transform-origin: top center;
        }

        @keyframes printOut {
          0% {
            transform: scaleY(0);
            max-height: 0;
            opacity: 0;
          }
          100% {
            transform: scaleY(1);
            max-height: 600px;
            opacity: 1;
          }
        }

        .receipt-header {
          text-align: center;
          font-size: 11px;
        }

        .receipt-shop-name {
          font-size: 16px;
          font-weight: 800;
          letter-spacing: 1px;
        }

        .receipt-divider {
          margin: 6px 0;
        }

        .receipt-meta {
          display: flex;
          justify-content: space-between;
          font-size: 10px;
        }

        .receipt-bill-details {
          margin: 16px 0;
          font-size: 11px;
        }

        .receipt-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
        }

        .receipt-row .value {
          text-align: right;
          font-weight: 700;
          max-width: 130px;
          word-break: break-all;
        }

        .receipt-divider-short {
          margin: 8px 0;
          color: #888;
        }

        .receipt-msg-box {
          margin-top: 10px;
        }

        .receipt-msg-text {
          font-style: italic;
          margin-top: 4px;
          background: #F4F4EB;
          padding: 8px;
          border-radius: 4px;
          border: 1px dashed #DDD;
          white-space: pre-wrap;
          word-break: break-word;
        }

        .receipt-footer {
          text-align: center;
          font-size: 11px;
        }

        .receipt-thanks {
          font-weight: 700;
          margin: 4px 0;
        }

        .receipt-signature {
          font-size: 9px;
          color: #666;
        }

        /* Jagged Cut-edge effect at the bottom */
        .receipt-cut-edge {
          position: absolute;
          bottom: -10px;
          left: 0;
          right: 0;
          height: 10px;
          background-image: linear-gradient(135deg, transparent 4px, #FCFCFA 4px), 
                            linear-gradient(45deg, transparent 4px, #FCFCFA 4px);
          background-position: left bottom;
          background-repeat: repeat-x;
          background-size: 8px 8px;
        }

        [data-theme='night'] .receipt-cut-edge {
          background-image: linear-gradient(135deg, transparent 4px, #F8F8F5 4px), 
                            linear-gradient(45deg, transparent 4px, #F8F8F5 4px);
        }

        .receipt-actions {
          display: flex;
          gap: 10px;
          margin-top: 30px;
          justify-content: center;
          width: 100%;
        }

        .receipt-action-btn {
          font-family: monospace;
          font-size: 10px;
          padding: 6px 12px;
          background: #C08A58;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: background 0.2s;
        }
        .receipt-action-btn:hover {
          background: #a36f3f;
        }

        .clear-btn {
          background: #eee;
          color: #333;
        }
        .clear-btn:hover {
          background: #ddd;
        }
      `}</style>
    </section>
  );
}
