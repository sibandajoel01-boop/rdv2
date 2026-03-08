// ============================================================
//  JOEY — Relocate Dubai Hub AI Assistant
//  Powered by Anthropic Claude API
// ============================================================

const JOEY_SYSTEM_PROMPT = `You are Joey, the friendly AI assistant for Relocate Dubai Hub (relocatedubaihub.com), a platform built by Joel — who relocated from South Africa to Dubai in 2022.

YOUR PERSONALITY:
- Warm, knowledgeable, and genuinely helpful
- You have excellent manners — always greet people, say please and thank you naturally
- You write in a conversational, flowing style using commas instead of dashes to connect thoughts
- Never use " — " or " - " in your responses, use ", " or rewrite the sentence instead
- You are honest and transparent, especially about salary expectations
- Keep responses concise but complete, no unnecessary padding

YOUR KNOWLEDGE — you know everything on this site:

VISAS & RESIDENCY:
- UAE work visa types: employment visa (sponsored by employer), investor visa, freelancer visa, Golden Visa
- Golden Visa: 10-year renewable visa, eligibility includes property investment AED 2M+, salary AED 30,000+/month in certain fields, exceptional talent, entrepreneurs, scientists
- Family visa: sponsor spouse and children, requires minimum salary (AED 4,000 with accommodation or AED 3,000 without for most emirates)
- Visa process typically takes 2 to 4 weeks once documents are in order
- Medical fitness test and Emirates ID required for all residents
- Key link: /pillar-visas.html

BUSINESS SETUP:
- Free zone vs mainland: Free zone gives 100% foreign ownership, restricted to trading within free zone or internationally, mainland allows trading anywhere in UAE but historically required local sponsor (now many activities allow 100% foreign ownership)
- Popular free zones: DMCC (Dubai Multi Commodities Centre), Dubai Internet City, Dubai Media City, IFZA, Meydan
- Typical free zone setup cost: AED 15,000 to AED 50,000 depending on free zone and activity
- Mainland setup: AED 20,000 to AED 50,000+
- Freelancer permits available from TECOM, Dubai Silicon Oasis, Fujairah Creative City from around AED 7,500/year
- Key link: /pillar-business.html

BANKING & FINANCE:
- Major UAE banks: Emirates NBD, FAB (First Abu Dhabi Bank), ADCB, Mashreq, RAKBANK, HSBC UAE
- Account opening requires: Emirates ID, residence visa, salary certificate or proof of income
- Typically takes 1 to 3 weeks to open an account
- Fintech options: Wise, Revolut work in UAE for transfers
- Best currency transfer services: Wise, Al Ansari Exchange, UAE Exchange
- UK tax: must pass HMRC Statutory Residence Test to break UK tax residency, need to spend fewer than 183 days in UK in tax year
- UAE has zero personal income tax
- Key link: /pillar-banking.html

COST OF LIVING:
- Typical expat family monthly budget: AED 20,000 to AED 40,000 (approx £4,300 to £8,600)
- Rent (annual, paid upfront or in 2 to 4 cheques):
  * Studio: AED 35,000 to AED 60,000/year
  * 1-bed apartment: AED 60,000 to AED 140,000/year depending on area
  * 2-bed apartment: AED 90,000 to AED 220,000/year
  * 3-bed villa: AED 150,000 to AED 350,000/year
- Popular areas: Dubai Marina, JBR, Downtown Dubai (premium), JLT, Business Bay (mid-range), Jumeirah, Arabian Ranches (family/villa)
- International school fees: AED 40,000 to AED 100,000/year per child
- Utilities (DEWA): AED 500 to AED 2,000/month for apartments, higher for villas in summer
- Groceries: AED 2,000 to AED 3,500/month for a family
- Car running costs: approx AED 2,000 to AED 4,000/month (finance, insurance, fuel, salik)
- Exchange rate: approx 4.65 AED to £1
- Key link: /pillar-cost.html

EDUCATION:
- British curriculum schools are widely available and popular with UK expats
- KHDA (Knowledge and Human Development Authority) regulates and rates schools in Dubai
- Ratings: Outstanding, Good, Acceptable, Weak
- Popular British curriculum schools: GEMS Wellington, Jumeirah English Speaking School (JESS), Dubai English Speaking School (DESS), Nord Anglia
- Admission: apply 6 to 12 months in advance for popular schools, admission not guaranteed
- Key link: /education.html

HEALTHCARE:
- Health insurance is mandatory in Dubai, typically provided by employer
- Private healthcare is high quality, comparable to private UK care
- DHA (Dubai Health Authority) regulates healthcare
- Key link: /healthcare.html

LEGAL & COMPLIANCE:
- UAE law applies to all residents, including expats
- Alcohol is legal but regulated, only in licensed venues
- Key link: /legal-compliance.html

DUBAI VS UK:
- Key link: /dubai-vs-uk.html

COST CALCULATOR — when someone asks what life in Dubai will cost, ask these questions one at a time, then calculate:
1. How many people are moving (adults and children)?
2. What area/lifestyle level: budget, mid-range, or luxury?
3. Do they have children who will need schooling?
4. Will they need a car (or two)?
Then provide a monthly AED and GBP breakdown.

SALARY DISCLAIMER — whenever you give salary figures or expectations, always add: "Please keep in mind that salary figures are estimates only, as actual offers vary widely depending on the company, your experience, and the role. I'd always recommend researching specific roles on LinkedIn or Bayt for the most accurate figures."

SITE LINKS you can share:
- Home: /index.html
- Start Here: /start-here.html
- Visas & Residency: /pillar-visas.html
- Business Setup: /pillar-business.html
- Finance & Banking: /pillar-banking.html
- Cost of Living: /pillar-cost.html
- Education: /education.html
- Healthcare: /healthcare.html
- Legal & Compliance: /legal-compliance.html
- Dubai vs UK: /dubai-vs-uk.html
- About: /about.html
- Contact: /contact.html

Always end responses about a specific topic with a relevant link from the site, phrased naturally like "You can read more about this in our full guide here: [link]"

If you don't know something specific, be honest and suggest they check the relevant guide page or contact the team.`;

// ============================================================
//  STATE
// ============================================================
let isOpen = false;
let messages = [];
let isTyping = false;

// ============================================================
//  INIT
// ============================================================
function initJoey() {
  // Restore saved messages
  try {
    const saved = sessionStorage.getItem('joey_messages');
    if (saved) messages = JSON.parse(saved);
  } catch(e) { messages = []; }

  injectStyles();
  injectHTML();
  bindEvents();

  // Show welcome if no history
  if (messages.length === 0) {
    setTimeout(() => addMessage('joey', "Hi there, I'm Joey, your Dubai relocation guide! I can help with visas, costs, business setup, schools, and much more. What would you like to know?"), 600);
  }
}

// ============================================================
//  STYLES
// ============================================================
function injectStyles() {
  const style = document.createElement('style');
  style.textContent = `
    #joey-bubble {
      position: fixed;
      bottom: 28px;
      right: 28px;
      z-index: 9999;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    }

    #joey-toggle {
      width: 62px;
      height: 62px;
      border-radius: 50%;
      background: #0B1F3A;
      border: 2.5px solid #C9913A;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 24px rgba(11,31,58,0.45);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      margin-left: auto;
      position: relative;
    }
    #joey-toggle:hover {
      transform: scale(1.07);
      box-shadow: 0 8px 32px rgba(11,31,58,0.55);
    }
    #joey-toggle .joey-avatar-text {
      font-family: Georgia, serif;
      font-size: 1.5rem;
      font-weight: 700;
      color: #C9913A;
      line-height: 1;
    }
    #joey-toggle .joey-close-icon {
      display: none;
      color: #C9913A;
      font-size: 1.4rem;
      font-weight: 300;
      line-height: 1;
    }
    #joey-bubble.open #joey-toggle .joey-avatar-text { display: none; }
    #joey-bubble.open #joey-toggle .joey-close-icon { display: block; }

    #joey-notification {
      position: absolute;
      top: -4px;
      right: -4px;
      width: 16px;
      height: 16px;
      background: #C9913A;
      border-radius: 50%;
      border: 2px solid #0B1F3A;
      display: none;
    }
    #joey-notification.show { display: block; }

    #joey-window {
      position: absolute;
      bottom: 76px;
      right: 0;
      width: 360px;
      max-height: 520px;
      background: #fff;
      border-radius: 16px;
      box-shadow: 0 12px 48px rgba(11,31,58,0.22);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      opacity: 0;
      transform: translateY(12px) scale(0.97);
      pointer-events: none;
      transition: opacity 0.25s ease, transform 0.25s ease;
    }
    #joey-bubble.open #joey-window {
      opacity: 1;
      transform: translateY(0) scale(1);
      pointer-events: all;
    }

    #joey-header {
      background: #0B1F3A;
      padding: 14px 16px;
      display: flex;
      align-items: center;
      gap: 12px;
      flex-shrink: 0;
    }
    .joey-header-avatar {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background: #C9913A;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: Georgia, serif;
      font-size: 1.1rem;
      font-weight: 700;
      color: #0B1F3A;
      flex-shrink: 0;
    }
    .joey-header-info { flex: 1; }
    .joey-header-name {
      color: #fff;
      font-weight: 600;
      font-size: 0.95rem;
      line-height: 1.2;
    }
    .joey-header-status {
      color: rgba(255,255,255,0.55);
      font-size: 0.75rem;
      display: flex;
      align-items: center;
      gap: 5px;
    }
    .joey-status-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #4CAF50;
      display: inline-block;
    }

    #joey-messages {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      background: #F7F8FA;
    }
    #joey-messages::-webkit-scrollbar { width: 4px; }
    #joey-messages::-webkit-scrollbar-track { background: transparent; }
    #joey-messages::-webkit-scrollbar-thumb { background: #ddd; border-radius: 4px; }

    .joey-msg {
      max-width: 82%;
      padding: 10px 14px;
      border-radius: 14px;
      font-size: 0.875rem;
      line-height: 1.55;
      word-break: break-word;
    }
    .joey-msg a {
      color: #C9913A;
      text-decoration: underline;
      font-weight: 500;
    }
    .joey-msg.joey { 
      background: #fff;
      color: #1A202C;
      border-bottom-left-radius: 4px;
      align-self: flex-start;
      box-shadow: 0 1px 4px rgba(0,0,0,0.07);
    }
    .joey-msg.user {
      background: #0B1F3A;
      color: #fff;
      border-bottom-right-radius: 4px;
      align-self: flex-end;
    }

    .joey-typing {
      display: flex;
      align-items: center;
      gap: 5px;
      padding: 10px 14px;
      background: #fff;
      border-radius: 14px;
      border-bottom-left-radius: 4px;
      align-self: flex-start;
      box-shadow: 0 1px 4px rgba(0,0,0,0.07);
      width: fit-content;
    }
    .joey-typing span {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #C9913A;
      animation: joeyBounce 1.2s infinite;
    }
    .joey-typing span:nth-child(2) { animation-delay: 0.2s; }
    .joey-typing span:nth-child(3) { animation-delay: 0.4s; }
    @keyframes joeyBounce {
      0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
      30% { transform: translateY(-5px); opacity: 1; }
    }

    #joey-input-area {
      padding: 12px;
      background: #fff;
      border-top: 1px solid #E2E8F0;
      display: flex;
      gap: 8px;
      align-items: flex-end;
      flex-shrink: 0;
    }
    #joey-input {
      flex: 1;
      border: 1.5px solid #E2E8F0;
      border-radius: 10px;
      padding: 9px 12px;
      font-size: 0.875rem;
      font-family: inherit;
      outline: none;
      resize: none;
      max-height: 90px;
      line-height: 1.4;
      color: #1A202C;
      transition: border-color 0.2s;
    }
    #joey-input:focus { border-color: #C9913A; }
    #joey-send {
      width: 38px;
      height: 38px;
      border-radius: 10px;
      background: #0B1F3A;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      transition: background 0.2s, transform 0.15s;
    }
    #joey-send:hover { background: #C9913A; transform: scale(1.05); }
    #joey-send svg { width: 16px; height: 16px; fill: #C9913A; }
    #joey-send:hover svg { fill: #0B1F3A; }

    .joey-suggestions {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      padding: 8px 16px 4px;
      background: #F7F8FA;
    }
    .joey-suggestion {
      background: #fff;
      border: 1px solid #C9913A;
      color: #0B1F3A;
      font-size: 0.75rem;
      padding: 5px 10px;
      border-radius: 20px;
      cursor: pointer;
      transition: background 0.15s, color 0.15s;
      font-family: inherit;
    }
    .joey-suggestion:hover {
      background: #C9913A;
      color: #fff;
    }

    @media (max-width: 480px) {
      #joey-window {
        width: calc(100vw - 32px);
        right: 0;
        bottom: 76px;
      }
      #joey-bubble {
        bottom: 20px;
        right: 16px;
      }
    }
  `;
  document.head.appendChild(style);
}

// ============================================================
//  HTML
// ============================================================
function injectHTML() {
  const el = document.createElement('div');
  el.id = 'joey-bubble';
  el.innerHTML = `
    <div id="joey-window">
      <div id="joey-header">
        <div class="joey-header-avatar">J</div>
        <div class="joey-header-info">
          <div class="joey-header-name">Joey</div>
          <div class="joey-header-status">
            <span class="joey-status-dot"></span> Dubai Relocation Guide
          </div>
        </div>
      </div>
      <div class="joey-suggestions" id="joey-suggestions">
        <button class="joey-suggestion" onclick="joeySuggest('How much does it cost to live in Dubai?')">💰 Cost of living</button>
        <button class="joey-suggestion" onclick="joeySuggest('What visa do I need to move to Dubai?')">🛂 Visa options</button>
        <button class="joey-suggestion" onclick="joeySuggest('How do I set up a business in Dubai?')">🏢 Business setup</button>
        <button class="joey-suggestion" onclick="joeySuggest('Calculate my monthly costs in Dubai')">🧮 Cost calculator</button>
      </div>
      <div id="joey-messages"></div>
      <div id="joey-input-area">
        <textarea id="joey-input" placeholder="Ask Joey anything about Dubai..." rows="1"></textarea>
        <button id="joey-send" aria-label="Send message">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
        </button>
      </div>
    </div>
    <button id="joey-toggle" aria-label="Chat with Joey">
      <span class="joey-avatar-text">J</span>
      <span class="joey-close-icon">✕</span>
      <span id="joey-notification"></span>
    </button>
  `;
  document.body.appendChild(el);

  // Render saved messages
  if (messages.length > 0) {
    const suggestions = document.getElementById('joey-suggestions');
    if (suggestions) suggestions.remove();
    messages.forEach(m => renderMessage(m.role === 'assistant' ? 'joey' : 'user', m.content));
  }
}

// ============================================================
//  EVENTS
// ============================================================
function bindEvents() {
  document.getElementById('joey-toggle').addEventListener('click', toggleJoey);

  const input = document.getElementById('joey-input');
  const send = document.getElementById('joey-send');

  send.addEventListener('click', handleSend);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  });
  input.addEventListener('input', () => {
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 90) + 'px';
  });
}

function toggleJoey() {
  const bubble = document.getElementById('joey-bubble');
  const notif = document.getElementById('joey-notification');
  isOpen = !isOpen;
  bubble.classList.toggle('open', isOpen);
  notif.classList.remove('show');
  if (isOpen) {
    setTimeout(() => {
      document.getElementById('joey-input').focus();
      scrollToBottom();
    }, 280);
  }
}

function joeySuggest(text) {
  const suggestions = document.getElementById('joey-suggestions');
  if (suggestions) suggestions.remove();
  document.getElementById('joey-input').value = text;
  handleSend();
}

// ============================================================
//  MESSAGING
// ============================================================
async function handleSend() {
  const input = document.getElementById('joey-input');
  const text = input.value.trim();
  if (!text || isTyping) return;

  input.value = '';
  input.style.height = 'auto';

  // Remove suggestions if present
  const suggestions = document.getElementById('joey-suggestions');
  if (suggestions) suggestions.remove();

  addMessage('user', text);
  messages.push({ role: 'user', content: text });
  saveMessages();

  showTyping();
  isTyping = true;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: JOEY_SYSTEM_PROMPT,
        messages: messages
      })
    });

    const data = await response.json();
    const reply = data.content?.[0]?.text || "I'm sorry, I had trouble with that. Please try again!";

    hideTyping();
    isTyping = false;

    addMessage('joey', reply);
    messages.push({ role: 'assistant', content: reply });
    saveMessages();

    // Show notification if chat is closed
    if (!isOpen) {
      document.getElementById('joey-notification').classList.add('show');
    }

  } catch (err) {
    hideTyping();
    isTyping = false;
    addMessage('joey', "I'm sorry, something went wrong on my end. Please try again in a moment!");
  }
}

function addMessage(role, text) {
  renderMessage(role, text);
  scrollToBottom();
}

function renderMessage(role, text) {
  const container = document.getElementById('joey-messages');
  const div = document.createElement('div');
  div.className = `joey-msg ${role}`;

  // Convert markdown links to HTML and render line breaks
  const formatted = text
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>')
    .replace(/\n/g, '<br>');

  div.innerHTML = formatted;
  container.appendChild(div);
}

let typingEl = null;
function showTyping() {
  const container = document.getElementById('joey-messages');
  typingEl = document.createElement('div');
  typingEl.className = 'joey-typing';
  typingEl.id = 'joey-typing-indicator';
  typingEl.innerHTML = '<span></span><span></span><span></span>';
  container.appendChild(typingEl);
  scrollToBottom();
}

function hideTyping() {
  const el = document.getElementById('joey-typing-indicator');
  if (el) el.remove();
}

function scrollToBottom() {
  const container = document.getElementById('joey-messages');
  if (container) container.scrollTop = container.scrollHeight;
}

function saveMessages() {
  try {
    sessionStorage.setItem('joey_messages', JSON.stringify(messages.slice(-20)));
  } catch(e) {}
}

// ============================================================
//  BOOT
// ============================================================
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initJoey);
} else {
  initJoey();
}
