import React from 'react';
import { QrCode } from 'lucide-react';

const CURRENT_DATE = new Date().toLocaleDateString('en-IN', {
  day: '2-digit',
  month: 'short',
  year: 'numeric'
});

export default function Marksheet({ student, results, mode }) {

  return (
    <div className="marksheet-wrapper" id="printable-marksheet">
      <div className="marksheet-paper">
        {/* Subtle decorative security borders */}
        <div className="sheet-border-inner">
          
          {/* Official VIT Header */}
          <div className="sheet-header">
            <div className="header-crest">
              <svg viewBox="0 0 100 100" width="76" height="76">
                <circle cx="50" cy="50" r="48" fill="#800000" stroke="#FFD700" strokeWidth="3" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="#FFD700" strokeWidth="1.5" strokeDasharray="3 2" />
                <polygon points="50,15 63,40 90,40 68,56 76,82 50,66 24,82 32,56 10,40 37,40" fill="#FFD700" />
                <circle cx="50" cy="50" r="15" fill="#800000" stroke="#FFD700" strokeWidth="1.5" />
                <text x="50" y="55" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold" fontFamily="Cinzel, serif">VIT</text>
              </svg>
            </div>

            <div className="header-titles">
              <div className="inst-society">Bansilal Ramnath Agarwal Charitable Trust's</div>
              <h1 className="inst-name">VISHWAKARMA INSTITUTE OF TECHNOLOGY</h1>
              <div className="inst-sub">
                (An Autonomous Institute Affiliated to Savitribai Phule Pune University)
              </div>
              <div className="inst-address">
                666, Upper Indiranagar, Bibwewadi, Pune, Maharashtra - 411037 | Approved by AICTE, New Delhi
              </div>
              <div className="inst-badges">
                <span className="inst-badge">NAAC Accredited 'A++' Grade</span>
                <span className="inst-bullet">•</span>
                <span className="inst-badge">NBA Accredited Programs</span>
                <span className="inst-bullet">•</span>
                <span className="inst-badge">ISO 9001:2015 Certified</span>
              </div>
            </div>
          </div>

          <div className="statement-title-banner">
            <span className="title-rule left"></span>
            <div className="title-text-box">
              <h2>SEMESTER GRADE REPORT</h2>
              <div className="sub-term">{student.semester || 'Semester V'} - Academic Year {student.academicYear || '2025-2026'}</div>
            </div>
            <span className="title-rule right"></span>
          </div>

          {/* Student Bio Grid */}
          <div className="student-info-panel">
            <table className="student-table">
              <tbody>
                <tr>
                  <td className="info-lbl">CANDIDATE NAME</td>
                  <td className="info-val font-bold">{student.name ? student.name.toUpperCase() : 'N/A'}</td>
                  <td className="info-lbl">PRN NO.</td>
                  <td className="info-val font-mono">{student.prn || 'N/A'}</td>
                </tr>
                <tr>
                  <td className="info-lbl">MOTHER'S NAME</td>
                  <td className="info-val">{student.motherName ? student.motherName.toUpperCase() : 'N/A'}</td>
                  <td className="info-lbl">ROLL NO.</td>
                  <td className="info-val font-mono">{student.rollNo || 'N/A'}</td>
                </tr>
                <tr>
                  <td className="info-lbl">PROGRAM / BRANCH</td>
                  <td className="info-val font-bold">{student.branch || 'N/A'}</td>
                  <td className="info-lbl">EXAM SESSION</td>
                  <td className="info-val">{student.examMonthYear || 'NOV / DEC 2026'}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Assessment Scheme Banner */}
          <div className="scheme-strip">
            <span>Evaluation Scheme: Continuous Internal Evaluation [MSE: 30% Weightage] & End Semester Examination [ESE: 70% Weightage]</span>
          </div>

          {/* Subjects Assessment Table */}
          <div className="table-responsive marks-table-container">
            <table className="marks-table">
              <thead>
                <tr>
                  <th rowSpan="2" className="col-sr">Sr.</th>
                  <th rowSpan="2" className="col-code">Course Code</th>
                  <th rowSpan="2" className="col-title">Course Title</th>
                  <th rowSpan="2" className="col-cred">Credits</th>
                  <th colSpan="2" className="col-group">Marks Obtained</th>
                  <th rowSpan="2" className="col-tot">Total (100)</th>
                  <th rowSpan="2" className="col-grd">Letter Grade</th>
                  <th rowSpan="2" className="col-gp">Grade Points (G)</th>
                  <th rowSpan="2" className="col-cp">Credit Points (C × G)</th>
                  <th rowSpan="2" className="col-res">Status</th>
                </tr>
                <tr className="sub-headers">
                  <th className="sub-head">MSE (30%)</th>
                  <th className="sub-head">ESE (70%)</th>
                </tr>
              </thead>
              <tbody>
                {results.subjects.map((sub, idx) => (
                  <tr key={sub.id} className={sub.status === 'FAIL' ? 'row-fail' : ''}>
                    <td className="text-center">{idx + 1}</td>
                    <td className="font-mono text-center font-bold">{sub.code}</td>
                    <td className="course-name">{sub.name}</td>
                    <td className="text-center font-semibold">{sub.credits}</td>
                    <td className="text-center">
                      <span className="weighted-mark">{sub.mseWeight}</span>
                      {mode === 'scaled100' && (
                        <span className="raw-mark"> ({sub.mseMarks}/100)</span>
                      )}
                    </td>
                    <td className="text-center">
                      <span className="weighted-mark">{sub.eseWeight}</span>
                      {mode === 'scaled100' && (
                        <span className="raw-mark"> ({sub.eseMarks}/100)</span>
                      )}
                    </td>
                    <td className="text-center font-bold total-col-val">{sub.totalMarks}</td>
                    <td className="text-center">
                      <span className={`grade-badge grade-${sub.grade}`}>{sub.grade}</span>
                    </td>
                    <td className="text-center font-mono">{sub.gradePoints}</td>
                    <td className="text-center font-mono font-bold">{sub.creditPoints}</td>
                    <td className="text-center">
                      <span className={`status-tag status-${sub.status.toLowerCase()}`}>
                        {sub.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="totals-row">
                  <td colSpan="3" className="text-right font-bold">TOTAL / SUMMARY:</td>
                  <td className="text-center font-bold">{results.totalCredits}</td>
                  <td colSpan="2" className="text-center text-muted">Out of {results.maxTotalMarks}</td>
                  <td className="text-center font-bold total-summary-marks">{results.totalMarksObtained}</td>
                  <td colSpan="2" className="text-right font-semibold">Total Credit Pts:</td>
                  <td className="text-center font-bold font-mono">{results.totalCreditPoints}</td>
                  <td className="text-center">
                    {results.hasBacklog ? (
                      <span className="status-tag status-fail">ATKT</span>
                    ) : (
                      <span className="status-tag status-pass">ALL CLEAR</span>
                    )}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Result Analytics & SGPA Highlights */}
          <div className="result-summary-grid">
            <div className="summary-card sgpa-card">
              <div className="summary-label">SEMESTER GRADE POINT AVERAGE (SGPA)</div>
              <div className="sgpa-value-box">
                <span className="sgpa-number">{results.sgpa.toFixed(2)}</span>
                <span className="sgpa-scale">/ 10.00</span>
              </div>
              <div className="sgpa-desc">Formula: $\sum(C \times G) / \sum C$</div>
            </div>

            <div className="summary-card marks-card">
              <div className="summary-label">OVERALL PERCENTAGE</div>
              <div className="percentage-number">{results.percentage.toFixed(2)}%</div>
              <div className="score-ratio">
                {results.totalMarksObtained} out of {results.maxTotalMarks} Total Marks
              </div>
            </div>

            <div className="summary-card credits-card">
              <div className="summary-label">CREDITS ACQUIRED</div>
              <div className="credits-number">
                {results.earnedCredits} <span className="credits-total">/ {results.totalCredits}</span>
              </div>
              <div className="credits-note">
                {results.earnedCredits === results.totalCredits ? 'All Credits Earned' : 'Credits Pending'}
              </div>
            </div>

            <div className="summary-card status-card">
              <div className="summary-label">FINAL RESULT & DIVISION</div>
              <div className={`result-division ${results.hasBacklog ? 'div-fail' : 'div-pass'}`}>
                {results.awardClass}
              </div>
              <div className="status-subtext">
                {results.hasBacklog
                  ? 'Candidate has backlogs to clear in subsequent examination'
                  : 'Eligible for continuation in next semester'}
              </div>
            </div>
          </div>

          {/* Official Verification & Signatures */}
          <div className="sheet-footer">
            <div className="verification-col">
              <div className="qr-box">
                <div className="qr-sim">
                  <QrCode size={56} className="qr-icon" />
                  <div className="qr-dots-bg"></div>
                </div>
                <div className="qr-text">
                  <div className="verify-label">Digital Verification</div>
                  <div className="verify-id font-mono">VIT-PUN-RES-{student.prn || '2026'}-V5</div>
                  <div className="verify-note">Scan to verify authentic record</div>
                </div>
              </div>
              <div className="issue-date">
                <strong>Date of Declaration:</strong> {CURRENT_DATE}
              </div>
            </div>

            <div className="signatures-row">
              <div className="signature-box">
                <div className="sig-placeholder verified-stamp">
                  <span>VERIFIED</span>
                </div>
                <div className="sig-line"></div>
                <div className="sig-title">Prepared & Checked By</div>
                <div className="sig-dept">Examination Cell</div>
              </div>

              <div className="signature-box">
                <div className="sig-placeholder dean-stamp">
                  <span>DEAN ACAD</span>
                </div>
                <div className="sig-line"></div>
                <div className="sig-title">Dean Academics</div>
                <div className="sig-dept">VIT Pune</div>
              </div>

              <div className="signature-box coe">
                <div className="sig-placeholder coe-stamp">
                  <div className="seal-circle">SEAL</div>
                  <div className="coe-sig">C. K. Patil</div>
                </div>
                <div className="sig-line"></div>
                <div className="sig-title font-bold">Controller of Examinations</div>
                <div className="sig-dept">Vishwakarma Institute of Technology</div>
              </div>
            </div>
          </div>

          <div className="official-disclaimer">
            <p>
              * This is a computer-generated Grade Sheet prepared under autonomous curriculum regulations. 
              The evaluation pattern consists of Mid-Semester Examination (30%) and End-Semester Examination (70%).
              Minimum passing standard is 40% aggregate in each course with mandatory qualifying marks in ESE.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
