import React, { useState } from 'react';
import { demoStudents, demoClasses, demoSubjects, demoExams } from '../../data/demoData';
import { calculateGrade, calculateTotalMarks } from '../../utils/gradeCalculator';
import { validateMarksRow } from '../../utils/marksValidator';
import { Button } from '../../components/common/Button';
import { Select } from '../../components/common/Select';
import { Modal } from '../../components/common/Modal';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';
import { useToast } from '../../components/common/Toast';
import { Save, Send, Eye, CheckCircle2, AlertTriangle, FileSpreadsheet } from 'lucide-react';

export const MarksEntry = () => {
  const { addToast } = useToast();

  // Wizard filters
  const [selectedClass, setSelectedClass] = useState('Class 10');
  const [selectedSection, setSelectedSection] = useState('A');
  const [selectedSubject, setSelectedSubject] = useState('SUB136'); // Physics
  const [selectedExam, setSelectedExam] = useState('Annual Examination 2025');

  // Max component limits
  const maxMarks = { written: 50, mcq: 25, practical: 25, ca: 0 };

  // Spreadsheet state initialized from demo students
  const [marksData, setMarksData] = useState(() => {
    return demoStudents.map((s) => ({
      studentId: s.id,
      name: s.name,
      roll: s.roll,
      written: 42,
      mcq: 20,
      practical: 22,
      ca: 0
    }));
  });

  const [rowErrors, setRowErrors] = useState({});
  const [previewOpen, setPreviewOpen] = useState(false);
  const [confirmSubmitOpen, setConfirmSubmitOpen] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  // Handle cell edit
  const handleCellChange = (studentId, field, val) => {
    if (isLocked) return;
    setMarksData((prev) =>
      prev.map((row) => (row.studentId === studentId ? { ...row, [field]: val } : row))
    );

    // Validate updated row
    const targetRow = marksData.find((r) => r.studentId === studentId);
    const updated = { ...targetRow, [field]: val };
    const validation = validateMarksRow(updated, maxMarks);
    setRowErrors((prev) => ({
      ...prev,
      [studentId]: validation.errors
    }));
  };

  const handleSaveDraft = () => {
    addToast('Marks draft saved successfully! You can resume editing anytime.', 'info');
  };

  const handleConfirmSubmit = () => {
    setIsLocked(true);
    addToast('Marks submitted to Administrative Exam Cell for final verification & publication!', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-100 text-blue-900 rounded-lg">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold text-slate-900">Marks Entry & Evaluation Spreadsheet</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Grade components: Written ({maxMarks.written}), MCQ ({maxMarks.mcq}), Practical ({maxMarks.practical})
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Button variant="outline" size="sm" icon={Save} onClick={handleSaveDraft} disabled={isLocked}>
            Save Draft
          </Button>
          <Button variant="secondary" size="sm" icon={Eye} onClick={() => setPreviewOpen(true)}>
            Preview Sheet
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={Send}
            onClick={() => setConfirmSubmitOpen(true)}
            disabled={isLocked}
          >
            {isLocked ? 'Submitted' : 'Submit for Approval'}
          </Button>
        </div>
      </div>

      {/* Filter / Selector Row */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <Select
          label="Class"
          options={['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11 (HSC)', 'Class 12 (HSC)']}
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
        />
        <Select
          label="Section"
          options={['A', 'B', 'Science', 'Business', 'Humanities']}
          value={selectedSection}
          onChange={(e) => setSelectedSection(e.target.value)}
        />
        <Select
          label="Subject"
          options={[
            { value: 'SUB136', label: '136 - Physics' },
            { value: 'SUB137', label: '137 - Chemistry' },
            { value: 'SUB109', label: '109 - Mathematics' },
            { value: 'SUB138', label: '138 - Biology' }
          ]}
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
        />
        <Select
          label="Exam Session"
          options={['Annual Examination 2025', 'SSC Test Examination 2026', 'Half-Yearly Examination 2026']}
          value={selectedExam}
          onChange={(e) => setSelectedExam(e.target.value)}
        />
      </div>

      {/* Spreadsheet Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-900 text-white font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="px-4 py-3 border-r border-slate-800 w-16">Roll</th>
                <th className="px-4 py-3 border-r border-slate-800">Student Name</th>
                <th className="px-4 py-3 border-r border-slate-800 text-center w-28">Written ({maxMarks.written})</th>
                <th className="px-4 py-3 border-r border-slate-800 text-center w-28">MCQ ({maxMarks.mcq})</th>
                <th className="px-4 py-3 border-r border-slate-800 text-center w-28">Practical ({maxMarks.practical})</th>
                <th className="px-4 py-3 border-r border-slate-800 text-center w-24">Total (100)</th>
                <th className="px-4 py-3 border-r border-slate-800 text-center w-20">Grade</th>
                <th className="px-4 py-3 border-r border-slate-800 text-center w-20">GPA Point</th>
                <th className="px-4 py-3 text-center">Remarks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-800">
              {marksData.map((row) => {
                const total = calculateTotalMarks({
                  written: row.written,
                  mcq: row.mcq,
                  practical: row.practical,
                  ca: row.ca
                });
                const { grade, point, remarks } = calculateGrade(total, 100);
                const errors = rowErrors[row.studentId] || {};

                return (
                  <tr key={row.studentId} className="hover:bg-blue-50/40 transition-colors">
                    <td className="px-4 py-2 font-mono font-bold text-slate-900 border-r border-slate-200">
                      {row.roll}
                    </td>
                    <td className="px-4 py-2 font-semibold border-r border-slate-200">
                      {row.name}
                      <span className="block text-[10px] text-slate-400 font-mono">{row.studentId}</span>
                    </td>

                    {/* Written input */}
                    <td className="px-2 py-2 border-r border-slate-200">
                      <input
                        type="number"
                        min="0"
                        max={maxMarks.written}
                        disabled={isLocked}
                        value={row.written}
                        onChange={(e) => handleCellChange(row.studentId, 'written', e.target.value)}
                        className={`w-full text-center py-1.5 px-2 rounded font-semibold border ${
                          errors.written
                            ? 'border-rose-500 bg-rose-50 text-rose-900 focus:ring-rose-500'
                            : 'border-slate-300 focus:border-blue-900 focus:ring-1 focus:ring-blue-900'
                        }`}
                      />
                      {errors.written && <p className="text-[10px] text-rose-600 mt-0.5">{errors.written}</p>}
                    </td>

                    {/* MCQ input */}
                    <td className="px-2 py-2 border-r border-slate-200">
                      <input
                        type="number"
                        min="0"
                        max={maxMarks.mcq}
                        disabled={isLocked}
                        value={row.mcq}
                        onChange={(e) => handleCellChange(row.studentId, 'mcq', e.target.value)}
                        className={`w-full text-center py-1.5 px-2 rounded font-semibold border ${
                          errors.mcq
                            ? 'border-rose-500 bg-rose-50 text-rose-900 focus:ring-rose-500'
                            : 'border-slate-300 focus:border-blue-900 focus:ring-1 focus:ring-blue-900'
                        }`}
                      />
                      {errors.mcq && <p className="text-[10px] text-rose-600 mt-0.5">{errors.mcq}</p>}
                    </td>

                    {/* Practical input */}
                    <td className="px-2 py-2 border-r border-slate-200">
                      <input
                        type="number"
                        min="0"
                        max={maxMarks.practical}
                        disabled={isLocked}
                        value={row.practical}
                        onChange={(e) => handleCellChange(row.studentId, 'practical', e.target.value)}
                        className={`w-full text-center py-1.5 px-2 rounded font-semibold border ${
                          errors.practical
                            ? 'border-rose-500 bg-rose-50 text-rose-900 focus:ring-rose-500'
                            : 'border-slate-300 focus:border-blue-900 focus:ring-1 focus:ring-blue-900'
                        }`}
                      />
                      {errors.practical && <p className="text-[10px] text-rose-600 mt-0.5">{errors.practical}</p>}
                    </td>

                    {/* Auto-calculated Total */}
                    <td className="px-4 py-2 font-bold text-center text-slate-900 bg-slate-50 border-r border-slate-200">
                      {total}
                    </td>

                    {/* Auto-calculated Grade */}
                    <td className="px-4 py-2 font-extrabold text-center border-r border-slate-200">
                      <span className={`px-2 py-0.5 rounded text-xs ${
                        grade === 'A+' ? 'bg-emerald-100 text-emerald-800' :
                        grade === 'F' ? 'bg-rose-100 text-rose-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {grade}
                      </span>
                    </td>

                    {/* Auto-calculated GPA Point */}
                    <td className="px-4 py-2 font-mono font-bold text-center border-r border-slate-200">
                      {point.toFixed(2)}
                    </td>

                    {/* Remarks */}
                    <td className="px-4 py-2 text-center text-[11px] text-slate-500 font-medium">
                      {remarks}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <ConfirmDialog
        isOpen={confirmSubmitOpen}
        onClose={() => setConfirmSubmitOpen(false)}
        onConfirm={handleConfirmSubmit}
        title="Submit Marks to Exam Cell?"
        message="Once submitted, marks cannot be directly edited without administrator permission. The marks will be forwarded for institutional approval."
        confirmText="Confirm & Submit"
      />

      {/* Preview Modal */}
      <Modal isOpen={previewOpen} onClose={() => setPreviewOpen(false)} title="Marksheet Submission Preview" maxWidth="max-w-3xl">
        <div className="space-y-4">
          <div className="bg-slate-50 p-3 rounded-lg border text-xs text-slate-600 flex justify-between">
            <span><strong>Class:</strong> {selectedClass} ({selectedSection})</span>
            <span><strong>Subject:</strong> {selectedSubject}</span>
            <span><strong>Exam:</strong> {selectedExam}</span>
          </div>

          <div className="max-h-80 overflow-y-auto border border-slate-200 rounded-lg">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 font-bold">
                <tr>
                  <th className="p-2">Roll</th>
                  <th className="p-2">Name</th>
                  <th className="p-2 text-center">Written</th>
                  <th className="p-2 text-center">MCQ</th>
                  <th className="p-2 text-center">Practical</th>
                  <th className="p-2 text-center">Total</th>
                  <th className="p-2 text-center">Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {marksData.map((r) => {
                  const t = calculateTotalMarks({ written: r.written, mcq: r.mcq, practical: r.practical });
                  const g = calculateGrade(t, 100);
                  return (
                    <tr key={r.studentId}>
                      <td className="p-2 font-mono">{r.roll}</td>
                      <td className="p-2 font-medium">{r.name}</td>
                      <td className="p-2 text-center">{r.written}</td>
                      <td className="p-2 text-center">{r.mcq}</td>
                      <td className="p-2 text-center">{r.practical}</td>
                      <td className="p-2 text-center font-bold">{t}</td>
                      <td className="p-2 text-center font-bold text-blue-900">{g.grade}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end pt-2">
            <Button variant="outline" size="sm" onClick={() => setPreviewOpen(false)}>
              Close Preview
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
