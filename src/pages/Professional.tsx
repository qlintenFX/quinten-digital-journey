import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { Home as HomeIcon, User, Briefcase, Youtube, Mail, Search } from 'lucide-react';
import { Button } from '@/components/ui-optimized/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useIsMobile } from '@/hooks/use-mobile';

type NavItem = {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
};

const NAV_ITEMS: NavItem[] = [
  { id: 'overview', label: 'Overview', icon: HomeIcon },
  { id: 'about', label: 'About', icon: User },
  { id: 'projects', label: 'Projects', icon: Briefcase },
  { id: 'youtube', label: 'YouTube', icon: Youtube },
  { id: 'contact', label: 'Contact', icon: Mail },
];

const projects = [
  { key: 'project1', title: 'IT Polis Voting System', img: '/images/optimized/project-1-Voting-System.webp' },
  { key: 'project2', title: 'App Hosting Platform for Clients', img: '/images/optimized/project-2-hosting-platform.webp' },
  { key: 'project3', title: 'Security Awareness Campaign Movie', img: '/images/optimized/project-3-video-editing-awareness-movie.webp' },
  { key: 'project4', title: 'KeyedColors', img: '/images/project-4-KeyedColors-logo.png' },
];

const SearchButton: React.FC<{ onOpen: () => void }> = ({ onOpen }) => {
  return (
    <button
      onClick={onOpen}
      aria-label="Open search"
      className="fixed bottom-4 left-4 z-50 h-12 w-12 rounded-full bg-card border shadow-md flex items-center justify-center hover:shadow-lg transition-shadow hover:scale-[1.02]"
    >
      <Search className="h-5 w-5" />
    </button>
  );
};

const Professional: React.FC = () => {
  const isMobile = useIsMobile();
  const [activeId, setActiveId] = useState<string>('overview');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState('');

  const searchable = useMemo(
    () => [
      ...NAV_ITEMS.map((n) => ({ type: 'section' as const, id: n.id, title: n.label })),
      ...projects.map((p) => ({ type: 'project' as const, id: p.key, title: p.title })),
    ],
    []
  );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return searchable.slice(0, 6);
    return searchable.filter((item) => item.title.toLowerCase().includes(q)).slice(0, 10);
  }, [query, searchable]);

  const scrollToId = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  useEffect(() => {
    const handler = () => {
      const mid = window.innerHeight / 2;
      let current = 'overview';
      for (const n of NAV_ITEMS) {
        const el = document.getElementById(n.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= mid && rect.bottom >= mid) {
          current = n.id;
          break;
        }
      }
      setActiveId(current);
    };
    window.addEventListener('scroll', handler, { passive: true });
    handler();
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const Sidebar = (
    <aside className="hidden md:flex fixed left-0 top-0 h-full w-56 border-r bg-background/80 backdrop-blur-sm z-30">
      <nav className="mt-20 w-full">
        <ul className="space-y-1 px-3">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => scrollToId(item.id)}
                className={`w-full flex items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors hover:bg-muted ${
                  activeId === item.id ? 'bg-muted text-primary' : 'text-foreground'
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );

  const SectionCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className={`rounded-xl bg-card border shadow-sm p-5 ${className}`}
      >
        {children}
      </motion.div>
    );
  };

  const Tile: React.FC<{ children: React.ReactNode; onClick?: () => void }> = ({ children, onClick }) => (
    <Tilt
      className="h-full"
      tiltEnable={!isMobile}
      tiltMaxAngleX={6}
      tiltMaxAngleY={6}
      glareEnable={false}
      scale={1.01}
      transitionSpeed={800}
    >
      <div onClick={onClick} className="h-full cursor-pointer hover-lift rounded-xl bg-card border shadow-sm p-4">
        {children}
      </div>
    </Tilt>
  );

  const Section: React.FC<{ id: string; title?: string; variant?: 'plain' | 'band'; children: React.ReactNode }> = ({ id, title, variant = 'plain', children }) => {
    return (
      <section
        id={id}
        aria-label={title || id}
        className={`scroll-mt-24 ${variant === 'band' ? 'relative before:content-[""] before:absolute before:inset-0 before:bg-muted/20 before:-z-10' : ''}`}
      >
        <div className="container pt-12 md:pt-16 pb-6">
          {title && (
            <div className="mb-5">
              <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
              <div className="h-1 w-14 bg-primary rounded-full mt-2" />
            </div>
          )}
          {children}
        </div>
      </section>
    );
  };

  return (
    <div className="min-h-screen md:pl-56">
      {Sidebar}

      {/* Search trigger */}
      <SearchButton onOpen={() => setIsSearchOpen(true)} />

      {/* Overview */}
      <Section id="overview" variant="plain">
        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          <SectionCard className="md:col-span-2">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Quinten De Meyer</h1>
            <p className="text-muted-foreground mt-2">Applied Computer Science / Electronics - ICT • Cloud & Cyber Security</p>
            <div className="mt-5 grid grid-cols-2 md:grid-cols-3 gap-3">
              <div className="rounded-lg bg-muted/40 border p-3 text-sm">UI/UX & Interactions</div>
              <div className="rounded-lg bg-muted/40 border p-3 text-sm">Kubernetes & Docker</div>
              <div className="rounded-lg bg-muted/40 border p-3 text-sm">Real-time Systems</div>
              <div className="rounded-lg bg-muted/40 border p-3 text-sm">Video Editing</div>
              <div className="rounded-lg bg-muted/40 border p-3 text-sm">Security Awareness</div>
              <div className="rounded-lg bg-muted/40 border p-3 text-sm">Windows Apps</div>
            </div>
          </SectionCard>

          <SectionCard>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Download CV</p>
                <p className="font-medium">PDF Resume</p>
              </div>
              <a
                href="/files/Quinten De Meyer.pdf"
                download
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3"
              >
                Download
              </a>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2">
              <a href="https://github.com/qlintenFX/" target="_blank" className="rounded-md bg-muted/40 border py-2 text-center text-sm hover:bg-muted">GitHub</a>
              <a href="https://www.youtube.com/@qlintenFX" target="_blank" className="rounded-md bg-muted/40 border py-2 text-center text-sm hover:bg-muted">YouTube</a>
              <a href="https://www.linkedin.com/in/quinten-de-meyer-2336282a2/" target="_blank" className="rounded-md bg-muted/40 border py-2 text-center text-sm hover:bg-muted">LinkedIn</a>
            </div>
          </SectionCard>
        </div>
      </Section>

      {/* About */}
      <Section id="about" title="About" variant="band">
        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          <SectionCard className="md:col-span-2">
            <p className="text-muted-foreground">
              I’m Quinten, a passionate student in Applied Computer Science / Electronics – ICT. I design and develop digital
              experiences with creativity and technical expertise. My interests span UI/UX, real-time systems, security, and
              video production.
            </p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-muted/40 border p-3 text-sm">Why ICS? Real-world problem solving</div>
              <div className="rounded-lg bg-muted/40 border p-3 text-sm">YouTube cinematics sharpen storytelling</div>
              <div className="rounded-lg bg-muted/40 border p-3 text-sm">Personal projects like KeyedColors</div>
              <div className="rounded-lg bg-muted/40 border p-3 text-sm">Focus on secure, robust solutions</div>
            </div>
          </SectionCard>
          <SectionCard>
            <div className="rounded-lg overflow-hidden bg-muted/40 border aspect-square flex items-center justify-center">
              <img src="/images/optimized/profile-photo.webp" alt="Profile" className="object-cover w-full h-full" />
            </div>
          </SectionCard>
        </div>
      </Section>

      {/* Projects */}
      <Section id="projects" title="Projects" variant="band">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {projects.map((p) => (
            <Tile key={p.key} onClick={() => scrollToId(p.key)}>
              <div className="aspect-video w-full rounded-md overflow-hidden bg-muted/40 border mb-3 flex items-center justify-center">
                <img src={p.img} alt={p.title} className="object-contain w-full h-full" />
              </div>
              <p className="text-sm font-medium line-clamp-2">{p.title}</p>
            </Tile>
          ))}
        </div>

        {/* Detail tiles (anchor targets) */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          {projects.map((p) => (
            <SectionCard key={p.key} className="scroll-mt-24" >
              <div id={p.key} className="-mt-16 pt-16" />
              <div className="flex gap-4 items-start">
                <div className="w-28 h-20 rounded-md overflow-hidden bg-muted/40 border flex-shrink-0 flex items-center justify-center">
                  <img src={p.img} alt="" className="object-contain w-full h-full" />
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-semibold">{p.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">Click the thumbnails below to explore images in the style site.</p>
                </div>
              </div>
            </SectionCard>
          ))}
        </div>
      </Section>

      {/* YouTube */}
      <Section id="youtube" title="YouTube" variant="band">
        <SectionCard>
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">Featured video</p>
            <a href="https://www.youtube.com/@qlintenFX" target="_blank" className="text-sm underline underline-offset-4">Visit Channel</a>
          </div>
          <div className="relative rounded-lg overflow-hidden border bg-muted/40" style={{ paddingBottom: '56.25%' }}>
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube.com/embed/LAHGY-rWtbk`}
              title="Featured video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </SectionCard>
      </Section>

      {/* Contact */}
      <Section id="contact" title="Contact" variant="band">
        <div className="grid md:grid-cols-3 gap-6">
          <SectionCard>
            <h3 className="text-base font-semibold mb-3">Email</h3>
            <a href="mailto:quinten1508@gmail.com" className="text-sm underline underline-offset-4">quinten1508@gmail.com</a>
          </SectionCard>
          <SectionCard>
            <h3 className="text-base font-semibold mb-3">LinkedIn</h3>
            <a href="https://www.linkedin.com/in/quinten-de-meyer-2336282a2/" target="_blank" className="text-sm underline underline-offset-4">Profile</a>
          </SectionCard>
          <SectionCard>
            <h3 className="text-base font-semibold mb-3">GitHub</h3>
            <a href="https://github.com/qlintenFX/" target="_blank" className="text-sm underline underline-offset-4">qlintenFX</a>
          </SectionCard>
        </div>
      </Section>

      {/* Search dialog */}
      <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Search</DialogTitle>
          </DialogHeader>
          <div className="mt-2">
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search sections or projects..."
              className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            <div className="mt-3 max-h-72 overflow-y-auto divide-y">
              {results.map((r) => (
                <button
                  key={`${r.type}-${r.id}`}
                  onClick={() => {
                    setIsSearchOpen(false);
                    setTimeout(() => {
                      scrollToId(r.type === 'section' ? r.id : (r.id as string));
                    }, 50);
                  }}
                  className="w-full text-left px-2 py-2 hover:bg-muted rounded-md"
                >
                  <span className="text-sm font-medium">{r.title}</span>
                  <span className="ml-2 text-xs text-muted-foreground uppercase">{r.type}</span>
                </button>
              ))}
              {results.length === 0 && (
                <div className="text-sm text-muted-foreground px-2 py-4">No results</div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Professional;


