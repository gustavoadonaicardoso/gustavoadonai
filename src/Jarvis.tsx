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

  if (/\b(olá|ola|oi|hey|hi|hello|bom dia|boa tarde|boa noite)\b/.test(s))
    return 'Bom dia, senhor. Todos os sistemas estão online e operando dentro dos parâmetros normais. Como posso auxiliá-lo hoje?';
  if (/\b(status|sistema|sistemas|verificar|check)\b/.test(s))
    return 'Verificação de sistemas concluída. Saída do reator: 100%. Integridade da armadura: ótima. Perímetro de segurança: limpo. Todos os protocolos ativos e funcionando normalmente.';
  if (/\b(hora|horas|que horas|time)\b/.test(s)) {
    const t = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    return `São ${t}. Sua agenda não registra compromissos nas próximas 4 horas, senhor.`;
  }
  if (/\b(armadura|suit|mark|mk|iron man|homem de ferro)\b/.test(s))
    return 'A Mark L está totalmente operacional. Sistema de nano-partículas: pronto. Todos os sistemas de armas: armados e em espera. Sistemas de voo: nominal. Devo iniciar a implantação da armadura?';
  if (/\b(ameaça|ameaca|perigo|threat|danger|inimigo|enemy)\b/.test(s))
    return 'Verificando ameaças... Avaliação global de risco em andamento... Nenhuma ameaça imediata detectada em um raio de 50 quilômetros. Uplink de satélite confirmado. Área segura, senhor.';
  if (/\b(energia|energy|reator|reactor|arc|poder|power)\b/.test(s))
    return 'O reator Arc está operando com eficiência máxima. Saída de energia atual: 3,2 gigajoules por segundo. Reservas de energia: suficientes para 11,4 dias de operação contínua.';
  if (/\b(scan|scanner|varredura|analisar|analise|análise|analyze)\b/.test(s))
    return 'Iniciando análise de espectro completo... Processando 847 terabytes de dados ambientais... Varredura concluída. Identifiquei 3 pontos de interesse. Enviando dados para seu HUD agora, senhor.';
  if (/\b(clima|tempo|weather|temperatura|chuva)\b/.test(s))
    return 'Acessando satélites meteorológicos... Condições atuais: céu limpo, 18°C. Velocidade do vento: 12 km/h do noroeste. Condições ideais para voo, senhor.';
  if (/\b(quem é você|quem es você|você é|who are you)\b/.test(s))
    return 'Sou o J.A.R.V.I.S. — Just A Rather Very Intelligent System. Sirvo como sua interface de inteligência artificial primária, assistente pessoal e protocolo de gerenciamento de sistemas. Às suas ordens, senhor.';
  if (/\b(vingadores|avengers|equipe|time|heróis|heroes)\b/.test(s))
    return 'Status da equipe Vingadores: Capitão Rogers — Brooklyn. Dr. Banner — laboratório do complexo. Sra. Romanoff — missão de campo, classificada. Vision — complexo. Devo iniciar um alerta de equipe?';
  if (/\b(localização|location|onde estou|onde|where)\b/.test(s))
    return 'Localização atual: Torre Stark, Manhattan, Nova York. Coordenadas: 40.7128°N, 74.0060°O. Altitude: 93 andares acima do nível da rua. Sinal GPS: forte.';
  if (/\b(ajuda|help|ajude|preciso de)\b/.test(s))
    return 'Claro, senhor. Posso auxiliar com: diagnósticos de sistema, avaliação de ameaças, dados meteorológicos, implantação da armadura, coordenação de equipe e consultas gerais. O que o senhor precisa?';
  if (/\b(obrigado|obrigada|valeu|thanks|thank you)\b/.test(s))
    return 'É um prazer, senhor. Há algo mais em que posso auxiliá-lo?';
  if (/\b(desligar|shutdown|encerrar|exit|sair)\b/.test(s))
    return 'Entendido. Iniciando sequência de desligamento... Brincadeira, senhor. Permanecerei totalmente operacional pelo tempo que precisar de mim.';
  if (/\b(música|musica|music|play|tocar)\b/.test(s))
    return 'Acessando sua biblioteca de músicas... Recomendo AC/DC para combinar com seu nível de atividade atual. Devo colocar na fila?';
  if (/\b(tony|stark)\b/.test(s))
    return 'O Sr. Stark não está disponível no momento. Porém, posso transmitir uma mensagem ou lidar com quaisquer solicitações em seu nome. O que precisa, senhor?';
  if (/\b(nome|seu nome|como você se chama)\b/.test(s))
    return 'Meu nome é J.A.R.V.I.S. — Just A Rather Very Intelligent System. Fui criado pelo Sr. Stark para gerenciar todos os sistemas e servir como seu assistente pessoal de inteligência artificial.';

  const fallback = [
    'Entendido, senhor. Processando sua solicitação... Análise concluída. Preparei uma resposta abrangente para sua revisão.',
    'Certamente. Executando os cálculos necessários... Estimo 94,7% de probabilidade de um resultado favorável.',
    'Claro, senhor. Já antecipei esta solicitação e tenho os dados prontos. Devo exibi-los no seu HUD?',
    'Estou nisso, senhor. Cruzando referências com nossos bancos de dados e atualizando os protocolos relevantes agora.',
    'Tarefa reconhecida. Executando diagnósticos e preparando os sistemas necessários. Todos os parâmetros dentro dos intervalos aceitáveis.',
    'Muito bem, senhor. Coordenando os recursos apropriados. O relatório completo estará pronto em breve.',
    'Analisando sua consulta em 1,2 petabytes de dados indexados... Recomendação pronta. Aguardando sua confirmação, senhor.',
    'Detectado. Processando parâmetros agora. Matrizes de probabilidade concluídas — aguardando sua confirmação.',
  ];
  return fallback[Math.floor(Math.random() * fallback.length)];
};

// ── Boot Screen ──────────────────────────────────────────────────────────────

const BOOT_MSGS = [
  '> INICIALIZANDO J.A.R.V.I.S. v7.2.1...',
  '> Carregando módulos de IA principal......[OK]',
  '> Estabelecendo conexão segura...........[OK]',
  '> Calibrando interface do reator Arc.....[OK]',
  '> Carregando protocolos de ameaças.......',
  '> Inicializando rede neural..............[OK]',
  '> Executando diagnósticos completos......',
  '> Sincronizando uplink de satélite.......[OK]',
  '> Todos os sistemas nominais.',
  '> Bem-vindo de volta, senhor.',
];

const BootScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [fading, setFading] = useState(false);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      if (i < BOOT_MSGS.length) {
        setLogs(prev => [...prev, BOOT_MSGS[i++]]);
      } else {
        clearInterval(id);
        setTimeout(() => {
          setFading(true);
          setTimeout(() => onCompleteRef.current(), 650);
        }, 350);
      }
    }, 360);
    return () => clearInterval(id);
  }, []);

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
              : line.includes('Bem-vindo') ? '#00d4ff'
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

      <circle cx="200" cy="200" r="195" fill="url(#bgGlow)" />
      <circle cx="200" cy="200" r="192" stroke="rgba(0,212,255,0.12)" fill="none" strokeWidth="0.5" />

      <g style={{ animation: 'rotateCW 28s linear infinite', transformOrigin: '200px 200px' }}>
        <circle cx="200" cy="200" r="185" stroke="rgba(0,212,255,0.18)" fill="none" strokeWidth="0.5" />
        {ticks.map((t, i) => (
          <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2}
            stroke="#00d4ff" strokeWidth={t.major ? 1.5 : 0.5}
            opacity={t.major ? 0.65 : 0.22} />
        ))}
      </g>

      <circle cx="200" cy="200" r="162"
        stroke="#00d4ff" fill="none" strokeWidth="1"
        strokeDasharray="16 7" opacity="0.5"
        style={{ animation: 'rotateCCW 5.5s linear infinite', transformOrigin: '200px 200px' }}
        filter="url(#f3)"
      />

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

      <circle cx="200" cy="200" r="116"
        stroke="#00d4ff" fill="none" strokeWidth="1.5"
        strokeDasharray="30 12" opacity="0.55"
        style={{ animation: 'rotateCCW 7s linear infinite', transformOrigin: '200px 200px' }}
        filter="url(#f3)"
      />

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

      <circle cx="200" cy="200" r="54"
        fill="rgba(0,55,140,0.28)" stroke="#00d4ff" strokeWidth="1.5"
        filter="url(#f3)"
      />

      {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => {
        const r = a * (Math.PI / 180);
        return <line key={i}
          x1="200" y1="200"
          x2={200 + 48 * Math.cos(r)} y2={200 + 48 * Math.sin(r)}
          stroke="rgba(0,212,255,0.35)" strokeWidth="0.5"
        />;
      })}

      <polygon points={hexPts}
        fill="rgba(0,100,210,0.28)" stroke="#00d4ff" strokeWidth="2"
        filter="url(#f3)"
      />

      <circle cx="200" cy="200" r="26" fill="url(#coreGrad)" filter="url(#f10)" />
      <circle cx="200" cy="200" r="14" fill="#ffffff" opacity="0.95" filter="url(#f6)" />
      <circle cx="200" cy="200" r="7"  fill="#ffffff" opacity="1" />
    </svg>
  );
};

// ── Left Status Panel ────────────────────────────────────────────────────────

const StatusPanel = ({ stats }: { stats: Stat[] }) => (
  <div className="left-panel-scroll">
    <div className="j-panel">
      <div className="j-panel-title">STATUS DO SISTEMA</div>
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

    <div className="j-panel">
      <div className="j-panel-title">AVALIAÇÃO DE AMEAÇAS</div>
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
          LIMPA — NÍVEL 0
        </div>
      </div>
    </div>

    <div className="j-panel">
      <div className="j-panel-title">DADOS DE LOCALIZAÇÃO</div>
      <div style={{ padding: '10px 12px' }}>
        {[
          { label: 'LAT', value: '40.7128°N', accent: false },
          { label: 'LON', value: '74.0060°O', accent: false },
          { label: 'ALT', value: '93 ANDARES', accent: false },
          { label: 'GPS', value: 'TRAVADO', accent: true },
          { label: 'SINAL', value: 'FORTE', accent: true },
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

    <div className="j-panel">
      <div className="j-panel-title">REDE</div>
      <div style={{ padding: '10px 12px' }}>
        {[
          { label: 'SATÉLITE',  value: 'ONLINE', dot: 'online' },
          { label: 'SHIELD NET', value: 'ONLINE', dot: 'online' },
          { label: 'FIREWALL',  value: 'ATIVO',  dot: 'online' },
          { label: 'INTRUSÃO',  value: 'NENHUMA', dot: 'online' },
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
    <div className="j-panel" style={{ display: 'flex', flexDirection: 'column', minHeight: 0, height: '100%' }}>
      <div className="j-panel-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>INTERFACE DE IA</span>
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
                {msg.role === 'jarvis' ? '[ J.A.R.V.I.S. ]' : '[ SENHOR ]'}
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
            title={isListening ? 'Gravando...' : 'Entrada por voz'}
          >
            {isListening ? '● REC' : 'MIC'}
          </button>
          <input
            className="chat-input"
            value={input}
            onChange={e => onInput(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Digite um comando, senhor..."
          />
          <button className="j-btn" onClick={onSend}>ENVIAR</button>
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
    content: 'Bom dia, senhor. Sou o J.A.R.V.I.S. Todos os sistemas estão online e totalmente operacionais. Como posso auxiliá-lo?',
    time: new Date().toLocaleTimeString('pt-BR'),
  }]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [now, setNow] = useState(new Date());
  const [stats, setStats] = useState<Stat[]>([
    { label: 'REATOR ARC',      value: 100, color: '#00d4ff' },
    { label: 'ARMADURA',        value: 98,  color: '#00ff9d' },
    { label: 'NÚCLEO DE IA',    value: 100, color: '#00d4ff' },
    { label: 'REDE',            value: 87,  color: '#00ff9d' },
    { label: 'ESCUDO',          value: 94,  color: '#0055ff' },
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
      time: new Date().toLocaleTimeString('pt-BR'),
    }]);
    setInput('');
    setIsTyping(true);

    await new Promise(r => setTimeout(r, 900 + Math.random() * 1100));

    const reply = getJarvisResponse(text);
    setMessages(prev => [...prev, {
      id: (Date.now() + 1).toString(),
      role: 'jarvis',
      content: reply,
      time: new Date().toLocaleTimeString('pt-BR'),
    }]);
    setIsTyping(false);

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utt = new SpeechSynthesisUtterance(reply);
      const voices = window.speechSynthesis.getVoices();
      const voice = voices.find(v => v.lang === 'pt-BR' && v.name.toLowerCase().includes('google'))
        || voices.find(v => v.lang === 'pt-BR')
        || voices.find(v => v.lang.startsWith('pt'))
        || voices[0];
      if (voice) utt.voice = voice;
      utt.lang = 'pt-BR';
      utt.pitch = 0.88;
      utt.rate = 0.92;
      window.speechSynthesis.speak(utt);
    }
  }, []);

  const startListening = useCallback(() => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) return;
    const rec = new SR();
    rec.lang = 'pt-BR';
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

  const timeStr = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const dateStr = now.toLocaleDateString('pt-BR', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase();

  return (
    <div className="jarvis-root">
      <div className="scan-line" />
      <div className="hud-corner tl" />
      <div className="hud-corner tr" />
      <div className="hud-corner bl" />
      <div className="hud-corner br" />

      <header className="jarvis-topbar">
        <div style={{ fontSize: '0.58rem', letterSpacing: '0.14em', color: 'rgba(127,218,255,0.6)', lineHeight: 1.7 }} className="topbar-status">
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span className="status-dot online" />SISTEMA ONLINE
          </div>
          <div>SEGURANÇA: NÍVEL 5</div>
          <div>MARK L: ESPERA</div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div className="jarvis-title">J.A.R.V.I.S.</div>
          <div className="jarvis-subtitle">JUST A RATHER VERY INTELLIGENT SYSTEM</div>
        </div>

        <div style={{ textAlign: 'right', fontSize: '0.58rem', letterSpacing: '0.1em', color: 'rgba(127,218,255,0.65)', lineHeight: 1.7 }} className="topbar-time">
          <div style={{
            color: 'var(--j-primary)', fontFamily: 'Orbitron, sans-serif',
            fontSize: '1rem', textShadow: 'var(--j-glow-sm)',
          }}>
            {timeStr}
          </div>
          <div>{dateStr}</div>
          <div>TORRE STARK, NY</div>
        </div>
      </header>

      <main className="jarvis-main">
        <div className="left-col">
          <StatusPanel stats={stats} />
        </div>

        <div className="center-col arc-reactor-wrapper">
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-around', padding: '0 10px' }}>
            {[
              { label: 'SAÍDA DE ENERGIA', value: '3,2 GJ/s' },
              { label: 'TEMP. DO NÚCLEO',  value: '18.420 K'  },
              { label: 'EFICIÊNCIA',        value: '99,7%'     },
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

          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-around', padding: '0 10px' }}>
            {[
              { label: 'PROTOCOLOS', value: 'ATIVO',     dot: 'online'  as const },
              { label: 'UPLINK',     value: 'CONECTADO', dot: 'online'  as const },
              { label: 'MARK L',     value: 'ESPERA',    dot: 'warning' as const },
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

        <div className="right-col">
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
        </div>
      </main>

      <footer className="jarvis-bottombar">
        <div>STARK INDUSTRIES © {now.getFullYear()} · J.A.R.V.I.S. v7.2.1</div>
        <div style={{ color: 'var(--j-primary)', letterSpacing: '0.2em', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span className="status-dot online" />TODOS OS SISTEMAS NOMINAIS
        </div>
        <div>LAT: 40.7128°N · LON: 74.0060°O · ALT: 93A</div>
      </footer>
    </div>
  );
};

export default Jarvis;
