import React from 'react';
import { X, Award } from 'lucide-react';
import { GRADING_SCALE } from '../utils/gradeCalculator';

export default function GradingModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-wrap">
            <Award className="modal-icon" size={22} />
            <div>
              <h3>VIT Academic Regulations & Grading System</h3>
              <p className="modal-sub">10-Point Grading Scale & Examination Evaluation Scheme</p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {/* Examination Weightage */}
          <div className="modal-section-card">
            <h4>1. Examination Weightage Breakdown</h4>
            <div className="weightage-flex">
              <div className="weightage-card mse">
                <span className="weight-title">Mid Semester Examination (MSE)</span>
                <span className="weight-percent">30%</span>
                <span className="weight-note">Continuous Internal Evaluation / Mid-term assessment</span>
              </div>
              <div className="weightage-plus">+</div>
              <div className="weightage-card ese">
                <span className="weight-title">End Semester Examination (ESE)</span>
                <span className="weight-percent">70%</span>
                <span className="weight-note">Comprehensive terminal written & theory exam</span>
              </div>
              <div className="weightage-eq">=</div>
              <div className="weightage-card tot">
                <span className="weight-title">Total Course Mark</span>
                <span className="weight-percent">100%</span>
                <span className="weight-note">Final basis for Letter Grade & Grade Points</span>
              </div>
            </div>
          </div>

          {/* 10-Point Scale Table */}
          <div className="modal-section-card mt-3">
            <h4>2. VIT Pune 10-Point Absolute Grading Scale</h4>
            <div className="grading-table-container">
              <table className="grade-legend-table">
                <thead>
                  <tr>
                    <th>Marks Range (%)</th>
                    <th>Letter Grade</th>
                    <th>Grade Point</th>
                    <th>Performance Description</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {GRADING_SCALE.map((item) => (
                    <tr key={item.grade}>
                      <td>{item.min} - {item.max === 100 ? '100' : (item.min + 9.99).toFixed(0)}</td>
                      <td>
                        <span className={`grade-badge grade-${item.grade}`}>{item.grade}</span>
                      </td>
                      <td className="font-mono font-bold">{item.points}</td>
                      <td>{item.description}</td>
                      <td>
                        <span className={`status-pill ${item.grade === 'F' ? 'fail' : 'pass'}`}>
                          {item.grade === 'F' ? 'Fail / Backlog' : 'Pass'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* SGPA & Class award */}
          <div className="modal-section-card mt-3">
            <h4>3. Formulas & Class Classification</h4>
            <div className="formula-box">
              <div className="formula-item">
                <div className="f-title">Semester Grade Point Average (SGPA):</div>
                <code>SGPA = ∑ (Credits × Grade Point) / ∑ Total Credits</code>
              </div>
              <div className="formula-item">
                <div className="f-title">Passing Criteria:</div>
                <p>Minimum 40% aggregate in the course (MSE 30% + ESE 70% ≥ 40) with minimum 40% in ESE.</p>
              </div>
            </div>

            <div className="classes-grid">
              <div className="class-pill"><strong>≥ 7.75 SGPA:</strong> First Class with Distinction</div>
              <div className="class-pill"><strong>6.75 - 7.74:</strong> First Class</div>
              <div className="class-pill"><strong>6.00 - 6.74:</strong> Higher Second Class</div>
              <div className="class-pill"><strong>5.00 - 5.99:</strong> Second Class</div>
              <div className="class-pill"><strong>4.00 - 4.99:</strong> Pass Class</div>
              <div className="class-pill text-danger"><strong>&lt; 4.00 or 'F':</strong> ATKT / Fail</div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="modal-btn-primary" onClick={onClose}>
            Got it, Close
          </button>
        </div>
      </div>
    </div>
  );
}
