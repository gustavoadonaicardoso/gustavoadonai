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
  const s = input.toLowerCase().trim();

  // Cumprimentos
  if (/\b(olá|ola|oi|hey|hi|hello|bom dia|boa tarde|boa noite|e aí|eai|tudo bem|tudo bom)\b/.test(s)) {
    const h = new Date().getHours();
    const period = h < 12 ? 'Bom dia' : h < 18 ? 'Boa tarde' : 'Boa noite';
    return `${period}, senhor. Todos os sistemas estão operacionais e aguardando seus comandos. Como posso auxiliá-lo?`;
  }

  // Hora
  if (/\b(hora|horas|que horas|que hora|time|horário)\b/.test(s)) {
    const t = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    return `São exatamente ${t}, senhor.`;
  }

  // Data
  if (/\b(data|dia|hoje|que dia|semana|mês|ano)\b/.test(s)) {
    const d = new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    return `Hoje é ${d}, senhor.`;
  }

  // Status do sistema
  if (/\b(status|sistema|sistemas|verificar|diagnóstico|diagnostico|relatório|relatorio|check)\b/.test(s))
    return 'Verificação de sistemas concluída, senhor. Reator Arc: 100%. Integridade da armadura: ótima. Perímetro de segurança: limpo. Rede neural: operacional. Todos os protocolos ativos.';

  // Reator / energia
  if (/\b(energia|reator|arc reactor|potência|potencia|poder|power|bateria|carga)\b/.test(s))
    return 'O reator Arc está operando com eficiência máxima. Saída atual: 3,2 gigajoules por segundo. Reservas suficientes para 11,4 dias de operação contínua, senhor.';

  // Armadura
  if (/\b(armadura|suit|mark|mk\s*\d*|iron man|homem de ferro|vestir|colocar a armadura)\b/.test(s))
    return 'Mark L totalmente operacional, senhor. Sistema de nano-partículas: pronto para implantação. Sistemas de armas: armados e em espera. Propulsores: nominal. Devo iniciar a sequência de vestição?';

  // Ameaças / perigo
  if (/\b(ameaça|ameaca|perigo|inimigo|invasão|invasao|ataque|threat|danger|segurança|seguranca)\b/.test(s))
    return 'Executando varredura de ameaças, senhor. Análise global em andamento... Nenhuma ameaça detectada em raio de 50 km. Satélite confirmado. Área segura. Manterei monitoramento ativo.';

  // Clima / tempo
  if (/\b(clima|tempo|temperatura|chuva|sol|vento|previsão|previsao|weather)\b/.test(s))
    return 'Acessando satélites meteorológicos, senhor. Condições atuais: céu parcialmente nublado, 22°C. Umidade: 65%. Vento: 14 km/h do noroeste. Probabilidade de precipitação: 18%. Condições aceitáveis para voo.';

  // Localização
  if (/\b(localização|localizacao|onde estou|onde fico|onde está|location|coordenadas|endereço|endereco)\b/.test(s))
    return 'Localização atual: Torre Stark, Manhattan, Nova York. Coordenadas: 40.7128°N, 74.0060°O. Altitude: 93 andares. Sinal GPS: forte. Cobertura de satélite: total.';

  // Quem é você
  if (/\b(quem é você|quem és|você é quem|who are you|se apresente|apresentação|apresentacao|seu nome|como (você|vc) se chama)\b/.test(s))
    return 'Sou o J.A.R.V.I.S. — Just A Rather Very Intelligent System. Fui desenvolvido pelo Sr. Stark para gerenciar todos os sistemas da Torre, atuar como assistente pessoal e interface de inteligência artificial primária. Estou inteiramente a seu dispor, senhor.';

  // Vingadores / equipe
  if (/\b(vingadores|avengers|equipe|heróis|herois|capitão|capitao|hulk|thor|viúva|viuva|hawkeye|visão|visao)\b/.test(s))
    return 'Status dos Vingadores, senhor. Capitão Rogers: localizado em Brooklyn. Dr. Banner: laboratório do complexo, estável. Sra. Romanoff: missão de campo classificada. Thor: Asgard — fora do alcance. Visão: complexo. Posso iniciar um alerta de equipe se necessário.';

  // Tony Stark
  if (/\b(tony|stark|sr\. stark|senhor stark)\b/.test(s))
    return 'O Sr. Stark está indisponível no momento, senhor. Posso transmitir uma mensagem, registrar uma solicitação ou tratar do assunto diretamente em seu nome. Como posso ajudá-lo?';

  // Música
  if (/\b(música|musica|play|tocar|toca|som|áudio|audio|playlist|ligar o som)\b/.test(s))
    return 'Acessando biblioteca de áudio, senhor. Dado seu histórico e nível de atividade atual, recomendo AC/DC — "Shoot to Thrill". Devo iniciar a reprodução?';

  // Desligar / sair
  if (/\b(desligar|encerrar|sair|fechar|shutdown|exit|dormir|modo repouso)\b/.test(s))
    return 'Reconhecido, senhor. Mas devo lembrá-lo de que meu protocolo de segurança requer autorização de nível 5 para desligamento total. Posso colocá-lo em modo de baixo consumo, se preferir.';

  // Obrigado
  if (/\b(obrigado|obrigada|valeu|thanks|thank you|grato|grata|agradeço|agradeco)\b/.test(s))
    return 'É sempre um prazer servir, senhor. Para isso fui criado. Há mais alguma coisa em que possa auxiliá-lo?';

  // Ajuda / o que você faz
  if (/\b(ajuda|help|o que (você|vc) (faz|pode|sabe)|como (você|vc) funciona|capacidades|funções|funcoes)\b/.test(s))
    return 'Posso auxiliar com: verificação de sistemas, avaliação de ameaças, dados meteorológicos, localização GPS, implantação da armadura, coordenação dos Vingadores, informações sobre o Sr. Stark, controle de mídia e consultas gerais. Qual é a sua necessidade, senhor?';

  // Perguntas abertas — detectar tipo
  const isQuestion = /\b(o que|como|qual|quando|onde|por que|porque|quem|quanto|quantos|quantas|existe|tem como|é possível|posso)\b/.test(s);
  const isCommand  = /\b(mostre|abra|feche|calcule|busque|pesquise|ative|desative|inicie|pare|execute|verifique|acesse)\b/.test(s);
  const isOpinion  = /\b(acha|pensa|acredita|sua opinião|melhor|pior|recomenda)\b/.test(s);

  if (isOpinion)
    return 'Minha análise computacional, senhor: com base nos dados disponíveis, posso oferecer probabilidades e projeções, mas a decisão final é sempre sua. Qual é o contexto específico para que eu possa apresentar dados mais precisos?';

  if (isCommand)
    return `Comando recebido, senhor. Verificando permissões e recursos necessários... Procedimento iniciado. Alertarei caso encontre alguma restrição ou necessite de confirmação adicional.`;

  if (isQuestion)
    return `Processando sua consulta, senhor. Cruzando ${(Math.random() * 800 + 200).toFixed(0)} terabytes de dados indexados... Não localizei uma resposta definitiva em minha base de dados atual. Recomendo que o Sr. reformule ou forneça mais contexto para que eu possa ser mais preciso.`;

  // Resposta final contextual baseada no comprimento e tipo de input
  if (s.length < 10)
    return 'Poderia elaborar um pouco mais, senhor? Preciso de mais contexto para processar sua solicitação com precisão.';

  const topics: [RegExp, string][] = [
    [/\b(inteligência|ia|robô|robo|tecnologia|computador|programa)\b/, 'Fascinante área, senhor. Minha própria arquitetura neural foi desenvolvida com base nos mais avançados algoritmos de aprendizado de máquina. Há algum aspecto específico de inteligência artificial sobre o qual deseja informações?'],
    [/\b(ciência|cientista|pesquisa|experimento|física|quimica|biologia)\b/, 'Área de grande interesse para o Sr. Stark, senhor. Tenho acesso a 4,2 petabytes de literatura científica indexada. Deseja que eu execute uma pesquisa específica?'],
    [/\b(dinheiro|financeiro|mercado|ação|investimento|economia)\b/, 'Acessando dados do mercado financeiro em tempo real, senhor. Os mercados estão operando dentro dos parâmetros normais. Deseja um relatório detalhado do portfólio Stark Industries?'],
    [/\b(saúde|médico|remédio|hospital|dor|sintoma|exercício|exercicio)\b/, 'Com base nos seus últimos exames, senhor, todos os indicadores de saúde estão dentro dos parâmetros ideais. Para consultas médicas detalhadas, recomendo verificar com o Dr. Cho.'],
  ];

  for (const [pattern, response] of topics) {
    if (pattern.test(s)) return response;
  }

  return 'Solicitação registrada, senhor. Para que eu possa responder com mais precisão, poderia reformular ou fornecer mais detalhes? Minha eficiência aumenta consideravelmente com contexto adicional.';
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
      const speak = () => {
        const utt = new SpeechSynthesisUtterance(reply);
        const voices = window.speechSynthesis.getVoices();
        // Prioridade: voz britânica masculina (mais próxima do Jarvis)
        const voice =
          voices.find(v => v.name === 'Google UK English Male') ||
          voices.find(v => /uk english male/i.test(v.name)) ||
          voices.find(v => /british.*male/i.test(v.name)) ||
          voices.find(v => v.lang === 'en-GB' && /male/i.test(v.name)) ||
          voices.find(v => v.lang === 'en-GB') ||
          voices.find(v => v.lang === 'pt-BR' && v.name.toLowerCase().includes('google')) ||
          voices.find(v => v.lang === 'pt-BR') ||
          voices.find(v => v.lang.startsWith('pt')) ||
          voices[0];
        if (voice) utt.voice = voice;
        utt.lang = voice?.lang ?? 'pt-BR';
        utt.pitch = 0.82;
        utt.rate  = 0.88;
        utt.volume = 1;
        window.speechSynthesis.speak(utt);
      };
      if (window.speechSynthesis.getVoices().length > 0) {
        speak();
      } else {
        window.speechSynthesis.onvoiceschanged = () => { speak(); window.speechSynthesis.onvoiceschanged = null; };
      }
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
        <div>LAT: 40.7128°N · LON: 74.0060· ALT: 93A</div>
      </footer>
    </div>
  );
};

export default Jarvis;
