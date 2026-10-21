// Add or edit quizzes here. "answer" is the index (starting at 0) of the correct option.
const QUIZZES = [
  {
    id: 'gk',
    title: 'General Knowledge',
    description: 'A quick 5-question quiz',
    questions: [
      { q: 'What is the capital of France?', options: ['Berlin', 'Paris', 'Madrid', 'Rome'], answer: 1 },
      { q: 'Which planet is known as the Red Planet?', options: ['Venus', 'Jupiter', 'Mars', 'Saturn'], answer: 2 },
      { q: 'What is 12 x 8?', options: ['96', '88', '108', '86'], answer: 0 },
      { q: 'Which ocean is the largest?', options: ['Atlantic', 'Indian', 'Arctic', 'Pacific'], answer: 3 },
      { q: 'How many continents are there?', options: ['5', '6', '7', '8'], answer: 2 }
    ]
  },
  {
    id: 'web',
    title: 'Web Basics',
    description: 'HTML, CSS and JavaScript fundamentals',
    questions: [
      { q: 'What does HTML stand for?', options: ['HyperText Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language', 'Hyperlinks and Text Markup Language'], answer: 0 },
      { q: 'Which language styles web pages?', options: ['Python', 'CSS', 'SQL', 'PHP'], answer: 1 },
      { q: 'Which keyword declares a constant in JavaScript?', options: ['var', 'let', 'const', 'static'], answer: 2 },
      { q: 'Which tag creates a hyperlink?', options: ['<link>', '<a>', '<href>', '<url>'], answer: 1 }
    ]
  }
];
