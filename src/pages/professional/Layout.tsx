import React, { useMemo, useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { Search, Home as HomeIcon, User, Briefcase, Youtube, Mail } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const NAV = [
  { to: '/professional', label: 'Overview', icon: HomeIcon, end: true },
  { to: '/professional/about', label: 'About', icon: User },
  { to: '/professional/projects', label: 'Projects', icon: Briefcase },
  { to: '/professional/youtube', label: 'YouTube', icon: Youtube },
  { to: '/professional/contact', label: 'Contact', icon: Mail },
];

const Layout: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const navigate = useNavigate();

  const items = useMemo(() => NAV.map(n => ({ title: n.label, to: n.to })), []);
  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return items;
    return items.filter(i => i.title.toLowerCase().includes(s));
  }, [q, items]);

  return (
    <div className="min-h-screen md:pl-56">
      <aside className="hidden md:flex fixed left-0 top-0 h-full w-56 border-r bg-background/80 backdrop-blur-sm z-30">
        <nav className="mt-20 w-full">
          <ul className="space-y-1 px-3">
            {NAV.map(({ to, label, icon: Icon, end }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={end}
                  className={({ isActive }) =>
                    `w-full flex items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors hover:bg-muted ${
                      isActive ? 'bg-muted text-primary' : 'text-foreground'
                    }`
                  }
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <button
        onClick={() => setOpen(true)}
        aria-label="Open search"
        className="fixed bottom-4 left-4 z-50 h-12 w-12 rounded-full bg-card border shadow-md flex items-center justify-center hover:shadow-lg transition-shadow hover:scale-[1.02]"
      >
        <Search className="h-5 w-5" />
      </button>

      <main>
        <Outlet />
      </main>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Search</DialogTitle>
          </DialogHeader>
          <div className="mt-2">
            <input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search pages..."
              className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            <div className="mt-3 max-h-72 overflow-y-auto divide-y">
              {results.map((r) => (
                <button
                  key={r.to}
                  onClick={() => {
                    setOpen(false);
                    navigate(r.to);
                  }}
                  className="w-full text-left px-2 py-2 hover:bg-muted rounded-md"
                >
                  <span className="text-sm font-medium">{r.title}</span>
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

export default Layout;


