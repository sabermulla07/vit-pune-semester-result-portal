import React, { useState } from 'react';
import { X, Sparkles, Copy, Check, Cpu, CheckCircle2 } from 'lucide-react';

export default function AIPromptModal({ isOpen, onClose }) {
  const [copiedIndex, setCopiedIndex] = useState(null);

  if (!isOpen) return null;

  const prompts = [
    {
      title: 'Prompt 1: Architectural Design & State Schema',
      role: 'System Architect',
      prompt: `Act as a senior React developer and academic software architect. 
I need to build a responsive website using React (Vite) to generate and display the one-semester result for VIT (Vishwakarma Institute of Technology) students.
Requirements:
1. Provide four subjects: Web Technologies, Database Management Systems, Operating Systems, and Computer Networks.
2. Weightage distribution: MSE Marks (30%) and ESE Marks (70%). Total = 100%.
3. Support both Direct (MSE /30, ESE /70) and Scaled from 100 modes.
4. Implement standard VIT 10-point scale: O (10), A+ (9), A (8), B+ (7), B (6), C (5), P (4), F (0).
5. Calculate Credits, SGPA = sum(Credits * Grade Points) / sum(Credits), Percentage, and Result Class.
Generate clean React component state and calculation utility functions with full input validation.`
    },
    {
      title: 'Prompt 2: Official Marksheet Layout & Print CSS',
      role: 'UI/UX & Print CSS Specialist',
      prompt: `Create a clean, prestigious, responsive Grade Sheet / Marksheet component for VIT Pune in React.
Design specifications:
- Official university header with VIT crest, autonomous affiliation to SPPU, NAAC A++ badge.
- Student profile table with PRN, Roll No, Mother Name, Branch, Semester.
- Detailed semester marksheet table with Sr. No, Course Code, Course Title, Credits, MSE (30%), ESE (70%), Total (100), Letter Grade, Grade Points, Credit Points, Status.
- Summary grid with SGPA gauge, Percentage, Earned Credits, and Result Division.
- Barcode/QR verification block and official signature stamps (Dean Academics, COE).
- Add CSS @media print styling so when the user clicks 'Print Marksheet', only the crisp A4 certificate is printed, hiding inputs and headers.`
    },
    {
      title: 'Prompt 3: Interactive Responsive Dashboard & Analytics',
      role: 'Frontend Engineer',
      prompt: `Design the interactive inputs and analytics section:
1. Quick Presets buttons: 'Topper (9.5 SGPA)', 'First Class (7.8 SGPA)', 'ATKT Case (Fail in 1 course)', and 'Reset'.
2. Visual comparison bar chart showing MSE vs ESE contributions per subject with 40% passing threshold indicator.
3. Live calculation preview on every keystroke with color-coded grade badges.
4. Fully responsive layout that looks great on mobile, tablet, and widescreen desktop.`
    }
  ];

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog ai-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-wrap">
            <Sparkles className="modal-icon text-ai" size={22} />
            <div>
              <h3>AI Prompt Engineering & Development Documentation</h3>
              <p className="modal-sub">
                As required: Developed with AI Code Generation Prompts (ChatGPT / Claude / Gemini)
              </p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <div className="ai-intro-card">
            <div className="ai-intro-flex">
              <Cpu className="ai-chip-icon" size={28} />
              <div>
                <h4>Lab 04 Assignment Requirement</h4>
                <p>
                  "Design and develop a responsive website to prepare one semester result of VIT students using REACT with the help of any code generation AI tool like ChatGPT, Take any four subjects with MSE Marks (30%) ESE Marks (70%)."
                </p>
              </div>
            </div>
          </div>

          <div className="prompts-list">
            {prompts.map((item, index) => (
              <div key={index} className="prompt-item-card">
                <div className="prompt-card-header">
                  <div className="prompt-meta">
                    <span className="prompt-badge">Step {index + 1}</span>
                    <span className="prompt-role">{item.role}</span>
                    <span className="prompt-heading">{item.title}</span>
                  </div>
                  <button
                    className="copy-prompt-btn"
                    onClick={() => handleCopy(item.prompt, index)}
                    title="Copy Prompt text"
                  >
                    {copiedIndex === index ? (
                      <>
                        <Check size={14} className="text-green" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        <span>Copy Prompt</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="prompt-code-wrap">
                  <pre>
                    <code>{item.prompt}</code>
                  </pre>
                </div>
              </div>
            ))}
          </div>

          {/* Validation Checklist */}
          <div className="ai-verified-checklist">
            <h4>
              <CheckCircle2 size={18} className="text-green" /> AI Solution Verification Matrix
            </h4>
            <div className="verify-grid">
              <div className="verify-item">
                <span className="v-chk">✓</span> React Functional Components & Hooks (useState, useMemo)
              </div>
              <div className="verify-item">
                <span className="v-chk">✓</span> 4 Subjects Configured (WT, DBMS, OS, CN)
              </div>
              <div className="verify-item">
                <span className="v-chk">✓</span> MSE 30% + ESE 70% Weightage Formula
              </div>
              <div className="verify-item">
                <span className="v-chk">✓</span> VIT Pune 10-Point Grade & SGPA Engine
              </div>
              <div className="verify-item">
                <span className="v-chk">✓</span> Responsive Mobile, Tablet & Desktop Grid
              </div>
              <div className="verify-item">
                <span className="v-chk">✓</span> Print to PDF / Official Marksheet Layout
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="modal-btn-primary" onClick={onClose}>
            Close Documentation
          </button>
        </div>
      </div>
    </div>
  );
}
