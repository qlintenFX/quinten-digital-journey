import { ProfileCard } from './components/ProfileCard'
import { TechStack } from './components/TechStack'
import { WorkProcess } from './components/WorkProcess'
import { Projects } from './components/Projects'
import { techStack, projects, workProcess } from '../data/data'

export default function Home() {
  return (
    <main className="bg-[#121212] min-h-screen p-4 lg:p-8 font-['Inter']">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <ProfileCard />
        </div>
        <div className="lg:col-span-2">
          <TechStack techStack={techStack} />
        </div>
        <div className="lg:col-span-2">
          <WorkProcess workProcess={workProcess} />
        </div>
        <div className="lg:col-span-1">
          <Projects projects={projects} />
        </div>
      </div>
    </main>
  )
}
