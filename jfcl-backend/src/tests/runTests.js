// =============================================================================
// tests/runTests.js — Phase 1 Backend Automated Test Suite
// =============================================================================
import assert from 'node:assert/strict';
import http from 'node:http';
import app from '../app.js';
import { initUserRepository } from '../repositories/userRepository.js';

let server;
let baseUrl;

const request = async (method, path, body = null, headers = {}) => {
  return new Promise((resolve, reject) => {
    const url = new URL(path, baseUrl);
    const reqHeaders = { 'Content-Type': 'application/json', ...headers };
    const payload = body ? JSON.stringify(body) : null;

    if (payload) {
      reqHeaders['Content-Length'] = Buffer.byteLength(payload);
    }

    const req = http.request(
      url,
      { method, headers: reqHeaders },
      (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          let parsed;
          try {
            parsed = JSON.parse(data);
          } catch {
            parsed = data;
          }
          resolve({ status: res.statusCode, headers: res.headers, body: parsed });
        });
      }
    );

    req.on('error', reject);
    if (payload) req.write(payload);
    req.end();
  });
};

const runAllTests = async () => {
  console.log('--- Initializing User Repository ---');
  await initUserRepository();

  server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, resolve));
  const port = server.address().port;
  baseUrl = `http://127.0.0.1:${port}`;
  console.log(`Test server running at ${baseUrl}\n`);

  let passed = 0;
  let failed = 0;

  const test = async (name, fn) => {
    try {
      await fn();
      console.log(`✅ PASS: ${name}`);
      passed++;
    } catch (err) {
      console.error(`❌ FAIL: ${name}`);
      console.error(err);
      failed++;
    }
  };

  try {
    // 1. Health Check
    await test('Health check endpoint returns 200 and OK', async () => {
      const res = await request('GET', '/api/v1/health');
      assert.equal(res.status, 200);
      assert.equal(res.body.success, true);
      assert.equal(res.body.data.status, 'ok');
    });

    // 2. Auth Tests
    let adminToken, teacherToken, studentToken;

    await test('Admin login with valid credentials succeeds', async () => {
      const res = await request('POST', '/api/v1/auth/login', {
        identifier: 'admin@jfcl.edu.bd',
        password: 'Admin@1234',
        role: 'admin'
      });
      assert.equal(res.status, 200);
      assert.equal(res.body.success, true);
      assert.ok(res.body.data.token);
      adminToken = res.body.data.token;
    });

    await test('Teacher login with teacher ID and password succeeds', async () => {
      const res = await request('POST', '/api/v1/auth/login', {
        identifier: 'TCH004',
        password: 'Teacher@1234',
        role: 'teacher'
      });
      assert.equal(res.status, 200);
      assert.equal(res.body.success, true);
      assert.ok(res.body.data.token);
      teacherToken = res.body.data.token;
    });

    await test('Student login with roll number and password succeeds', async () => {
      const res = await request('POST', '/api/v1/auth/login', {
        identifier: '101',
        password: 'Student@1234',
        role: 'student'
      });
      assert.equal(res.status, 200);
      assert.equal(res.body.success, true);
      assert.ok(res.body.data.token);
      studentToken = res.body.data.token;
    });

    await test('Login with invalid credentials fails with 401', async () => {
      const res = await request('POST', '/api/v1/auth/login', {
        identifier: 'admin@jfcl.edu.bd',
        password: 'WrongPassword',
        role: 'admin'
      });
      assert.equal(res.status, 401);
      assert.equal(res.body.success, false);
    });

    await test('Login with incorrect role tab fails with 401', async () => {
      const res = await request('POST', '/api/v1/auth/login', {
        identifier: 'admin@jfcl.edu.bd',
        password: 'Admin@1234',
        role: 'teacher'
      });
      assert.equal(res.status, 401);
      assert.equal(res.body.success, false);
    });

    await test('Unactivated student login is rejected with 403', async () => {
      const res = await request('POST', '/api/v1/auth/login', {
        identifier: '105',
        password: 'Student@1234',
        role: 'student'
      });
      assert.equal(res.status, 403);
      assert.match(res.body.message, /not been activated/i);
    });

    await test('Student activation succeeds with valid code', async () => {
      const res = await request('POST', '/api/v1/auth/activate', {
        studentId: 'STU1005',
        activationCode: 'JFCL-DEMO-5555',
        password: 'NewPassword@1234',
        confirmPassword: 'NewPassword@1234'
      });
      assert.equal(res.status, 200);
      assert.equal(res.body.success, true);

      // Verify newly activated student can now log in
      const loginRes = await request('POST', '/api/v1/auth/login', {
        identifier: '105',
        password: 'NewPassword@1234',
        role: 'student'
      });
      assert.equal(loginRes.status, 200);
      assert.equal(loginRes.body.success, true);
    });

    // 3. Authorization & Role Checks
    await test('Protected route without token returns 401', async () => {
      const res = await request('GET', '/api/v1/admin/students');
      assert.equal(res.status, 401);
    });

    await test('Teacher attempting to access admin route gets 403 Forbidden', async () => {
      const res = await request('GET', '/api/v1/admin/students', null, {
        Authorization: `Bearer ${teacherToken}`
      });
      assert.equal(res.status, 403);
    });

    await test('Student attempting to access teacher route gets 403 Forbidden', async () => {
      const res = await request('GET', '/api/v1/teacher/results', null, {
        Authorization: `Bearer ${studentToken}`
      });
      assert.equal(res.status, 403);
    });

    // 4. Admin CRUD Operations
    let createdStudentId;
    await test('Admin can create a new student', async () => {
      const res = await request('POST', '/api/v1/admin/students', {
        name: 'Automated Test Student',
        roll: '999',
        class: 'Class 10',
        section: 'A',
        group: 'Science',
        guardian: 'Test Guardian'
      }, { Authorization: `Bearer ${adminToken}` });

      assert.equal(res.status, 201);
      assert.equal(res.body.success, true);
      assert.ok(res.body.data.id);
      createdStudentId = res.body.data.id;
    });

    await test('Admin can update student details', async () => {
      const res = await request('PUT', `/api/v1/admin/students/${createdStudentId}`, {
        guardian: 'Updated Guardian Name'
      }, { Authorization: `Bearer ${adminToken}` });
      assert.equal(res.status, 200);
      assert.equal(res.body.data.guardian, 'Updated Guardian Name');
    });

    await test('Admin can delete student record', async () => {
      const res = await request('DELETE', `/api/v1/admin/students/${createdStudentId}`, null, {
        Authorization: `Bearer ${adminToken}`
      });
      assert.equal(res.status, 200);
      assert.equal(res.body.success, true);
    });

    // 5. Teacher Marks Entry & Result Workflow
    let submissionId;
    await test('Teacher can initialize marks draft', async () => {
      const res = await request('POST', '/api/v1/teacher/marks/draft', {
        examId: 'EX2026_TEST',
        classId: 'CLS10',
        section: 'A',
        subjectId: 'SUB136'
      }, { Authorization: `Bearer ${teacherToken}` });
      assert.equal(res.status, 200);
      assert.ok(res.body.data.id);
      submissionId = res.body.data.id;
    });

    await test('Marks entry rejects negative marks with validation error (422)', async () => {
      const res = await request('PUT', `/api/v1/teacher/marks/${submissionId}`, {
        marks: [{ studentId: 'STU1001', written: -5, mcq: 20, practical: 15 }]
      }, { Authorization: `Bearer ${teacherToken}` });
      assert.equal(res.status, 422);
      assert.equal(res.body.success, false);
    });

    await test('Marks entry rejects marks exceeding maximum component limit', async () => {
      // Physics written max is 50
      const res = await request('PUT', `/api/v1/teacher/marks/${submissionId}`, {
        marks: [{ studentId: 'STU1001', written: 75, mcq: 20, practical: 15 }]
      }, { Authorization: `Bearer ${teacherToken}` });
      assert.equal(res.status, 422);
      assert.equal(res.body.success, false);
    });

    await test('Teacher successfully saves valid marks with automatic totals & grades', async () => {
      const res = await request('PUT', `/api/v1/teacher/marks/${submissionId}`, {
        marks: [
          { studentId: 'STU1001', written: 48, mcq: 22, practical: 24 }, // Total 94 -> A+
          { studentId: 'STU1002', written: 20, mcq: 10, practical: 10 }  // Total 40 -> C
        ]
      }, { Authorization: `Bearer ${teacherToken}` });
      assert.equal(res.status, 200);
      const student1 = res.body.data.marks.find(m => m.studentId === 'STU1001');
      assert.equal(student1.total, 94);
      assert.equal(student1.grade, 'A+');
      assert.equal(student1.point, 5.0);
    });

    await test('Teacher submits marks for approval (status changes to submitted)', async () => {
      const res = await request('POST', `/api/v1/teacher/marks/${submissionId}/submit`, null, {
        Authorization: `Bearer ${teacherToken}`
      });
      assert.equal(res.status, 200);
      assert.equal(res.body.data.status, 'submitted');
    });

    await test('Teacher cannot edit marks after submission (locked)', async () => {
      const res = await request('PUT', `/api/v1/teacher/marks/${submissionId}`, {
        marks: [{ studentId: 'STU1001', written: 40, mcq: 20, practical: 20 }]
      }, { Authorization: `Bearer ${teacherToken}` });
      assert.equal(res.status, 400);
    });

    await test('Admin approves and publishes the marks submission', async () => {
      // Step A: Approve
      const approveRes = await request('PATCH', `/api/v1/admin/results/${submissionId}/action`, {
        action: 'approve',
        adminNote: 'Verified and approved by exam controller'
      }, { Authorization: `Bearer ${adminToken}` });
      assert.equal(approveRes.status, 200);
      assert.equal(approveRes.body.data.status, 'approved');

      // Step B: Publish
      const pubRes = await request('PATCH', `/api/v1/admin/results/${submissionId}/action`, {
        action: 'publish'
      }, { Authorization: `Bearer ${adminToken}` });
      assert.equal(pubRes.status, 200);
      assert.equal(pubRes.body.data.status, 'published');
    });

    // 6. Student Portal & Privacy Checks
    await test('Student can view own published results', async () => {
      // Annual Examination 2025 is seeded as published
      const res = await request('GET', '/api/v1/student/results?examId=EX2025_ANNUAL', null, {
        Authorization: `Bearer ${studentToken}`
      });
      assert.equal(res.status, 200);
      assert.equal(res.body.success, true);
      assert.equal(res.body.data.studentId, 'STU1001');
      assert.ok(res.body.data.subjects.length > 0);
      assert.equal(res.body.data.status, 'Passed');
    });

    await test('Student receives 404 for examinations with no published results', async () => {
      const res = await request('GET', '/api/v1/student/results?examId=EX2026_MID', null, {
        Authorization: `Bearer ${studentToken}`
      });
      assert.equal(res.status, 404);
    });

    await test('Student can retrieve own attendance records', async () => {
      const res = await request('GET', '/api/v1/student/attendance', null, {
        Authorization: `Bearer ${studentToken}`
      });
      assert.equal(res.status, 200);
      assert.ok(res.body.data.attendancePercentage);
    });

    // 7. Public Endpoints
    await test('Public result search by roll and examId returns published data', async () => {
      const res = await request('GET', '/api/v1/public/results?roll=101&examId=EX2025_ANNUAL');
      assert.equal(res.status, 200);
      assert.equal(res.body.data.roll, '101');
      assert.equal(res.body.data.name, 'Rahim Ahmed');
    });

  } finally {
    server.close();
  }

  console.log(`\n================================`);
  console.log(`🏁 Test Summary: ${passed} passed, ${failed} failed`);
  console.log(`================================`);
  if (failed > 0) process.exit(1);
};

runAllTests();
