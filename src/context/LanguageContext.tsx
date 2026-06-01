import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'pt' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Language, string>> = {
  // Navbar
  'nav.about': { pt: 'Sobre', en: 'About' },
  'nav.tech': { pt: 'Skills', en: 'Skills' },
  'nav.projects': { pt: 'Projetos', en: 'Projects' },
  'nav.contact': { pt: 'Contato', en: 'Contact' },
  
  // Hero
  'hero.role': { pt: 'Web Developer', en: 'Web Developer' },
  'hero.cta': { pt: 'Conheça meu trabalho', en: 'View my work' },
  
  // About
  'about.role': { pt: 'Estudante de Engenharia de Software', en: 'Software Engineering Student' },
  'about.title': { pt: 'Quem sou eu', en: 'Who am I' },
  'about.headline': { pt: 'Transformando código em soluções que geram valor através da inovação.', en: 'Transforming code into solutions that generate value through innovation.' },
  'about.desc1': { 
    pt: 'Sou estudante de Engenharia de Software e desenvolvedor focado em criar aplicações que resolvem problemas reais. Tenho experiência prática no ciclo completo de desenvolvimento, desde a concepção da interface até a estruturação de arquiteturas de dados robustas.', 
    en: 'I am a Software Engineering student and developer focused on creating applications that solve real problems. I have practical experience in the full development cycle, from interface conception to structuring robust data architectures.' 
  },
  'about.desc2': { 
    pt: 'Atualmente, meu foco está na interseção entre o desenvolvimento de software e a Inteligência Artificial. Utilizo a IA como uma aliada estratégica para otimizar processos, acelerar entregas e construir produtos digitais mais inteligentes. Busco constantemente o equilíbrio entre performance técnica, inovação tecnológica e uma experiência de usuário intuitiva.', 
    en: 'Currently, my focus is on the intersection between software development and Artificial Intelligence. I use AI as a strategic ally to optimize processes, accelerate deliveries, and build smarter digital products. I constantly seek the balance between technical performance, technological innovation, and an intuitive user experience.' 
  },

  // Experience
  'experience.title': { pt: 'Experiência', en: 'Experience' },
  'experience.job1.role': { pt: 'Administrador', en: 'Administrator' },
  'experience.job1.company': { pt: 'Hengu Hotel', en: 'Hengu Hotel' },
  'experience.job1.desc': { pt: 'Gestão operacional do negócio familiar, responsável pelo atendimento ao público e organização de processos internos.', en: 'Operational management of the family business, responsible for customer service and organization of internal processes.' },
  'experience.job2.role': { pt: 'Auxiliar de Almoxarifado', en: 'Warehouse Assistant' },
  'experience.job2.company': { pt: 'IDP', en: 'IDP' },
  'experience.job2.desc': { pt: 'Atuação por 7 meses com controle de estoque e organização logística, desenvolvendo rigor técnico e disciplina.', en: 'Worked for 7 months with inventory control and logistical organization, developing technical rigor and discipline.' },

  // Skills
  'skills.title': { pt: 'Hard Skills', en: 'Hard Skills' },
  'skills.soft.title': { pt: 'Soft Skills', en: 'Soft Skills' },
  'skills.soft.org': { pt: 'Organização', en: 'Organization' },
  'skills.soft.com': { pt: 'Comunicação', en: 'Communication' },
  'skills.soft.prob': { pt: 'Resolução de Problemas', en: 'Problem Solving' },
  'skills.soft.learn': { pt: 'Aprendizado Contínuo', en: 'Continuous Learning' },
  'skills.soft.team': { pt: 'Trabalho em Equipe', en: 'Teamwork' },
  'skills.soft.adapt': { pt: 'Adaptabilidade', en: 'Adaptability' },
  'skills.soft.empathy': { pt: 'Inteligência Emocional', en: 'Emotional Intelligence' },
  'skills.soft.creative': { pt: 'Criatividade', en: 'Creativity' },
  'skills.frontend': { pt: 'Front-end', en: 'Front-end' },
  'skills.backend': { pt: 'Back-end', en: 'Back-end' },
  'skills.database': { pt: 'Bancos de Dados', en: 'Databases' },

  // Projects
  'projects.title': { pt: 'Projetos Selecionados', en: 'Selected Projects' },
  'projects.viewAll': { pt: 'Ver todos', en: 'View all' },
  
  // Project 1 - Hotel Finance
  'project1.title': { pt: 'Hotel Finance', en: 'Hotel Finance' },
  'project1.shortDesc': { pt: 'Gestão de Fluxo de Caixa Real para Hotelaria.', en: 'Real Cash Flow Management for Hospitality.' },
  'project1.role': { pt: 'Desenvolvedor Full Stack', en: 'Full Stack Developer' },
  'project1.challenge': { pt: 'O Hengu Hotel, um negócio familiar, enfrentava dificuldades operacionais para organizar as finanças de forma manual. O controle de o quanto entrava e saía era fragmentado, tornando o planejamento financeiro e o acompanhamento de reservas um desafio diário.', en: 'Hengu Hotel, a family business, faced operational difficulties in organizing finances manually. Control of inflows and outflows was fragmented, making financial planning and reservation tracking a daily challenge.' },
  'project1.solution': { pt: 'Desenvolvi uma aplicação Full Stack para centralizar e automatizar essa gestão. O sistema permite o controle rigoroso de pagamentos (Pix, cartões, dinheiro) e saídas em contas pagas, oferecendo uma visão clara do saldo e do futuro financeiro do hotel.', en: 'I developed a Full Stack application to centralize and automate this management. The system allows strict control of payments (Pix, cards, cash) and paid expenses, offering a clear view of the balance and the hotel\'s financial future.' },
  'project1.highlight1': { pt: 'Gestão de Entradas: Sistema para gerenciar pagamentos de hóspedes e emissão de notas fiscais.', en: 'Income Management: System to manage guest payments and invoice issuance.' },
  'project1.highlight2': { pt: 'Controle de Saídas: Organização de despesas por categorias com alertas de vencimento.', en: 'Expense Control: Organization of expenses by categories with due date alerts.' },
  'project1.highlight3': { pt: 'A Receber: Aba dedicada ao agendamento de pagamentos futuros e comissões.', en: 'Receivables: Tab dedicated to scheduling future payments and commissions.' },
  'project1.highlight4': { pt: 'Dashboard Inteligente: Gráficos dinâmicos de fluxo de caixa.', en: 'Smart Dashboard: Dynamic cash flow charts.' },
  'project1.highlight5': { pt: 'Stack Moderna: React.js, TypeScript, Tailwind CSS, Supabase.', en: 'Modern Stack: React.js, TypeScript, Tailwind CSS, Supabase.' },

  'project2.desc': { pt: 'Interface de chat minimalista integrada com LLMs via WebSocket.', en: 'Minimalist chat interface integrated with LLMs via WebSocket.' },
  'project3.desc': { pt: 'Loja virtual de alta performance utilizando arquitetura headless.', en: 'High-performance online store using headless architecture.' },

  // Contact
  'contact.title': { pt: 'Vamos construir algo incrível?', en: 'Let\'s build something amazing?' },
  'contact.desc': { pt: 'Tem uma ideia ou um negócio que precisa de um site profissional? Vamos conversar e tirar seu projeto do papel.', en: 'Do you have an idea or a business that needs a professional website? Let\'s talk and get your project off the ground.' },
  'contact.email': { pt: 'Enviar Email', en: 'Send Email' },
  
  // Footer
  'footer.rights': { pt: 'Todos os direitos reservados.', en: 'All rights reserved.' },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('pt');

  const t = (key: string) => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
