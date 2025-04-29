import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Download, Printer, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CV: React.FC = () => {
  const navigate = useNavigate();
  
  const handlePrint = () => {
    window.print();
  };
  
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/files/CV_Quinten.pdf';
    link.download = 'CV_Quinten.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <div className="min-h-screen bg-background">
      {/* Controls - hidden when printing */}
      <div className="print:hidden sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b py-4">
        <div className="container max-w-4xl mx-auto flex justify-between items-center">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/')}
            className="flex items-center"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handlePrint}
              className="flex items-center"
            >
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
            <Button 
              variant="default" 
              size="sm" 
              onClick={handleDownload}
              className="flex items-center"
            >
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
          </div>
        </div>
      </div>
      
      {/* CV Content */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container max-w-4xl mx-auto py-8 px-4 print:p-0 print:max-w-none"
      >
        <div className="bg-card shadow-lg rounded-lg p-8 print:p-0 print:shadow-none print:bg-white">
          <h1 className="text-3xl font-bold text-center mb-8 pb-4 border-b-2 border-black print:text-black">Curriculum Vitae</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div>
              <strong className="text-black print:text-black">Name:</strong> Quinten
            </div>
            <div>
              <strong className="text-black print:text-black">Email:</strong> quinten1508@gmail.com
            </div>
            <div>
              <strong className="text-black print:text-black">Location:</strong> Belgium
            </div>
            <div>
              <strong className="text-black print:text-black">GitHub:</strong> github.com/qlintenFX
            </div>
          </div>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 pb-2 border-b border-gray-200 text-black print:text-black">Education</h2>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-1 text-black print:text-black">Applied Computer Science / Electronics - ICT</h3>
              <div className="italic text-muted-foreground mb-2">2023 - Present</div>
              <p><strong>Institution:</strong> KdG University of Applied Sciences and Arts</p>
              <p>Studying a comprehensive program focused on computer science and electronics with an emphasis on practical applications and industry-relevant skills.</p>
            </div>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-1 text-black print:text-black">Secondary Education</h3>
              <div className="italic text-muted-foreground mb-2">2017 - 2023</div>
              <p><strong>Institution:</strong> Secondary School</p>
              <p>Completed secondary education with a focus on Science and Mathematics.</p>
            </div>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 pb-2 border-b border-gray-200 text-black print:text-black">Skills</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-1 text-black print:text-black">Programming Languages</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {["JavaScript", "TypeScript", "HTML", "CSS", "Python"].map(skill => (
                    <span key={skill} className="px-2 py-1 bg-black/10 text-black rounded print:bg-gray-200 print:text-black">{skill}</span>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-1 text-black print:text-black">Technologies & Frameworks</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {["React", "Node.js", "Express", "Tailwind CSS", "Framer Motion"].map(skill => (
                    <span key={skill} className="px-2 py-1 bg-black/10 text-black rounded print:bg-gray-200 print:text-black">{skill}</span>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-1 text-black print:text-black">Tools</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {["Git", "VS Code", "GitHub", "Figma"].map(skill => (
                    <span key={skill} className="px-2 py-1 bg-black/10 text-black rounded print:bg-gray-200 print:text-black">{skill}</span>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-1 text-black print:text-black">Languages</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {["Dutch (Native)", "English (Fluent)"].map(skill => (
                    <span key={skill} className="px-2 py-1 bg-black/10 text-black rounded print:bg-gray-200 print:text-black">{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 pb-2 border-b border-gray-200 text-black print:text-black">Projects</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="mb-6 bg-muted/20 p-4 rounded-md print:bg-white print:border">
                <h3 className="text-xl font-semibold mb-1 text-black print:text-black">SKIL2 Semester 1 Project</h3>
                <div className="italic text-muted-foreground mb-2">Fall 2023</div>
                <p>Developed a web application using React and Node.js that allowed users to manage and visualize data effectively.</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {["React", "Node.js", "MongoDB"].map(tech => (
                    <span key={tech} className="px-1.5 py-0.5 text-xs bg-black/10 text-black rounded print:bg-gray-200 print:text-black">{tech}</span>
                  ))}
                </div>
              </div>
              
              <div className="mb-6 bg-muted/20 p-4 rounded-md print:bg-white print:border">
                <h3 className="text-xl font-semibold mb-1 text-black print:text-black">SKIL2 Semester 2 Project</h3>
                <div className="italic text-muted-foreground mb-2">Spring 2024</div>
                <p>Created a machine learning solution that analyzed and classified data, implementing various algorithms for optimal performance.</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {["Python", "TensorFlow", "OpenCV"].map(tech => (
                    <span key={tech} className="px-1.5 py-0.5 text-xs bg-black/10 text-black rounded print:bg-gray-200 print:text-black">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          </section>
          
          <section className="print:break-before-page mb-8">
            <h2 className="text-2xl font-semibold mb-4 pb-2 border-b border-gray-200 text-black print:text-black">Additional Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-1 text-black print:text-black">Hobbies & Interests</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Digital photography and editing</li>
                  <li>Creating content for YouTube</li>
                  <li>Racing simulation and game development</li>
                  <li>Open-source contributions</li>
                </ul>
              </div>
              
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-1 text-black print:text-black">Certifications</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Web Development Fundamentals (2022)</li>
                  <li>Introduction to Machine Learning (2023)</li>
                </ul>
              </div>
            </div>
          </section>
          
          {/* Footer with print date - visible only when printing */}
          <div className="hidden print:block text-center text-xs text-gray-500 mt-8 pt-4 border-t">
            <p>CV generated on {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CV; 