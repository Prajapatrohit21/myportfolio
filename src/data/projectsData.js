/* ==========================================================================
   PORTFOLIO CONFIGURATION DATA — Rohit Prajapat
   ========================================================================== */

export const skillsData = [
  // Frontend
  { name: "HTML5", percentage: 90, icon: "fa-brands fa-html5", category: "frontend" },
  { name: "CSS3", percentage: 88, icon: "fa-brands fa-css3-alt", category: "frontend" },
  { name: "JavaScript (ES6+)", percentage: 82, icon: "fa-brands fa-square-js", category: "frontend" },
  { name: "Bootstrap", percentage: 85, icon: "fa-brands fa-bootstrap", category: "frontend" },

  // Backend
  { name: "PHP", percentage: 80, icon: "fa-brands fa-php", category: "backend" },
  { name: "SQL / MySQL", percentage: 78, icon: "fa-solid fa-database", category: "backend" },
  { name: "Python (Basic)", percentage: 60, icon: "fa-brands fa-python", category: "backend" },
  { name: "C++ (OOPs)", percentage: 65, icon: "fa-solid fa-code", category: "backend" },

  // Tools & DevOps
  { name: "Git & GitHub", percentage: 75, icon: "fa-brands fa-git-alt", category: "tools" },
  { name: "Google Ads", percentage: 70, icon: "fa-brands fa-google", category: "tools" },
  { name: "Responsive Design", percentage: 88, icon: "fa-solid fa-mobile-screen-button", category: "tools" },
  { name: "Web Performance", percentage: 72, icon: "fa-solid fa-gauge-high", category: "tools" }
];

export const projectsData = [
  {
    id: "responsive-website",
    title: "Responsive Business Website",
    category: "fullstack",
    tags: ["HTML", "CSS", "Bootstrap", "PHP", "SQL"],
    shortDesc: "A fully responsive multi-page business website with dynamic content management, contact forms and SQL-powered backend.",
    imageClass: "bg-omni",
    features: [
      "Fully responsive layout built with Bootstrap grid and CSS3.",
      "PHP backend handling contact form submissions and user queries.",
      "MySQL database for storing user messages and dynamic content.",
      "Cross-browser compatible with smooth CSS animations."
    ],
    demoLink: "#",
    codeLink: "https://github.com",
    architecture: `[Browser Client]
       │ (HTML/CSS/Bootstrap SPA)
       ▼
[PHP Application Layer]
       │ (Form Handling & Routing)
       ▼
[MySQL Database]
(Messages, Users, Content)`
  },
  {
    id: "google-ads-dashboard",
    title: "Google Ads Campaign Tracker",
    category: "frontend",
    tags: ["HTML", "CSS", "JavaScript", "Google Ads"],
    shortDesc: "A website marketing dashboard to track Google Ads campaigns and optimize website user engagement and traffic.",
    imageClass: "bg-cowork",
    features: [
      "Visual campaign performance overview with clean UI.",
      "Integrated Google Ads strategy for enhanced user reach.",
      "JavaScript-driven dynamic data display and charts.",
      "Optimized landing pages to maximize ad conversion rates."
    ],
    demoLink: "#",
    codeLink: "https://github.com",
    architecture: `[Google Ads Platform]
       │ (Traffic Generation)
       ▼
[Landing Page (HTML/CSS/JS)]
       │ (Campaign Tracking)
       ▼
[Analytics & Reporting]
(User Engagement Data)`
  },
  {
    id: "php-crud-app",
    title: "PHP CRUD Web Application",
    category: "fullstack",
    tags: ["PHP", "MySQL", "HTML", "CSS", "Bootstrap"],
    shortDesc: "A full-featured Create, Read, Update, Delete web application with user authentication and database management.",
    imageClass: "bg-glass",
    features: [
      "Secure user authentication with PHP sessions.",
      "Full CRUD operations on MySQL database records.",
      "Bootstrap-powered responsive admin interface.",
      "Efficient SQL queries with input validation and sanitization."
    ],
    demoLink: "#",
    codeLink: "https://github.com",
    architecture: `[PHP CRUD Application]
       │
       ├─► [Auth Module] (Session-based Login)
       ├─► [CRUD Engine] (PHP + MySQL Queries)
       ├─► [Bootstrap UI] (Responsive Admin Panel)
       └─► [SQL Database] (Data Persistence)`
  }
];

export const experienceData = [
  {
    date: "AUG 2024 — JUL 2025",
    role: "Full Stack Developer (Student)",
    company: "Ujjain",
    bulletPoints: [
      "Developed and maintained websites using Bootstrap, PHP, and SQL.",
      "Collaborated with cross-functional teams to design and implement user-friendly interfaces.",
      "Optimized application performance and scalability through efficient coding practices.",
      "Conducted code reviews and implemented best practices for software development.",
      "Engaged in continuous learning of new technologies and frameworks to enhance skill set."
    ]
  },
  {
    date: "OCT 2024 — NOV 2024",
    role: "C++ Intern (Student)",
    company: "Ujjain",
    bulletPoints: [
      "Completed a 1-month internship focused on C++ fundamentals and OOP concepts.",
      "Gained hands-on experience with object-oriented programming paradigms.",
      "Practiced problem-solving and algorithmic thinking using C++.",
      "Studied core data structures and applied them in practical coding exercises."
    ]
  },
  {
    date: "MAR 2023 — MAY 2023",
    role: "Python (OOPs Concept Clarity) — Online Course",
    company: "Online Platform",
    bulletPoints: [
      "Completed a structured Python course focused on Object-Oriented Programming concepts.",
      "Learned and applied classes, inheritance, polymorphism, and encapsulation.",
      "Built small Python projects to reinforce OOP understanding.",
      "Strengthened programming fundamentals to support future back-end development."
    ]
  },
  {
    date: "AUG 2023 — JUL 2027",
    role: "BTECH in AI & Data Science (Student)",
    company: "Mahakal Institute of Technology, Ujjain",
    bulletPoints: [
      "Pursuing Bachelor of Technology in Artificial Intelligence & Data Science.",
      "Coursework covers algorithms, data structures, web development, and database management.",
      "Actively working on personal projects using HTML, CSS, JavaScript, PHP, and SQL.",
      "Exploring machine learning concepts alongside full-stack web development."
    ]
  }
];
