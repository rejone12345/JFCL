export const calculateGrade = (marks, total = 100) => {
  const percentage = (marks / total) * 100;
  if (percentage >= 80) return { grade: 'A+', point: 5.0, remarks: 'Outstanding' };
  if (percentage >= 70) return { grade: 'A', point: 4.0, remarks: 'Excellent' };
  if (percentage >= 60) return { grade: 'A-', point: 3.5, remarks: 'Very Good' };
  if (percentage >= 50) return { grade: 'B', point: 3.0, remarks: 'Good' };
  if (percentage >= 40) return { grade: 'C', point: 2.0, remarks: 'Satisfactory' };
  if (percentage >= 33) return { grade: 'D', point: 1.0, remarks: 'Pass' };
  return { grade: 'F', point: 0.0, remarks: 'Fail' };
};

export const calculateTotalMarks = (components = {}) => {
  const { written = 0, mcq = 0, practical = 0, ca = 0 } = components;
  return Number(written || 0) + Number(mcq || 0) + Number(practical || 0) + Number(ca || 0);
};

export const calculateGPA = (subjects = []) => {
  if (!subjects.length) return '0.00';
  const hasFail = subjects.some(s => s.grade === 'F');
  if (hasFail) return '0.00';
  const totalPoints = subjects.reduce((acc, s) => acc + (s.point || 0), 0);
  return (totalPoints / subjects.length).toFixed(2);
};

export const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case 'passed':
    case 'active':
    case 'approved':
    case 'present':
    case 'published':
      return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    case 'pending':
    case 'submitted':
    case 'draft':
      return 'bg-amber-100 text-amber-800 border-amber-200';
    case 'failed':
    case 'inactive':
    case 'rejected':
    case 'absent':
      return 'bg-rose-100 text-rose-800 border-rose-200';
    case 'late':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    default:
      return 'bg-slate-100 text-slate-800 border-slate-200';
  }
};
