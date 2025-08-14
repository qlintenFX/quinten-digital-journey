export const techStack = [
    { name: 'React', version: '18', icon: <span className="text-blue-400">●</span> },
    { name: 'TypeScript', version: '5', icon: <span className="text-cyan-400">●</span> },
    { name: 'Vite/Next', icon: <span className="text-violet-400">●</span> },
    { name: 'Tailwind CSS', icon: <span className="text-teal-400">●</span> },
  ];
  
export const profile = {
  name: 'Quinten De Meyer',
  title: 'Applied Computer Science / Electronics - ICT',
  image: '/images/optimized/profile-photo.webp'
};
  
export const projects = [
  {
    title: 'IT Polis Voting System',
    description: 'Secure single-vote system with live leaderboard and admin controls.',
    image: '/images/optimized/project-1-Voting-System.webp'
  },
  {
    title: 'App Hosting Platform for Clients',
    description: 'Kubernetes-based hosting with automated deployments in the campus datacenter.',
    image: '/images/optimized/project-2-hosting-platform.webp'
  },
  {
    title: 'Security Awareness Campaign Movie',
    description: 'Educational short film on the risks of found USB devices and cybersecurity awareness.',
    image: '/images/optimized/project-3-video-editing-awareness-movie.webp'
  },
  {
    title: 'KeyedColors',
    description: 'Windows app to create and switch custom display profiles with hotkeys.',
    image: '/images/optimized/project-4-KeyedColors-profiles.webp'
  }
];
  
export const workProcess: Array<{ id: number; title: string; description: string; icon: React.ReactNode }> = [
  { id: 1, title: 'About', description: 'Overview, background and CV.', icon: <span>📄</span> },
  { id: 2, title: 'Projects', description: 'Selected work and achievements.', icon: <span>🛠️</span> },
  { id: 3, title: 'YouTube', description: 'Cinematics and video work highlights.', icon: <span>🎬</span> },
  { id: 4, title: 'Contact', description: 'Links to socials and contact details.', icon: <span>✉️</span> },
];
  
// Not used in professional mirroring

