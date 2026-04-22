// ===== GETDEADDICTED ACADEMY — CLASSROOM / TEACHER MODE =====
// Teacher accounts, student rosters, class assignments, progress tracking

const Classroom = (() => {
  const STORAGE_KEY = 'gda_classroom';

  function _getData() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch { return {}; }
  }
  function _saveData(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  function _getTeacherId() {
    const user = Auth.getCurrentUser();
    return user ? user.id : null;
  }

  // --- Teacher Setup ---
  function createClass({ name, grade, schoolName }) {
    const teacherId = _getTeacherId();
    if (!teacherId) return { ok: false, error: 'Must be logged in.' };

    const data = _getData();
    if (!data[teacherId]) data[teacherId] = { classes: [], role: 'teacher' };

    const classId = 'cls_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 4);
    const newClass = {
      id: classId,
      name: name || 'My Class',
      grade: grade || '',
      schoolName: schoolName || '',
      students: [],
      assignments: [],
      joinCode: _generateJoinCode(),
      createdAt: new Date().toISOString()
    };
    data[teacherId].classes.push(newClass);
    _saveData(data);
    return { ok: true, classData: newClass };
  }

  function _generateJoinCode() {
    return 'CLASS-' + Math.random().toString(36).substr(2, 6).toUpperCase();
  }

  function addStudent(classId, { name, studentId }) {
    const teacherId = _getTeacherId();
    if (!teacherId) return { ok: false, error: 'Not logged in.' };

    const data = _getData();
    const teacherData = data[teacherId];
    if (!teacherData) return { ok: false, error: 'No teacher data found.' };

    const cls = teacherData.classes.find(c => c.id === classId);
    if (!cls) return { ok: false, error: 'Class not found.' };
    if (cls.students.length >= 35) return { ok: false, error: 'Maximum 35 students per class.' };

    const student = {
      id: studentId || 's_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 4),
      name,
      addedAt: new Date().toISOString()
    };
    cls.students.push(student);
    _saveData(data);
    return { ok: true, student };
  }

  function removeStudent(classId, studentId) {
    const teacherId = _getTeacherId();
    const data = _getData();
    const cls = data[teacherId]?.classes?.find(c => c.id === classId);
    if (!cls) return;
    cls.students = cls.students.filter(s => s.id !== studentId);
    _saveData(data);
  }

  function assignCourse(classId, courseId, dueDate) {
    const teacherId = _getTeacherId();
    const data = _getData();
    const cls = data[teacherId]?.classes?.find(c => c.id === classId);
    if (!cls) return { ok: false, error: 'Class not found.' };

    if (cls.assignments.find(a => a.courseId === courseId)) {
      return { ok: false, error: 'Course already assigned.' };
    }

    cls.assignments.push({
      courseId,
      assignedAt: new Date().toISOString(),
      dueDate: dueDate || null
    });
    _saveData(data);
    return { ok: true };
  }

  function unassignCourse(classId, courseId) {
    const teacherId = _getTeacherId();
    const data = _getData();
    const cls = data[teacherId]?.classes?.find(c => c.id === classId);
    if (!cls) return;
    cls.assignments = cls.assignments.filter(a => a.courseId !== courseId);
    _saveData(data);
  }

  function getClasses() {
    const teacherId = _getTeacherId();
    const data = _getData();
    return data[teacherId]?.classes || [];
  }

  function getClassById(classId) {
    return getClasses().find(c => c.id === classId) || null;
  }

  function isTeacher() {
    const teacherId = _getTeacherId();
    const data = _getData();
    return !!data[teacherId]?.role;
  }

  function becomeTeacher() {
    const teacherId = _getTeacherId();
    if (!teacherId) return;
    const data = _getData();
    if (!data[teacherId]) data[teacherId] = { classes: [], role: 'teacher' };
    else data[teacherId].role = 'teacher';
    _saveData(data);
  }

  function getStudentProgress(classId) {
    const cls = getClassById(classId);
    if (!cls) return [];

    return cls.students.map(student => {
      const progress = Progress.getForUser(student.id);
      const assignedCourses = cls.assignments.map(a => {
        const course = COURSES.find(c => c.id === a.courseId);
        const pct = progress.completedCourses.includes(a.courseId) ? 100 :
          (progress.courseProgress[a.courseId] ?
            Math.round((progress.courseProgress[a.courseId].maxSlide / (progress.courseProgress[a.courseId].totalSlides - 1)) * 100) : 0);
        return {
          courseId: a.courseId,
          courseName: course ? course.title : 'Unknown',
          percent: pct,
          completed: progress.completedCourses.includes(a.courseId),
          dueDate: a.dueDate
        };
      });

      return {
        student,
        completedTotal: progress.completedCourses.length,
        streak: progress.currentStreak,
        assignedCourses
      };
    });
  }

  // --- Teacher Dashboard UI ---
  function showDashboard() {
    const user = Auth.getCurrentUser();
    if (!user) { showAuthModal('login', 'Log in to access Teacher Dashboard'); return; }
    if (!isTeacher()) becomeTeacher();

    const section = document.getElementById('dashboardSection');
    if (!section) return;

    document.querySelectorAll('.section, .hero, .footer').forEach(el => el.style.display = 'none');
    section.style.display = 'block';
    section.innerHTML = _buildTeacherDashboard(user);
    window.scrollTo(0, 0);
  }

  function _buildTeacherDashboard(user) {
    const classes = getClasses();

    return `
      <div class="dashboard classroom-dashboard">
        <div class="dash-header">
          <div class="dash-header-left">
            <h2>Teacher Dashboard</h2>
            <p class="dash-welcome">Welcome, ${_esc(user.name)}</p>
            <span class="dash-plan-badge premium">Classroom</span>
          </div>
          <div class="dash-header-right">
            <button class="btn btn-secondary btn-sm" onclick="Dashboard.hide()">Back to Courses</button>
            <button class="btn btn-primary btn-sm" onclick="Classroom.showCreateClass()">+ New Class</button>
          </div>
        </div>

        ${classes.length === 0 ? `
          <div class="classroom-empty">
            <div class="onboard-emoji">&#128218;</div>
            <h3>Create Your First Class</h3>
            <p>Set up a classroom, add students, and assign digital wellness courses.</p>
            <button class="btn btn-primary" onclick="Classroom.showCreateClass()">Create Class</button>
          </div>
        ` : `
          <div class="classroom-classes">
            ${classes.map(cls => _buildClassCard(cls)).join('')}
          </div>
        `}
      </div>
    `;
  }

  function _buildClassCard(cls) {
    const studentProgress = getStudentProgress(cls.id);
    const avgCompletion = studentProgress.length > 0 ?
      Math.round(studentProgress.reduce((sum, sp) => {
        const avg = sp.assignedCourses.length > 0 ?
          sp.assignedCourses.reduce((s, ac) => s + ac.percent, 0) / sp.assignedCourses.length : 0;
        return sum + avg;
      }, 0) / studentProgress.length) : 0;

    return `
      <div class="classroom-card">
        <div class="classroom-card-header">
          <div>
            <h3>${_esc(cls.name)}</h3>
            <span class="classroom-meta">${cls.grade ? cls.grade + ' &middot; ' : ''}${cls.students.length} students &middot; ${cls.assignments.length} courses assigned</span>
          </div>
          <div class="classroom-join-code">
            Join Code: <strong>${cls.joinCode}</strong>
            <button class="btn btn-xs btn-secondary" onclick="navigator.clipboard.writeText('${cls.joinCode}');showToast('Code copied!')">Copy</button>
          </div>
        </div>

        <!-- Class Stats -->
        <div class="classroom-stats">
          <div class="dash-stat-card">
            <div class="dash-stat-num">${cls.students.length}</div>
            <div class="dash-stat-label">Students</div>
          </div>
          <div class="dash-stat-card">
            <div class="dash-stat-num">${cls.assignments.length}</div>
            <div class="dash-stat-label">Courses</div>
          </div>
          <div class="dash-stat-card">
            <div class="dash-stat-num">${avgCompletion}%</div>
            <div class="dash-stat-label">Avg Progress</div>
          </div>
        </div>

        <!-- Assigned Courses -->
        <div class="classroom-section">
          <div class="classroom-section-header">
            <h4>Assigned Courses</h4>
            <button class="btn btn-xs btn-secondary" onclick="Classroom.showAssignCourse('${cls.id}')">+ Assign</button>
          </div>
          ${cls.assignments.length === 0 ? '<p class="dash-empty">No courses assigned yet.</p>' :
            cls.assignments.map(a => {
              const course = COURSES.find(c => c.id === a.courseId);
              if (!course) return '';
              const cat = CATEGORIES.find(c => c.id === course.category);
              return `
                <div class="classroom-assignment">
                  <span class="classroom-assignment-icon">${cat ? cat.icon : ''}</span>
                  <span class="classroom-assignment-title">${course.title}</span>
                  ${a.dueDate ? `<span class="classroom-due">Due: ${a.dueDate}</span>` : ''}
                  <button class="btn btn-xs btn-secondary" onclick="Classroom.unassignCourse('${cls.id}',${a.courseId});Classroom.showDashboard();">Remove</button>
                </div>
              `;
            }).join('')
          }
        </div>

        <!-- Student Roster -->
        <div class="classroom-section">
          <div class="classroom-section-header">
            <h4>Students</h4>
            <button class="btn btn-xs btn-secondary" onclick="Classroom.showAddStudent('${cls.id}')">+ Add Student</button>
          </div>
          ${studentProgress.length === 0 ? '<p class="dash-empty">No students yet. Share the join code!</p>' :
            `<div class="classroom-roster">
              <div class="classroom-roster-header">
                <span>Name</span>
                <span>Completed</span>
                <span>Streak</span>
                <span>Progress</span>
              </div>
              ${studentProgress.map(sp => `
                <div class="classroom-roster-row">
                  <span class="classroom-student-name">${_esc(sp.student.name)}</span>
                  <span>${sp.completedTotal} courses</span>
                  <span>${sp.streak}d</span>
                  <span>
                    ${sp.assignedCourses.map(ac =>
                      `<span class="classroom-course-dot ${ac.completed ? 'done' : ac.percent > 0 ? 'started' : ''}" title="${ac.courseName}: ${ac.percent}%"></span>`
                    ).join('')}
                  </span>
                </div>
              `).join('')}
            </div>`
          }
        </div>
      </div>
    `;
  }

  // --- Modals ---
  function showCreateClass() {
    const modal = document.getElementById('classroomModal');
    if (!modal) return;
    modal.innerHTML = `
      <div class="classroom-modal-content">
        <button class="cert-close" onclick="Classroom.hideModal()">&times;</button>
        <h3>Create a New Class</h3>
        <form onsubmit="Classroom.handleCreateClass(event)">
          <input type="text" id="className" placeholder="Class name (e.g. 4th Grade - Period 2)" required maxlength="60">
          <input type="text" id="classGrade" placeholder="Grade level (optional)" maxlength="20">
          <input type="text" id="classSchool" placeholder="School name (optional)" maxlength="60">
          <button type="submit" class="btn btn-primary btn-full">Create Class</button>
        </form>
      </div>
    `;
    modal.classList.add('active');
  }

  function showAddStudent(classId) {
    const modal = document.getElementById('classroomModal');
    if (!modal) return;
    modal.innerHTML = `
      <div class="classroom-modal-content">
        <button class="cert-close" onclick="Classroom.hideModal()">&times;</button>
        <h3>Add Student</h3>
        <form onsubmit="Classroom.handleAddStudent(event, '${classId}')">
          <input type="text" id="studentName" placeholder="Student name" required maxlength="40">
          <button type="submit" class="btn btn-primary btn-full">Add Student</button>
        </form>
        <p class="auth-sub-note" style="margin-top:0.8rem;">Or share the join code with students to self-enroll.</p>
      </div>
    `;
    modal.classList.add('active');
  }

  function showAssignCourse(classId) {
    const cls = getClassById(classId);
    if (!cls) return;
    const assignedIds = cls.assignments.map(a => a.courseId);
    const available = COURSES.filter(c => !assignedIds.includes(c.id));

    const modal = document.getElementById('classroomModal');
    if (!modal) return;
    modal.innerHTML = `
      <div class="classroom-modal-content classroom-assign-modal">
        <button class="cert-close" onclick="Classroom.hideModal()">&times;</button>
        <h3>Assign a Course</h3>
        <div class="classroom-course-list">
          ${available.map(course => {
            const cat = CATEGORIES.find(c => c.id === course.category);
            return `
              <div class="classroom-course-option" onclick="Classroom.assignCourse('${classId}',${course.id});Classroom.hideModal();Classroom.showDashboard();">
                <span>${cat ? cat.icon : ''}</span>
                <div>
                  <strong>${course.title}</strong>
                  <span class="classroom-course-meta">${course.level} &middot; ${course.duration}</span>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
    modal.classList.add('active');
  }

  function hideModal() {
    const modal = document.getElementById('classroomModal');
    if (modal) modal.classList.remove('active');
  }

  function handleCreateClass(e) {
    e.preventDefault();
    const name = document.getElementById('className').value.trim();
    const grade = document.getElementById('classGrade').value.trim();
    const schoolName = document.getElementById('classSchool').value.trim();
    const result = createClass({ name, grade, schoolName });
    if (result.ok) {
      hideModal();
      showDashboard();
      showToast(`Class "${name}" created! Share the join code with your students.`);
    }
  }

  function handleAddStudent(e, classId) {
    e.preventDefault();
    const name = document.getElementById('studentName').value.trim();
    const result = addStudent(classId, { name });
    if (result.ok) {
      hideModal();
      showDashboard();
      showToast(`${name} added to the class!`);
    } else {
      showToast(result.error);
    }
  }

  function _esc(str) {
    const el = document.createElement('span');
    el.textContent = str;
    return el.innerHTML;
  }

  return {
    createClass, addStudent, removeStudent,
    assignCourse, unassignCourse,
    getClasses, getClassById, isTeacher, becomeTeacher,
    getStudentProgress, showDashboard,
    showCreateClass, showAddStudent, showAssignCourse,
    hideModal, handleCreateClass, handleAddStudent
  };
})();
