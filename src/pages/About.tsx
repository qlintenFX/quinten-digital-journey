import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, ExternalLink } from 'lucide-react';

const About = () => {
  const [activeTab, setActiveTab] = useState('intro');
  
  return (
    <>
      {/* Header Section */}
      <section className="bg-gradient-to-b from-black to-background py-16">
        <div className="container">
          <h1 className="text-center mb-6">About Me</h1>
          <p className="text-lg text-center text-muted-foreground max-w-3xl mx-auto">
            Get to know more about my background, skills, and aspirations in the field of Cloud and Cybersecurity.
          </p>
        </div>
      </section>

      {/* Main Content Tabs - First alternating section */}
      <section className="section relative z-[2] before:content-[''] before:absolute before:inset-0 before:bg-black/10 dark:before:bg-black/30 before:-z-[1] py-24">
        <div className="container">
          <Tabs defaultValue="intro" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="grid grid-cols-3 w-full max-w-md">
                <TabsTrigger value="intro">Introduction</TabsTrigger>
                <TabsTrigger value="hobbies">Hobbies</TabsTrigger>
                <TabsTrigger value="ambitions">Ambitions</TabsTrigger>
              </TabsList>
            </div>

            {/* Personal Introduction Tab */}
            <TabsContent value="intro">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                  <h2 className="mb-6 text-black dark:text-white">Personal Introduction</h2>
                  <p className="mb-6 text-lg">
                    [Placeholder: Short biography focusing on my educational background, key interests in
                    technology, and what drives me professionally.]
                  </p>
                  <div className="mb-8">
                    <h3 className="mb-4">Why I Chose Applied Computer Science / Electronics - ICT</h3>
                    <p className="text-muted-foreground">
                      [Placeholder: Personal story about why I chose this specific field of study, what
                      aspects particularly interest me, and how it aligns with my career goals and
                      personal interests.]
                    </p>
                  </div>
                  <Button 
                    variant="default" 
                    onClick={() => setActiveTab("hobbies")}
                  >
                    Learn About My Hobbies
                  </Button>
                </div>
                <div className="flex flex-col gap-8 items-center">
                  <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-black">
                    <img 
                      src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" 
                      alt="Placeholder professional photo" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <Card className="w-full">
                    <CardHeader>
                      <CardTitle className="text-center">Professional Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        <li className="flex items-center gap-2">
                          <span className="text-black dark:text-white font-semibold">Specialization:</span>
                          <span>Cloud and Cybersecurity</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-black dark:text-white font-semibold">Program:</span>
                          <span>Applied Computer Science / Electronics - ICT</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-black dark:text-white font-semibold">Current Focus:</span>
                          <span>[Placeholder: Current academic or project focus]</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Hobbies Tab */}
            <TabsContent value="hobbies">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-center mb-10 text-black dark:text-white">My Unique Hobbies</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {/* Hobby Card 1 */}
                  <Card>
                    <CardHeader>
                      <CardTitle>[Placeholder: Unique Hobby 1]</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        [Placeholder: Description of how I engage with this hobby, what I enjoy about it,
                        and perhaps how it connects to my professional interests.]
                      </p>
                    </CardContent>
                  </Card>
                  
                  {/* Hobby Card 2 */}
                  <Card>
                    <CardHeader>
                      <CardTitle>[Placeholder: Unique Hobby 2]</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        [Placeholder: Description of how I engage with this hobby, what I enjoy about it,
                        and perhaps how it connects to my professional interests.]
                      </p>
                    </CardContent>
                  </Card>
                  
                  {/* Hobby Card 3 */}
                  <Card>
                    <CardHeader>
                      <CardTitle>[Placeholder: Unique Hobby 3]</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        [Placeholder: Description of how I engage with this hobby, what I enjoy about it,
                        and perhaps how it connects to my professional interests.]
                      </p>
                    </CardContent>
                  </Card>
                </div>
                <div className="mt-10 flex justify-center">
                  <Button 
                    variant="default"
                    onClick={() => setActiveTab("ambitions")}
                  >
                    View My Ambitions
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Dreams & Professional Ambitions Tab */}
            <TabsContent value="ambitions">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-center mb-10 text-black dark:text-white">Dreams & Professional Ambitions</h2>
                <Card className="mb-10">
                  <CardContent className="pt-6">
                    <p className="text-lg mb-6">
                      [Placeholder: Text about my short-term and long-term career goals in the field of cybersecurity and cloud computing,
                      what impact I hope to make in the industry, and the specific areas I want to specialize in as my
                      career develops.]
                    </p>
                    <p className="text-lg">
                      [Placeholder: More specific information about certifications I plan to pursue, roles I aspire to,
                      and technologies I'm particularly interested in mastering.]
                    </p>
                  </CardContent>
                </Card>

                <div className="flex justify-center">
                  <Button 
                    variant="default"
                    onClick={() => setActiveTab("intro")}
                  >
                    Back to Introduction
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CV Section - Second alternating section with different background */}
      <section className="py-24 relative z-[2] before:content-[''] before:absolute before:inset-0 before:bg-black/10 dark:before:bg-black/30 before:-z-[1]">
        <div className="container">
          <h2 className="text-center mb-10">Curriculum Vitae</h2>
          <p className="text-center mb-8 max-w-3xl mx-auto">
            Interested in my qualifications and professional background? View or download my CV below.
          </p>
          <div className="flex justify-center">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="mr-4">
                  <ExternalLink className="mr-2 h-4 w-4" /> View CV
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl h-[80vh]">
                <DialogHeader>
                  <DialogTitle>Curriculum Vitae</DialogTitle>
                </DialogHeader>
                <div className="flex-1 overflow-auto">
                  <iframe 
                    src="/files/CV_Quinten.html" 
                    className="w-full h-full min-h-[60vh] border-0" 
                    title="CV Preview"
                  />
                </div>
              </DialogContent>
            </Dialog>
            <Button variant="default">
              <Download className="mr-2 h-4 w-4" /> Download CV
            </Button>
          </div>
        </div>
      </section>

      {/* Skills Section - Third alternating section */}
      <section className="py-24 relative z-[2] before:content-[''] before:absolute before:inset-0 before:bg-black/10 dark:before:bg-black/30 before:-z-[1]">
        <div className="container">
          <h2 className="text-center mb-10">Technical Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Skill Category 1 */}
            <Card>
              <CardHeader>
                <CardTitle>Programming Languages</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center justify-between">
                    <span>JavaScript/TypeScript</span>
                    <span className="text-black dark:text-white">Advanced</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Python</span>
                    <span className="text-black dark:text-white">Intermediate</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>C#</span>
                    <span className="text-black dark:text-white">Intermediate</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            {/* Skill Category 2 */}
            <Card>
              <CardHeader>
                <CardTitle>Cloud Technologies</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center justify-between">
                    <span>AWS</span>
                    <span className="text-black dark:text-white">Intermediate</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Azure</span>
                    <span className="text-black dark:text-white">Basic</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Docker</span>
                    <span className="text-black dark:text-white">Intermediate</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            {/* Skill Category 3 */}
            <Card>
              <CardHeader>
                <CardTitle>Cybersecurity</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center justify-between">
                    <span>Network Security</span>
                    <span className="text-black dark:text-white">Intermediate</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Penetration Testing</span>
                    <span className="text-black dark:text-white">Basic</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Security Auditing</span>
                    <span className="text-black dark:text-white">Basic</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
