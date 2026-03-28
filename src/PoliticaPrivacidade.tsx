import { type FC } from 'react';

interface PoliticaPrivacidadeProps {
  navigate: (path: string) => void;
}

const PoliticaPrivacidade: FC<PoliticaPrivacidadeProps> = ({ navigate }) => {
  return (
    <div className="pt-32 pb-24 relative overflow-hidden min-h-screen">
      <div className="absolute inset-0 bg-grid -z-10 opacity-30"></div>
      <div className="absolute blob bg-primary w-[500px] h-[500px] rounded-full top-[-100px] right-[-100px] opacity-20"></div>
      <div className="absolute blob bg-secondary w-[400px] h-[400px] rounded-full bottom-[-100px] left-[-100px] opacity-20"></div>

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <button 
          onClick={() => navigate('/')} 
          className="mb-8 text-slate-400 hover:text-white flex items-center gap-2 transition-colors group"
        >
          <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Voltar para Início
        </button>

        <div className="glass-panel p-10 md:p-16 rounded-[2.5rem] border border-white/10 backdrop-blur-xl shadow-2xl">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-8 tracking-tight">
            Política de <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary glow-text">Privacidade</span>
          </h1>
          
          <div className="space-y-8 text-slate-300 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-white mb-4">1. Introdução</h2>
              <p>
                A Vórtice Tecnologia valoriza a sua privacidade. Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos suas informações pessoais quando você utiliza nossos serviços, visita nosso site ou interage conosco.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">2. Coleta de Informações</h2>
              <p>
                Coletamos informações que você nos fornece diretamente, como nome, e-mail corporativo e detalhes sobre os desafios de vendas da sua empresa, através de nossos formulários de contato e interação com consultores.
              </p>
              <p className="mt-4">
                Também podemos coletar informações técnicas automaticamente, como endereço IP, tipo de navegador e páginas visitadas, para melhorar a experiência do usuário e a segurança do site.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">3. Uso das Informações</h2>
              <p>
                As informações coletadas são utilizadas para:
              </p>
              <ul className="list-disc list-inside mt-4 space-y-2 ml-4">
                <li>Fornecer e gerenciar nossos serviços de CRM e consultoria.</li>
                <li>Responder a suas solicitações e dúvidas.</li>
                <li>Enviar comunicações sobre novos recursos ou atualizações importantes.</li>
                <li>Melhorar e personalizar a sua experiência em nossa plataforma.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">4. Segurança dos Dados</h2>
              <p>
                Implementamos medidas de segurança técnicas e organizacionais rigorosas para proteger seus dados contra acesso não autorizado, alteração, divulgação ou destruição. Utilizamos criptografia e auditorias constantes em nossos sistemas.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">5. Compartilhamento com Terceiros</h2>
              <p>
                Não comercializamos suas informações pessoais. Podemos compartilhar dados com parceiros estratégicos apenas quando necessário para a prestação dos serviços contratados (como ferramentas de automação e armazenamento em nuvem), sempre sob rígidos contratos de confidencialidade.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">6. Seus Direitos</h2>
              <p>
                De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem o direito de acessar, corrigir, excluir ou solicitar a portabilidade de seus dados pessoais a qualquer momento, enviando um e-mail para nossa equipe de privacidade.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">7. Alterações nesta Política</h2>
              <p>
                Podemos atualizar esta política periodicamente. Recomendamos que você revise esta página regularmente para estar ciente de quaisquer mudanças. A data da última atualização será sempre exibida ao final do documento.
              </p>
            </section>

            <div className="pt-8 border-t border-white/10 text-sm text-slate-500 italic">
              Última atualização: {new Date().toLocaleDateString('pt-BR')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoliticaPrivacidade;
