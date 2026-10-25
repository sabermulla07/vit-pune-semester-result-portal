/**
 * VIT Pune Grading System & Calculation Engine
 * Weightage: MSE (30%) + ESE (70%)
 */

export const GRADING_SCALE = [
  { min: 90, max: 100, grade: 'O',  points: 10, description: 'Outstanding', color: '#15803d' },
  { min: 80, max: 89.99, grade: 'A+', points: 9,  description: 'Excellent',   color: '#16a34a' },
  { min: 70, max: 79.99, grade: 'A',  points: 8,  description: 'Very Good',   color: '#2563eb' },
  { min: 60, max: 69.99, grade: 'B+', points: 7,  description: 'Good',        color: '#0891b2' },
  { min: 50, max: 59.99, grade: 'B',  points: 6,  description: 'Above Average', color: '#d97706' },
  { min: 45, max: 49.99, grade: 'C',  points: 5,  description: 'Average',     color: '#ea580c' },
  { min: 40, max: 44.99, grade: 'P',  points: 4,  description: 'Pass',        color: '#ca8a04' },
  { min: 0,  max: 39.99, grade: 'F',  points: 0,  description: 'Fail',        color: '#dc2626' }
];

export const DEFAULT_SUBJECTS = [
  {
    id: 1,
    code: 'CS3011',
    name: 'Web Technologies',
    credits: 4,
    mseMarks: 26, // MSE component
    eseMarks: 62  // ESE component
  },
  {
    id: 2,
    code: 'CS3012',
    name: 'Database Management Systems',
    credits: 4,
    mseMarks: 27,
    eseMarks: 58
  },
  {
    id: 3,
    code: 'CS3013',
    name: 'Operating Systems',
    credits: 3,
    mseMarks: 24,
    eseMarks: 55
  },
  {
    id: 4,
    code: 'CS3014',
    name: 'Computer Networks',
    credits: 3,
    mseMarks: 28,
    eseMarks: 65
  }
];

export const DEFAULT_STUDENT = {
  name: 'AARAV SUNIL SHARMA',
  prn: '12210452',
  rollNo: 'TY-CS-42',
  motherName: 'SUNITA',
  branch: 'B.Tech Computer Engineering',
  semester: 'Semester V (Autumn 2026)',
  academicYear: '2025-2026',
  examMonthYear: 'NOV / DEC 2026'
};

/**
 * Calculates subject grade based on total marks out of 100
 */
export function getGradeAndPoints(totalMarks) {
  const rounded = Math.round(totalMarks * 10) / 10;
  for (const item of GRADING_SCALE) {
    if (rounded >= item.min) {
      return {
        grade: item.grade,
        points: item.points,
        description: item.description,
        color: item.color
      };
    }
  }
  return { grade: 'F', points: 0, description: 'Fail', color: '#dc2626' };
}

/**
 * Computes individual subject scores according to selected mode
 * Mode 'direct': MSE entered is out of 30, ESE entered is out of 70.
 * Mode 'scaled100': MSE entered is out of 100 (30%), ESE entered is out of 100 (70%).
 */
export function calculateSubjectMarks(subject, mode = 'direct') {
  const mseRaw = parseFloat(subject.mseMarks) || 0;
  const eseRaw = parseFloat(subject.eseMarks) || 0;

  let mseWeight = 0;
  let eseWeight = 0;
  let maxMSE = mode === 'direct' ? 30 : 100;
  let maxESE = mode === 'direct' ? 70 : 100;

  if (mode === 'direct') {
    mseWeight = Math.min(Math.max(mseRaw, 0), 30);
    eseWeight = Math.min(Math.max(eseRaw, 0), 70);
  } else {
    const validMSE = Math.min(Math.max(mseRaw, 0), 100);
    const validESE = Math.min(Math.max(eseRaw, 0), 100);
    mseWeight = (validMSE * 30) / 100;
    eseWeight = (validESE * 70) / 100;
  }

  const totalMarks = Math.round((mseWeight + eseWeight) * 10) / 10;
  const gradeInfo = getGradeAndPoints(totalMarks);
  
  // VIT passing criteria: Total >= 40 and minimum 40% in ESE
  const esePassingMin = mode === 'direct' ? 28 : 40; // 40% of 70 is 28
  const esePass = eseRaw >= esePassingMin;
  const isPass = totalMarks >= 40 && esePass;
  const finalGrade = isPass ? gradeInfo.grade : 'F';
  const finalPoints = isPass ? gradeInfo.points : 0;
  const creditPoints = (subject.credits || 0) * finalPoints;

  return {
    ...subject,
    mseWeight: parseFloat(mseWeight.toFixed(1)),
    eseWeight: parseFloat(eseWeight.toFixed(1)),
    totalMarks,
    grade: finalGrade,
    gradePoints: finalPoints,
    creditPoints,
    status: isPass ? 'PASS' : 'FAIL',
    esePass,
    maxMSE,
    maxESE
  };
}

/**
 * Calculates overall semester performance (SGPA, Total Marks, Percentage, Class)
 */
export function calculateSemesterResults(subjects, mode = 'direct') {
  const processed = subjects.map(sub => calculateSubjectMarks(sub, mode));
  
  let totalCredits = 0;
  let earnedCredits = 0;
  let totalCreditPoints = 0;
  let totalMarksObtained = 0;
  const maxTotalMarks = subjects.length * 100;
  let hasBacklog = false;

  processed.forEach(sub => {
    const cred = parseFloat(sub.credits) || 0;
    totalCredits += cred;
    totalCreditPoints += sub.creditPoints;
    totalMarksObtained += sub.totalMarks;

    if (sub.status === 'PASS') {
      earnedCredits += cred;
    } else {
      hasBacklog = true;
    }
  });

  const sgpa = totalCredits > 0 ? (totalCreditPoints / totalCredits) : 0;
  const percentage = maxTotalMarks > 0 ? (totalMarksObtained / maxTotalMarks) * 100 : 0;

  // Determine Class / Division Awarded
  let awardClass = 'PASS CLASS';
  if (hasBacklog) {
    awardClass = 'FAIL / ATKT';
  } else if (sgpa >= 7.75 || percentage >= 70) {
    awardClass = 'FIRST CLASS WITH DISTINCTION';
  } else if (sgpa >= 6.75 || percentage >= 60) {
    awardClass = 'FIRST CLASS';
  } else if (sgpa >= 6.00 || percentage >= 55) {
    awardClass = 'HIGHER SECOND CLASS';
  } else if (sgpa >= 5.00 || percentage >= 50) {
    awardClass = 'SECOND CLASS';
  } else {
    awardClass = 'PASS CLASS';
  }

  return {
    subjects: processed,
    totalCredits,
    earnedCredits,
    totalCreditPoints,
    totalMarksObtained: parseFloat(totalMarksObtained.toFixed(1)),
    maxTotalMarks,
    percentage: parseFloat(percentage.toFixed(2)),
    sgpa: parseFloat(sgpa.toFixed(2)),
    awardClass,
    hasBacklog
  };
}
