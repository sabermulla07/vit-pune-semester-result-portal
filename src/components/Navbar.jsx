import React from 'react';
import { Printer, HelpCircle, Sparkles } from 'lucide-react';

export default function Navbar({ onPrint, onOpenGrading, onOpenAIDocs, mode, setMode }) {
  return (
    <header className="vit-navbar no-print">
      <div className="navbar-container">
        <div className="brand-group">
          {/* VIT Emblem SVG */}
          <div className="vit-emblem">
            <svg viewBox="0 0 100 100" className="vit-seal-svg" width="48" height="48">
              <circle cx="50" cy="50" r="46" fill="#800000" stroke="#FFD700" strokeWidth="3" />
              <circle cx="50" cy="50" r="38" fill="none" stroke="#FFD700" strokeWidth="1.5" strokeDasharray="3 2" />
              <path d="M 50 18 L 62 42 L 88 42 L 67 57 L 75 82 L 50 67 L 25 82 L 33 57 L 12 42 L 38 42 Z" fill="#FFD700" opacity="0.9" />
              <circle cx="50" cy="50" r="14" fill="#800000" stroke="#FFD700" strokeWidth="1.5" />
              <text x="50" y="54" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold" fontFamily="Cinzel, serif">VIT</text>
            </svg>
          </div>
          <div className="brand-text">
            <div className="brand-title">VISHWAKARMA INSTITUTE OF TECHNOLOGY, PUNE</div>
            <div className="brand-subtitle">
              <span>(An Autonomous Institute Affiliated to Savitribai Phule Pune University)</span>
              <span className="badge-naac">NAAC A++ Grade</span>
            </div>
          </div>
        </div>

        <div className="nav-actions">
          {/* Marking Mode Switcher */}
          <div className="mode-pill-toggle" title="Change MSE/ESE Input Format">
            <span className="mode-label">Mode:</span>
            <button
              className={`mode-btn ${mode === 'direct' ? 'active' : ''}`}
              onClick={() => setMode('direct')}
            >
              Direct (30 / 70)
            </button>
            <button
              className={`mode-btn ${mode === 'scaled100' ? 'active' : ''}`}
              onClick={() => setMode('scaled100')}
            >
              Scaled (100 $\rightarrow$ 30/70)
            </button>
          </div>

          <button
            className="action-btn secondary"
            onClick={onOpenGrading}
            title="View VIT 10-Point Grading System"
          >
            <HelpCircle size={17} />
            <span>Grading Rules</span>
          </button>

          <button
            className="action-btn secondary ai-btn"
            onClick={onOpenAIDocs}
            title="View AI Code Generation Prompts (ChatGPT)"
          >
            <Sparkles size={17} />
            <span>AI Prompts & Docs</span>
          </button>

          <button
            className="action-btn primary print-trigger"
            onClick={onPrint}
            title="Print or Save Marksheet as PDF"
          >
            <Printer size={17} />
            <span>Print Marksheet</span>
          </button>
        </div>
      </div>
    </header>
  );
}
