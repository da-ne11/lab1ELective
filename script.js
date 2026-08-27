
document.addEventListener('DOMContentLoaded', () => {

  
  const menuToggle = document.getElementById('menu-toggle');
  const mainNav = document.getElementById('main-nav');

  menuToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    menuToggle.classList.toggle('open', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

 
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      menuToggle.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });

  
  const themeToggle = document.getElementById('theme-toggle');
  const root = document.documentElement;

  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  if (prefersLight) root.setAttribute('data-theme', 'light');

  themeToggle.addEventListener('click', () => {
    const isLight = root.getAttribute('data-theme') === 'light';
    root.setAttribute('data-theme', isLight ? 'dark' : 'light');
  });

  
  const questions = [
    {
      question: "What's my primary front-end language of choice?",
      options: ["Python", "JavaScript", "Ruby", "PHP"],
      correct: 1
    },
    {
      question: "Which design tool do I use most for mockups?",
      options: ["Photoshop", "Figma", "Illustrator", "Sketch"],
      correct: 1
    },
    {
      question: "What's my current focus area?",
      options: ["Mobile game dev", "Front-end & UI/UX", "DevOps", "Data science"],
      correct: 1
    },
    {
      question: "Which of these is a CSS layout system?",
      options: ["Grid", "Loop", "Fetch", "Promise"],
      correct: 0
    },
    {
      question: "What am I currently open to?",
      options: ["Retirement", "New opportunities", "A nap", "None of the above"],
      correct: 1
    }
  ];

  let currentQuestion = 0;
  let score = 0;

  const quizQuestionEl = document.getElementById('quiz-question');
  const quizOptionsEl = document.getElementById('quiz-options');
  const quizMetaEl = document.getElementById('quiz-meta');
  const quizProgressBar = document.getElementById('quiz-progress-bar');
  const quizQuestionWrap = document.getElementById('quiz-question-wrap');
  const quizResultEl = document.getElementById('quiz-result');
  const quizScoreEl = document.getElementById('quiz-score');
  const quizTotalEl = document.getElementById('quiz-total');
  const quizResultMsgEl = document.getElementById('quiz-result-msg');
  const quizRestartBtn = document.getElementById('quiz-restart');

  // Only the quiz page has this markup — skip quietly on every other page.
  if (quizQuestionEl) {
  quizTotalEl.textContent = questions.length;

  function loadQuestion() {
    const q = questions[currentQuestion];
    quizQuestionEl.textContent = q.question;
    quizMetaEl.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
    quizProgressBar.style.width = `${((currentQuestion) / questions.length) * 100}%`;

    quizOptionsEl.innerHTML = '';
    q.options.forEach((optionText, index) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'quiz-option';
      btn.textContent = optionText;
      btn.addEventListener('click', () => selectAnswer(index));
      quizOptionsEl.appendChild(btn);
    });
  }

  function selectAnswer(selectedIndex) {
    const q = questions[currentQuestion];
    const optionButtons = quizOptionsEl.querySelectorAll('.quiz-option');

    optionButtons.forEach((btn, index) => {
      btn.disabled = true;
      if (index === q.correct) {
        btn.classList.add('correct');
      } else if (index === selectedIndex) {
        btn.classList.add('incorrect');
      }
    });

    if (selectedIndex === q.correct) score++;

    // Move to next question (or show results) after a short pause
    setTimeout(() => {
      currentQuestion++;
      if (currentQuestion < questions.length) {
        loadQuestion();
      } else {
        showResults();
      }
    }, 700);
  }

  function showResults() {
    quizProgressBar.style.width = '100%';
    quizQuestionWrap.classList.add('hidden');
    quizResultEl.classList.remove('hidden');
    quizScoreEl.textContent = score;

    const pct = score / questions.length;
    let message;
    if (pct === 1) message = "Perfect score — you clearly know your stuff!";
    else if (pct >= 0.6) message = "Nice work — you got most of them right.";
    else message = "Not bad — replace these questions with your own to make it more personal!";
    quizResultMsgEl.textContent = message;
  }

  function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    quizResultEl.classList.add('hidden');
    quizQuestionWrap.classList.remove('hidden');
    loadQuestion();
  }

  quizRestartBtn.addEventListener('click', restartQuiz);

  loadQuestion(); // kick off the quiz on page load
  } // end quiz-page guard

 
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
     
      formStatus.textContent = 'Thanks! This form is a placeholder — connect it to a service to receive messages.';
      contactForm.reset();
    });
  }

  
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
