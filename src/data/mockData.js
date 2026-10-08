// Realistic mock data powering the entire frontend. No backend involved.

export const currentUser = {
  name: "Alex Sharma",
  email: "alex.sharma@gmail.com",
  targetRole: "Software Engineer",
  experienceLevel: "Mid-level (2-4 years)",
  avatarInitials: "AS",
  memberSince: "March 2026",
};

export const readiness = {
  score: 74,
  deltaLabel: "+8% from last month",
};

export const skillScores = [
  { key: "technical", label: "Technical Knowledge", score: 82 },
  { key: "communication", label: "Communication", score: 71 },
  { key: "problemSolving", label: "Problem Solving", score: 76 },
  { key: "behavioral", label: "Behavioral", score: 64 },
];

export const firstInterviewSkills = [
  { key: "technical", label: "Technical", score: 65 },
  { key: "communication", label: "Communication", score: 52 },
  { key: "problemSolving", label: "Problem Solving", score: 61 },
  { key: "behavioral", label: "Behavioral", score: 48 },
];

export const interviews = [
  {
    id: "int-1",
    title: "Python Technical Interview",
    type: "Technical",
    role: "Software Engineer",
    score: 82,
    duration: "22 min",
    date: "2026-08-26",
    questionsAnswered: 8,
  },
  {
    id: "int-2",
    title: "DSA Interview",
    type: "DSA",
    role: "Software Engineer",
    score: 76,
    duration: "28 min",
    date: "2026-08-24",
    questionsAnswered: 10,
  },
  {
    id: "int-3",
    title: "HR Interview",
    type: "Behavioral / HR",
    role: "Software Engineer",
    score: 68,
    duration: "18 min",
    date: "2026-08-21",
    questionsAnswered: 7,
  },
  {
    id: "int-4",
    title: "React Interview",
    type: "Technical",
    role: "Frontend Developer",
    score: 84,
    duration: "25 min",
    date: "2026-08-18",
    questionsAnswered: 9,
  },
  {
    id: "int-5",
    title: "System Design Basics",
    type: "Mixed",
    role: "Software Engineer",
    score: 61,
    duration: "30 min",
    date: "2026-08-12",
    questionsAnswered: 6,
  },
  {
    id: "int-6",
    title: "Behavioral Deep Dive",
    type: "Behavioral / HR",
    role: "Software Engineer",
    score: 58,
    duration: "20 min",
    date: "2026-08-05",
    questionsAnswered: 8,
  },
  {
    id: "int-7",
    title: "Data Structures Warm-up",
    type: "DSA",
    role: "Software Engineer",
    score: 55,
    duration: "24 min",
    date: "2026-07-29",
    questionsAnswered: 8,
  },
];

// Chronological (oldest to newest) for charts
export const scoreHistory = [...interviews]
  .sort((a, b) => new Date(a.date) - new Date(b.date))
  .map((i) => ({ date: i.date, score: i.score, name: i.title }));

export const weaknesses = [
  {
    key: "behavioral",
    title: "Behavioral Answers",
    status: "needs-improvement",
    statusLabel: "Needs improvement",
    detail: "Answers often lack a clear structure and a concrete outcome.",
  },
  {
    key: "communication",
    title: "Concise Communication",
    status: "needs-improvement",
    statusLabel: "Needs improvement",
    detail: "Responses run long and drift before reaching the point.",
  },
  {
    key: "python",
    title: "Python",
    status: "strong",
    statusLabel: "Strong",
    detail: "Consistently accurate on language fundamentals and edge cases.",
  },
];

export const aiInsight =
  "You've improved your technical interview score by 14% over your last 4 interviews. Your biggest remaining opportunity is behavioral communication.";

export const skillMatrix = {
  strong: [
    {
      key: "python",
      label: "Python",
      score: 87,
      trend: "+6% last 30 days",
      explanation:
        "Strong grasp of core syntax, standard library, and common data structures.",
    },
    {
      key: "dsa",
      label: "DSA",
      score: 82,
      trend: "+4% last 30 days",
      explanation:
        "Solid at recognizing patterns and analyzing time complexity under pressure.",
    },
    {
      key: "react",
      label: "React",
      score: 79,
      trend: "+3% last 30 days",
      explanation:
        "Comfortable with component design, hooks, and state management questions.",
    },
  ],
  needsImprovement: [
    {
      key: "behavioral",
      label: "Behavioral Questions",
      score: 64,
      trend: "+2% last 30 days",
      explanation:
        "Answers rarely follow a clear situation-task-action-result structure.",
    },
    {
      key: "system-design",
      label: "System Design",
      score: 58,
      trend: "+1% last 30 days",
      explanation:
        "Struggles to scope requirements before diving into architecture.",
    },
    {
      key: "concise-comm",
      label: "Concise Communication",
      score: 61,
      trend: "+5% last 30 days",
      explanation: "Tends to over-explain instead of leading with the answer.",
    },
  ],
};

export const recommendedPractice = [
  "Practice STAR-format behavioral questions",
  "Practice explaining technical concepts in under 60 seconds",
  "Practice system-design fundamentals",
];

export const interviewTypes = [
  {
    key: "technical",
    label: "Technical",
    description: "Language, frameworks, and core CS concepts.",
  },
  {
    key: "behavioral",
    label: "Behavioral / HR",
    description: "Past experience, teamwork, and communication.",
  },
  {
    key: "dsa",
    label: "DSA",
    description: "Data structures, algorithms, and complexity analysis.",
  },
  {
    key: "mixed",
    label: "Mixed",
    description: "A blend of technical, behavioral, and DSA questions.",
  },
];

export const targetRoles = [
  "Software Engineer",
  "Frontend Developer",
  "Backend Developer",
  "Data Analyst",
  "AI/ML Engineer",
];

export const difficulties = ["Easy", "Medium", "Hard"];
export const durations = ["10 min", "20 min", "30 min"];

export const detectedSkillsFromJD = ["Python", "SQL", "REST APIs", "Git", "Data Structures"];

export const interviewQuestions = [
  "Tell me about a time you disagreed with a teammate. How did you handle it?",
  "Explain the difference between a list and a tuple in Python.",
  "What happens when you type a URL into a browser and press enter?",
  "Describe a project where you had to learn something new under a deadline.",
  "How would you design a rate limiter for a public API?",
  "Walk me through how you'd debug a memory leak in a Node.js service.",
  "What's a technical decision you made that you'd reconsider today?",
  "How do you approach reviewing a teammate's pull request?",
  "Explain how a hash map achieves average O(1) lookups.",
  "Tell me about a time you had to give difficult feedback.",
];

export const interviewResult = {
  overallScore: 78,
  breakdown: [
    { key: "technical", label: "Technical Knowledge", score: 84 },
    { key: "communication", label: "Communication", score: 72 },
    { key: "confidence", label: "Confidence", score: 76 },
    { key: "problemSolving", label: "Problem Solving", score: 81 },
    { key: "relevance", label: "Answer Relevance", score: 79 },
  ],
  wentWell: [
    "Strong understanding of Python fundamentals",
    "Good problem-solving approach",
    "Answers were generally relevant",
  ],
  toImprove: [
    "Answers were sometimes too long",
    "Frequent filler words",
    "Behavioral answers lacked structure",
  ],
  recommendation: "Your biggest improvement opportunity is concise communication.",
  questionResults: [
    {
      id: "q1",
      question: "Explain the difference between a list and a tuple in Python.",
      score: 82,
      strengths: ["Correctly identified mutability as the core difference", "Gave a relevant use case for each"],
      weaknesses: ["Didn't mention performance implications"],
      feedback: "Clear and accurate. Mentioning memory or performance trade-offs would make this a complete answer.",
    },
    {
      id: "q2",
      question: "Tell me about a time you disagreed with a teammate.",
      score: 74,
      strengths: ["Chose a relevant, real example"],
      weaknesses: ["No clear structure", "Outcome was vague"],
      feedback: "Consider using the STAR format so the interviewer can follow the situation, action, and result clearly.",
    },
    {
      id: "q3",
      question: "How would you design a rate limiter for a public API?",
      score: 79,
      strengths: ["Identified token bucket as a valid approach", "Considered distributed systems briefly"],
      weaknesses: ["Answer ran long before reaching the core design"],
      feedback: "Lead with your proposed approach first, then explain the reasoning — it keeps the answer concise.",
    },
  ],
};

export const notifications = [
  {
    id: "n1",
    title: "Weekly progress report is ready",
    time: "2h ago",
    read: false,
  },
  {
    id: "n2",
    title: "New behavioral practice set recommended for you",
    time: "1d ago",
    read: false,
  },
  {
    id: "n3",
    title: "Your resume analysis finished",
    time: "3d ago",
    read: true,
  },
];

export const resumeData = {
  fileName: "Alex_Sharma_Resume.pdf",
  uploadedOn: "Aug 20, 2026",
  skills: ["Python", "JavaScript", "React", "SQL", "Git", "REST APIs", "Data Structures"],
  experience: [
    {
      role: "Software Engineering Intern",
      company: "Northwind Labs",
      period: "May 2025 – Aug 2025",
      summary: "Built internal tooling in React and Python to speed up QA reporting.",
    },
    {
      role: "Teaching Assistant, Data Structures",
      company: "Pune Institute of Technology",
      period: "Jan 2025 – May 2025",
      summary: "Led weekly lab sessions and graded assignments for 60+ students.",
    },
  ],
  projects: [
    {
      name: "TaskFlow",
      summary: "A collaborative task manager built with React, Node.js, and PostgreSQL.",
    },
    {
      name: "PathFinder Visualizer",
      summary: "An interactive visualizer for graph search algorithms.",
    },
  ],
  education: [
    {
      degree: "B.Tech in Computer Science",
      institution: "Pune Institute of Technology",
      period: "2022 – 2026",
    },
  ],
};
