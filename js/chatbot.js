// js/chatbot.js — AI Career Advisor Chatbot

let chatOpen = false;
let chatHistory = [];

const CAREER_RESPONSES = {
  greet: ["Hello! I'm your AI Career Advisor. Ask me anything about skills, salaries, career paths, resume tips, or interview prep!", "நான் உங்கள் AI தொழில் ஆலோசகர். திறன்கள், சம்பளங்கள், தொழில் பாதைகள் பற்றி கேளுங்கள்!"],
  skill: ["For Frontend Developer roles, focus on: React.js, TypeScript, CSS/Tailwind, Git, and basic Node.js. These 5 skills cover 80% of job requirements in India.", "For Data Analyst roles, master: SQL, Python (pandas), Excel, Power BI or Tableau, and statistics basics."],
  salary: ["Entry-level Frontend Developer salaries in India range from ₹3–6 LPA. With 2 years experience, expect ₹6–12 LPA at product companies.", "Data Analyst freshers earn ₹3–5 LPA. Senior roles at top companies pay ₹8–15 LPA."],
  resume: ["Top ATS tips: 1) Use standard headings like 'Experience', 'Skills', 2) Add keywords from the job description, 3) Quantify achievements (e.g., 'reduced load time by 40%'), 4) Keep it to 1 page for freshers.", "Your resume score improves most by adding measurable results to every bullet point. Replace 'worked on React' with 'built 3 React dashboards used by 500+ users'."],
  interview: ["Common fresher interview questions: 1) Tell me about yourself, 2) What are your strengths/weaknesses, 3) Why this company?, 4) A technical question from your resume, 5) Where do you see yourself in 5 years.", "Practice STAR method for behavioral questions: Situation, Task, Action, Result. Keep answers under 2 minutes."],
  career: ["Popular career paths for CS freshers in India: Frontend Dev → Senior Dev → Tech Lead → Engineering Manager. OR: Data Analyst → Data Scientist → ML Engineer. Both paths offer excellent growth.", "The fastest-growing roles right now: AI/ML Engineer, Full Stack Developer, Cloud Engineer, and Cybersecurity Analyst."],
  fraud: ["Warning signs of fake jobs: 1) No company website, 2) Too-good-to-be-true salary, 3) Gmail/Yahoo email (not company email), 4) Asking for payment or personal ID upfront, 5) Vague job description.", "Always verify a company on LinkedIn, MCA India (for registered companies), and Glassdoor before applying."],
  mentor: ["To get the most from a mentor: 1) Come prepared with specific questions, 2) Set clear goals for each session, 3) Follow up after sessions, 4) Implement their advice and report back.", "Finding mentors: LinkedIn, Alumni networks, Coding communities like GitHub, your college alumni network are the best starting points."],
  default: ["Great question! As a fresher in India, focus on building 2-3 strong projects and getting your first internship. That experience is worth more than any certification on your resume.", "I'd suggest visiting the Job Search page to see AI-matched opportunities for your specific skills. The Skill Gap Analyzer will also show you exactly what to learn next!"]
};

function getAIResponse(msg) {
  const m = msg.toLowerCase();
  if (m.match(/hello|hi|hey|வணக்கம்|நமஸ்கார/)) return CAREER_RESPONSES.greet[Math.random() > .5 ? 0 : 1];
  if (m.match(/skill|learn|study|திறன்|கற்க/)) return CAREER_RESPONSES.skill[Math.floor(Math.random() * 2)];
  if (m.match(/salary|pay|lpa|ctc|சம்பள/)) return CAREER_RESPONSES.salary[Math.floor(Math.random() * 2)];
  if (m.match(/resume|cv|ats|ரெஸ்யூம்/)) return CAREER_RESPONSES.resume[Math.floor(Math.random() * 2)];
  if (m.match(/interview|question|நேர்காணல்/)) return CAREER_RESPONSES.interview[Math.floor(Math.random() * 2)];
  if (m.match(/career|path|future|grow|தொழில்/)) return CAREER_RESPONSES.career[Math.floor(Math.random() * 2)];
  if (m.match(/fake|fraud|scam|மோசடி/)) return CAREER_RESPONSES.fraud[Math.floor(Math.random() * 2)];
  if (m.match(/mentor|guide|வழிகாட்/)) return CAREER_RESPONSES.mentor[Math.floor(Math.random() * 2)];
  return CAREER_RESPONSES.default[Math.floor(Math.random() * 2)];
}

function toggleChat() {
  chatOpen = !chatOpen;
  const win = document.getElementById('chatWindow');
  if (!win) return;
  win.style.display = chatOpen ? 'block' : 'none';
  if (chatOpen && chatHistory.length === 0) {
    addMessage('bot', "👋 Hi! I'm your AI Career Advisor. Ask me about skills to learn, salary expectations, resume tips, interview prep, or career paths. I speak English and Tamil! 🌟");
  }
  if (chatOpen) setTimeout(() => document.getElementById('chatInput')?.focus(), 100);
}

function addMessage(role, text) {
  const msgs = document.getElementById('chatMessages');
  if (!msgs) return;
  const div = document.createElement('div');
  div.style.cssText = `display:flex;gap:8px;align-items:flex-start;${role === 'user' ? 'flex-direction:row-reverse;' : ''}`;
  const avatar = document.createElement('div');
  avatar.style.cssText = `width:28px;height:28px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:14px;${role === 'user' ? 'background:rgba(139,92,246,.2);' : 'background:rgba(6,182,212,.2);'}`;
  avatar.textContent = role === 'user' ? '👤' : '🤖';
  const bubble = document.createElement('div');
  bubble.style.cssText = `max-width:220px;padding:10px 12px;border-radius:${role === 'user' ? '12px 4px 12px 12px' : '4px 12px 12px 12px'};font-size:12px;line-height:1.5;${role === 'user' ? 'background:rgba(139,92,246,.2);color:#EEF0F5;margin-left:auto;' : 'background:#141720;color:#EEF0F5;border:1px solid rgba(255,255,255,.06);'}`;
  bubble.textContent = text;
  div.appendChild(avatar);
  div.appendChild(bubble);
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
  chatHistory.push({ role, text });
}

function sendChat() {
  const input = document.getElementById('chatInput');
  if (!input) return;
  const msg = input.value.trim();
  if (!msg) return;
  input.value = '';
  addMessage('user', msg);

  // Typing indicator
  const msgs = document.getElementById('chatMessages');
  const typing = document.createElement('div');
  typing.id = 'typing';
  typing.style.cssText = 'display:flex;gap:8px;align-items:center;padding:4px 0;';
  typing.innerHTML = '<div style="width:28px;height:28px;border-radius:50%;background:rgba(6,182,212,.2);display:flex;align-items:center;justify-content:center;font-size:14px;">🤖</div><div style="background:#141720;border:1px solid rgba(255,255,255,.06);border-radius:4px 12px 12px 12px;padding:10px 14px;font-size:12px;color:var(--muted2);">Thinking...</div>';
  msgs.appendChild(typing);
  msgs.scrollTop = msgs.scrollHeight;

  setTimeout(() => {
    const t = document.getElementById('typing');
    if (t) t.remove();
    const response = getAIResponse(msg);
    addMessage('bot', response);
  }, 800 + Math.random() * 600);
}
