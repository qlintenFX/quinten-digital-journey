import React from 'react';
import { motion } from 'framer-motion';

// Helper component for consistent page styling
const PageSection: React.FC<{ title: string; id: string; children: React.ReactNode; className?: string }> = ({ title, id, children, className }) => (
  <motion.div
    id={id}
    className={`min-h-screen py-16 px-4 md:px-8 lg:px-12 flex flex-col justify-center ${className}`}
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.7 }}
  >
    <div className="max-w-4xl mx-auto w-full bg-white shadow-2xl rounded-xl p-8 md:p-12">
      <h2 className="text-4xl font-bold mb-8 text-purple-700 border-b-4 border-purple-300 pb-4">{title}</h2>
      <div className="prose prose-lg max-w-none text-gray-800">
        {children}
      </div>
    </div>
  </motion.div>
);

const PortfolioSummaryA4: React.FC = () => {
  const sections = [
    { id: "introduction", title: "Personal Portfolio Reflection" },
    { id: "assignment1", title: "Assignment 1: Understanding My Client" },
    { id: "assignment3", title: "Assignment 3: Humanity in IT" },
    { id: "assignment4", title: "Assignment 4: My Cultural Activity" },
    { id: "assignment5", title: "Assignment 5: Intercultural Workspaces" },
    { id: "assignment6", title: "Assignment 6: My Passport Presentation" },
    { id: "assignment7", title: "Assignment 7: My Convincing and Negotiating Strategies" },
    { id: "language-reflection", title: "Reflection on Language Skills Improvement" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-indigo-100 selection:bg-purple-300 selection:text-purple-900">
      <motion.header 
        className="text-center py-10 md:py-16"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 mb-4">
          ⭐ Final Portfolio Communication Skills 2 ⭐
        </h1>
        <p className="text-2xl md:text-3xl text-gray-700 font-medium">
          Portfolio Summary
        </p>
      </motion.header>

      <motion.nav 
        className="sticky top-0 z-50 bg-white/70 backdrop-blur-lg shadow-lg py-4 px-4 md:px-8 mb-8"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-purple-700 mb-3 text-center md:text-left">Table of Contents</h2>
          <ul className="flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-2">
            {sections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`} className="text-lg text-purple-600 hover:text-pink-500 hover:underline transition-colors duration-300 font-medium">
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </motion.nav>

      <main>
        <PageSection title="Personal Portfolio Reflection" id="introduction">
          <p className="text-center text-xl text-gray-600">
            <em>Please replace this placeholder with your 250-500 word reflection.</em>
          </p>
          <div className="mt-6 p-4 bg-purple-50 rounded-md">
            <h4 className="font-semibold text-purple-700">Prompts to consider (from rubric):</h4>
            <ul className="list-disc pl-6 mt-2 text-gray-700 space-y-1">
              <li>What stuck with you?</li>
              <li>Which assignment are you most/least proud of?</li>
              <li>What did you like and dislike about the course in general?</li>
            </ul>
          </div>
        </PageSection>

        <PageSection title="Assignment 1: Understanding My Client" id="assignment1">
          <h3 className="text-2xl font-semibold text-purple-600 mb-3">First Impressions & Preparation (Quinten De Meyer)</h3>
          <p>To make a good first impression, I focus on punctuality, appropriate formal attire, and a calm, confident demeanor. A firm handshake, steady speech, open body language, and maintaining eye contact are key. Most importantly, I listen attentively and respond thoughtfully.</p>
          
          <h3 className="text-2xl font-semibold text-purple-600 mt-6 mb-3">Team Approach to Client Workshops</h3>
          <p>Our team prioritizes punctuality, appropriate and consistent attire, and advance preparation of materials. We ensure everyone interacts with the client and that phone notifications are off. We aim to greet the client professionally.</p>
          <p>Key questions for the first workshop revolve around understanding the client's main problem in depth, and their expected short-term and long-term results from the team.</p>
          
          <h3 className="text-2xl font-semibold text-purple-600 mt-6 mb-3">Client Demo Preparation & Questions</h3>
          <p>For client demos, we ensure everyone is present and dressed properly. We outline key topics and assign a note-taker. Proper introductions and a summary of the discussion are important to ensure alignment with the client.</p>
          <p>Specific questions for the IT-polis event demo included event timing, duration, number of stands and attendees, student voter identification (e.g., NFC tags, codes), and the number of voting stands required.</p>

          <h3 className="text-2xl font-semibold text-purple-600 mt-6 mb-3">Professional Growth from Client Communication</h3>
          <p>We learned that thorough preparation is highly beneficial. For the future, the team aims to ask fewer but more impactful questions and improve introductions and summarizations.</p>
        </PageSection>

        <PageSection title="Assignment 3: Humanity in IT" id="assignment3">
          <h3 className="text-2xl font-semibold text-purple-600 mb-3">First Reflections on Cultural Appropriation (Quinten De Meyer)</h3>
          <p>I realized I had unknowingly appropriated Saudi Drifting culture (Hajwala/Tafheet) by creating game videos and using incorrect music, without malicious intent, but now see how it could be damaging to Saudi Arabian car culture.</p>
          
          <h3 className="text-2xl font-semibold text-purple-600 mt-6 mb-3">Research: The Impact of IT on Political Activism (Quinten De Meyer's Perspective)</h3>
          <p>Social media is the easiest way to find information from individuals and global media. IT connects everyone, allowing sharing of opinions and information, which is a double-edged sword. I dislike how misinformation and disinformation spread easily, potentially harming many by providing wrong perspectives. Propaganda is easier to spread, and AI can convincingly manipulate footage, with potentially harmful impacts.</p>
          <p>IT has transformed political activism, making it easier to organize and spread awareness. However, it also leads to misinformation and surveillance. IT is a powerful tool but needs careful use.</p>

          <h3 className="text-2xl font-semibold text-purple-600 mt-6 mb-3">Growth as an IT Professional (Quinten De Meyer)</h3>
          <p>I've learned how IT both helps and endangers activists and online users. Post-graduation, I will use IT responsibly, avoid spreading misinformation, and instruct others on internet safety measures. I'll take privacy seriously in personal and professional settings, using secure tools and promoting ethical practices. I will be mindful of cultural aspects in IT, reflecting on past experiences like my cultural appropriation of Saudi drifting. This awareness helps me spot cultural appropriation and other malpractices. I aim to continuously educate myself and others on ethical IT practices for a more inclusive online environment.</p>
        </PageSection>

        <PageSection title="Assignment 4: My Cultural Activity (Dossin Kazerne Reflection)" id="assignment4">
          <p>My visit to the Dossin Kazerne was a profound experience. Through my self-reflection (originally a video), I learned a lot about Belgium's role during the Holocaust and how history offers crucial lessons to prevent such atrocities in the future.</p>
          <p>It's vital to critically reflect on the impact of propaganda and antisemitism, as dehumanization unfortunately still exists in various forms today. This experience underscored the importance of cultural empathy and understanding the warnings from the past to ensure such events are never repeated.</p>
          <div className="mt-4 p-3 bg-purple-50 rounded-md">
            <h4 className="font-semibold text-purple-700">Key Points:</h4>
            <ul className="list-disc pl-6 mt-1 text-gray-700 space-y-1">
              <li>Learnings: Belgium's role, history's warning for modern society.</li>
              <li>Current Situation Relevance: Impact of propaganda & antisemitism, ongoing dehumanization.</li>
              <li>Core Message: Importance of cultural empathy.</li>
            </ul>
          </div>
        </PageSection>
        
        <PageSection title="Assignment 5: Intercultural Workspaces" id="assignment5">
          <h3 className="text-2xl font-semibold text-purple-600 mb-3">Barnga Game Reflection (Quinten De Meyer)</h3>
          <p>I predicted different rules for each table. It went well; it wasn't frustrating because if you cheat with confidence and act like you won, opponents can't criticize. They assume you won by your rules. I even "stole" a win once by disagreeing and acting like I won, and the other player believed me.</p>

          <h3 className="text-2xl font-semibold text-purple-600 mt-6 mb-3">Intercultural Body Language: Saudi Arabia vs. India (Summary)</h3>
          <p>Research highlighted distinct body language norms. For instance, greetings in Saudi Arabia involve brief handshakes among men (rare between genders unless initiated by women) and placing the right hand over the heart for sincerity. India commonly uses the "namaste" gesture. Eye contact norms also differ significantly based on gender and hierarchy. Gestures like beckoning and attitudes towards showing soles of feet vary. Personal space and touch are strictly gender-based in Saudi Arabia, while India's norms vary between urban and rural settings.</p>

          <h3 className="text-2xl font-semibold text-purple-600 mt-6 mb-3">Hofstede's Dimensions (Quinten De Meyer's Opinions/Reflections)</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Power Distance (Malaysia):</strong> While high PDI can create social stability and clear responsibilities, I think it may hinder creativeness in work environments where collaborative problem-solving is important, as people might be too scared to share their views. (Stability and structure at the cost of creativeness and equality).</li>
            <li><strong>Long-Term Orientation (Japan):</strong> While I respect the discipline and planning behind Japan's high LTO, it honestly sounds exhausting. The expectation for employees to stay late if the boss does, or join for drinks, reflects a level of social obligation and pressure that explains burnout. It's a system valuing long-term gains, seemingly at the cost of personal well-being.</li>
          </ul>
          
          <h3 className="text-2xl font-semibold text-purple-600 mt-6 mb-3">Reflections on International Days & Sophie Mirgaux Lecture (Quinten De Meyer)</h3>
          <p><strong>International Days:</strong> I liked the team project, especially working with students from different study programs (e.g., agriculture, business), which brought diverse knowledge. However, the lectures felt more like promotional ads. The lack of international students in my team meant we largely shared Belgian culture, and foreign teachers' input didn't feel culturally distinct. It was a fun learning experience in teamwork but didn't feel like a truly multicultural international day, more like a forced "work in English" day.</p>
          <p><strong>Sophie Mirgaux Lecture:</strong> Sophie Mirgaux (Belgium's Special Envoy for the Ocean) acts as the ocean's voice in UN negotiations. She discussed Belgium's maritime activities (windmills, research, conservation) and the challenges of negotiating in the EU's rotating presidency system, emphasizing the need for well-prepared proposals. A key takeaway was the environmental message: waste ending up in the ocean affects us all, encouraging recycling.</p>

          <h3 className="text-2xl font-semibold text-purple-600 mt-6 mb-3">General Learnings & Future Career (Quinten De Meyer)</h3>
          <p>This assignment showed me how much culture affects work, thought, and communication. Different countries have different values (power, emotions, personal space) that matter in teamwork, especially with diverse cultures. What stood out most was the utility of working with people from different backgrounds/fields; everyone brings something different, strengthening the end result and adding perspectives. I learned not just facts but also how to be more aware and flexible, which I believe will help in any future job.</p>
        </PageSection>

        <PageSection title="Assignment 6: My Passport Presentation" id="assignment6">
          <p className="mb-4">This presentation summarized key learnings and reflections from the Communication Skills 2 course. The main sections included:</p>
          <div className="space-y-3">
            <div>
              <h4 className="text-xl font-semibold text-purple-500">Humanity in IT:</h4>
              <ul className="list-disc pl-7 mt-1 text-gray-700">
                <li>IT and Political Activism: Internet for activism & awareness (social media, encrypted apps). Risks: misinformation, surveillance.</li>
                <li>Benefits & Dangers of IT: Misinformation spreads fast, surveillance tools, need for ethical IT use.</li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-purple-500">Cultural Activity - Dossin Kazerne:</h4>
              <ul className="list-disc pl-7 mt-1 text-gray-700">
                <li>Created a self-reflection video.</li>
                <li>Learned about Belgium's role and history's warning for modern society.</li>
                <li>Current Situation Relevance: Impact of propaganda & antisemitism, dehumanization still exists, importance of cultural empathy.</li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-purple-500">Intercultural Workspaces:</h4>
              <ul className="list-disc pl-7 mt-1 text-gray-700">
                <li>Body Language: Eye contact, rules and standards (e.g., Saudi Arabia, India).</li>
                <li>Cultural Dimensions (Hofstede): Malaysia (Power Distance), Japan (Long-Term Orientation), Mexico (Indulgence). Cultural impact on work & values.</li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-purple-500">My Growth:</h4>
              <ul className="list-disc pl-7 mt-1 text-gray-700">
                <li>More aware of bias, appropriation.</li>
                <li>Ethical use of IT – Future.</li>
                <li>Stronger intercultural communication & awareness.</li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-purple-500">What's Next?</h4>
              <ul className="list-disc pl-7 mt-1 text-gray-700">
                <li>Work in international teams.</li>
                <li>Culture shock preparation.</li>
                <li>Keep learning, growing, mentoring.</li>
                <li>Promote inclusion & ethics in IT.</li>
              </ul>
            </div>
          </div>
        </PageSection>
        
        <PageSection title="Assignment 7: My Convincing and Negotiating Strategies" id="assignment7">
          <h3 className="text-2xl font-semibold text-purple-600 mb-3">Convincing Others (Quinten De Meyer)</h3>
          <p>I learned that relationships, trust, and mutual understanding are crucial in negotiations, not just the arguments. The hardest tactic for me is emotional appeal, as I'd feel inauthentic; I prefer building pressure through other means like highlighting rarity or a final chance. I favor logical reasoning over emotional appeals, as it uses facts rather than opinions and feels less like weaponization. Ethical boundaries are vital, especially with high stakes; one shouldn't be fully misleading or withhold critical information.</p>

          <h3 className="text-2xl font-semibold text-purple-600 mt-6 mb-3">Negotiation & The $2 Game (Quinten De Meyer)</h3>
          <p>I learned I was effective at finding holes and solutions in others' stories for my gain, allowing me to control the narrative. The time limit helped me pressure for quick deals. Repeating negotiations with the same person allowed me to reuse successful tactics. I observed that participants often prioritized winning the game's money goal over logical solutions to their narrative problems, which I felt was not playing correctly.
          Tactics I subconsciously used include: Anchoring, Framing, Hardball tactics (exploiting time pressure, ignoring their story), and making small Concessions after a high initial offer. These are inappropriate if they involve unethical deception or in integrative negotiations requiring trust. If I could change my actions, I might have conceded more easily if the other party wouldn't budge, to achieve a lose/win over a lose/lose.</p>
          
          <h3 className="text-2xl font-semibold text-purple-600 mt-6 mb-3">Growth as an IT Professional in Ethical Negotiation (Quinten De Meyer)</h3>
          <p>I learned to be careful with convincing and negotiating, especially at work, without crossing ethical lines just to win. Lying or hiding important info will backfire. In IT, overselling or hiding bugs ruins trust. I'm okay with "playing the game" (pressure, urgency, bluffing) but wouldn't mislead to a damaging extent. If faced with unethical tactics, I'd call it out or push back. I'll stick to smart strategies like anchoring, framing, and using time pressure. Being sharp and confident is better than always being the "nice guy." My favorite strategy when buying is to feign disinterest, point out flaws, and make a lowball offer, often leading to acceptance as the seller fears losing the sale.</p>
        </PageSection>

        <PageSection title="Reflection on Language Skills Improvement" id="language-reflection" className="pb-20"> {/* Added more bottom padding for last item */}
          <p>I completed the language exercises and the online exercises, and I scored pretty well. I didn't find this part particularly new or challenging as I've encountered similar material in secondary school (middelbare school). However, it was a good opportunity to refresh and confirm that I've retained my understanding of English grammar and spelling rules.</p>
          <div className="mt-6 p-4 bg-purple-50 rounded-md">
            <h4 className="font-semibold text-purple-700">To fully address the assignment requirements (250-500 words), please consider expanding on:</h4>
            <ul className="list-disc pl-6 mt-2 text-gray-700 space-y-1">
              <li>Which mistakes did you make at first (if any)?</li>
              <li>What specific things did you learn or re-learn?</li>
              <li>How did you score on your online tests at first and then again later (if applicable)?</li>
              <li>Which exercises did you find hardest?</li>
              <li>Remember to include screenshots from your language exercises or online tests to support your answer.</li>
            </ul>
          </div>
        </PageSection>
      </main>

      <footer className="text-center py-10 border-t border-purple-300 bg-gradient-to-r from-purple-100 via-pink-50 to-indigo-100">
        <p className="text-gray-700 font-medium">&copy; {new Date().getFullYear()} Quinten De Meyer. Portfolio Summary.</p>
      </footer>
    </div>
  );
};

export default PortfolioSummaryA4;
