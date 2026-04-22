// ===== GETDEADDICTED ACADEMY — LAZY LOADER =====
// Loads expansion data on-demand per course range
// Reduces initial bundle from 1.2MB to ~500KB

const Loader = (() => {
  const _loaded = new Set();
  const _loading = new Map();

  const RANGES = [
    { file: 'exp-1-5.js', fn: 'getExp_1_5', ids: [1,2,3,4,5] },
    { file: 'exp-6-10.js', fn: 'getExp_6_10', ids: [6,7,8,9,10] },
    { file: 'exp-11-15.js', fn: 'getExp_11_15', ids: [11,12,13,14,15] },
    { file: 'exp-16-20.js', fn: 'getExp_16_20', ids: [16,17,18,19,20] },
    { file: 'exp-21-25.js', fn: 'getExp_21_25', ids: [21,22,23,24,25] },
    { file: 'exp-26-30.js', fn: 'getExp_26_30', ids: [26,27,28,29,30] },
    { file: 'exp-31-35.js', fn: 'getExp_31_35', ids: [31,32,33,34,35] },
    { file: 'exp-36-40.js', fn: 'getExp_36_40', ids: [36,37,38,39,40] },
    { file: 'exp-41-45.js', fn: 'getExp_41_45', ids: [41,42,43,44,45] },
    { file: 'exp-46-50.js', fn: 'getExp_46_50', ids: [46,47,48,49,50] }
  ];

  function _findRange(courseId) {
    return RANGES.find(r => r.ids.includes(courseId));
  }

  function isLoaded(courseId) {
    const range = _findRange(courseId);
    return range ? _loaded.has(range.file) : false;
  }

  function loadForCourse(courseId) {
    const range = _findRange(courseId);
    if (!range) return Promise.resolve();
    if (_loaded.has(range.file)) return Promise.resolve();
    if (_loading.has(range.file)) return _loading.get(range.file);

    const promise = new Promise((resolve, reject) => {
      // Check if already available (bundled mode)
      if (typeof window[range.fn] === 'function') {
        _mergeExpansion(range.fn);
        _loaded.add(range.file);
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = range.file;
      script.onload = () => {
        _mergeExpansion(range.fn);
        _loaded.add(range.file);
        _loading.delete(range.file);
        resolve();
      };
      script.onerror = () => {
        _loading.delete(range.file);
        reject(new Error('Failed to load ' + range.file));
      };
      document.head.appendChild(script);
    });

    _loading.set(range.file, promise);
    return promise;
  }

  function _mergeExpansion(fnName) {
    const fn = typeof window !== 'undefined' ? window[fnName] : null;
    if (!fn || typeof fn !== 'function') return;

    const data = fn();
    Object.entries(data).forEach(([id, expanded]) => {
      const course = COURSES.find(c => c.id === Number(id));
      if (!course) return;
      if (expanded.introduction) course.introduction = expanded.introduction;
      if (expanded.detailedOutcomes) course.detailedOutcomes = expanded.detailedOutcomes;
      if (expanded.modules && Array.isArray(expanded.modules)) course.modules = expanded.modules;
    });
  }

  function preloadAll() {
    return Promise.all(RANGES.map(r => loadForCourse(r.ids[0])));
  }

  function preloadVisible(courseIds) {
    const uniqueRanges = new Set();
    courseIds.forEach(id => {
      const range = _findRange(id);
      if (range && !_loaded.has(range.file)) uniqueRanges.add(range);
    });
    return Promise.all([...uniqueRanges].map(r => loadForCourse(r.ids[0])));
  }

  return { loadForCourse, isLoaded, preloadAll, preloadVisible };
})();
