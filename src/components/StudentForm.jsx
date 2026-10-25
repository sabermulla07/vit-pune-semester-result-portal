import React from 'react';
import { User, BookOpen, RotateCcw, Info } from 'lucide-react';
import { calculateSubjectMarks } from '../utils/gradeCalculator';

export default function StudentForm({
  student,
  setStudent,
  subjects,
  setSubjects,
  mode,
  onLoadPreset
}) {
  // Update student field
  const handleStudentChange = (e) => {
    const { name, value } = e.target;
    setStudent(prev => ({ ...prev, [name]: value }));
  };

  // Update subject marks or details
  const handleSubjectChange = (id, field, value) => {
    setSubjects(prev =>
      prev.map(sub => {
        if (sub.id === id) {
          return { ...sub, [field]: value };
        }
        return sub;
      })
    );
  };

  return (
    <div className="form-card no-print">
      {/* Student Details Section */}
      <div className="card-section">
        <div className="section-header">
          <div className="header-title-wrap">
            <User className="section-icon" size={20} />
            <h3 className="section-title">Student Credentials</h3>
          </div>
          <div className="presets-group">
            <span className="preset-label">Quick Presets:</span>
            <button
              type="button"
              className="preset-btn topper"
              onClick={() => onLoadPreset('topper')}
              title="Load 9.0+ SGPA Topper Data"
            >
              🌟 Distinction
            </button>
            <button
              type="button"
              className="preset-btn average"
              onClick={() => onLoadPreset('average')}
              title="Load 7.5 SGPA Average Data"
            >
              📘 First Class
            </button>
            <button
              type="button"
              className="preset-btn fail"
              onClick={() => onLoadPreset('atkt')}
              title="Load ATKT/Backlog Data"
            >
              ⚠️ ATKT Case
            </button>
            <button
              type="button"
              className="preset-btn reset"
              onClick={() => onLoadPreset('default')}
              title="Reset to default"
            >
              <RotateCcw size={13} />
            </button>
          </div>
        </div>

        <div className="grid-form-student">
          <div className="input-group">
            <label htmlFor="student-name">Student Full Name</label>
            <input
              id="student-name"
              type="text"
              name="name"
              value={student.name}
              onChange={handleStudentChange}
              placeholder="e.g. AARAV SUNIL SHARMA"
            />
          </div>

          <div className="input-group">
            <label htmlFor="student-prn">PRN / Enrollment No.</label>
            <input
              id="student-prn"
              type="text"
              name="prn"
              value={student.prn}
              onChange={handleStudentChange}
              placeholder="e.g. 12210452"
            />
          </div>

          <div className="input-group">
            <label htmlFor="student-roll">Roll No. / Division</label>
            <input
              id="student-roll"
              type="text"
              name="rollNo"
              value={student.rollNo}
              onChange={handleStudentChange}
              placeholder="e.g. TY-CS-42"
            />
          </div>

          <div className="input-group">
            <label htmlFor="student-mother">Mother's Name</label>
            <input
              id="student-mother"
              type="text"
              name="motherName"
              value={student.motherName}
              onChange={handleStudentChange}
              placeholder="e.g. SUNITA"
            />
          </div>

          <div className="input-group">
            <label htmlFor="student-branch">Branch / Program</label>
            <input
              id="student-branch"
              type="text"
              name="branch"
              value={student.branch}
              onChange={handleStudentChange}
              placeholder="e.g. B.Tech Computer Engineering"
            />
          </div>

          <div className="input-group">
            <label htmlFor="student-sem">Semester & Session</label>
            <input
              id="student-sem"
              type="text"
              name="semester"
              value={student.semester}
              onChange={handleStudentChange}
              placeholder="e.g. Semester V (Autumn 2026)"
            />
          </div>
        </div>
      </div>

      {/* 4 Subjects Assessment Section */}
      <div className="card-section mt-4">
        <div className="section-header">
          <div className="header-title-wrap">
            <BookOpen className="section-icon" size={20} />
            <h3 className="section-title">
              Four Core Subjects (MSE 30% + ESE 70%)
            </h3>
          </div>
          <div className="mode-indicator-chip">
            {mode === 'direct' ? (
              <span>Input: MSE /30, ESE /70</span>
            ) : (
              <span>Input: Both /100 (Auto scaled 30% & 70%)</span>
            )}
          </div>
        </div>

        <div className="mode-callout">
          <Info size={16} />
          <span>
            {mode === 'direct' ? (
              <strong>Direct Weightage Mode:</strong>
            ) : (
              <strong>Scaled Mode:</strong>
            )}
            {' '}
            {mode === 'direct'
              ? 'Enter MSE Marks directly out of 30 (30% weight) and ESE Marks out of 70 (70% weight). Total = MSE + ESE (Max 100).'
              : 'Enter MSE and ESE marks out of 100. System automatically computes MSE (30%) + ESE (70%) = Total (Max 100).'}
          </span>
        </div>

        <div className="subjects-table-wrapper">
          <div className="subjects-grid-cards">
            {subjects.map((sub, index) => {
              const calc = calculateSubjectMarks(sub, mode);
              const maxMSE = mode === 'direct' ? 30 : 100;
              const maxESE = mode === 'direct' ? 70 : 100;

              return (
                <div key={sub.id} className="subject-row-card">
                  <div className="subject-card-top">
                    <div className="sub-num">0{index + 1}</div>
                    <div className="sub-details">
                      <div className="sub-name-row">
                        <input
                          type="text"
                          className="sub-name-input"
                          value={sub.name}
                          onChange={(e) => handleSubjectChange(sub.id, 'name', e.target.value)}
                          placeholder="Subject Name"
                        />
                        <input
                          type="text"
                          className="sub-code-input"
                          value={sub.code}
                          onChange={(e) => handleSubjectChange(sub.id, 'code', e.target.value)}
                          placeholder="Code"
                        />
                      </div>
                      <div className="sub-meta">
                        <label>
                          Credits:
                          <select
                            value={sub.credits}
                            onChange={(e) =>
                              handleSubjectChange(sub.id, 'credits', parseInt(e.target.value) || 0)
                            }
                            className="credit-select"
                          >
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                          </select>
                        </label>
                      </div>
                    </div>

                    {/* Instant result pill */}
                    <div className="sub-quick-badge">
                      <div className={`grade-tag grade-${calc.grade}`}>
                        {calc.grade}
                      </div>
                      <div className="points-text">{calc.gradePoints} Pts</div>
                    </div>
                  </div>

                  {/* Marks Inputs */}
                  <div className="subject-inputs-grid">
                    <div className="mark-field">
                      <div className="mark-label-row">
                        <span className="field-title">MSE (30%)</span>
                        <span className="max-tag">Max {maxMSE}</span>
                      </div>
                      <input
                        type="number"
                        min="0"
                        max={maxMSE}
                        step="0.5"
                        value={sub.mseMarks}
                        onChange={(e) => handleSubjectChange(sub.id, 'mseMarks', e.target.value)}
                        className={`mark-input ${
                          sub.mseMarks > maxMSE || sub.mseMarks < 0 ? 'invalid' : ''
                        }`}
                      />
                      <div className="calc-preview">
                        Contribution: <strong>{calc.mseWeight}</strong> / 30
                      </div>
                    </div>

                    <div className="mark-field">
                      <div className="mark-label-row">
                        <span className="field-title">ESE (70%)</span>
                        <span className="max-tag">Max {maxESE}</span>
                      </div>
                      <input
                        type="number"
                        min="0"
                        max={maxESE}
                        step="0.5"
                        value={sub.eseMarks}
                        onChange={(e) => handleSubjectChange(sub.id, 'eseMarks', e.target.value)}
                        className={`mark-input ${
                          sub.eseMarks > maxESE || sub.eseMarks < 0 ? 'invalid' : ''
                        }`}
                      />
                      <div className="calc-preview">
                        Contribution: <strong>{calc.eseWeight}</strong> / 70
                      </div>
                    </div>

                    <div className="mark-field total-field">
                      <div className="mark-label-row">
                        <span className="field-title">Total (100)</span>
                        <span className={`status-pill ${calc.status.toLowerCase()}`}>
                          {calc.status}
                        </span>
                      </div>
                      <div className="total-display">
                        <span className="total-num">{calc.totalMarks}</span>
                        <span className="total-denom">/ 100</span>
                      </div>
                      <div className="calc-preview">
                        Credit Pts: <strong>{calc.creditPoints}</strong>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
