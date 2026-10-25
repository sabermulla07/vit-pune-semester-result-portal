import React from 'react';
import { BarChart3, TrendingUp, CheckCircle, AlertTriangle } from 'lucide-react';

export default function PerformanceChart({ results }) {
  return (
    <div className="analytics-card no-print">
      <div className="section-header">
        <div className="header-title-wrap">
          <BarChart3 className="section-icon" size={20} />
          <h3 className="section-title">Academic Performance Analytics</h3>
        </div>
        <div className="analytics-pill">
          <TrendingUp size={15} />
          <span>Evaluation Metrics</span>
        </div>
      </div>

      <div className="analytics-grid">
        {/* Subject wise marks visual comparison */}
        <div className="chart-subject-bars">
          <div className="chart-legend">
            <span className="legend-item">
              <span className="legend-color color-mse"></span> MSE (30% Max: 30)
            </span>
            <span className="legend-item">
              <span className="legend-color color-ese"></span> ESE (70% Max: 70)
            </span>
            <span className="legend-item">
              <span className="legend-cutoff"></span> Pass Line (40)
            </span>
          </div>

          <div className="subject-bars-list">
            {results.subjects.map((sub) => {
              const mseWidth = (sub.mseWeight / 30) * 30; // 0 to 30% of total bar
              const eseWidth = (sub.eseWeight / 70) * 70; // 0 to 70% of total bar

              return (
                <div key={sub.id} className="bar-row">
                  <div className="bar-label-area">
                    <span className="bar-sub-name" title={sub.name}>{sub.name}</span>
                    <span className="bar-sub-code">({sub.code})</span>
                  </div>

                  <div className="bar-track-container">
                    <div className="bar-track">
                      {/* MSE segment */}
                      <div
                        className="bar-segment bar-mse"
                        style={{ width: `${mseWidth}%` }}
                        title={`MSE: ${sub.mseWeight}/30`}
                      >
                        {mseWidth > 8 && <span>{sub.mseWeight}</span>}
                      </div>

                      {/* ESE segment */}
                      <div
                        className="bar-segment bar-ese"
                        style={{ width: `${eseWidth}%` }}
                        title={`ESE: ${sub.eseWeight}/70`}
                      >
                        {eseWidth > 12 && <span>{sub.eseWeight}</span>}
                      </div>

                      {/* 40 Marks Passing cutoff marker */}
                      <div className="cutoff-marker" style={{ left: '40%' }} title="Pass Mark: 40"></div>
                    </div>
                  </div>

                  <div className="bar-score-area">
                    <span className="bar-total-val font-bold">{sub.totalMarks}/100</span>
                    <span className={`bar-grade-pill grade-${sub.grade}`}>{sub.grade}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Circular / Radial SGPA Meter */}
        <div className="sgpa-gauge-box">
          <div className="gauge-title">SGPA Gauge</div>
          <div className="gauge-circle-wrap">
            <svg viewBox="0 0 120 120" className="gauge-svg">
              {/* Background track circle */}
              <circle
                cx="60"
                cy="60"
                r="48"
                fill="none"
                stroke="#e2e8f0"
                strokeWidth="10"
              />
              {/* Animated Progress circle */}
              <circle
                cx="60"
                cy="60"
                r="48"
                fill="none"
                stroke={results.sgpa >= 7.75 ? '#16a34a' : results.sgpa >= 6.0 ? '#2563eb' : results.hasBacklog ? '#dc2626' : '#d97706'}
                strokeWidth="10"
                strokeDasharray={`${(results.sgpa / 10) * 301.6} 301.6`}
                strokeDashoffset="0"
                strokeLinecap="round"
                transform="rotate(-90 60 60)"
              />
            </svg>
            <div className="gauge-center-text">
              <span className="gauge-sgpa">{results.sgpa.toFixed(2)}</span>
              <span className="gauge-scale">/ 10</span>
            </div>
          </div>
          <div className="gauge-caption">
            {results.hasBacklog ? (
              <span className="text-fail flex-center">
                <AlertTriangle size={14} /> Attention: ATKT in {results.subjects.filter(s => s.status === 'FAIL').length} subject(s)
              </span>
            ) : (
              <span className="text-pass flex-center">
                <CheckCircle size={14} /> Passed All 4 Subjects
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
