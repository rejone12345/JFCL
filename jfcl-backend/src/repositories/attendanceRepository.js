// =============================================================================
// repositories/attendanceRepository.js — In-memory attendance data access
// =============================================================================
// ⚠ PHASE 1 TEMPORARY: Replace with Mongoose models in Phase 2.
// =============================================================================
import { attendanceRecords as seedAttendance } from '../data/seedData.js';

let records = seedAttendance.map((r) => ({ ...r, records: [...r.records] }));

const uid = () => `ATT${Date.now()}`;

export const getAllAttendance = () => records;

export const getAttendanceByClassAndDate = (classId, section, date) =>
  records.find((r) => r.classId === classId && r.section === section && r.date === date) ?? null;

export const getAttendanceByStudent = (studentId) => {
  const result = [];
  for (const rec of records) {
    const entry = rec.records.find((r) => r.studentId === studentId);
    if (entry) {
      result.push({ date: rec.date, classId: rec.classId, section: rec.section, status: entry.status });
    }
  }
  return result;
};

export const getAttendanceSummaryForStudent = (studentId) => {
  const all = getAttendanceByStudent(studentId);
  const total   = all.length;
  const present = all.filter((r) => r.status === 'present').length;
  const late    = all.filter((r) => r.status === 'late').length;
  const absent  = all.filter((r) => r.status === 'absent').length;
  const pct = total > 0 ? ((present + late) / total * 100).toFixed(1) : '0.0';
  return { totalDays: total, present, late, absent, attendancePercentage: pct, dailyRecords: all };
};

export const saveAttendance = (data) => {
  const { classId, section, date } = data;
  const idx = records.findIndex((r) => r.classId === classId && r.section === section && r.date === date);
  if (idx >= 0) {
    records[idx] = { ...records[idx], ...data };
    return records[idx];
  }
  const newRec = { id: uid(), ...data };
  records.push(newRec);
  return newRec;
};

export const deleteAttendance = (id) => {
  const len = records.length;
  records = records.filter((r) => r.id !== id);
  return records.length < len;
};
