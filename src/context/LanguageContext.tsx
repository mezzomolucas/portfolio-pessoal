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

  'project2.desc': { pt: 'Site institucional para a marca Ozark Viking com design temático e moderno.', en: 'Institutional website for the Ozark Viking brand with a themed and modern design.' },
  'project2.challenge': { pt: 'Criar uma identidade visual forte e coesa para uma marca com temática nórdica, garantindo performance e responsividade em todos os dispositivos.', en: 'Creating a strong and cohesive visual identity for a Nordic-themed brand, ensuring performance and responsiveness across all devices.' },
  'project2.solution': { pt: 'Desenvolvido com React e Tailwind, o site traduz a identidade da marca em uma experiência visual imersiva, com animações, tipografia personalizada e design responsivo.', en: 'Built with React and Tailwind, the site translates the brand identity into an immersive visual experience, with animations, custom typography, and responsive design.' },
  'project2.highlight1': { pt: 'Design temático nórdico com paleta de cores e tipografia customizadas.', en: 'Nordic themed design with custom color palette and typography.' },
  'project2.highlight2': { pt: 'Animações fluidas para uma experiência imersiva ao usuário.', en: 'Fluid animations for an immersive user experience.' },
  'project2.highlight3': { pt: 'Layout totalmente responsivo, otimizado para mobile e desktop.', en: 'Fully responsive layout, optimized for mobile and desktop.' },

  'project3.desc': { pt: 'Site institucional para o negócio Dona Ferreirinha, com foco em presença digital local.', en: 'Institutional website for the Dona Ferreirinha business, focused on local digital presence.' },
  'project3.challenge': { pt: 'Levar um negócio local para o ambiente digital com um site profissional, atrativo e de fácil navegação para o público-alvo.', en: 'Bringing a local business to the digital environment with a professional, attractive, and easy-to-navigate website for the target audience.' },
  'project3.solution': { pt: 'Criado um site institucional com React e Tailwind, destacando os produtos e serviços da marca com design limpo e acessível, priorizando a conversão e o contato direto com o cliente.', en: 'An institutional website was created with React and Tailwind, highlighting the brand\'s products and services with a clean and accessible design, prioritizing conversion and direct customer contact.' },
  'project3.highlight1': { pt: 'Design limpo e acessível voltado ao público local.', en: 'Clean and accessible design for the local audience.' },
  'project3.highlight2': { pt: 'Seções de produtos e serviços com apresentação visual atrativa.', en: 'Product and service sections with attractive visual presentation.' },
  'project3.highlight3': { pt: 'Integração com canais de contato direto (WhatsApp, Instagram).', en: 'Integration with direct contact channels (WhatsApp, Instagram).' },

  'project4.desc': { pt: 'Site institucional para fisioterapeuta em Faro, Portugal, com design profissional e bilíngue.', en: 'Institutional website for a physiotherapist in Faro, Portugal, with a professional bilingual design.' },
  'project4.challenge': { pt: 'Criar uma presença digital profissional para uma fisioterapeuta que transmitisse confiança aos pacientes e facilitasse o agendamento de consultas.', en: 'Creating a professional digital presence for a physiotherapist that conveyed trust to patients and facilitated appointment booking.' },
  'project4.solution': { pt: 'Desenvolvido com Next.js e Tailwind, o site apresenta as especialidades, depoimentos de pacientes e múltiplos canais de contato, com suporte bilíngue e design responsivo voltado à conversão.', en: 'Built with Next.js and Tailwind, the site presents specialties, patient testimonials, and multiple contact channels, with bilingual support and a conversion-focused responsive design.' },
  'project4.highlight1': { pt: 'Design limpo e profissional que transmite credibilidade e cuidado ao paciente.', en: 'Clean and professional design that conveys credibility and patient care.' },
  'project4.highlight2': { pt: 'Suporte a dois idiomas (Português e Inglês) para alcance ampliado.', en: 'Bilingual support (Portuguese and English) for broader reach.' },
  'project4.highlight3': { pt: 'Integração com múltiplos canais de contato: WhatsApp, email e telefone.', en: 'Integration with multiple contact channels: WhatsApp, email, and phone.' },

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
