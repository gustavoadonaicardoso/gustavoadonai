import { useEffect } from 'react';

const TargetIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>
);

const UsersIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
);

const RocketIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path></svg>
);

const ValueCard = ({ title, description, icon: Icon, delay }: { title: string, description: string, icon: React.FC<any>, delay: string }) => (
  <div className={`glass-panel p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300 group ${delay}`}>
    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] group-hover:text-white transition-all">
      <Icon className="w-7 h-7" />
    </div>
    <h3 className="text-xl font-bold mb-3 text-white tracking-wide">{title}</h3>
    <p className="text-slate-400 leading-relaxed text-sm">{description}</p>
  </div>
);

const Sobre = ({ navigate }: { navigate: (path: string) => void }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-24 min-h-[80vh] pb-32 overflow-hidden relative">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid -z-10"></div>
      <div className="absolute blob bg-primary w-[500px] h-[500px] rounded-full top-[-10%] left-[-10%] opacity-20"></div>
      <div className="absolute blob bg-secondary w-[400px] h-[400px] rounded-full bottom-[10%] right-[-5%] opacity-20 animation-delay-4000"></div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="max-w-4xl mx-auto text-center mb-28">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-sm">
            Sobre a Vórtice Tecnologia
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
            Nós Construímos o seu <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary glow-text">Império de Vendas</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-3xl mx-auto">
            Somos uma assessoria especialista em arquitetar e gerenciar operações comerciais agressivas. Consolidamos métodos ágeis de performance com a implantação rigorosa de CRMs líderes para sua empresa quebrar recordes de faturamento.
          </p>
        </div>

        {/* Story Section */}
        <div className="max-w-6xl mx-auto mb-32 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-3xl blur-2xl opacity-20"></div>
            <div className="glass-panel p-10 md:p-14 rounded-3xl relative border border-white/10 shadow-2xl backdrop-blur-xl">
              <div className="w-16 h-16 rounded-xl bg-gradient-tech flex items-center justify-center text-white font-bold text-3xl shadow-[0_0_20px_rgba(59,130,246,0.6)] mb-8">V</div>
              <h2 className="text-3xl font-bold text-white mb-6">Nossa Força e DNA</h2>
              <p className="text-slate-400 leading-relaxed mb-6 font-medium">
                A Vórtice nasceu da convicção inabalável de que times de vendas só atingem alta performance sustentável quando operam através de processos desenhados milimetricamente, monitorados pelas melhores tecnologias e automações.
              </p>
              <p className="text-slate-400 leading-relaxed font-medium">
                Nós nunca entregaremos aconselhamentos genéricos. Nós entramos na trincheira com o seu time: auditamos gargalos reais na conversão, desenhamos a malha analítica do seu CRM e treinamos os seus gestores. Desenhamos um hub de aquisição veloz e altamente previsível.
              </p>
            </div>
          </div>
          
          <div className="space-y-10 pl-0 md:pl-10">
             <div className="flex gap-6 items-start group">
               <div className="text-4xl text-white/10 font-black mt-1 group-hover:text-primary transition-colors">01</div>
               <div>
                 <h4 className="text-xl font-bold text-white mb-2">Engenharia de Vendas</h4>
                 <p className="text-slate-400 text-sm leading-relaxed">Fundações sólidas garantem previsibilidade. Configuramos de ponta a ponta suas automações comerciais, enriquecimento de leads e gatilhos de nutrição nos melhores CRMs escaláveis.</p>
               </div>
             </div>
             
             <div className="w-full h-px bg-white/5"></div>

             <div className="flex gap-6 items-start group">
               <div className="text-4xl text-white/10 font-black mt-1 group-hover:text-secondary transition-colors">02</div>
               <div>
                 <h4 className="text-xl font-bold text-white mb-2">Auditoria Sem Filtros</h4>
                 <p className="text-slate-400 text-sm leading-relaxed">Localizamos exatamente onde o dinheiro está vazando. Identificamos falhas de discurso na prospecção (SDRs), atritos na jornada e acompanhamos todas as cadências de follow-ups.</p>
               </div>
             </div>
             
             <div className="w-full h-px bg-white/5"></div>

             <div className="flex gap-6 items-start group">
               <div className="text-4xl text-white/10 font-black mt-1 group-hover:text-primary transition-colors">03</div>
               <div>
                 <h4 className="text-xl font-bold text-white mb-2">Gestão Científica</h4>
                 <p className="text-slate-400 text-sm leading-relaxed">Deixamos o "feeling" de lado e implementamos cultura Data-Driven real, rastreando Custo de Aquisição (CAC), Taxas Críticas por etapa no Funil, Velocidade da Venda e Lifecycle Value.</p>
               </div>
             </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="max-w-6xl mx-auto mb-20 relative">
          <div className="text-center mb-16 relative z-10">
             <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-secondary/30 bg-secondary/10 text-secondary text-xs font-bold uppercase tracking-widest mb-4 backdrop-blur-sm">O Que Não Negociamos</div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Valores da Vórtice</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            <ValueCard 
              title="Impacto Absoluto (ROI)" 
              description="Monitoramos nossos resultados através do salto percentual do seu balanço financeiro e taxa de vitórias mensais."
              icon={TargetIcon}
              delay="animation-delay-0"
            />
            <ValueCard 
              title="Agressividade Comercial" 
              description="Aceleramos a sua operação cortando atritos, melhorando a eficácia do Playbook e encurtando seu Ciclo de Vendas na marra."
              icon={RocketIcon}
              delay="animation-delay-[200ms]"
            />
            <ValueCard 
              title="Sinergia Extrema" 
              description="Nossos líderes assumem a postura de executivos internos (Fractional C-levels), liderando seu back-office durante toda a transição."
              icon={UsersIcon}
              delay="animation-delay-[400ms]"
            />
          </div>
        </div>

        {/* CTA */}
        <div className="mt-32 text-center max-w-4xl mx-auto glass-panel p-12 rounded-3xl relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent"></div>
          <div className="absolute blob bg-secondary w-[200px] h-[200px] rounded-full top-[-50px] right-[-50px] opacity-20 blur-2xl"></div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 relative z-10">Acelere sua operação de vendas</h2>
          <p className="text-slate-400 mb-10 relative z-10 text-lg">
            Solicite uma auditoria implacável. Nossos especialistas mapearão exatamente as lacunas que travam a escala do seu faturamento mensal atual.
          </p>
          <a 
            href="#contato"
            onClick={(e) => {
              e.preventDefault();
              navigate('/');
              setTimeout(() => {
                const el = document.getElementById('contato');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="inline-flex relative z-10 items-center justify-center px-10 py-5 rounded-full bg-gradient-tech text-white font-bold tracking-wide hover:opacity-90 transition-all shadow-[0_4px_30px_rgba(59,130,246,0.6)] hover:shadow-[0_8px_40px_rgba(59,130,246,0.8)]"
          >
            Falar com Especialistas
          </a>
        </div>

      </div>
    </div>
  );
};

export default Sobre;
