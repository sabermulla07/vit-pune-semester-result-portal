import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import StudentForm from './components/StudentForm';
import Marksheet from './components/Marksheet';
import PerformanceChart from './components/PerformanceChart';
import GradingModal from './components/GradingModal';
import AIPromptModal from './components/AIPromptModal';
import {
  DEFAULT_STUDENT,
  DEFAULT_SUBJECTS,
  calculateSemesterResults
} from './utils/gradeCalculator';
import { FileText, BarChart2, Edit3, Printer } from 'lucide-react';
import './App.css';

export default function App() {
  const [student, setStudent] = useState(DEFAULT_STUDENT);
  const [subjects, setSubjects] = useState(DEFAULT_SUBJECTS);
  const [mode, setMode] = useState('direct'); // 'direct' or 'scaled100'
  const [isGradingOpen, setIsGradingOpen] = useState(false);
  const [isAIDocsOpen, setIsAIDocsOpen] = useState(false);
  const [mobileTab, setMobileTab] = useState('form'); // 'form' | 'marksheet' | 'analytics'

  // Computed results with memoization for lightning-fast performance
  const results = useMemo(() => {
    return calculateSemesterResults(subjects, mode);
  }, [subjects, mode]);

  // Load preset scenarios
  const handleLoadPreset = (presetType) => {
    if (presetType === 'topper') {
      setStudent({
        ...DEFAULT_STUDENT,
        name: 'ISHA RAJESH DESHMUKH',
        prn: '12210089',
        rollNo: 'TY-CS-12'
      });
      if (mode === 'direct') {
        setSubjects([
          { id: 1, code: 'CS3011', name: 'Web Technologies', credits: 4, mseMarks: 29, eseMarks: 67 },
          { id: 2, code: 'CS3012', name: 'Database Management Systems', credits: 4, mseMarks: 28, eseMarks: 68 },
          { id: 3, code: 'CS3013', name: 'Operating Systems', credits: 3, mseMarks: 29.5, eseMarks: 66 },
          { id: 4, code: 'CS3014', name: 'Computer Networks', credits: 3, mseMarks: 30, eseMarks: 69 }
        ]);
      } else {
        setSubjects([
          { id: 1, code: 'CS3011', name: 'Web Technologies', credits: 4, mseMarks: 96, eseMarks: 94 },
          { id: 2, code: 'CS3012', name: 'Database Management Systems', credits: 4, mseMarks: 94, eseMarks: 96 },
          { id: 3, code: 'CS3013', name: 'Operating Systems', credits: 3, mseMarks: 98, eseMarks: 92 },
          { id: 4, code: 'CS3014', name: 'Computer Networks', credits: 3, mseMarks: 100, eseMarks: 98 }
        ]);
      }
    } else if (presetType === 'average') {
      setStudent({
        ...DEFAULT_STUDENT,
        name: 'ROHAN VIKAS JADHAV',
        prn: '12210341',
        rollNo: 'TY-CS-58'
      });
      if (mode === 'direct') {
        setSubjects([
          { id: 1, code: 'CS3011', name: 'Web Technologies', credits: 4, mseMarks: 21, eseMarks: 49 },
          { id: 2, code: 'CS3012', name: 'Database Management Systems', credits: 4, mseMarks: 19, eseMarks: 44 },
          { id: 3, code: 'CS3013', name: 'Operating Systems', credits: 3, mseMarks: 23, eseMarks: 50 },
          { id: 4, code: 'CS3014', name: 'Computer Networks', credits: 3, mseMarks: 18, eseMarks: 46 }
        ]);
      } else {
        setSubjects([
          { id: 1, code: 'CS3011', name: 'Web Technologies', credits: 4, mseMarks: 70, eseMarks: 70 },
          { id: 2, code: 'CS3012', name: 'Database Management Systems', credits: 4, mseMarks: 64, eseMarks: 63 },
          { id: 3, code: 'CS3013', name: 'Operating Systems', credits: 3, mseMarks: 76, eseMarks: 71 },
          { id: 4, code: 'CS3014', name: 'Computer Networks', credits: 3, mseMarks: 60, eseMarks: 66 }
        ]);
      }
    } else if (presetType === 'atkt') {
      setStudent({
        ...DEFAULT_STUDENT,
        name: 'VIKRAM ARUN SHINDE',
        prn: '12210619',
        rollNo: 'TY-CS-77'
      });
      if (mode === 'direct') {
        setSubjects([
          { id: 1, code: 'CS3011', name: 'Web Technologies', credits: 4, mseMarks: 22, eseMarks: 45 },
          { id: 2, code: 'CS3012', name: 'Database Management Systems', credits: 4, mseMarks: 7, eseMarks: 20 }, // Fail
          { id: 3, code: 'CS3013', name: 'Operating Systems', credits: 3, mseMarks: 18, eseMarks: 42 },
          { id: 4, code: 'CS3014', name: 'Computer Networks', credits: 3, mseMarks: 20, eseMarks: 44 }
        ]);
      } else {
        setSubjects([
          { id: 1, code: 'CS3011', name: 'Web Technologies', credits: 4, mseMarks: 73, eseMarks: 64 },
          { id: 2, code: 'CS3012', name: 'Database Management Systems', credits: 4, mseMarks: 23, eseMarks: 28 }, // Fail
          { id: 3, code: 'CS3013', name: 'Operating Systems', credits: 3, mseMarks: 60, eseMarks: 60 },
          { id: 4, code: 'CS3014', name: 'Computer Networks', credits: 3, mseMarks: 66, eseMarks: 63 }
        ]);
      }
    } else {
      // Default
      setStudent(DEFAULT_STUDENT);
      if (mode === 'direct') {
        setSubjects(DEFAULT_SUBJECTS);
      } else {
        setSubjects([
          { id: 1, code: 'CS3011', name: 'Web Technologies', credits: 4, mseMarks: 86, eseMarks: 88 },
          { id: 2, code: 'CS3012', name: 'Database Management Systems', credits: 4, mseMarks: 90, eseMarks: 82 },
          { id: 3, code: 'CS3013', name: 'Operating Systems', credits: 3, mseMarks: 80, eseMarks: 78 },
          { id: 4, code: 'CS3014', name: 'Computer Networks', credits: 3, mseMarks: 93, eseMarks: 92 }
        ]);
      }
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="vit-portal-root">
      {/* Navigation bar */}
      <Navbar
        onPrint={handlePrint}
        onOpenGrading={() => setIsGradingOpen(true)}
        onOpenAIDocs={() => setIsAIDocsOpen(true)}
        mode={mode}
        setMode={setMode}
      />

      {/* Hero Subheader & Instructions */}
      <section className="portal-subbar no-print">
        <div className="subbar-container">
          <div className="portal-tagline">
            <span className="live-indicator"></span>
            <span>VIT Autonomous Examination System — 4 Core Subjects with MSE (30%) & ESE (70%)</span>
          </div>

          <div className="quick-stats-strip">
            <div className="stat-pill">
              <span className="lbl">SGPA:</span>
              <span className={`val font-bold ${results.hasBacklog ? 'text-fail' : 'text-primary'}`}>
                {results.sgpa.toFixed(2)}
              </span>
            </div>
            <div className="stat-pill">
              <span className="lbl">Percentage:</span>
              <span className="val font-bold">{results.percentage.toFixed(1)}%</span>
            </div>
            <div className="stat-pill">
              <span className="lbl">Result:</span>
              <span className={`val font-bold badge-result ${results.hasBacklog ? 'fail' : 'pass'}`}>
                {results.awardClass}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile view navigation switch tabs */}
      <div className="mobile-view-tabs no-print">
        <button
          className={`mob-tab-btn ${mobileTab === 'form' ? 'active' : ''}`}
          onClick={() => setMobileTab('form')}
        >
          <Edit3 size={16} />
          <span>Marks Entry</span>
        </button>
        <button
          className={`mob-tab-btn ${mobileTab === 'marksheet' ? 'active' : ''}`}
          onClick={() => setMobileTab('marksheet')}
        >
          <FileText size={16} />
          <span>Official Marksheet</span>
        </button>
        <button
          className={`mob-tab-btn ${mobileTab === 'analytics' ? 'active' : ''}`}
          onClick={() => setMobileTab('analytics')}
        >
          <BarChart2 size={16} />
          <span>Analytics</span>
        </button>
      </div>

      {/* Main Workspace Layout */}
      <main className="portal-main-container">
        {/* Desktop Dual-Column or Mobile Tab View */}
        <div className="layout-grid">
          
          {/* Left Column: Input Form (Always visible on desktop, tabbed on mobile) */}
          <div className={`col-left ${mobileTab === 'form' ? 'mobile-active' : 'mobile-hidden'}`}>
            <StudentForm
              student={student}
              setStudent={setStudent}
              subjects={subjects}
              setSubjects={setSubjects}
              mode={mode}
              onLoadPreset={handleLoadPreset}
            />

            {/* Performance Analytics below form in left column on desktop */}
            <div className="desktop-analytics-wrap">
              <PerformanceChart results={results} />
            </div>
          </div>

          {/* Right Column: Marksheet (Always visible on desktop, tabbed on mobile) */}
          <div className={`col-right ${mobileTab === 'marksheet' ? 'mobile-active' : 'mobile-hidden'}`}>
            <div className="marksheet-top-toolbar no-print">
              <div className="toolbar-info">
                <FileText size={18} className="text-maroon" />
                <span className="toolbar-title">Official Grade Sheet Preview</span>
                <span className="toolbar-badge">A4 Standard Format</span>
              </div>
              <button className="toolbar-print-btn" onClick={handlePrint}>
                <Printer size={16} />
                <span>Print / Save PDF</span>
              </button>
            </div>

            {/* The Authentic Marksheet */}
            <Marksheet
              student={student}
              results={results}
              mode={mode}
            />
          </div>

          {/* Analytics Column for mobile tab */}
          <div className={`col-analytics-mobile ${mobileTab === 'analytics' ? 'mobile-active' : 'mobile-hidden'}`}>
            <PerformanceChart results={results} />
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="vit-footer no-print">
        <div className="footer-container">
          <div className="footer-left">
            <p className="footer-brand">
              <strong>VIT Pune Semester Result System</strong> — Web Technologies Assignment (Lab 04)
            </p>
            <p className="footer-sub">
              Built with React, Vite & AI Code Generation Tools (ChatGPT) • MSE 30% | ESE 70%
            </p>
          </div>
          <div className="footer-right">
            <button className="footer-link-btn" onClick={() => setIsGradingOpen(true)}>
              Grading Scheme
            </button>
            <span className="footer-dot">•</span>
            <button className="footer-link-btn" onClick={() => setIsAIDocsOpen(true)}>
              AI Prompts & Architecture
            </button>
            <span className="footer-dot">•</span>
            <button className="footer-link-btn" onClick={handlePrint}>
              Print Sheet
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <GradingModal
        isOpen={isGradingOpen}
        onClose={() => setIsGradingOpen(false)}
      />

      <AIPromptModal
        isOpen={isAIDocsOpen}
        onClose={() => setIsAIDocsOpen(false)}
      />
    </div>
  );
}
