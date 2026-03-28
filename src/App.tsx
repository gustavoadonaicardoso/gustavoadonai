import { useState, useEffect } from 'react';
import HowItWorks from './HowItWorks';
import Sobre from './Sobre';
import PoliticaPrivacidade from './PoliticaPrivacidade';

// --- Icons (SVG Components) ---
const CodeIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
);

const ZapIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
);

const ShieldIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
);

const MenuIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
);
const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);
const ExternalLinkIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
);

const ChevronRightIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
);

const MailIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
);

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .004 5.412 0 12.049c0 2.123.554 4.197 1.607 6.037L0 24l6.105-1.602a11.834 11.834 0 005.937 1.598h.005c6.637 0 12.048-5.412 12.052-12.049.002-3.218-1.248-6.242-3.511-8.507z"/></svg>
);

// --- Components ---

const Navbar = ({ navigate, currentPath }: { navigate: (path: string) => void, currentPath: string }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const navLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    setIsMenuOpen(false);
    if (currentPath !== '/') {
      e.preventDefault();
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(hash.replace('#', ''));
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const handleMobileNavigate = (path: string) => {
    setIsMenuOpen(false);
    navigate(path);
  };

  return (
    <>
      <nav className={`fixed w-full z-[100] transition-all duration-300 ${scrolled || isMenuOpen ? 'glass-panel py-3 shadow-lg' : 'bg-transparent py-5'}`}>
        <div className="container mx-auto px-6 lg:px-12 flex justify-between items-center">
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => { handleMobileNavigate('/'); window.scrollTo(0,0); }}
          >
            <span className="text-xl font-bold tracking-tight">Vórtice<span className="text-primary"> Tecnologia</span></span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-slate-300">
            <a href="#solucoes" onClick={(e) => navLinkClick(e, '#solucoes')} className="hover:text-white transition-colors">Soluções</a>
            <a href="#features" onClick={(e) => navLinkClick(e, '#features')} className="hover:text-white transition-colors">Recursos</a>
            <a 
              href="/como-funciona" 
              onClick={(e) => { e.preventDefault(); handleMobileNavigate('/como-funciona'); }} 
              className={`transition-colors ${currentPath === '/como-funciona' ? 'text-primary font-bold' : 'hover:text-white'}`}
            >
              Como Funciona
            </a>
            <a 
              href="/sobre-nos" 
              onClick={(e) => { e.preventDefault(); handleMobileNavigate('/sobre-nos'); }} 
              className={`transition-colors ${currentPath === '/sobre-nos' ? 'text-primary font-bold' : 'hover:text-white'}`}
            >
              Sobre Nós
            </a>
            <a href="#contato" onClick={(e) => navLinkClick(e, '#contato')} className="hover:text-white transition-colors">Contato</a>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <a 
              href="https://app.vorticetecnologia.com.br" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm font-semibold text-primary hover:text-white transition-colors px-2 flex items-center gap-1.5"
            >
              Acessar o CRM
              <ExternalLinkIcon className="w-4 h-4" />
            </a>
            <a href="#contato" onClick={(e) => navLinkClick(e, '#contato')} className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-sm transition-all border border-white/10 hover:border-white/30 backdrop-blur-md">
              Iniciar Projeto
            </a>
          </div>
          
          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-slate-300 hover:text-white z-[110]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <XIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[90] bg-dark flex flex-col pt-32 px-10 transition-all duration-500 ease-in-out md:hidden ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
        <div className="absolute inset-0 bg-grid -z-10 opacity-30"></div>
        <div className="flex flex-col gap-8 text-2xl font-bold text-white">
          <a href="#solucoes" onClick={(e) => navLinkClick(e, '#solucoes')} className="hover:text-primary transition-colors">Soluções</a>
          <a href="#features" onClick={(e) => navLinkClick(e, '#features')} className="hover:text-primary transition-colors">Recursos</a>
          <a 
            href="/como-funciona" 
            onClick={(e) => { e.preventDefault(); handleMobileNavigate('/como-funciona'); }}
            className={currentPath === '/como-funciona' ? 'text-primary' : ''}
          >
            Como Funciona
          </a>
          <a 
            href="/sobre-nos" 
            onClick={(e) => { e.preventDefault(); handleMobileNavigate('/sobre-nos'); }}
            className={currentPath === '/sobre-nos' ? 'text-primary' : ''}
          >
            Sobre Nós
          </a>
          <a href="#contato" onClick={(e) => navLinkClick(e, '#contato')} className="hover:text-primary transition-colors">Contato</a>
          
          <div className="mt-10 flex flex-col gap-4">
            <a 
              href="https://app.vorticetecnologia.com.br" 
              target="_blank" 
              rel="noopener noreferrer"
              className="py-4 rounded-xl bg-white/5 border border-white/10 text-center text-primary text-lg flex items-center justify-center gap-2"
            >
              Acessar o CRM
              <ExternalLinkIcon className="w-5 h-5" />
            </a>
            <a 
              href="#contato" 
              onClick={(e) => navLinkClick(e, '#contato')}
              className="py-4 rounded-xl bg-gradient-tech text-white text-center text-lg shadow-lg"
            >
              Iniciar Projeto
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

const Hero = () => {
  return (
    <header className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <div className="absolute inset-0 bg-grid -z-10"></div>
      <div className="absolute blob bg-primary w-[500px] h-[500px] rounded-full top-[-100px] left-[-100px] opacity-40"></div>
      <div className="absolute blob bg-secondary w-[400px] h-[400px] rounded-full bottom-0 right-[10%] opacity-40 animation-delay-2000"></div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-8 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          Consultoria & Tecnologia Integrada
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
          Escale Rápido com <br className="hidden md:block"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary glow-text">CRM de Alta Performance</span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Transforme seu funil de vendas, organize seus leads e obtenha resultados extraordinários. Aliamos uma plataforma robusta a estratégias comerciais precisas para sua empresa bater metas consistentes.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#contato" className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-tech text-white font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(59,130,246,0.5)]">
            Começar Agora <ChevronRightIcon className="w-4 h-4" />
          </a>
          <a href="#contato" className="w-full sm:w-auto md:w-auto flex items-center justify-center px-8 py-4 rounded-full glass-panel hover:bg-white/5 text-white font-semibold transition-colors">
            Fale Conosco
          </a>
        </div>
      </div>
    </header>
  );
};

const FeatureCard = ({ title, description, icon: Icon }: { title: string, description: string, icon: React.FC<any> }) => (
  <div className="glass-panel p-8 rounded-2xl hover:-translate-y-2 transition-transform duration-300 group cursor-default">
    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all">
      <Icon className="w-6 h-6" />
    </div>
    <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
    <p className="text-slate-400 leading-relaxed text-sm">{description}</p>
  </div>
);

const Features = () => {
  return (
    <section id="features" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Processos que <span className="text-primary">Fecham Negócios</span></h2>
          <p className="text-slate-400 text-lg">Nosso CRM aliado à consultoria de ponta a ponta elimina os ruídos da sua operação comercial, garantindo controle total, previsibilidade vitalícia e muitas vendas.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={ZapIcon}
            title="Funil Inteligente" 
            description="Visualize suas negociações em tempo real, identifique gargalos operacionais e avance negócios rapidamente por meio de automações ágeis."
          />
          <FeatureCard 
            icon={ShieldIcon}
            title="Retenção Avançada" 
            description="Mantenha o relacionamento constante com os clientes, construa fidelidade inquebrável, automatize cobranças e aumente o seu Lifetime Value (LTV)."
          />
          <FeatureCard 
            icon={CodeIcon}
            title="Consultoria Estratégica" 
            description="Muito além do software, os nossos especialistas auditarão e acompanharão ativamente o seu Playbook de Vendas e todas as rotinas implementadas."
          />
        </div>
      </div>
    </section>
  );
};

const DashboardPreview = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-secondary/30 bg-secondary/10 text-secondary text-xs font-semibold uppercase tracking-wider mb-6">
            Visão Geral 360º
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Domine o seu <span className="text-secondary text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary glow-text">Funil de Vendas</span></h2>
          <p className="text-slate-400 text-lg md:text-xl">Visualize, arraste e avance deals estrategicamente. Implementamos ambientes analíticos de CRM robustos (Pipeline visual, gestão automática e qualificação rápida) desenhados para não haver qualquer atrito operacional.</p>
        </div>

        <div className="glass-panel rounded-[2rem] p-2 md:p-5 shadow-[0_20px_60px_-15px_rgba(59,130,246,0.3)] overflow-hidden relative border border-white/10 backdrop-blur-xl">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-secondary to-transparent opacity-80"></div>
          <div className="bg-darker rounded-[1.5rem] overflow-hidden border border-white/5 relative flex flex-col h-[600px] shadow-2xl">
            {/* Mac-like window controls & Header CRM */}
            <div className="h-14 bg-[#111318] flex items-center justify-between px-5 border-b border-white/5">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                <div className="ml-4 px-3 py-1 rounded bg-white/5 text-xs text-slate-400 font-medium">Pipeline: Vendas Consultivas</div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/50 text-xs cursor-pointer hover:bg-white/20">+</div>
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold ring-2 ring-primary/50 cursor-pointer">VT</div>
              </div>
            </div>
            
            {/* Dashboard CRM UI (Kanban Board) */}
            <div className="flex-1 p-6 flex gap-6 overflow-x-hidden opacity-90">
              
              {/* Column 1: Prospecção */}
              <div className="w-1/4 min-w-[250px] flex flex-col h-full border-r border-white/5 pr-6">
                <div className="flex justify-between items-center mb-4 px-1">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">Lead Entrante</h4>
                  <span className="text-xs bg-white/10 text-slate-300 py-0.5 px-2 rounded-full font-bold">3</span>
                </div>
                <div className="flex-1 space-y-4">
                  {/* Card 1 */}
                  <div className="bg-[#1a1e27] border border-white/5 rounded-xl p-4 shadow-lg hover:border-primary/30 transition-colors cursor-pointer group">
                    <div className="text-xs font-semibold text-primary mb-1">R$ 15.000</div>
                    <div className="font-bold text-slate-200 text-sm mb-3 group-hover:text-primary transition-colors">Expansão de Software</div>
                    <div className="flex items-center justify-between mt-4 text-slate-500 text-xs">
                      <span>Logística S/A</span>
                      <div className="w-5 h-5 rounded-full bg-secondary/30"></div>
                    </div>
                  </div>
                  {/* Card 2 */}
                  <div className="bg-[#1a1e27] border border-white/5 rounded-xl p-4 shadow-lg hover:border-primary/30 transition-colors cursor-pointer group">
                    <div className="text-xs font-semibold text-primary mb-1">R$ 4.500</div>
                    <div className="font-bold text-slate-200 text-sm mb-3 group-hover:text-primary transition-colors">Consultoria Inicial CRM</div>
                    <div className="flex items-center justify-between mt-4 text-slate-500 text-xs">
                      <span>TechCorp Inc.</span>
                      <div className="w-5 h-5 rounded-full bg-white/10"></div>
                    </div>
                  </div>
                </div>
              </div>

               {/* Column 2: Qualificação */}
               <div className="w-1/4 min-w-[250px] flex flex-col h-full border-r border-white/5 pr-6">
                <div className="flex justify-between items-center mb-4 px-1">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">Qualificação (SDR)</h4>
                  <span className="text-xs bg-white/10 text-slate-300 py-0.5 px-2 rounded-full font-bold">2</span>
                </div>
                <div className="flex-1 space-y-4">
                  {/* Card 3 */}
                  <div className="bg-[#1a1e27] border border-white/5 rounded-xl p-4 shadow-lg hover:border-primary/30 transition-colors cursor-pointer relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-primary/20 to-transparent opacity-50 blur-xl"></div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-primary mb-1">
                      R$ 32.000
                    </div>
                    <div className="font-bold text-slate-200 text-sm mb-3 group-hover:text-primary transition-colors">Implementação Método SSD</div>
                    <div className="flex items-center gap-1 mb-3">
                      <span className="px-2 py-0.5 rounded text-[10px] bg-red-500/20 text-red-300 font-medium">Urgente🔥</span>
                    </div>
                    <div className="flex items-center justify-between mt-2 text-slate-500 text-xs border-t border-white/5 pt-3">
                      <span>CloudOps Ltd.</span>
                      <div className="w-5 h-5 rounded-full bg-primary/30"></div>
                    </div>
                  </div>
                   {/* Card 4 */}
                  <div className="bg-[#1a1e27] border border-white/5 rounded-xl p-4 shadow-lg hover:border-primary/30 transition-colors cursor-pointer group">
                    <div className="text-xs font-semibold text-slate-400 mb-1">A definir</div>
                    <div className="font-bold text-slate-200 text-sm mb-3 group-hover:text-primary transition-colors">Engenharia de Vendas Global</div>
                    <div className="flex items-center justify-between mt-4 text-slate-500 text-xs">
                      <span>MktFlow Corp.</span>
                      <div className="w-5 h-5 rounded-full bg-purple-500/30"></div>
                    </div>
                  </div>
                </div>
              </div>

               {/* Column 3: Reunião / Proposta */}
               <div className="w-1/4 min-w-[250px] flex flex-col h-full border-r border-white/5 pr-6">
                <div className="flex justify-between items-center mb-4 px-1">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">Negociação (Closer)</h4>
                  <span className="text-xs bg-white/10 text-slate-300 py-0.5 px-2 rounded-full font-bold">1</span>
                </div>
                <div className="flex-1 space-y-4">
                  {/* Card 5 */}
                  <div className="bg-gradient-to-br from-[#1a1e27] to-[#141b2e] border border-primary/40 rounded-xl p-4 shadow-[0_0_20px_rgba(59,130,246,0.2)] cursor-pointer group hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all">
                    <div className="text-xs font-bold text-primary mb-1">R$ 150.000 (Anual)</div>
                    <div className="font-bold text-white text-sm mb-3 group-hover:text-primary transition-colors">Reformulação Total CRM Hubspot</div>
                    <div className="flex items-center gap-1 mb-3">
                      <span className="px-2 py-0.5 rounded text-[10px] bg-green-500/20 text-green-300 font-bold uppercase tracking-widest">+ Alta chance</span>
                    </div>
                    <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
                      <div className="flex items-center gap-1.5 font-medium text-white/80">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(59,130,246,1)]"></span>
                        Reunião Final Hoje 15h
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-4 text-slate-500 text-xs border-t border-white/10 pt-3">
                      <span className="text-white/70 font-medium">Varejo Max Sul</span>
                      <div className="flex -space-x-2">
                        <div className="w-6 h-6 rounded-full bg-secondary ring-2 ring-dark"></div>
                        <div className="w-6 h-6 rounded-full bg-primary ring-2 ring-dark text-white text-[10px] flex items-center justify-center font-bold">V</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Column 4: Fechamento */}
              <div className="w-1/4 min-w-[250px] flex flex-col h-full pl-2">
                 <div className="flex justify-between items-center mb-4 px-1">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    Ganho <span className="text-green-400 text-lg group-hover:-translate-y-1 transition-transform">💰</span>
                  </h4>
                  <span className="text-xs bg-green-500/20 text-green-400 font-bold py-0.5 px-2 rounded-full">R$ 80k</span>
                </div>
                <div className="flex-1 space-y-4 opacity-70">
                   {/* Card 6 */}
                   <div className="bg-[#1a1e27]/80 border border-green-500/20 rounded-xl p-4 opacity-80 cursor-default">
                    <div className="text-xs font-semibold text-green-400 mb-1">R$ 80.000</div>
                    <div className="font-bold text-slate-400 text-sm mb-3 line-through decoration-2 decoration-green-500/50">Auditoria Premium Completa</div>
                     <div className="flex items-center justify-between mt-4 text-slate-600 text-[10px] uppercase font-bold tracking-wider">
                      Fechado (Janeiro)
                    </div>
                  </div>
                </div>
              </div>

            </div>
            {/* Overlay glow */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-darker via-darker/80 to-transparent pointer-events-none"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // -------------------------------------------------------------
    // PARA DIRECIONAR PARA O EXCEL/PLANILHA:
    // 1. Crie uma conta grátis no https://sheetmonkey.io/ ou https://sheetdb.io/
    // 2. Cole a URL da sua planilha do Excel/Google Sheets lá
    // 3. Cole a URL fornecida pelo serviço apontando o "WEBHOOK_URL" abaixo:
    // -------------------------------------------------------------
    const WEBHOOK_URL = 'https://api.sheetmonkey.io/form/66ng1u7NVH4LvMGFG6hBya'; 

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    data['Data de Envio'] = new Date().toLocaleString('pt-BR');

    try {
      if (WEBHOOK_URL) {
        await fetch(WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
      }

      setIsSubmitting(false);
      setIsSuccess(true);
      (e.target as HTMLFormElement).reset();

      // Direcionar para o WhatsApp após sucesso
      const whatsAppNumber = '551151928940';
      const whatsAppMessage = encodeURIComponent(`Olá! Acabei de enviar o formulário no site.\n\n*Nome:* ${data['Nome']}\n*Assunto:* ${data['Assunto']}\n*Mensagem:* ${data['Mensagem']}`);
      const whatsAppUrl = `https://wa.me/${whatsAppNumber}?text=${whatsAppMessage}`;

      // Pequeno delay para o usuário ver a mensagem de sucesso antes do redirecionamento
      setTimeout(() => {
        window.location.href = whatsAppUrl;
      }, 1500);

    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
      alert('Erro ao enviar mensagem.');
    }
  };

  return (
    <section id="contato" className="py-24 relative overflow-hidden">
      <div className="absolute blob bg-secondary w-[300px] h-[300px] rounded-full top-[10%] left-[-5%] opacity-30 animation-delay-4000"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto glass-panel rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col md:flex-row">
          {/* Info Side */}
          <div className="md:w-2/5 md:bg-dark/80 bg-dark p-10 flex flex-col justify-between relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none"></div>
            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-4 text-white">Evolução Comercial</h3>
              <p className="text-slate-400 mb-8 text-sm leading-relaxed">
                Pronto para escalar agressivamente os resultados do seu time de vendas? Agende uma análise com nossos consultores seniores e descubra na prática todo o potencial comercial da sua operação.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all cursor-pointer">
                    <MailIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Email</p>
                    <a href="mailto:contato@vorticetecnologia.com.br" className="text-white hover:text-primary transition-colors text-sm break-all">
                      contato@vorticetecnologia.com.br
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
          
          {/* Form Side */}
          <div className="md:w-3/5 p-10 backdrop-blur-md relative z-10">
            {isSuccess ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                <div className="w-16 h-16 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center shadow-[0_0_20px_rgba(74,222,128,0.3)]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-white mb-2">Mensagem Enviada!</h4>
                  <p className="text-slate-400 text-sm">Nossa equipe retornará o contato o mais breve possível.</p>
                </div>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-xs font-semibold text-slate-300 uppercase tracking-wide">Nome Completo</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="Nome"
                      required
                      className="w-full bg-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all font-medium text-sm"
                      placeholder="João Silva"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-xs font-semibold text-slate-300 uppercase tracking-wide">Email Corporativo</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="Email"
                      required
                      className="w-full bg-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all font-medium text-sm"
                      placeholder="joao@empresa.com"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="assunto" className="text-xs font-semibold text-slate-300 uppercase tracking-wide">Assunto / Desafio</label>
                  <input 
                    type="text" 
                    id="assunto" 
                    name="Assunto"
                    required
                    className="w-full bg-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all font-medium text-sm"
                    placeholder="Qual seu principal desafio de vendas hoje?"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs font-semibold text-slate-300 uppercase tracking-wide">Mensagem</label>
                  <textarea 
                    id="message" 
                    name="Mensagem"
                    rows={4} 
                    required
                    className="w-full bg-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all resize-none font-medium text-sm"
                    placeholder="Fale um pouco sobre a sua equipe, o processo de prospecção atual e as suas metas..."
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className={`w-full py-4 rounded-xl font-bold tracking-wide transition-all shadow-[0_4px_20px_rgba(59,130,246,0.4)] flex justify-center items-center gap-2 group ${
                    isSubmitting 
                      ? 'bg-primary/50 cursor-not-allowed text-white/50' 
                      : 'bg-gradient-tech text-white hover:opacity-90 hover:shadow-[0_4px_30px_rgba(59,130,246,0.6)]'
                  }`}
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
                  {!isSubmitting && <ChevronRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const WhatsAppButton = () => (
  <a 
    href="https://wa.me/message/TPLMPKTG5WDWF1" 
    target="_blank" 
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-[60] w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:scale-110 hover:shadow-[0_4px_30px_rgba(37,211,102,0.6)] transition-all group"
    aria-label="Fale conosco no WhatsApp"
  >
    <WhatsAppIcon className="w-8 h-8" />
    <span className="absolute right-full mr-4 bg-white text-darker text-sm font-bold py-2 px-4 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl border border-white/10 backdrop-blur-md">
      Fale com um consultor
    </span>
  </a>
);

const Footer = ({ navigate }: { navigate: (path: string) => void }) => (
  <footer className="border-t border-white/10 py-12 bg-dark">
    <div className="container mx-auto px-6 text-center text-slate-500 text-sm">
      <p>© {new Date().getFullYear()} Vórtice Tecnologia. Todos os direitos reservados.</p>
      <div className="mt-4 flex justify-center gap-6">
        <a 
          href="/politica-privacidade" 
          onClick={(e) => { e.preventDefault(); navigate('/politica-privacidade'); }} 
          className="hover:text-white transition-colors"
        >
          Política de Privacidade
        </a>
      </div>
    </div>
  </footer>
);

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <Navbar navigate={navigate} currentPath={currentPath} />
      <main>
        {currentPath === '/sobre-nos' ? (
          <Sobre navigate={navigate} />
        ) : currentPath === '/como-funciona' ? (
          <HowItWorks navigate={navigate} />
        ) : currentPath === '/politica-privacidade' ? (
          <PoliticaPrivacidade navigate={navigate} />
        ) : (
          <>
            <Hero />
            <Features />
            <DashboardPreview />
            <ContactForm />
          </>
        )}
      </main>
      <Footer navigate={navigate} />
      <WhatsAppButton />
    </>
  );
}
