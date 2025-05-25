import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  PurpleSparkle, 
  KeywordHighlight, 
  SparkleText,
  GridDeformation
} from '@/components/presentation/Effects'; // Assuming Effects.tsx is in components/presentation
import { ChevronDown } from 'lucide-react';

// Helper function to check dark mode (can be moved to a utils file if not already)
function isDarkMode() {
  if (typeof window !== 'undefined') {
    return document.documentElement.classList.contains('dark');
  }
  return true; // Default to dark for SSR or non-browser environments
}

const TimelineItem: React.FC<{
  title: string;
  date?: string;
  description: React.ReactNode;
  isLast?: boolean;
  delay?: number;
}> = ({ title, date, description, isLast = false, delay = 0 }) => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    setIsDark(isDarkMode());
    const observer = new MutationObserver(() => setIsDark(isDarkMode()));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay } },
  };

  return (
    <motion.div 
      className="relative pl-12 pb-12"
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Dot */}
      <div 
        className={`absolute left-0 top-1 w-6 h-6 rounded-full border-4 shadow-md
                    ${isDark ? 'bg-purple-500 border-purple-300' : 'bg-primary-light-accent border-primary-light-accent/70'}`}
        style={isDark ? { boxShadow: '0 0 10px rgba(168, 85, 247, 0.7)'} : { boxShadow: '0 0 10px rgba(109, 40, 217, 0.5)'}}
      ></div>
      {/* Line */}
      {!isLast && (
        <div 
          className={`absolute left-[10px] top-8 bottom-0 w-1 
                      ${isDark ? 'bg-purple-400/30' : 'bg-primary-light-accent/40'}`}
        ></div>
      )}
      <div 
        className={`p-6 rounded-xl shadow-xl transition-all duration-300
                    ${isDark ? 'bg-card hover:shadow-purple-500/30' : 'bg-white hover:shadow-primary-light-accent/20 border border-gray-200'}`}
      >
        {date && (
          <p 
            className={`text-sm mb-2 font-semibold 
                        ${isDark ? 'text-purple-300' : 'text-primary-light-accent'}`}
          >
            {date}
          </p>
        )}
        <h3 
          className={`text-3xl font-bold mb-3 
                      ${isDark ? 'text-primary' : 'text-primary-light'}`}
        >
          {title}
        </h3>
        <div className={`text-lg ${isDark ? 'text-muted-foreground' : 'text-gray-700'}`}>
          {description}
        </div>
      </div>
    </motion.div>
  );
};

const Summary: React.FC = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Set initial theme
    setIsDark(isDarkMode());

    // Force light theme for this page if needed for specific design
    // For now, we let the global theme dictate, but ensure components adapt.
    // Example: document.documentElement.classList.remove('dark');

    // Observe theme changes
    const observer = new MutationObserver(() => {
      setIsDark(isDarkMode());
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);
  
  // Placeholder data for the timeline
  // Replace with actual content based on user's PDFs and input
  const timelineData = [
    { 
      title: "⭐ Final portfolio Communication Skills 2 ⭐", 
      date: "Due: Fri, 30 May 2025",
      description: (
        <>
          <p className="mb-3">This page summarizes the journey and assignments for the Final Portfolio in Communication Skills 2.</p>
          <p className="mb-2"><KeywordHighlight>Key requirements:</KeywordHighlight> Personal brand consistency, well-cared for PDF, specific content inclusions, and reflections.</p>
          <p>Grading includes personal brand, table of contents, introduction, assignment presentation, and language skills reflection.</p>
        </>
      ) 
    },
    { 
      title: "Front Page & Personal Brand", 
      description: <p>The portfolio will begin with a front page reflecting my established personal brand and color scheme. <SparkleText>Visual consistency</SparkleText> is key.</p> 
    },
    { 
      title: "Table of Contents",
      description: <p>A clear, neat table of contents with page numbers for easy navigation.</p> 
    },
    { 
      title: "Personal Portfolio Reflection", 
      date: "250-500 words",
      description: <p>Reflecting on the overall purpose of the portfolio, key learning outcomes, significant accomplishments, and personal/academic growth throughout the course. <KeywordHighlight>Placeholder for user content.</KeywordHighlight></p> 
    },
    { 
      title: "Assignment 1: Understanding my client", 
      description: <p>Summary of the assignment, excluding the full report and business case. <KeywordHighlight>Placeholder for user content.</KeywordHighlight></p> 
    },
    { 
      title: "Assignment 3: Humanity in IT", 
      description: <p>Summary of the assignment. <KeywordHighlight>Placeholder for user content.</KeywordHighlight></p> 
    },
    { 
      title: "Assignment 4: My cultural activity", 
      description: <p>Summary of the assignment. <KeywordHighlight>Placeholder for user content.</KeywordHighlight></p> 
    },
    { 
      title: "Assignment 5: Intercultural workspaces", 
      description: <p>Summary of the assignment. <KeywordHighlight>Placeholder for user content.</KeywordHighlight></p> 
    },
    { 
      title: "Assignment 6: My passport presentation", 
      description: <p>Summary of the passport presentation, ideally with key slides or concepts presented concisely (multiple slides per page format noted). <KeywordHighlight>Placeholder for user content.</KeywordHighlight></p> 
    },
    { 
      title: "Assignment 7: My convincing and negotiating strategies", 
      description: <p>Summary of the assignment. <KeywordHighlight>Placeholder for user content.</KeywordHighlight></p> 
    },
    { 
      title: "Reflection on language skills improvement", 
      date: "250-500 words + screenshots",
      description: <p>Discussion on language skill improvement, initial mistakes, learning points, online test scores (before and after), and hardest exercises, supported by screenshots. <KeywordHighlight>Placeholder for user content.</KeywordHighlight></p> 
    },
     { 
      title: "Portfolio Finalization Tips", 
      description: (
        <>
          <p className="mb-2">Ensuring the introduction sets the tone and reflects on growth.</p>
          <p className="mb-2">Detailing language skill improvements with evidence.</p>
          <p className="mb-2">Applying <SparkleText>personal brand</SparkleText> throughout the entire document.</p>
          <p>Proofreading and spell-checking for a polished submission.</p>
        </>
      )
    },
  ];

  // Define light mode theme properties explicitly for this page
  // These would ideally come from a theme context or Tailwind config
  const lightThemeColors = {
    background: 'bg-gray-50', // Light gray background
    text: 'text-gray-800',
    primary: 'text-purple-700', // Slightly darker purple for text
    primaryAccent: 'text-purple-600', // For highlights, icons
    cardBackground: 'bg-white',
    cardBorder: 'border-gray-200',
    mutedText: 'text-gray-600',
  };
  
  // Tailwind classes for primary colors in light mode, for easy use
  const primaryLight = 'text-purple-700'; // For main headings, important text
  const primaryLightAccent = 'text-purple-600'; // For icons, sub-headings, borders

  return (
    <div className={`flex flex-col min-h-screen relative ${isDark ? 'dark bg-background' : `${lightThemeColors.background} ${lightThemeColors.text}`}`}>
      {/* Background Effects Layer - Z Index 0 */}
      <div className="fixed inset-0 z-0">
        {/* Conditional Gradient: More subtle for light mode */}
        <div 
          className={`absolute inset-0 ${isDark ? 'bg-gradient-to-b from-background to-cyber-light/10' : 'bg-gradient-to-b from-gray-50 to-purple-50/10'}`} 
        />
        {/* Conditional Radial Gradient: Adjusted for light mode visibility */}
        <div 
          className={`absolute inset-0 ${isDark ? 'bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.05)_0%,transparent_50%)]' : 'bg-[radial-gradient(circle_at_50%_50%,rgba(109,40,217,0.03)_0%,transparent_60%)]'}`}
        />
      </div>

      {/* Interactive Grid Background - Z Index -10 (behind content, above static background) */}
      <GridDeformation /> 
      
      {/* Sparkles and Lens Flare - Z Index 5 and 10 (above grid, below main content) */}
      <PurpleSparkle count={isDark ? 10 : 5} /> {/* Fewer sparkles in light mode for subtlety */}

      {/* Main Content - Z Index 2 (ensure it's above background effects) */}
      <main className="container mx-auto px-4 py-16 sm:px-6 lg:px-8 relative z-[2] flex-grow">
        <header className="text-center mb-20">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className={`text-5xl md:text-7xl font-bold mb-6 ${isDark ? 'text-white' : primaryLight}`}
          >
            My Portfolio <SparkleText className={isDark ? '' : primaryLightAccent}>Journey</SparkleText>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className={`text-xl md:text-2xl ${isDark ? 'text-muted-foreground' : lightThemeColors.mutedText}`}
          >
            A summary of my work for Communication Skills 2.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className={`mt-10 text-center ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
            onClick={() => {
              const firstItem = document.getElementById('timeline-start');
              if (firstItem) {
                firstItem.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => e.key === 'Enter' && (e.target as HTMLElement).click()}
          >
            <p className="italic mb-2">Scroll to explore</p>
            <ChevronDown className={`mx-auto animate-bounce ${isDark ? 'text-purple-400' : primaryLightAccent}`} size={28} />
          </motion.div>
        </header>

        {/* Timeline Section */}
        <div className="max-w-3xl mx-auto" id="timeline-start">
          {timelineData.map((item, index) => (
            <TimelineItem
              key={index}
              title={item.title}
              date={item.date}
              description={item.description}
              isLast={index === timelineData.length - 1}
              delay={index * 0.15} // Stagger animation
            />
          ))}
        </div>
      </main>

      <footer className={`text-center py-8 relative z-[2] ${isDark ? 'text-muted-foreground' : lightThemeColors.mutedText}`}>
        <p>&copy; {new Date().getFullYear()} Quinten De Meyer. All rights reserved.</p>
        <p>Portfolio Summary Page</p>
      </footer>
    </div>
  );
};

export default Summary; 