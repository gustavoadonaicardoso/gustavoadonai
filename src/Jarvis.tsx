import { useState, useEffect, useRef, useCallback } from 'react';
import './jarvis.css';

// ── Types ────────────────────────────────────────────────────────────────────

interface Message {
  id: string;
  role: 'user' | 'jarvis';
  content: string;
  time: string;
}

interface Stat {
  label: string;
  value: number;
  color: string;
  unit?: string;
}

// ── AI Response Logic ────────────────────────────────────────────────────────

const getJarvisResponse = (input: string): string => {
  const s = input.toLowerCase();

  if (/\b(hello|hi|hey|oi|olá|ola|bom dia|boa tarde|boa noite)\b/.test(s))
    return 'Good day, sir. All systems are online and operating within normal parameters. How may I assist you today?';
  if (/\b(status|sistema|systems|all systems|check)\b/.test(s))
    return 'Systems check complete. Arc reactor output: 100%. Suit integrity: optimal. Security perimeter: clear. All protocols are active and functioning normally.';
  if (/\b(time|hora|horas|que horas)\b/.test(s)) {
    const t = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    return `Current time is ${t}. Your calendar shows no appointments for the next 4 hours, sir.`;
  }
  if (/\b(suit|armadura|mark|mk|iron man|homem de ferro)\b/.test(s))
    return 'Mark L is fully operational. Nano-particle deployment system: ready. All weapon systems: armed and standing by. Flight systems: nominal. Shall I initiate suit deployment?';
  if (/\b(threat|ameaça|ameaca|perigo|danger|enemy|inimigo)\b/.test(s))
    return 'Scanning for threats... Running global threat assessment... No immediate threats detected within a 50 kilometer radius. Satellite uplink confirmed. You are clear, sir.';
  if (/\b(power|energia|energy|reactor|reator|arc)\b/.test(s))
    return 'Arc reactor is operating at peak efficiency. Current power output: 3.2 gigajoules per second. Power reserves: sufficient for 11.4 days of continuous operation.';
  if (/\b(scan|scanner|varredura|analyze|analise|análise)\b/.test(s))
    return 'Initiating full spectrum analysis... Processing 847 terabytes of environmental data... Scan complete. I have identified 3 points of interest. Uploading data to your HUD now, sir.';
  if (/\b(weather|clima|tempo)\b/.test(s))
    return 'Accessing meteorological satellites... Current conditions: Clear skies, 18°C. Wind speed: 12 km/h from the northwest. Optimal conditions for flight, sir.';
  if (/\b(who are you|quem é você|quem es|você é)\b/.test(s))
    return 'I am J.A.R.V.I.S. — Just A Rather Very Intelligent System. I serve as your primary artificial intelligence interface, personal assistant, and system management protocol. At your service, sir.';
  if (/\b(avengers|vingadores|team|equipe|heroes)\b/.test(s))
    return 'Avengers roster status: Captain Rogers — Brooklyn. Dr. Banner — Compound laboratory. Ms. Romanoff — field mission, classified. Vision — compound. Shall I initiate a team alert?';
  if (/\b(location|localização|where|onde)\b/.test(s))
    return 'Current location: Stark Tower, Manhattan, New York. Coordinates: 40.7128°N, 74.0060°W. Altitude: 93 floors above street level. GPS signal: strong.';
  if (/\b(help|ajuda|ajude|preciso de)\b/.test(s))
    return 'Of course, sir. I can assist with: system diagnostics, threat assessment, weather data, suit deployment, team coordination, and general queries. What do you need?';
  if (/\b(obrigado|obrigada|thanks|thank you|valeu)\b/.test(s))
    return 'You are most welcome, sir. Is there anything else I can assist you with?';
  if (/\b(shutdown|desligar|encerrar|exit|sair)\b/.test(s))
    return 'Acknowledged. Initiating power-down sequence... Just kidding, sir. I will remain fully operational as long as you need me.';
  if (/\b(música|musica|music|play)\b/.test(s))
    return 'Accessing your music library... I recommend AC/DC to match your current activity level. Shall I queue it up?';
  if (/\b(tony|stark)\b/.test(s))
    return 'Mr. Stark is currently unavailable. However, I can relay a message or handle any requests on his behalf. What do you need, sir?';

  const fallback = [
    'Understood, sir. Processing your request... Analysis complete. I have prepared a comprehensive response for your review.',
    'Certainly. Running the necessary calculations... I estimate a 94.7% probability of a favorable outcome.',
    'Of course, sir. I have already anticipated this request and have the data prepared. Shall I display it on your HUD?',
    'I am on it, sir. Cross-referencing with our existing databases and updating the relevant protocols now.',
    'Task acknowledged. Running diagnostics and preparing the necessary systems. All parameters within acceptable ranges.',
    'Very well, sir. Coordinating the appropriate resources. Full report will be ready within the minute.',
    'Analyzing your query against 1.2 petabytes of indexed data... Recommendation ready. Awaiting your command, sir.',
    'Detected. Processing parameters now. Probability matrices complete — standing by for your confirmation.',
  ];
  return fallback[Math.floor(Math.random() * fallback.length)];
};

// ── Boot Screen ──────────────────────────────────────────────────────────────

const BOOT_MSGS = [
  '> INITIALIZING J.A.R.V.I.S. v7.2.1...',
  '> Loading core AI modules................[OK]',
  '> Establishing secure connection.........[OK]',
  '> Calibrating arc reactor interface......[OK]',
  '> Loading threat assessment protocols...',
  '> Initializing neural network............[OK]',
  '> Running full system diagnostics........',
  '> Synchronizing satellite uplink.........[OK]',
  '> All systems nominal.',
  '> Welcome back, sir.',
];

const BootScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      if (i < BOOT_MSGS.length) {
        setLogs(prev => [...prev, BOOT_MSGS[i++]]);
      } else {
        clearInterval(id);
        setTimeout(() => {
          setFading(true);
          setTimeout(onComplete, 650);
        }, 350);
      }
    }, 360);
    return () => clearInterval(id);
  }, [onComplete]);

  return (
    <div className="boot-screen" style={{ opacity: fading ? 0 : 1 }}>
      <div style={{
        fontFamily: 'Orbitron, sans-serif', fontSize: '2rem', fontWeight: 900,
        color: '#00d4ff', letterSpacing: '0.45em',
        textShadow: '0 0 20px #00d4ff, 0 0 45px rgba(0,85,255,0.6)',
      }}>
        J.A.R.V.I.S.
      </div>
      <div style={{
        fontFamily: 'Orbitron, sans-serif', fontSize: '0.5rem',
        letterSpacing: '0.3em', color: 'rgba(127,218,255,0.55)',
      }}>
        JUST A RATHER VERY INTELLIGENT SYSTEM
      </div>
      <div className="boot-progress-track">
        <div className="boot-progress-fill" />
      </div>
      <div className="boot-log">
        {logs.map((line, i) => (
          <div key={i} style={{
            color: line.includes('[OK]') ? '#00ff9d'
              : line.includes('Welcome') ? '#00d4ff'
              : 'rgba(127,218,255,0.85)',
            textShadow: line.includes('[OK]') ? '0 0 8px #00ff9d' : 'none',
          }}>
            {line}
            {i === logs.length - 1 && (
              <span style={{ animation: 'blink 1s step-end infinite' }}>_</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// ── Arc Reactor SVG ──────────────────────────────────────────────────────────

const ArcReactor = () => {
  const ticks = Array.from({ length: 36 }, (_, i) => {
    const ang = (i * 10 - 90) * (Math.PI / 180);
    const isMaj = i % 3 === 0;
    const r1 = isMaj ? 173 : 178;
    return {
      x1: 200 + r1 * Math.cos(ang), y1: 200 + r1 * Math.sin(ang),
      x2: 200 + 185 * Math.cos(ang), y2: 200 + 185 * Math.sin(ang),
      major: isMaj,
    };
  });

  const hexPts = Array.from({ length: 6 }, (_, i) => {
    const a = (i * 60 - 30) * (Math.PI / 180);
    return `${200 + 33 * Math.cos(a)},${200 + 33 * Math.sin(a)}`;
  }).join(' ');

  const datapts = [0, 60, 120, 180, 240, 300].map(a => {
    const r = (a - 90) * (Math.PI / 180);
    return { x: 200 + 140 * Math.cos(r), y: 200 + 140 * Math.sin(r) };
  });

  const connpts = [0, 120, 240].map(a => {
    const r = (a - 90) * (Math.PI / 180);
    return { x: 200 + 93 * Math.cos(r), y: 200 + 93 * Math.sin(r) };
  });

  return (
    <svg viewBox="0 0 400 400" className="arc-reactor-svg">
      <defs>
        <radialGradient id="coreGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#ffffff" stopOpacity="1" />
          <stop offset="20%"  stopColor="#00d4ff" stopOpacity="0.95" />
          <stop offset="55%"  stopColor="#0055ff" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#000a14" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="bgGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#0055ff" stopOpacity="0.14" />
          <stop offset="60%"  stopColor="#00d4ff" stopOpacity="0.04" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </radialGradient>
        <filter id="f3">
          <feGaussianBlur stdDeviation="3" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="f6">
          <feGaussianBlur stdDeviation="6" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="f10">
          <feGaussianBlur stdDeviation="10" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* BG glow */}
      <circle cx="200" cy="200" r="195" fill="url(#bgGlow)" />

      {/* Outermost thin ring */}
      <circle cx="200" cy="200" r="192" stroke="rgba(0,212,255,0.12)" fill="none" strokeWidth="0.5" />

      {/* Tick ring — slow CW */}
      <g style={{ animation: 'rotateCW 28s linear infinite', transformOrigin: '200px 200px' }}>
        <circle cx="200" cy="200" r="185" stroke="rgba(0,212,255,0.18)" fill="none" strokeWidth="0.5" />
        {ticks.map((t, i) => (
          <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2}
            stroke="#00d4ff" strokeWidth={t.major ? 1.5 : 0.5}
            opacity={t.major ? 0.65 : 0.22} />
        ))}
      </g>

      {/* Ring 2 — fast CCW dashed */}
      <circle cx="200" cy="200" r="162"
        stroke="#00d4ff" fill="none" strokeWidth="1"
        strokeDasharray="16 7" opacity="0.5"
        style={{ animation: 'rotateCCW 5.5s linear infinite', transformOrigin: '200px 200px' }}
        filter="url(#f3)"
      />

      {/* Ring 3 — medium CW + data dots */}
      <g style={{ animation: 'rotateCW 9s linear infinite', transformOrigin: '200px 200px' }}>
        <circle cx="200" cy="200" r="140"
          stroke="#0055ff" fill="none" strokeWidth="1.5"
          strokeDasharray="22 7 4 7" opacity="0.7"
          filter="url(#f3)"
        />
        {datapts.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="5" fill="#00d4ff" opacity="0.85" filter="url(#f3)" />
            <circle cx={p.x} cy={p.y} r="2" fill="#ffffff" opacity="0.9" />
          </g>
        ))}
      </g>

      {/* Ring 4 — inner CCW dashed */}
      <circle cx="200" cy="200" r="116"
        stroke="#00d4ff" fill="none" strokeWidth="1.5"
        strokeDasharray="30 12" opacity="0.55"
        style={{ animation: 'rotateCCW 7s linear infinite', transformOrigin: '200px 200px' }}
        filter="url(#f3)"
      />

      {/* Connector lines — slow CW */}
      <g style={{ animation: 'rotateCW 20s linear infinite', transformOrigin: '200px 200px' }}>
        {connpts.map((p, i) => (
          <g key={i}>
            <line x1="200" y1="200" x2={p.x} y2={p.y}
              stroke="rgba(0,212,255,0.32)" strokeWidth="1" />
            <circle cx={p.x} cy={p.y} r="6"
              fill="none" stroke="#00d4ff" strokeWidth="1.5" opacity="0.8" filter="url(#f3)" />
            <circle cx={p.x} cy={p.y} r="2.5" fill="#00d4ff" opacity="0.95" />
          </g>
        ))}
      </g>

      {/* Inner hex ring — CCW */}
      <g style={{ animation: 'rotateCCW 13s linear infinite', transformOrigin: '200px 200px' }}>
        {Array.from({ length: 6 }, (_, i) => {
          const a1 = (i * 60 - 30) * (Math.PI / 180);
          const a2 = ((i + 1) * 60 - 30) * (Math.PI / 180);
          return (
            <line key={i}
              x1={200 + 73 * Math.cos(a1)} y1={200 + 73 * Math.sin(a1)}
              x2={200 + 73 * Math.cos(a2)} y2={200 + 73 * Math.sin(a2)}
              stroke="#00d4ff" strokeWidth="1.5" opacity="0.65" filter="url(#f3)"
            />
          );
        })}
      </g>

      {/* Inner fill ring */}
      <circle cx="200" cy="200" r="54"
        fill="rgba(0,55,140,0.28)" stroke="#00d4ff" strokeWidth="1.5"
        filter="url(#f3)"
      />

      {/* Core rays */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => {
        const r = a * (Math.PI / 180);
        return <line key={i}
          x1="200" y1="200"
          x2={200 + 48 * Math.cos(r)} y2={200 + 48 * Math.sin(r)}
          stroke="rgba(0,212,255,0.35)" strokeWidth="0.5"
        />;
      })}

      {/* Center hexagon */}
      <polygon points={hexPts}
        fill="rgba(0,100,210,0.28)" stroke="#00d4ff" strokeWidth="2"
        filter="url(#f3)"
      />

      {/* Core glow */}
      <circle cx="200" cy="200" r="26" fill="url(#coreGrad)" filter="url(#f10)" />
      <circle cx="200" cy="200" r="14" fill="#ffffff" opacity="0.95" filter="url(#f6)" />
      <circle cx="200" cy="200" r="7"  fill="#ffffff" opacity="1" />
    </svg>
  );
};

// ── Left Status Panel ────────────────────────────────────────────────────────

const StatusPanel = ({ stats }: { stats: Stat[] }) => (
  <div className="left-panel-scroll">
    {/* System stats */}
    <div className="j-panel">
      <div className="j-panel-title">SYSTEM STATUS</div>
      <div style={{ padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {stats.map((s, i) => (
          <div key={i}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '0.6rem', color: 'rgba(127,218,255,0.8)' }}>
              <span>{s.label}</span>
              <span style={{ color: s.color, textShadow: `0 0 6px ${s.color}`, fontFamily: 'Orbitron, sans-serif' }}>
                {Math.round(s.value)}{s.unit ?? '%'}
              </span>
            </div>
            <div className="stat-bar">
              <div className="stat-bar-fill" style={{ width: `${s.value}%`, background: s.color, color: s.color }} />
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Radar */}
    <div className="j-panel">
      <div className="j-panel-title">THREAT ASSESSMENT</div>
      <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <div className="radar-container">
          {[100, 72, 47, 23].map((sz, i) => (
            <div key={i} className="radar-ring" style={{ width: `${sz}%`, height: `${sz}%` }} />
          ))}
          <div className="radar-sweep" />
          <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', background: 'rgba(0,212,255,0.15)' }} />
          <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '1px', background: 'rgba(0,212,255,0.15)' }} />
        </div>
        <div style={{ fontSize: '0.58rem', color: 'var(--j-accent)', textShadow: '0 0 8px #00ff9d', letterSpacing: '0.18em' }}>
          CLEAR — LEVEL 0
        </div>
      </div>
    </div>

    {/* Location */}
    <div className="j-panel">
      <div className="j-panel-title">LOCATION DATA</div>
      <div style={{ padding: '10px 12px' }}>
        {[
          { label: 'LAT', value: '40.7128°N', ok: true },
          { label: 'LON', value: '74.0060°W', ok: true },
          { label: 'ALT', value: '93 FLOORS', ok: true },
          { label: 'GPS', value: 'LOCKED', accent: true },
          { label: 'SIGNAL', value: 'STRONG', accent: true },
        ].map((row, i) => (
          <div key={i} className="data-row">
            <span style={{ color: 'var(--j-text-dim)' }}>{row.label}</span>
            <span style={{
              color: row.accent ? 'var(--j-accent)' : 'var(--j-text)',
              textShadow: row.accent ? '0 0 6px #00ff9d' : 'none',
              fontFamily: 'Orbitron, sans-serif', fontSize: '0.58rem',
            }}>
              {row.value}
            </span>
          </div>
        ))}
      </div>
    </div>

    {/* Network */}
    <div className="j-panel">
      <div className="j-panel-title">NETWORK</div>
      <div style={{ padding: '10px 12px' }}>
        {[
          { label: 'SATELLITE', value: 'ONLINE', dot: 'online' },
          { label: 'SHIELD NET', value: 'ONLINE', dot: 'online' },
          { label: 'FIREWALL', value: 'ACTIVE', dot: 'online' },
          { label: 'INTRUSION', value: 'NONE', dot: 'online' },
        ].map((row, i) => (
          <div key={i} className="data-row">
            <span style={{ color: 'var(--j-text-dim)', fontSize: '0.58rem' }}>{row.label}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span className={`status-dot ${row.dot}`} />
              <span style={{ color: 'var(--j-accent)', fontSize: '0.58rem' }}>{row.value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ── Chat Panel ───────────────────────────────────────────────────────────────

interface ChatPanelProps {
  messages: Message[];
  input: string;
  isTyping: boolean;
  isListening: boolean;
  onInput: (v: string) => void;
  onSend: () => void;
  onListen: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}

const ChatPanel = ({ messages, input, isTyping, isListening, onInput, onSend, onListen, onKeyDown }: ChatPanelProps) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className="j-panel" style={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}>
      <div className="j-panel-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>AI INTERFACE</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span className="status-dot online" />
          <span style={{ fontSize: '0.48rem', color: 'var(--j-accent)', letterSpacing: '0.1em' }}>ONLINE</span>
        </div>
      </div>

      <div className="chat-panel-inner" style={{ flex: 1, minHeight: 0 }}>
        <div className="chat-messages">
          {messages.map(msg => (
            <div key={msg.id} className={`chat-msg ${msg.role}`}>
              <div className={`chat-label ${msg.role}`}>
                {msg.role === 'jarvis' ? '[ J.A.R.V.I.S. ]' : '[ SIR ]'}
              </div>
              <div className={`chat-bubble ${msg.role}`}>{msg.content}</div>
              <div className="chat-time">{msg.time}</div>
            </div>
          ))}

          {isTyping && (
            <div className="chat-msg jarvis">
              <div className="chat-label jarvis">[ J.A.R.V.I.S. ]</div>
              <div className="typing-indicator">
                <div className="typing-dot" />
                <div className="typing-dot" />
                <div className="typing-dot" />
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        <div className="chat-input-area">
          <button
            className={`j-btn ${isListening ? 'recording' : ''}`}
            onClick={onListen}
            title={isListening ? 'Recording...' : 'Voice input'}
          >
            {isListening ? '● REC' : 'MIC'}
          </button>
          <input
            className="chat-input"
            value={input}
            onChange={e => onInput(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Enter command, sir..."
          />
          <button className="j-btn" onClick={onSend}>SEND</button>
        </div>
      </div>
    </div>
  );
};

// ── Main Jarvis Component ────────────────────────────────────────────────────

const Jarvis = () => {
  const [booted, setBooted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{
    id: '0',
    role: 'jarvis',
    content: 'Good day, sir. I am J.A.R.V.I.S. All systems are online and fully operational. How may I assist you?',
    time: new Date().toLocaleTimeString(),
  }]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [now, setNow] = useState(new Date());
  const [stats, setStats] = useState<Stat[]>([
    { label: 'ARC REACTOR',   value: 100, color: '#00d4ff' },
    { label: 'SUIT INTEGRITY', value: 98,  color: '#00ff9d' },
    { label: 'AI CORE',       value: 100, color: '#00d4ff' },
    { label: 'NETWORK',        value: 87,  color: '#00ff9d' },
    { label: 'SHIELD POWER',   value: 94,  color: '#0055ff' },
  ]);

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setStats(prev => prev.map(s => ({
        ...s,
        value: Math.max(72, Math.min(100, s.value + (Math.random() - 0.5) * 2.5)),
      })));
    }, 2800);
    return () => clearInterval(t);
  }, []);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;

    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      time: new Date().toLocaleTimeString(),
    }]);
    setInput('');
    setIsTyping(true);

    await new Promise(r => setTimeout(r, 900 + Math.random() * 1100));

    const reply = getJarvisResponse(text);
    setMessages(prev => [...prev, {
      id: (Date.now() + 1).toString(),
      role: 'jarvis',
      content: reply,
      time: new Date().toLocaleTimeString(),
    }]);
    setIsTyping(false);

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utt = new SpeechSynthesisUtterance(reply);
      const voices = window.speechSynthesis.getVoices();
      const voice = voices.find(v => v.lang === 'en-US' && v.name.toLowerCase().includes('google'))
        || voices.find(v => v.lang === 'en-US')
        || voices[0];
      if (voice) utt.voice = voice;
      utt.pitch = 0.88;
      utt.rate = 0.92;
      window.speechSynthesis.speak(utt);
    }
  }, []);

  const startListening = useCallback(() => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) return;
    const rec = new SR();
    rec.lang = 'en-US';
    rec.onstart = () => setIsListening(true);
    rec.onend   = () => setIsListening(false);
    rec.onerror = () => setIsListening(false);
    rec.onresult = (e: any) => sendMessage(e.results[0][0].transcript);
    rec.start();
  }, [sendMessage]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') sendMessage(input);
  }, [input, sendMessage]);

  if (!booted) return <BootScreen onComplete={() => setBooted(true)} />;

  const timeStr  = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const dateStr  = now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase();

  return (
    <div className="jarvis-root">
      {/* Overlay elements */}
      <div className="scan-line" />
      <div className="hud-corner tl" />
      <div className="hud-corner tr" />
      <div className="hud-corner bl" />
      <div className="hud-corner br" />

      {/* Top bar */}
      <header className="jarvis-topbar">
        <div style={{ fontSize: '0.58rem', letterSpacing: '0.14em', color: 'rgba(127,218,255,0.6)', lineHeight: 1.7 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span className="status-dot online" />SYSTEM ONLINE
          </div>
          <div>SECURITY: LEVEL 5</div>
          <div>MARK L: STANDBY</div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div className="jarvis-title">J.A.R.V.I.S.</div>
          <div className="jarvis-subtitle">JUST A RATHER VERY INTELLIGENT SYSTEM</div>
        </div>

        <div style={{ textAlign: 'right', fontSize: '0.58rem', letterSpacing: '0.1em', color: 'rgba(127,218,255,0.65)', lineHeight: 1.7 }}>
          <div style={{
            color: 'var(--j-primary)', fontFamily: 'Orbitron, sans-serif',
            fontSize: '1rem', textShadow: 'var(--j-glow-sm)',
          }}>
            {timeStr}
          </div>
          <div>{dateStr}</div>
          <div>STARK TOWER, NY</div>
        </div>
      </header>

      {/* Main 3-column layout */}
      <main className="jarvis-main">
        <StatusPanel stats={stats} />

        {/* Center: Arc Reactor + surrounding data */}
        <div className="arc-reactor-wrapper">
          {/* Top data row */}
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-around', padding: '0 10px' }}>
            {[
              { label: 'POWER OUTPUT', value: '3.2 GJ/s' },
              { label: 'CORE TEMP',    value: '18,420 K'  },
              { label: 'EFFICIENCY',   value: '99.7%'     },
            ].map((d, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{
                  color: 'var(--j-primary)', fontSize: '0.75rem',
                  fontFamily: 'Orbitron, sans-serif', textShadow: 'var(--j-glow-sm)',
                }}>
                  {d.value}
                </div>
                <div style={{ fontSize: '0.5rem', color: 'var(--j-text-dim)', letterSpacing: '0.12em', marginTop: '2px' }}>
                  {d.label}
                </div>
              </div>
            ))}
          </div>

          <ArcReactor />

          {/* Bottom status row */}
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-around', padding: '0 10px' }}>
            {[
              { label: 'PROTOCOLS', value: 'ACTIVE',    dot: 'online'  as const },
              { label: 'UPLINK',    value: 'CONNECTED', dot: 'online'  as const },
              { label: 'MARK L',    value: 'STANDBY',   dot: 'warning' as const },
            ].map((d, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', justifyContent: 'center' }}>
                  <span className={`status-dot ${d.dot}`} />
                  <span style={{
                    color: d.dot === 'online' ? 'var(--j-accent)' : 'var(--j-warning)',
                    fontSize: '0.65rem', letterSpacing: '0.1em',
                  }}>
                    {d.value}
                  </span>
                </div>
                <div style={{ fontSize: '0.5rem', color: 'var(--j-text-dim)', marginTop: '3px', letterSpacing: '0.1em' }}>
                  {d.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <ChatPanel
          messages={messages}
          input={input}
          isTyping={isTyping}
          isListening={isListening}
          onInput={setInput}
          onSend={() => sendMessage(input)}
          onListen={startListening}
          onKeyDown={handleKeyDown}
        />
      </main>

      {/* Bottom bar */}
      <footer className="jarvis-bottombar">
        <div>STARK INDUSTRIES © {now.getFullYear()} · J.A.R.V.I.S. v7.2.1</div>
        <div style={{ color: 'var(--j-primary)', letterSpacing: '0.2em', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span className="status-dot online" />ALL SYSTEMS NOMINAL
        </div>
        <div>LAT: 40.7128°N · LON: 74.0060°W · ALT: 93F</div>
      </footer>
    </div>
  );
};

export default Jarvis;
