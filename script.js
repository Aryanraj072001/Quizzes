const app = document.getElementById('app');
const STORE = 'quiz-scores-v1';
const NAME_KEY = 'quiz-player-name';

// ---------- helpers ----------
function el(tag, props = {}, ...children) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(props)) {
    if (k === 'class') node.className = v;
    else if (k.startsWith('on')) node.addEventListener(k.slice(2), v);
    else node[k] = v;
  }
  children.flat().forEach(c => node.append(c instanceof Node ? c : document.createTextNode(c)));
  return node;
}
function render(...nodes) { app.replaceChildren(...nodes); }
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function loadScores() {
  try { return JSON.parse(localStorage.getItem(STORE)) || {}; } catch { return {}; }
}
function saveScore(quizId, entry) {
  const all = loadScores();
  const list = (all[quizId] || []).concat(entry)
    .sort((a, b) => b.score - a.score || a.date - b.date).slice(0, 10);
  all[quizId] = list;
  try { localStorage.setItem(STORE, JSON.stringify(all)); } catch {}
  return list;
}
function getName() { try { return localStorage.getItem(NAME_KEY) || ''; } catch { return ''; } }
function setName(n) { try { localStorage.setItem(NAME_KEY, n); } catch {} }

// ---------- home ----------
function showHome() {
  const scores = loadScores();
  const nameInput = el('input', { type: 'text', placeholder: 'Your name', maxLength: 50, value: getName() });
  const cards = QUIZZES.map(quiz => {
    const best = (scores[quiz.id] || [])[0];
    return el('div', { class: 'card' },
      el('h3', {}, quiz.title),
      el('p', { class: 'muted' }, `${quiz.description} · ${quiz.questions.length} questions` +
        (best ? ` · Best: ${best.score}/${best.total} (${best.name})` : '')),
      el('button', { onclick: () => {
        const name = nameInput.value.trim();
        if (!name) { nameInput.focus(); return alert('Please enter your name first'); }
        setName(name);
        startQuiz(quiz, name);
      } }, 'Start'));
  });
  render(nameInput, ...cards);
}

// ---------- quiz ----------
function startQuiz(quiz, name) {
  // Shuffle questions and options; remember which option is correct
  const questions = shuffle(quiz.questions).map(q => ({
    text: q.q,
    options: shuffle(q.options.map((text, i) => ({ text, correct: i === q.answer })))
  }));
  const state = { index: 0, score: 0, answers: [] };
  showQuestion(quiz, name, questions, state);
}

function showQuestion(quiz, name, questions, state) {
  const q = questions[state.index];
  const total = questions.length;
  let answered = false;

  const nextBtn = el('button', { disabled: true, onclick: () => {
    state.index++;
    if (state.index < total) showQuestion(quiz, name, questions, state);
    else showResult(quiz, name, questions, state);
  } }, state.index === total - 1 ? 'Finish' : 'Next');

  const optionButtons = q.options.map((opt, i) => {
    const btn = el('button', { class: 'option', onclick: () => {
      if (answered) return;
      answered = true;
      if (opt.correct) state.score++;
      state.answers.push(i);
      optionButtons.forEach((b, j) => {
        b.disabled = true;
        if (q.options[j].correct) b.classList.add('correct');
        else if (j === i) b.classList.add('wrong');
      });
      nextBtn.disabled = false;
    } }, opt.text);
    return btn;
  });

  render(
    el('p', { class: 'muted' }, `${quiz.title} · Question ${state.index + 1} of ${total}`),
    el('div', { class: 'bar' }, el('div', { style: `width:${(state.index / total) * 100}%` })),
    el('div', { class: 'card' }, el('h3', {}, q.text), ...optionButtons),
    nextBtn
  );
}

// ---------- result ----------
function showResult(quiz, name, questions, state) {
  const total = questions.length;
  const pct = Math.round((state.score / total) * 100);
  const board = saveScore(quiz.id, { name, score: state.score, total, date: Date.now() });

  const review = questions.map((q, i) => {
    const chosen = state.answers[i];
    const ok = q.options[chosen].correct;
    const right = q.options.find(o => o.correct).text;
    return el('div', { class: 'card' },
      el('b', {}, `${i + 1}. ${q.text} `),
      el('span', { class: ok ? 'ok' : 'bad' }, ok ? '✔ Correct' : '✘ Wrong'),
      ok ? '' : el('p', { class: 'muted' }, `Your answer: ${q.options[chosen].text} · Correct: ${right}`));
  });

  const table = el('table', {},
    el('tr', {}, el('th', {}, '#'), el('th', {}, 'Name'), el('th', {}, 'Score')),
    ...board.map((b, i) => el('tr', {}, el('td', {}, String(i + 1)), el('td', {}, b.name), el('td', {}, `${b.score}/${b.total}`))));

  render(
    el('div', { class: 'card' }, el('h2', {}, `${name}, you scored ${state.score} / ${total} (${pct}%)`)),
    ...review,
    el('h3', {}, 'Top scores (this browser)'),
    table,
    el('p', { class: 'row' },
      el('button', { onclick: () => startQuiz(quiz, name) }, 'Try again'),
      el('button', { class: 'ghost', onclick: showHome }, 'All quizzes'))
  );
}

showHome();
