import React from 'react';
import { motion } from 'framer-motion';
import PortfolioSection from '@/components/communication-portfolio/PortfolioSection';
import SectionTitle from '@/components/communication-portfolio/SectionTitle';

// Temporarily comment out effects until TypeScript issues in effects.ts are resolved
// import {
//   GridDeformation,
//   PurpleSparkle,
//   LensFlare,
// } from '@/components/communication-portfolio/effects';

const CommunicationSkillsPortfolio: React.FC = () => {
  // Define the structure of your portfolio content here
  // This will be turned into a scrolling timeline
  const portfolioItems = [
    { id: 'front-page', title: 'Front Page', content: 'Content for Front Page (Personal Brand & Colors).' },
    { id: 'table-of-contents', title: 'Table of Contents', content: 'Table of Contents will be generated here.' },
    { id: 'reflection-personal', title: 'Personal Portfolio Reflection', content: '(250 - 500 words, in English) - Your personal reflection text here.' },
    { id: 'assignment-1', title: 'Assignment 1: Understanding my client', content: 'Summary of Assignment 1 (Report and business case excluded).' },
    { id: 'assignment-3', title: 'Assignment 3: Humanity in IT', content: 'Summary of Assignment 3.' },
    { id: 'assignment-4', title: 'Assignment 4: My cultural activity', content: 'Summary of Assignment 4.' },
    { id: 'assignment-5', title: 'Assignment 5: Intercultural workspaces', content: 'Summary of Assignment 5.' },
    { id: 'assignment-6', title: 'Assignment 6: My passport presentation', content: 'Summary of Assignment 6 (Multiple slides per page).' },
    { id: 'assignment-7', title: 'Assignment 7: My convincing and negotiating strategies', content: 'Summary of Assignment 7.' },
    { id: 'reflection-language', title: 'Reflection on Language Skills Improvement', content: '(250 - 500 words plus screenshots) - Your language skills reflection here.' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Background effects - Temporarily Commented Out */}
      {/* <GridDeformation /> */}
      {/* <PurpleSparkle count={8} /> */}
      {/* <LensFlare /> */}
      
      {/* Placeholder for a global header if needed (e.g., from your main layout) */}
      {/* <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <p className="font-bold">Communication Skills 2 Portfolio</p>
        </div>
      </header> */}

      <main className="flex-1 relative z-[2]"> {/* Ensure content is above background effects */}
        {/* Portfolio Introduction / Title Section */}
        <PortfolioSection id="portfolio-title" className="text-center pt-24 md:pt-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-4 text-primary">
              ⭐ Final Portfolio ⭐
            </h1>
            <p className="text-2xl md:text-3xl text-muted-foreground mb-8">
              Communication Skills 2
            </p>
            <p className="text-lg md:text-xl max-w-3xl mx-auto">
              Welcome to my Communication Skills 2 portfolio. This collection showcases my development and learning throughout the course, reflecting my progress in applying key communication concepts and skills.
            </p>
          </motion.div>
        </PortfolioSection>

        {/* Timeline Sections */} 
        {portfolioItems.map((item, index) => (
          <PortfolioSection key={item.id} id={item.id}>
            <SectionTitle>{item.title}</SectionTitle>
            <div className="max-w-4xl mx-auto">
              {/* Basic card styling for content - to be refined */}
              <motion.div
                className="bg-card p-6 md:p-8 rounded-xl shadow-lg hover:shadow-primary/20 transition-shadow duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.1 + (index * 0.05) }}
              >
                <p className="text-lg md:text-xl leading-relaxed">
                  {/* This is where the actual content from PDFs/your summaries will go.*/}
                  {/* For now, using placeholder based on assignment name or description. */}
                  {item.content || `Details for ${item.title} will be displayed here.`}
                </p>
                {/* If an item is an assignment that links to a PDF, you might add a button here later */}
                {/* e.g., if (item.title.includes("Assignment")) { ... } */}
              </motion.div>
            </div>
          </PortfolioSection>
        ))}
      </main>

      {/* Placeholder for a global footer */}
      {/* <footer className="py-8 border-t text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Quinten De Meyer. All Rights Reserved.</p>
      </footer> */}
    </div>
  );
};

export default CommunicationSkillsPortfolio; 