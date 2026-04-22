// ===== GETDEADDICTED ACADEMY — COURSE RECOMMENDATION ENGINE =====
// Smart next-course suggestions based on progress, preferences, and category coverage

const Recommendations = (() => {

  function getNext(count = 1) {
    const p = Progress.get();
    const completed = new Set(p.completedCourses);
    const started = new Set(Object.keys(p.courseProgress).map(Number));

    const scored = COURSES.filter(c => !completed.has(c.id)).map(course => {
      let score = 0;

      // Prefer courses the user started but didn't finish
      if (started.has(course.id)) score += 15;

      // Prefer courses in categories they've already enjoyed
      const completedInCat = COURSES.filter(c => c.category === course.category && completed.has(c.id)).length;
      if (completedInCat > 0 && completedInCat < 5) score += 8;

      // Prefer beginner courses for new users
      if (completed.size < 3 && course.level === 'Beginner') score += 6;

      // Prefer free courses for non-paid users
      if (typeof Auth !== 'undefined' && !Auth.isPaid() && Auth.isCourseFree(course.id)) score += 10;

      // Category diversity: prefer categories with fewer completions
      const catCompletions = COURSES.filter(c => c.category === course.category && completed.has(c.id)).length;
      score += Math.max(0, 5 - catCompletions) * 2;

      // Sequential preference: prefer lower IDs in same category
      if (completedInCat > 0) {
        const catCourses = COURSES.filter(c => c.category === course.category).sort((a, b) => a.id - b.id);
        const nextIdx = catCourses.findIndex(c => !completed.has(c.id));
        if (nextIdx >= 0 && catCourses[nextIdx].id === course.id) score += 12;
      }

      return { ...course, _score: score };
    });

    scored.sort((a, b) => b._score - a._score);
    return count === 1 ? scored[0] || null : scored.slice(0, count);
  }

  function getByCategory(categoryId, count = 5) {
    const p = Progress.get();
    const completed = new Set(p.completedCourses);
    return COURSES.filter(c => c.category === categoryId && !completed.has(c.id)).slice(0, count);
  }

  function getContinueLearning() {
    const p = Progress.get();
    const completed = new Set(p.completedCourses);
    return Object.keys(p.courseProgress)
      .map(Number)
      .filter(id => !completed.has(id))
      .map(id => {
        const course = COURSES.find(c => c.id === id);
        if (!course) return null;
        const cp = p.courseProgress[id];
        return { ...course, percentComplete: Math.round((cp.maxSlide / (cp.totalSlides - 1)) * 100) };
      })
      .filter(Boolean)
      .sort((a, b) => b.percentComplete - a.percentComplete);
  }

  function getCategoryProgress() {
    const p = Progress.get();
    return CATEGORIES.map(cat => {
      const catCourses = COURSES.filter(c => c.category === cat.id);
      const completed = catCourses.filter(c => p.completedCourses.includes(c.id)).length;
      return {
        ...cat,
        total: catCourses.length,
        completed,
        percent: Math.round((completed / catCourses.length) * 100)
      };
    });
  }

  function renderRecommendationBar() {
    const container = document.getElementById('recommendationBar');
    if (!container) return;
    if (typeof Auth === 'undefined' || !Auth.isLoggedIn()) { container.style.display = 'none'; return; }

    const continueLearning = getContinueLearning();
    const nextRecs = getNext(3);
    const recs = nextRecs ? (Array.isArray(nextRecs) ? nextRecs : [nextRecs]) : [];

    if (continueLearning.length === 0 && recs.length === 0) {
      container.style.display = 'none';
      return;
    }

    container.style.display = 'block';
    let html = '<div class="rec-bar">';

    if (continueLearning.length > 0) {
      html += '<div class="rec-section"><h4>Continue Learning</h4><div class="rec-cards">';
      continueLearning.slice(0, 3).forEach(course => {
        const cat = CATEGORIES.find(c => c.id === course.category);
        html += `
          <div class="rec-card" onclick="openCourse(${course.id})">
            <span class="rec-card-icon">${cat ? cat.icon : ''}</span>
            <div class="rec-card-info">
              <strong>${course.title}</strong>
              <div class="rec-card-progress">
                <div class="rec-card-bar"><div class="rec-card-fill" style="width:${course.percentComplete}%"></div></div>
                <span>${course.percentComplete}%</span>
              </div>
            </div>
          </div>`;
      });
      html += '</div></div>';
    }

    if (recs.length > 0) {
      html += '<div class="rec-section"><h4>Recommended For You</h4><div class="rec-cards">';
      recs.forEach(course => {
        const cat = CATEGORIES.find(c => c.id === course.category);
        const isFree = Auth.isCourseFree(course.id);
        html += `
          <div class="rec-card" onclick="openCourse(${course.id})">
            <span class="rec-card-icon">${cat ? cat.icon : ''}</span>
            <div class="rec-card-info">
              <strong>${course.title}</strong>
              <span class="rec-card-meta">${course.level} &middot; ${course.duration}${isFree ? ' &middot; Free' : ''}</span>
            </div>
          </div>`;
      });
      html += '</div></div>';
    }

    html += '</div>';
    container.innerHTML = html;
  }

  return { getNext, getByCategory, getContinueLearning, getCategoryProgress, renderRecommendationBar };
})();
