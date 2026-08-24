export const personal = {
  name: 'Sunaina Sharma',
  title: 'Frontend & Full Stack Mobile Developer',
  intro:
    'Passionate Frontend & Mobile App Developer with 1+ year of professional industry experience. Specialized in building fast, responsive, and performance-optimized React.js & React Native applications, with complete A-to-Z full-stack capabilities (UI/UX design, Node.js REST APIs, Express, MongoDB, and Google Play Store app publishing).',
  email: 'sunainasharma25082004@gmail.com',
  phone: '+91 62849 61684',
  whatsappNumber: '916284961684',
  whatsapp: 'https://wa.me/916284961684',
  location: 'Chandigarh / Zirakpur, India',
  linkedin: 'https://linkedin.com',
  github: 'https://github.com/sunainasharma25082004-lang',
  twitter: 'https://twitter.com',
}

export const stats = [
  { value: 1, suffix: '+ Year', label: 'Professional Industry Experience' },
  { value: 20, suffix: '+', label: 'Production Projects & Apps' },
  { value: 100, suffix: '%', label: 'A to Z Execution Quality' },
  { value: 3.8, suffix: '/4.0', label: 'BCA Academic GPA' },
]

export type SkillCategory = {
  title: string
  skills: { name: string; level: number }[]
}

export const skillCategories: SkillCategory[] = [
  {
    title: 'Frontend & Mobile Web Engineering',
    skills: [
      { name: 'React.js Architecture', level: 96 },
      { name: 'React Native & Expo', level: 95 },
      { name: 'JavaScript (ES6+) & TypeScript', level: 94 },
      { name: 'HTML5 / CSS3 / Tailwind CSS', level: 96 },
      { name: 'Bootstrap 5 & Laravel Blade', level: 92 },
      { name: 'Google Play Store App Publishing', level: 95 },
    ],
  },
  {
    title: 'Backend & API Architecture',
    skills: [
      { name: 'Node.js & Express.js REST APIs', level: 92 },
      { name: 'MongoDB & Mongoose Schemas', level: 90 },
      { name: 'Prisma ORM & PostgreSQL', level: 86 },
      { name: 'JWT Auth & Wallet Payment Engines', level: 92 },
      { name: 'Socket.io WebSockets Chat', level: 88 },
    ],
  },
  {
    title: 'UI/UX & Product Design',
    skills: [
      { name: 'A-to-Z Mobile & Web UI Design', level: 96 },
      { name: 'Component-Based Architecture', level: 95 },
      { name: 'Flexbox & CSS Grid Layouts', level: 96 },
      { name: 'Responsive Mobile-First UX', level: 98 },
    ],
  },
  {
    title: 'Tools & DevOps',
    skills: [
      { name: 'Git & GitHub Workflows', level: 95 },
      { name: 'Postman & API Testing', level: 92 },
      { name: 'Render & Vercel Deployments', level: 94 },
      { name: 'Agile & Team Collaboration', level: 95 },
    ],
  },
]

export const languages = [
  { name: 'English', proficiency: 'Fluent' },
  { name: 'Hindi', proficiency: 'Fluent' },
  { name: 'Punjabi', proficiency: 'Fluent' },
]

export type Project = {
  id: string
  title: string
  description: string
  category: 'Full Stack' | 'Mobile App' | 'Frontend' | 'Web Apps'
  image: string
  screenshots: string[]
  videoDemo?: string
  tech: string[]
  demo: string
  github: string
  highlights: string[]
}

export const projects: Project[] = [
  {
    id: 'viztv-ott-app',
    title: 'VIZ TV OTT — 4K Entertainment, Auditions & Talent Hunt App',
    category: 'Mobile App',
    description:
      'Production mobile OTT entertainment platform published on Google Play Store (by VIZ Digital, Motiaz Zirakpur). Built A-to-Z UI design, Expo video engine, Node.js REST API backend, MongoDB video CDN, video audition upload pipeline, and Play Store release.',
    image: '/projects/viztv_ott.jpg',
    screenshots: [
      '/projects/viztv_ott.jpg',
    ],
    videoDemo: '/projects/viztv_ott.mp4',
    tech: [
      'React Native',
      'Expo Video Engine',
      'Node.js REST API',
      'Express.js',
      'MongoDB',
      'Google Play Store',
    ],
    demo: 'https://play.google.com/store/apps/details?id=com.vizdigital.viztv',
    github: 'https://github.com/sunainasharma25082004-lang',
    highlights: [
      'Published Live on Google Play Store',
      'A to Z UI/UX Design & Full-Stack Architecture',
      '4K Streaming & Audition Video Upload Engine',
      'Custom Expo Video Player & Billing Integration',
    ],
  },
  {
    id: 'fluencer-app',
    title: "Fluencer — Paid Creator & Brand Collaboration Platform",
    category: 'Mobile App',
    description:
      "Production Android mobile application published on Google Play (by VIZ Digital, Zirakpur). Engineered complete A-to-Z app layout, brand-creator campaign matching engine, swipe campaign discovery, in-app brand chat, and secure wallet payout backend.",
    image: '/projects/fluencer.jpg',
    screenshots: [
      '/projects/fluencer.jpg',
    ],
    videoDemo: '/projects/fluencer.mp4',
    tech: [
      'React Native',
      'Expo',
      'Node.js REST API',
      'Express.js',
      'MongoDB',
      'JWT Auth & Wallet Engine',
    ],
    demo: 'https://play.google.com/store/apps/details?id=com.vizdigital.fluencer',
    github: 'https://github.com/sunainasharma25082004-lang',
    highlights: [
      'Published Live on Google Play Store',
      'End-to-End Frontend UI & Express REST API Backend',
      'Brand & Creator Reel Deals Match Engine',
      'In-App Chat & Wallet Payout Subscriptions',
    ],
  },
  {
    id: 'rishta24-app',
    title: 'Rishta24 — Matrimonial & Matchmaking Mobile Platform',
    category: 'Mobile App',
    description:
      'Full-stack mobile matrimonial and matchmaking platform engineered A-to-Z with React Native, Node.js REST API, Express, and MongoDB. Features verified profile discovery, religion/community filtering, AI compatibility scoring, real-time chat, and interest requests.',
    image: '/projects/rishta24.jpg',
    screenshots: [
      '/projects/rishta24.jpg',
    ],
    videoDemo: '/projects/rishta24.mp4',
    tech: [
      'React Native',
      'Node.js REST API',
      'Express.js',
      'MongoDB & Mongoose',
      'Tailwind / NativeWind',
      'JWT Auth',
    ],
    demo: 'https://github.com/sunainasharma25082004-lang',
    github: 'https://github.com/sunainasharma25082004-lang',
    highlights: [
      'A to Z Full Stack & UI Design Execution',
      'Verified Matrimonial Profiles & Filters',
      'AI Match Compatibility Scoring',
      'In-App Interest Requests & Real-Time Chat',
    ],
  },
  {
    id: 'farmart24-platform',
    title: 'FarmMart24 — Agriculture E-Commerce Marketplace',
    category: 'Full Stack',
    description:
      'Production agriculture e-commerce marketplace live at farmart24.com. Connects organic farmers and consumers directly for fresh farm produce, certified seeds, bio-fertilizers, and modern farming equipment with real-time order tracking.',
    image: '/projects/farmart24.jpg',
    screenshots: [
      '/projects/farmart24.jpg',
    ],
    tech: [
      'React.js',
      'Next.js',
      'Node.js REST API',
      'Express.js',
      'MongoDB',
      'Tailwind CSS',
    ],
    demo: 'https://www.farmart24.com',
    github: 'https://github.com/sunainasharma25082004-lang',
    highlights: [
      'Live Production E-Commerce Marketplace (farmart24.com)',
      'Direct Farm-to-Consumer Produce Catalog',
      'Organic Seeds & Farming Tools Storefront',
      'Order Management & Checkout Pipeline',
    ],
  },
  {
    id: 'astrostar-platform',
    title: 'AstroStar — Astrologer Consultation & Kundli Platform',
    category: 'Full Stack',
    description:
      'Production full-stack web application hosted on Render. AstroStar connects users with verified astrologers for live chat and voice calls, featuring automated Kundli generation, daily horoscope readings, tarot cards, and wallet balance recharge engine.',
    image: '/projects/astrostar.jpg',
    screenshots: [
      '/projects/astrostar.jpg',
    ],
    tech: [
      'React.js',
      'Node.js REST API',
      'Express.js',
      'MongoDB',
      'WebSockets Chat',
    ],
    demo: 'https://astrostar-frontend.onrender.com/',
    github: 'https://github.com/sunainasharma25082004-lang',
    highlights: [
      'Live Production App (Render Hosted)',
      'Verified Astrologers Chat & Call System',
      'Automated Kundli & Horoscope Engine',
      'In-App Wallet Recharge & Billing',
    ],
  },
  {
    id: 'viztravel-app',
    title: 'VizTravel — Mobile Travel, Homestay & Ticketing App',
    category: 'Mobile App',
    description:
      'Full-stack mobile travel platform engineered with React Native, Node.js, Express REST API, and MongoDB. Features destination discovery, hotel & homestay reservations with dynamic price/category filtering, curated tour packages, and music event ticketing.',
    image: '/projects/viztravel.jpg',
    screenshots: [
      '/projects/viztravel.jpg',
    ],
    videoDemo: '/projects/viztravel.mp4',
    tech: [
      'React Native',
      'Node.js REST API',
      'Express.js',
      'MongoDB & Mongoose',
      'JWT Auth',
    ],
    demo: 'https://github.com/sunainasharma25082004-lang',
    github: 'https://github.com/sunainasharma25082004-lang',
    highlights: [
      'End-to-End React Native Architecture',
      'Hotel & Homestay Booking Engine',
      'Live Music Event Ticketing System',
      'Dynamic Price & Category Filters',
    ],
  },
  {
    id: 'raydo-cab-booking-app',
    title: 'Raydo — On-Demand Cab & Ride Hailing Mobile App',
    category: 'Mobile App',
    description:
      'Uber-style on-demand cab and ride-hailing mobile application. Engineered end-to-end with React Native, Node.js REST APIs, Express, and MongoDB. Features real-time GPS driver tracking, dynamic route mapping via Google Maps API, fare estimation, multiple vehicle classes (Economy, Comfort, Auto, Bike), driver dispatch engine, and instant ride receipts.',
    image: '/projects/raydo.jpg',
    screenshots: [
      '/projects/raydo.jpg',
    ],
    tech: [
      'React Native',
      'Expo',
      'Google Maps API',
      'Node.js REST API',
      'Express.js',
      'MongoDB',
      'Socket.io',
    ],
    demo: 'https://github.com/sunainasharma25082004-lang',
    github: 'https://github.com/sunainasharma25082004-lang',
    highlights: [
      'Uber-Style Real-Time Cab Booking & Driver Match',
      'Live GPS Driver Tracking & Google Maps Route SDK',
      'Fare Calculation & Multi-Vehicle Categories',
      'A-to-Z Mobile UI & Express Socket Backend',
    ],
  },
  {
    id: 'dmt-home-services-app',
    title: 'DMT — On-Demand Home Services & Repair Platform',
    category: 'Mobile App',
    description:
      'Urban Company (UrbanClap) style on-demand local home services and repair booking app. Connects homeowners with verified service professionals for plumbing, electrical work, home cleaning, appliance repair, and beauty/salon services. Includes slot scheduling, upfront transparent pricing, live professional dispatch tracking, and user review ratings.',
    image: '/projects/dmt.jpg',
    screenshots: [
      '/projects/dmt.jpg',
    ],
    tech: [
      'React Native',
      'React.js',
      'Node.js REST API',
      'Express.js',
      'MongoDB & Mongoose',
      'JWT Auth',
    ],
    demo: 'https://github.com/sunainasharma25082004-lang',
    github: 'https://github.com/sunainasharma25082004-lang',
    highlights: [
      'Urban Company Style Multi-Service Booking UI',
      'Verified Professional Dispatch & Slot Scheduler',
      'Upfront Transparent Pricing & Order Cart',
      'Real-Time Service Tracking & Rating System',
    ],
  },
  {
    id: 'real-estate-platform',
    title: 'Real Estate Property Listing & Filter Platform',
    category: 'Frontend',
    description:
      'Developed scalable and responsive UI for property listings and detailed view pages featuring advanced search & filter UI (price, location, category), reusable card components, and Flexbox/Grid layout optimizations.',
    image: '/projects/buylowindia_storefront.jpg',
    screenshots: [
      '/projects/buylowindia_storefront.jpg',
      '/projects/buylowindia_admin.jpg',
    ],
    tech: ['React.js', 'HTML5', 'CSS3', 'Bootstrap', 'Laravel Blade', 'REST API'],
    demo: 'https://github.com/sunainasharma25082004-lang',
    github: 'https://github.com/sunainasharma25082004-lang',
    highlights: [
      'Advanced Price, Location & Category Filters',
      'Scalable Reusable Card Components',
      'Mobile-First Responsive Layout',
      'Optimized CSS Grid & Flexbox Structure',
    ],
  },
  {
    id: 'upi-payment-interface',
    title: 'UPI Style Digital Payment Interface',
    category: 'Web Apps',
    description:
      'Designed modern digital payment UI inspired by real-world UPI apps with send/receive money screens, interactive input fields, and simulated transaction flows in JavaScript.',
    image: '/projects/analytics.png',
    screenshots: [
      '/projects/analytics.png',
      '/projects/buylowindia_admin.jpg',
    ],
    tech: ['JavaScript (ES6+)', 'React.js', 'HTML5', 'CSS3', 'Flexbox'],
    demo: 'https://github.com/sunainasharma25082004-lang',
    github: 'https://github.com/sunainasharma25082004-lang',
    highlights: [
      'Interactive Money Transfer Flow',
      'Real-World UPI App Design System',
      'Dynamic Transaction State Simulation',
      'Clean & Accessible Usability',
    ],
  },
]

export type TimelineItem = {
  date: string
  title: string
  org: string
  description: string
  bulletPoints?: string[]
}

export const timeline: TimelineItem[] = [
  {
    date: 'March 2026 — Present (Current Role)',
    title: 'Full Stack & Mobile App Engineer (A-to-Z Lead Developer)',
    org: 'VIZ Digital — Motiaz Royal Citadel, Zirakpur',
    description:
      'Leading end-to-end (A to Z) web and mobile application engineering. Responsible for UI/UX application design, frontend React.js/React Native development, Node.js REST APIs, Express, MongoDB database schemas, and publishing production Android apps on the Google Play Store.',
    bulletPoints: [
      'Engineered A-to-Z production mobile apps (VIZ TV 4K OTT, Fluencer, VizTravel, Rishta24) and published them live on Google Play.',
      'Designed high-converting mobile & web UI/UX layouts with 100% device responsiveness.',
      'Architected scalable backend REST APIs using Node.js, Express.js, JWT authentication, and MongoDB CDN.',
      'Handled complete product lifecycles — from database design, UI engineering, API integration, to Play Store release.',
    ],
  },
  {
    date: 'Dec 2025 — Feb 2026 (3 Months)',
    title: 'Website Designer / Frontend Developer',
    org: 'CLBP Pvt Ltd — Project-Based Role',
    description: 'Project-based role focusing on Laravel Blade templates and React.js UI enhancement.',
    bulletPoints: [
      'Designed and customized website layouts using Laravel Blade Templates.',
      'Handled UI design and styling for 4+ website modules with high visual consistency.',
      'Enhanced mobile usability and frontend performance across pages.',
      'Contributed to UI improvements in React.js client projects.',
    ],
  },
  {
    date: 'June 2025 — Nov 2025 (6 Months)',
    title: 'Frontend Development Intern',
    org: 'Netmax Technologies Pvt Ltd, Chandigarh',
    description: 'Developed responsive React.js components and integrated REST APIs.',
    bulletPoints: [
      'Developed 15+ responsive web pages using React.js and Bootstrap, ensuring cross-browser compatibility.',
      'Built reusable UI components, reducing repetitive code by approximately 30%.',
      'Integrated REST APIs and implemented dynamic data rendering for real-time updates.',
      'Improved page responsiveness and layout structure using CSS Grid and Flexbox.',
      'Collaborated with team members to deliver frontend features within deadlines.',
      'Used Git for version control and managed project workflow efficiently.',
    ],
  },
]

export type EducationItem = {
  degree: string
  institution: string
  university: string
  period: string
  details: string
}

export const education: EducationItem[] = [
  {
    degree: 'Bachelor of Computer Application (BCA)',
    institution: 'Dev Samaj College for Women',
    university: 'Punjab University',
    period: '2022 — 2025',
    details: 'Awarded for Academic Excellence | GPA: 3.8 / 4.0',
  },
  {
    degree: 'Senior Secondary High School',
    institution: 'Kendriya Vidyalaya High Ground',
    university: 'Chandigarh',
    period: '2021 — 2022',
    details: 'Focused on Computer Science, Mathematics & Information Technology.',
  },
]

export type Service = {
  title: string
  description: string
}

export const services: Service[] = [
  {
    title: 'Frontend Web & Mobile App Development',
    description:
      'Specialized in building fast, beautiful, and ultra-responsive web and mobile apps using React.js, Next.js, and React Native.',
  },
  {
    title: 'Google Play Store Mobile App Publishing',
    description:
      'End-to-end mobile app engineering with Expo, Android SDK, release builds, and direct Google Play Console publishing.',
  },
  {
    title: 'A-to-Z Full Stack & REST API Engineering',
    description:
      'Designing robust Node.js & Express RESTful APIs, JWT authentication, and MongoDB database schemas for seamless data flow.',
  },
  {
    title: 'Responsive UI/UX & Component Architecture',
    description:
      'Designing pixel-perfect, accessible user interfaces with Tailwind CSS, Flexbox, and CSS Grid for 100% mobile usability.',
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
    name: 'VIZ Digital Executive',
    position: 'Director, VIZ Digital (Motiaz Zirakpur)',
    review:
      'Sunaina handles A-to-Z execution with unmatched dedication. From UI design to backend APIs and publishing apps on Google Play, she delivers senior-level results every time!',
    image: '/testimonials/client1.png',
  },
  {
    name: 'Netmax Tech Lead',
    position: 'Senior Manager, Netmax Technologies',
    review:
      'Sunaina created 15+ responsive web pages with clean React components. Her code is modular, reusable, and delivered right on schedule!',
    image: '/testimonials/client2.png',
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
