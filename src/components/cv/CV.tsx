import React from 'react';

const CV: React.FC = () => {
  return (
    <div className="bg-white text-black p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8 pb-4 border-b-2 border-primary">Curriculum Vitae</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div>
          <strong>Name:</strong> Quinten
        </div>
        <div>
          <strong>Email:</strong> quinten1508@gmail.com
        </div>
        <div>
          <strong>Location:</strong> Belgium
        </div>
        <div>
          <strong>GitHub:</strong> github.com/qlintenFX
        </div>
      </div>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 pb-2 border-b border-gray-200 text-primary">Education</h2>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-1 text-primary">Applied Computer Science / Electronics - ICT</h3>
          <div className="italic text-gray-600 mb-2">2023 - Present</div>
          <p><strong>Institution:</strong> KdG University of Applied Sciences and Arts</p>
          <p>Studying a comprehensive program focused on computer science and electronics with an emphasis on practical applications and industry-relevant skills.</p>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-1 text-primary">Secondary Education</h3>
          <div className="italic text-gray-600 mb-2">2017 - 2023</div>
          <p><strong>Institution:</strong> [Your Secondary School]</p>
          <p>Completed secondary education with a focus on [Your Focus Area].</p>
        </div>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 pb-2 border-b border-gray-200 text-primary">Skills</h2>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-1 text-primary">Programming Languages</h3>
          <p>JavaScript, HTML, CSS, Python, [Other languages you know]</p>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-1 text-primary">Technologies & Frameworks</h3>
          <p>React, Node.js, [Other frameworks/technologies]</p>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-1 text-primary">Tools</h3>
          <p>Git, VS Code, [Other tools]</p>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-1 text-primary">Languages</h3>
          <p>Dutch (Native), English (Fluent), [Other languages]</p>
        </div>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 pb-2 border-b border-gray-200 text-primary">Projects</h2>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-1 text-primary">SKIL2 Semester 1 Project</h3>
          <div className="italic text-gray-600 mb-2">Fall 2023</div>
          <p>Brief description of the project, your role, and the technologies used.</p>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-1 text-primary">SKIL2 Semester 2 Project</h3>
          <div className="italic text-gray-600 mb-2">Spring 2024</div>
          <p>Brief description of the project, your role, and the technologies used.</p>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-1 text-primary">Additional Project 1</h3>
          <div className="italic text-gray-600 mb-2">2024</div>
          <p>Brief description of the project, your role, and the technologies used.</p>
        </div>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 pb-2 border-b border-gray-200 text-primary">Achievements</h2>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-1 text-primary">Achievement 1</h3>
          <div className="italic text-gray-600 mb-2">Year</div>
          <p>Description of the achievement and its significance.</p>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-1 text-primary">Achievement 2</h3>
          <div className="italic text-gray-600 mb-2">Year</div>
          <p>Description of the achievement and its significance.</p>
        </div>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 pb-2 border-b border-gray-200 text-primary">Additional Information</h2>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-1 text-primary">Hobbies</h3>
          <p>[Your unique hobbies]</p>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-1 text-primary">References</h3>
          <p>Available upon request.</p>
        </div>
      </section>
    </div>
  );
};

export default CV; 