import { useEffect } from 'react';

const CheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
);

const HowItWorks = ({ navigate }: { navigate: (path: string) => void }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-20 min-h-[80vh] pb-32">
      <div className="absolute inset-0 bg-grid -z-10"></div>
      <div className="absolute blob bg-primary w-[400px] h-[400px] rounded-full top-[-50px] right-[-100px] opacity-20"></div>
      <div className="absolute blob bg-secondary w-[300px] h-[300px] rounded-full bottom-[20%] left-[-50px] opacity-20 animation-delay-2000"></div>

      <div className="container mx-auto px-6 py-16">
        <div className="text-center max-w-3xl mx-auto mb-20 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-6 backdrop-blur-sm">
            Método Exclusivo Vórtice
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            O Método <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary glow-text">SSD</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 leading-relaxed font-medium">
            Aplicamos a nossa estratégia central voltada para vendas em três pilares fundamentais: <strong className="text-white">Structure, Scale e Dominate</strong>. Ajudamos estruturar uma verdadeira máquina de resultados.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-10 relative z-10">
          {/* Pillar 1 */}
          <div className="glass-panel p-8 md:p-12 rounded-3xl relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300 shadow-xl backdrop-blur-md">
            <div className="absolute top-0 left-0 w-2 h-full bg-primary group-hover:bg-secondary transition-colors duration-500"></div>
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="text-6xl md:text-8xl font-black text-white/5 select-none -mt-4 uppercase">S</div>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white flex items-center gap-3">
                  Structure <span className="text-primary font-normal text-xl">(Estruturar)</span>
                </h3>
                <p className="text-slate-400 mb-6 leading-relaxed">
                  O primeiro pilar foca em criar alicerces inabaláveis. Antes de buscar volume agressivo, nós implementamos o CRM na sua raiz, auditamos seus processos comerciais atuais e definimos uma engenharia de vendas sólida para o seu time.
                </p>
                <ul className="space-y-3">
                  {['Mapeamento Prático e Setup do CRM', 'Definição Estratégica do Playbook de Vendas', 'Padronização Universal do Funil Comercial'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-slate-300 font-medium tracking-wide">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary flex-shrink-0">
                        <CheckIcon className="w-3.5 h-3.5" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="glass-panel p-8 md:p-12 rounded-3xl relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300 shadow-xl backdrop-blur-md">
            <div className="absolute top-0 left-0 w-2 h-full bg-secondary group-hover:bg-primary transition-colors duration-500"></div>
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="text-6xl md:text-8xl font-black text-white/5 select-none -mt-4 uppercase">S</div>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white flex items-center gap-3">
                  Scale <span className="text-secondary font-normal text-xl">(Escalar)</span>
                </h3>
                <p className="text-slate-400 mb-6 leading-relaxed">
                  Com a estrutura validada e forte, passamos a injetar velocidade. Automatizamos tarefas operacionais repetitivas, treinamos gestores e aceleramos o fluxo de leads para maximizar suas conversões de forma robusta e mensurável.
                </p>
                <ul className="space-y-3">
                  {['Automação de Tarefas no CRM', 'Treinamento de SDRs, BDRs e Closers', 'Otimização Contínua de Taxas de Conversão'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-slate-300 font-medium tracking-wide">
                      <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center text-secondary flex-shrink-0">
                        <CheckIcon className="w-3.5 h-3.5" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="glass-panel p-8 md:p-12 rounded-3xl relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300 shadow-xl backdrop-blur-md">
            <div className="absolute top-0 left-0 w-2 h-full bg-primary group-hover:bg-secondary transition-colors duration-500"></div>
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="text-6xl md:text-8xl font-black text-white/5 select-none -mt-4 uppercase">D</div>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white flex items-center gap-3">
                  Dominate <span className="text-primary font-normal text-xl">(Dominar)</span>
                </h3>
                <p className="text-slate-400 mb-6 leading-relaxed">
                  A última etapa transforma sua empresa em uma verdadeira autoridade na aquisição. Entramos com uma consultoria de altíssimo nível, visando a retenção ativa dos atuais clientes e dominação do market share baseando-se na alta previsibilidade.
                </p>
                <ul className="space-y-3">
                  {['Inteligência de Dados Avancada (BI)', 'Estratégia de Retenção Ativa e Fidelização', 'Acompanhamento Evolutivo Contínuo com nossos C-Levels'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-slate-300 font-medium tracking-wide">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary flex-shrink-0">
                        <CheckIcon className="w-3.5 h-3.5" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-24 text-center">
          <p className="text-slate-400 text-lg mb-6 tracking-wide">Quer aplicar o Método SSD na operação da sua empresa?</p>
          <a 
            href="#contato"
            onClick={(e) => {
              e.preventDefault();
              navigate('/');
              setTimeout(() => {
                const element = document.getElementById('contato');
                if (element) {
                   element.scrollIntoView({ behavior: 'smooth' });
                }
              }, 100);
            }}
            className="inline-flex items-center justify-center px-10 py-5 rounded-full bg-gradient-tech text-white font-bold tracking-wide gap-3 hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:shadow-[0_0_30px_rgba(59,130,246,0.7)]"
          >
            Escalar Minhas Vendas
          </a>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
