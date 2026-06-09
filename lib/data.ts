export const personal = {
  name: 'Sunaina Sharma',
  title: 'Frontend App & Web Developer',
  intro:
    'I build fast, scalable, and user-focused web applications with modern technologies.',
  email: 'sunainasharma25082004@gmail.com',
  phone: '+91 62849 61684',
  location: 'Chandigarh, India',
  linkedin: 'https://linkedin.com',
  github: 'https://github.com',
  twitter: 'https://twitter.com',
}

export const stats = [
  { value: 20, suffix: '+', label: 'Projects Completed' },
  { value: 2, suffix: '+', label: 'Years Building' },
  { value: 100, suffix: '%', label: 'Responsive Designs' },
  { value: 15, suffix: '+', label: 'Happy Clients' },
]

export type SkillCategory = {
  title: string
  skills: { name: string; level: number }[]
}

export const skillCategories: SkillCategory[] = [
  {
    title: 'Frontend',
    skills: [
      { name: 'HTML', level: 95 },
      { name: 'CSS', level: 92 },
      { name: 'JavaScript', level: 93 },
      { name: 'TypeScript', level: 85 },
      { name: 'React', level: 94 },
      { name: 'Tailwind CSS', level: 95 },
    ],
  },
  // {
  //   title: 'Backend',
  //   skills: [
  //     { name: 'Node.js', level: 88 },
  //     { name: 'Express.js', level: 87 },
  //     { name: 'REST APIs', level: 90 },
  //   ],
  // },
  {
    title: 'Database',
    skills: [
      { name: 'MongoDB', level: 89 },
      { name: 'MySQL', level: 80 },
    ],
  },
  {
    title: 'Tools',
    skills: [
      { name: 'Git', level: 90 },
      { name: 'GitHub', level: 92 },
      // { name: 'Postman', level: 85 },
      { name: 'Figma', level: 78 },
      { name: 'VS Code', level: 95 },
    ],
  },
]

export type Project = {
  title: string
  description: string
  image: string
  tech: string[]
  demo: string
  github: string
}

export const projects: Project[] = [
  {
    title: 'ShopWave — E-commerce Platform',
    description:
      'A full-featured online store with cart, Stripe checkout, product search, and an admin dashboard for managing inventory.',
    image: '/projects/ecommerce.png',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe'],
    demo: 'https://example.com',
    github: 'https://github.com',
  },
  {
    title: 'PulseMetrics — Analytics Dashboard',
    description:
      'Real-time analytics dashboard with interactive charts, custom date ranges, and exportable reports for SaaS teams.',
    image: '/projects/analytics.png',
    tech: ['Next.js', 'TypeScript', 'Recharts', 'Express'],
    demo: 'https://example.com',
    github: 'https://github.com',
  },
  {
    title: 'ConvoLink — Realtime Chat',
    description:
      'A real-time messaging app with Socket.io, typing indicators, read receipts, and group conversations.',
    image: '/projects/chat.png',
    tech: ['React', 'Socket.io', 'Node.js', 'MongoDB'],
    demo: 'https://example.com',
    github: 'https://github.com',
  },
  {
    title: 'TaskFlow — Project Manager',
    description:
      'A Kanban-style task manager with drag-and-drop boards, team collaboration, and deadline reminders.',
    image: '/projects/taskmanager.png',
    tech: ['React', 'Express', 'MongoDB', 'Tailwind'],
    demo: 'https://example.com',
    github: 'https://github.com',
  },
  {
    title: 'Circle — Social Network',
    description:
      'A social platform with profiles, posts, likes, comments, and a personalized feed powered by a REST API.',
    image: '/projects/social.png',
    tech: ['Next.js', 'Node.js', 'MongoDB', 'JWT'],
    demo: 'https://example.com',
    github: 'https://github.com',
  },
  {
    title: 'FinTrack — Personal Finance',
    description:
      'A finance tracker that visualizes spending, budgets, and savings goals with secure authentication.',
    image: '/projects/finance.png',
    tech: ['React', 'TypeScript', 'Express', 'MySQL'],
    demo: 'https://example.com',
    github: 'https://github.com',
  },
]

export type TimelineItem = {
  date: string
  title: string
  org: string
  description: string
}

export const timeline: TimelineItem[] = [
  {
    date: '2024 — Present',
    title: 'Freelance Full Stack Developer',
    org: 'Self-employed',
    description:
      'Designing and shipping production web apps for clients across e-commerce, SaaS, and content platforms using the MERN stack.',
  },
  {
    date: '2023 — 2024',
    title: 'Frontend Developer Intern',
    org: 'Nimbus Labs',
    description:
      'Built responsive React interfaces, integrated REST APIs, and improved Lighthouse performance scores by 30%.',
  },
  {
    date: '2022 — 2023',
    title: 'Learning Journey',
    org: 'Self-taught & Bootcamp',
    description:
      'Mastered JavaScript, React, and Node.js through intensive project-based learning and open-source contributions.',
  },
]

export type Service = {
  title: string
  description: string
}

export const services: Service[] = [
  {
    title: 'Frontend Development',
    description:
      'Pixel-perfect, accessible interfaces built with React, Next.js, and Tailwind CSS.',
  },
  // {
  //   title: 'MERN Stack Development',
  //   description:
  //     'End-to-end web apps with MongoDB, Express, React, and Node.js — from database to UI.',
  // },
  {
    title: 'Responsive Web Design',
    description:
      'Layouts that look and feel great on every device, from mobile to large desktops.',
  },
  {
    title: 'API Integration',
    description:
      'Robust REST API design and seamless third-party service integrations.',
  },
  {
    title: 'Website Optimization',
    description:
      'Performance, SEO, and Core Web Vitals tuning for faster, higher-ranking sites.',
  },
  {
    title: 'Maintenance & Support',
    description:
      'Ongoing improvements, bug fixes, and feature development to keep products thriving.',
  },
]

export type Testimonial = {
  name: string
  position: string
  review: string
  image: string
}

export const testimonials: Testimonial[] = [
  {
    name: 'Priya Menon',
    position: 'Founder, BloomCart',
    review:
      'Aarav rebuilt our storefront from the ground up. Conversions went up 40% and the codebase is finally a joy to work with. Truly senior-level execution.',
    image: '/testimonials/client1.png',
  },
  {
    name: 'David Roberts',
    position: 'CTO, Nimbus Labs',
    review:
      'One of the most reliable developers I have worked with. He communicates clearly, ships fast, and his attention to detail on the frontend is exceptional.',
    image: '/testimonials/client2.png',
  },
  {
    name: 'Sara Williams',
    position: 'Product Lead, TaskFlow',
    review:
      'Aarav delivered our MVP ahead of schedule and the UI/UX feedback from users has been outstanding. I would hire him again in a heartbeat.',
    image: '/testimonials/client3.png',
  },
]

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
]
