import React, { useEffect, useMemo, useRef, useState } from 'react'
import Tilt from 'react-parallax-tilt'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui-optimized/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Modal } from '@/components/ui/modal'
import {
  Home as HomeIcon,
  User,
  Briefcase,
  Youtube as YoutubeIcon,
  Mail,
  Search,
  ChevronRight
} from 'lucide-react'

type SectionId = 'overview' | 'about' | 'projects' | 'youtube' | 'contact'

const sections: { id: SectionId; title: string; icon: React.ComponentType<any> }[] = [
  { id: 'overview', title: 'Overview', icon: HomeIcon },
  { id: 'about', title: 'About', icon: User },
  { id: 'projects', title: 'Projects', icon: Briefcase },
  { id: 'youtube', title: 'YouTube', icon: YoutubeIcon },
  { id: 'contact', title: 'Contact', icon: Mail }
]

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  return (
    <Tilt
      className={`w-full h-full ${className ?? ''}`}
      perspective={1000}
      tiltMaxAngleX={4}
      tiltMaxAngleY={4}
      scale={1.01}
      transitionSpeed={1000}
      glareEnable={false}
      gyroscope={false}
      tiltEnable={true}
      trackOnWindow={false}
      reset
    >
      <div className="w-full h-full rounded-xl bg-card/90 border shadow-sm hover:shadow-lg transition-all">
        {children}
      </div>
    </Tilt>
  )
}

const Professional: React.FC = () => {
  const [active, setActive] = useState<SectionId>('overview')
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const sectionRefs = useMemo(() => new Map<SectionId, HTMLElement | null>(), [])

  // Simple IntersectionObserver to highlight active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id') as SectionId | null
            if (id) setActive(id)
          }
        }
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    )

    sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const filtered = useMemo(
    () =>
      sections.filter((s) => s.title.toLowerCase().includes(query.trim().toLowerCase())),
    [query]
  )

  const scrollTo = (id: SectionId) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setIsSearchOpen(false)
  }

  // Project modal
  const [selectedProject, setSelectedProject] = useState<null | 'project1' | 'project2' | 'project3' | 'project4'>(null)

  return (
    <div className="relative min-h-[calc(100vh-80px)]">
      {/* Layout grid with sidebar */}
      <div className="container relative grid grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)] gap-6 py-8">
        {/* Sidebar */}
        <aside className="lg:sticky lg:top-24 h-max rounded-xl border bg-card/90 p-4">
          <div className="flex items-center gap-3 mb-4">
            <img
              src="/images/optimized/pfp.webp"
              alt="Avatar"
              className="w-10 h-10 rounded-full border"
              width={64}
              height={64}
            />
            <div>
              <p className="text-sm text-muted-foreground">Portfolio</p>
              <p className="font-semibold">Quinten De Meyer</p>
            </div>
          </div>

          <nav className="flex flex-col gap-1">
            {sections.map(({ id, title, icon: Icon }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center gap-2 hover:bg-primary/10 ${
                  active === id ? 'bg-primary/15 text-primary' : 'text-foreground'
                }`}
                aria-current={active === id}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{title}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="space-y-12">
          {/* Overview */}
          <section id="overview" className="scroll-mt-24">
            <Card>
              <div className="p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="shrink-0">
                  <img
                    src="/images/optimized/profile-photo.webp"
                    alt="Profile"
                    className="w-32 h-32 object-cover rounded-xl border"
                    width={256}
                    height={256}
                  />
                </div>
                <div className="grow">
                  <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
                    Quinten De Meyer
                  </h1>
                  <p className="text-muted-foreground">
                    Applied Computer Science / Electronics – ICT student. I design and develop digital
                    experiences with creativity and technical expertise.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {['Cloud', 'Security', 'UI/UX', 'Video'].map((chip) => (
                      <span key={chip} className="text-xs rounded-full border px-2 py-1 bg-background/60">
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </section>

          {/* About */}
          <section id="about" className="scroll-mt-24">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-3">Why Applied CS / Electronics – ICT?</h2>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    I'm fascinated by how technology can solve real-world problems. The blend of theoretical
                    knowledge and practical applications lets me turn creative ideas into functional solutions.
                  </p>
                </div>
              </Card>
              <Card>
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-3">My Creative Pursuits</h2>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    I run a YouTube channel focused on custom cinematics for Assetto Corsa, sharpening my video
                    editing and storytelling abilities. I also build personal software like KeyedColors.
                  </p>
                </div>
              </Card>
              <Card>
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-3">Professional Ambitions</h2>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Experience with containerization, security systems, and app development shaped my direction. I
                    aim to create robust, secure solutions and continuously learn emerging technologies.
                  </p>
                </div>
              </Card>
            </div>
          </section>

          {/* Projects */}
          <section id="projects" className="scroll-mt-24">
            <div className="mb-4">
              <h2 className="text-xl font-semibold">Projects / Achievements</h2>
              <p className="text-sm text-muted-foreground">Selected highlights with images</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Project 1 */}
              <Card>
                <button onClick={() => setSelectedProject('project1')} className="p-0 text-left w-full">
                  <div className="p-4 flex items-center gap-4">
                    <div className="w-24 h-24 rounded-lg overflow-hidden border bg-muted/40">
                      <img
                        src="/images/optimized/project-1-Voting-System.webp"
                        alt="IT Polis Voting System"
                        className="w-full h-full object-contain"
                        width={300}
                        height={180}
                      />
                    </div>
                    <div className="grow">
                      <h3 className="font-semibold">IT Polis Voting System</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        SKIL2 Project with secure voting, real-time leaderboard, and admin controls.
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                </button>
              </Card>

              {/* Project 2 */}
              <Card>
                <button onClick={() => setSelectedProject('project2')} className="p-0 text-left w-full">
                  <div className="p-4 flex items-center gap-4">
                    <div className="w-24 h-24 rounded-lg overflow-hidden border bg-muted/40">
                      <img
                        src="/images/optimized/project-2-hosting-platform.webp"
                        alt="Hosting platform"
                        className="w-full h-full object-contain"
                        width={300}
                        height={180}
                      />
                    </div>
                    <div className="grow">
                      <h3 className="font-semibold">App Hosting Platform</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        Kubernetes-based platform for automated PHP/Laravel app deployments.
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                </button>
              </Card>

              {/* Project 3 */}
              <Card>
                <button onClick={() => setSelectedProject('project3')} className="p-0 text-left w-full">
                  <div className="p-4 flex items-center gap-4">
                    <div className="w-24 h-24 rounded-lg overflow-hidden border bg-muted/40">
                      <img
                        src="/images/optimized/project-3-video-editing-awareness-movie.webp"
                        alt="Security awareness movie"
                        className="w-full h-full object-contain"
                        width={300}
                        height={180}
                      />
                    </div>
                    <div className="grow">
                      <h3 className="font-semibold">Security Awareness Movie</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        Educational film on cybersecurity awareness and safe behavior.
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                </button>
              </Card>

              {/* Project 4 */}
              <Card>
                <button onClick={() => setSelectedProject('project4')} className="p-0 text-left w-full">
                  <div className="p-4 flex items-center gap-4">
                    <div className="w-24 h-24 rounded-lg overflow-hidden border bg-muted/40">
                      <img
                        src="/images/project-4-KeyedColors-logo.png"
                        alt="KeyedColors"
                        className="w-full h-full object-contain"
                        width={150}
                        height={150}
                      />
                    </div>
                    <div className="grow">
                      <h3 className="font-semibold">KeyedColors</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        Windows app to create and switch custom display profiles with hotkeys.
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                </button>
              </Card>
            </div>
          </section>

          {/* YouTube */}
          <section id="youtube" className="scroll-mt-24">
            <Card>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-semibold">YouTube</h2>
                    <p className="text-sm text-muted-foreground">Featured videos</p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => window.open('https://www.youtube.com/@qlintenFX', '_blank')}
                  >
                    Visit Channel
                  </Button>
                </div>
                <div className="relative rounded-lg overflow-hidden" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube.com/embed/LAHGY-rWtbk`}
                    title="Featured video"
                    frameBorder={0}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </Card>
          </section>

          {/* Contact / Socials */}
          <section id="contact" className="scroll-mt-24">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-2">Socials</h2>
                  <div className="grid grid-cols-2 gap-3">
                    <a
                      href="https://github.com/qlintenFX/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg border p-3 hover:bg-muted/50 transition-colors text-sm"
                    >
                      GitHub
                    </a>
                    <a
                      href="https://www.youtube.com/@qlintenFX"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg border p-3 hover:bg-muted/50 transition-colors text-sm"
                    >
                      YouTube
                    </a>
                    <a
                      href="https://www.linkedin.com/in/quinten-de-meyer-2336282a2/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg border p-3 hover:bg-muted/50 transition-colors text-sm"
                    >
                      LinkedIn
                    </a>
                    <button
                      onClick={() => (window.location.href = 'mailto:quinten1508@gmail.com')}
                      className="rounded-lg border p-3 hover:bg-muted/50 transition-colors text-sm text-left"
                    >
                      Email
                    </button>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-2">Curriculum Vitae</h2>
                  <div className="flex items-center justify-between rounded-lg border p-3">
                    <p className="text-sm text-muted-foreground">View or download my CV</p>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        onClick={() => window.open('/files/Quinten De Meyer.pdf', '_blank')}
                      >
                        View
                      </Button>
                      <Button
                        onClick={() => {
                          const link = document.createElement('a')
                          link.href = '/files/Quinten De Meyer.pdf'
                          link.download = 'Quinten De Meyer.pdf'
                          link.click()
                        }}
                      >
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </section>
        </main>
      </div>

      {/* Bottom-left Search trigger */}
      <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="fixed bottom-4 left-4 rounded-full h-10 px-3 bg-card/80 backdrop-blur border shadow-md"
          >
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Search</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type to search sections..."
              className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <div className="divide-y rounded-md border">
              {filtered.length === 0 && (
                <div className="p-3 text-sm text-muted-foreground">No matches</div>
              )}
              {filtered.map((s) => (
                <button
                  key={s.id}
                  onClick={() => scrollTo(s.id)}
                  className="w-full text-left p-3 text-sm hover:bg-muted/50 transition-colors"
                >
                  {s.title}
                </button>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Project gallery modal */}
      <Modal
        isOpen={selectedProject !== null}
        onClose={() => setSelectedProject(null)}
        title={
          selectedProject === 'project1'
            ? 'IT Polis Voting System'
            : selectedProject === 'project2'
            ? 'App Hosting Platform'
            : selectedProject === 'project3'
            ? 'Security Awareness Movie'
            : selectedProject === 'project4'
            ? 'KeyedColors'
            : ''
        }
      >
        {selectedProject && (
          <div className="space-y-6">
            {(
              selectedProject === 'project1'
                ? [
                    '/images/optimized/project-1-Voting-System.webp',
                    '/images/optimized/project-1-group-picture.png'
                  ]
                : selectedProject === 'project2'
                ? [
                    '/images/optimized/project-2-hosting-platform.webp',
                    '/images/optimized/project-2-hosting-platform-repository.png',
                    '/images/optimized/project-2-software-diagram.png',
                    '/images/optimized/project-2-hardware-diagram.png'
                  ]
                : selectedProject === 'project3'
                ? [
                    '/images/optimized/project-3-video-editing-awareness-movie.webp',
                    '/images/optimized/project-3-video-editiing-awareness-movie-2.webp'
                  ]
                : ['/images/project-4-KeyedColors-logo.png', '/images/optimized/project-4-KeyedColors-profiles.webp']
            ).map((src, i) => (
              <motion.div
                key={src}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="rounded-lg overflow-hidden border bg-background"
              >
                <img src={src} alt={src} className="w-full h-auto object-contain" />
              </motion.div>
            ))}
          </div>
        )}
      </Modal>
    </div>
  )
}

export default Professional


