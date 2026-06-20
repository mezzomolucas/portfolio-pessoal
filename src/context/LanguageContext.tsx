import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'pt' | 'en' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Language, string>> = {
  // Navbar
  'nav.about':        { pt: 'Sobre',         en: 'About',        es: 'Sobre'         },
  'nav.tech':         { pt: 'Skills',        en: 'Skills',       es: 'Skills'        },
  'nav.projects':     { pt: 'Projetos',      en: 'Projects',     es: 'Proyectos'     },
  'nav.certificates': { pt: 'Certificados',  en: 'Certificates', es: 'Certificados'  },
  'nav.contact':      { pt: 'Contato',       en: 'Contact',      es: 'Contacto'      },

  // Certificates
  'cert.1.title':  { pt: 'Certificado 1', en: 'Certificate 1', es: 'Certificado 1' },
  'cert.2.title':  { pt: 'Certificado 2', en: 'Certificate 2', es: 'Certificado 2' },
  'cert.open':     { pt: 'Abrir',         en: 'Open',          es: 'Abrir'         },
  'cert.download': { pt: 'Download',      en: 'Download',      es: 'Descargar'     },

  // Hero
  'hero.role': { pt: 'Web Developer', en: 'Web Developer', es: 'Web Developer' },
  'hero.cta':  { pt: 'Conheça meu trabalho', en: 'View my work', es: 'Ver mi trabajo' },

  // About
  'about.role':     { pt: 'Estudante de Engenharia de Software', en: 'Software Engineering Student', es: 'Estudiante de Ingeniería de Software' },
  'about.title':    { pt: 'Quem sou eu', en: 'Who am I', es: 'Quién soy' },
  'about.headline': {
    pt: 'Transformando código em soluções que geram valor através da inovação.',
    en: 'Transforming code into solutions that generate value through innovation.',
    es: 'Transformando código en soluciones que generan valor a través de la innovación.',
  },
  'about.desc1': {
    pt: 'Sou estudante de Engenharia de Software e desenvolvedor focado em criar aplicações que resolvem problemas reais. Tenho experiência prática no ciclo completo de desenvolvimento, desde a concepção da interface até a estruturação de arquiteturas de dados robustas.',
    en: 'I am a Software Engineering student and developer focused on creating applications that solve real problems. I have practical experience in the full development cycle, from interface conception to structuring robust data architectures.',
    es: 'Soy estudiante de Ingeniería de Software y desarrollador enfocado en crear aplicaciones que resuelven problemas reales. Tengo experiencia práctica en el ciclo completo de desarrollo, desde la concepción de la interfaz hasta la estructuración de arquitecturas de datos robustas.',
  },
  'about.desc2': {
    pt: 'Atualmente, meu foco está na interseção entre o desenvolvimento de software e a Inteligência Artificial. Utilizo a IA como uma aliada estratégica para otimizar processos, acelerar entregas e construir produtos digitais mais inteligentes. Busco constantemente o equilíbrio entre performance técnica, inovação tecnológica e uma experiência de usuário intuitiva.',
    en: 'Currently, my focus is on the intersection between software development and Artificial Intelligence. I use AI as a strategic ally to optimize processes, accelerate deliveries, and build smarter digital products. I constantly seek the balance between technical performance, technological innovation, and an intuitive user experience.',
    es: 'Actualmente, mi enfoque está en la intersección entre el desarrollo de software y la Inteligencia Artificial. Utilizo la IA como aliada estratégica para optimizar procesos, acelerar entregas y construir productos digitales más inteligentes. Busco constantemente el equilibrio entre rendimiento técnico, innovación tecnológica y una experiencia de usuario intuitiva.',
  },

  // Experience
  'experience.title':       { pt: 'Experiência',    en: 'Experience',         es: 'Experiencia'      },
  'experience.job1.role':   { pt: 'Administrador',  en: 'Administrator',      es: 'Administrador'    },
  'experience.job1.company':{ pt: 'Hengu Hotel',    en: 'Hengu Hotel',        es: 'Hengu Hotel'      },
  'experience.job1.desc': {
    pt: 'Gestão operacional do negócio familiar, responsável pelo atendimento ao público e organização de processos internos.',
    en: 'Operational management of the family business, responsible for customer service and organization of internal processes.',
    es: 'Gestión operacional del negocio familiar, responsable de la atención al público y organización de procesos internos.',
  },
  'experience.job2.role':   { pt: 'Auxiliar de Almoxarifado', en: 'Warehouse Assistant', es: 'Auxiliar de Almacén' },
  'experience.job2.company':{ pt: 'IDP', en: 'IDP', es: 'IDP' },
  'experience.job2.desc': {
    pt: 'Atuação por 7 meses com controle de estoque e organização logística, desenvolvendo rigor técnico e disciplina.',
    en: 'Worked for 7 months with inventory control and logistical organization, developing technical rigor and discipline.',
    es: 'Trabajo de 7 meses con control de inventario y organización logística, desarrollando rigor técnico y disciplina.',
  },

  // Skills
  'skills.title':        { pt: 'Hard Skills',           en: 'Hard Skills',         es: 'Hard Skills'          },
  'skills.soft.title':   { pt: 'Soft Skills',           en: 'Soft Skills',         es: 'Soft Skills'          },
  'skills.soft.org':     { pt: 'Organização',           en: 'Organization',        es: 'Organización'         },
  'skills.soft.com':     { pt: 'Comunicação',           en: 'Communication',       es: 'Comunicación'         },
  'skills.soft.prob':    { pt: 'Resolução de Problemas',en: 'Problem Solving',     es: 'Resolución de Problemas'},
  'skills.soft.learn':   { pt: 'Aprendizado Contínuo',  en: 'Continuous Learning', es: 'Aprendizaje Continuo' },
  'skills.soft.team':    { pt: 'Trabalho em Equipe',    en: 'Teamwork',            es: 'Trabajo en Equipo'    },
  'skills.soft.adapt':   { pt: 'Adaptabilidade',        en: 'Adaptability',        es: 'Adaptabilidad'        },
  'skills.soft.empathy': { pt: 'Inteligência Emocional',en: 'Emotional Intelligence',es:'Inteligencia Emocional'},
  'skills.soft.creative':{ pt: 'Criatividade',          en: 'Creativity',          es: 'Creatividad'          },
  'skills.frontend':     { pt: 'Front-end',             en: 'Front-end',           es: 'Front-end'            },
  'skills.backend':      { pt: 'Back-end',              en: 'Back-end',            es: 'Back-end'             },
  'skills.database':     { pt: 'Bancos de Dados',       en: 'Databases',           es: 'Bases de Datos'       },

  // Projects
  'projects.title':   { pt: 'Projetos Selecionados', en: 'Selected Projects',    es: 'Proyectos Seleccionados' },
  'projects.viewAll': { pt: 'Ver todos',             en: 'View all',             es: 'Ver todos'               },

  // Project 1 — Hotel Finance
  'project1.title':    { pt: 'Hotel Finance', en: 'Hotel Finance', es: 'Hotel Finance' },
  'project1.shortDesc':{ pt: 'Gestão de Fluxo de Caixa Real para Hotelaria.', en: 'Real Cash Flow Management for Hospitality.', es: 'Gestión de Flujo de Caja Real para Hostelería.' },
  'project1.role':     { pt: 'Desenvolvedor Full Stack', en: 'Full Stack Developer', es: 'Desarrollador Full Stack' },
  'project1.challenge': {
    pt: 'O Hengu Hotel, um negócio familiar, enfrentava dificuldades operacionais para organizar as finanças de forma manual. O controle de o quanto entrava e saía era fragmentado, tornando o planejamento financeiro e o acompanhamento de reservas um desafio diário.',
    en: 'Hengu Hotel, a family business, faced operational difficulties in organizing finances manually. Control of inflows and outflows was fragmented, making financial planning and reservation tracking a daily challenge.',
    es: 'Hengu Hotel, un negocio familiar, enfrentaba dificultades operacionales para organizar las finanzas manualmente. El control de ingresos y gastos era fragmentado, haciendo del planeamiento financiero y el seguimiento de reservas un desafío diario.',
  },
  'project1.solution': {
    pt: 'Desenvolvi uma aplicação Full Stack para centralizar e automatizar essa gestão. O sistema permite o controle rigoroso de pagamentos (Pix, cartões, dinheiro) e saídas em contas pagas, oferecendo uma visão clara do saldo e do futuro financeiro do hotel.',
    en: 'I developed a Full Stack application to centralize and automate this management. The system allows strict control of payments (Pix, cards, cash) and paid expenses, offering a clear view of the balance and the hotel\'s financial future.',
    es: 'Desarrollé una aplicación Full Stack para centralizar y automatizar esta gestión. El sistema permite el control riguroso de pagos (Pix, tarjetas, efectivo) y gastos pagados, ofreciendo una visión clara del saldo y el futuro financiero del hotel.',
  },
  'project1.highlight1': { pt: 'Gestão de Entradas: Sistema para gerenciar pagamentos de hóspedes e emissão de notas fiscais.', en: 'Income Management: System to manage guest payments and invoice issuance.', es: 'Gestión de Ingresos: Sistema para gestionar pagos de huéspedes y emisión de facturas.' },
  'project1.highlight2': { pt: 'Controle de Saídas: Organização de despesas por categorias com alertas de vencimento.', en: 'Expense Control: Organization of expenses by categories with due date alerts.', es: 'Control de Gastos: Organización de gastos por categorías con alertas de vencimiento.' },
  'project1.highlight3': { pt: 'A Receber: Aba dedicada ao agendamento de pagamentos futuros e comissões.', en: 'Receivables: Tab dedicated to scheduling future payments and commissions.', es: 'Por Cobrar: Pestaña dedicada a la programación de pagos futuros y comisiones.' },
  'project1.highlight4': { pt: 'Dashboard Inteligente: Gráficos dinâmicos de fluxo de caixa.', en: 'Smart Dashboard: Dynamic cash flow charts.', es: 'Panel Inteligente: Gráficos dinámicos de flujo de caja.' },
  'project1.highlight5': { pt: 'Stack Moderna: React.js, TypeScript, Tailwind CSS, Supabase.', en: 'Modern Stack: React.js, TypeScript, Tailwind CSS, Supabase.', es: 'Stack Moderno: React.js, TypeScript, Tailwind CSS, Supabase.' },

  // Project 2 — Ozark Viking
  'project2.desc': { pt: 'Site institucional para a marca Ozark Viking com design temático e moderno.', en: 'Institutional website for the Ozark Viking brand with a themed and modern design.', es: 'Sitio institucional para la marca Ozark Viking con diseño temático y moderno.' },
  'project2.challenge': {
    pt: 'Criar uma identidade visual forte e coesa para uma marca com temática nórdica, garantindo performance e responsividade em todos os dispositivos.',
    en: 'Creating a strong and cohesive visual identity for a Nordic-themed brand, ensuring performance and responsiveness across all devices.',
    es: 'Crear una identidad visual fuerte y cohesiva para una marca con temática nórdica, garantizando rendimiento y responsividad en todos los dispositivos.',
  },
  'project2.solution': {
    pt: 'Desenvolvido com React e Tailwind, o site traduz a identidade da marca em uma experiência visual imersiva, com animações, tipografia personalizada e design responsivo.',
    en: 'Built with React and Tailwind, the site translates the brand identity into an immersive visual experience, with animations, custom typography, and responsive design.',
    es: 'Desarrollado con React y Tailwind, el sitio traduce la identidad de la marca en una experiencia visual inmersiva, con animaciones, tipografía personalizada y diseño responsivo.',
  },
  'project2.highlight1': { pt: 'Design temático nórdico com paleta de cores e tipografia customizadas.', en: 'Nordic themed design with custom color palette and typography.', es: 'Diseño temático nórdico con paleta de colores y tipografía personalizadas.' },
  'project2.highlight2': { pt: 'Animações fluidas para uma experiência imersiva ao usuário.', en: 'Fluid animations for an immersive user experience.', es: 'Animaciones fluidas para una experiencia inmersiva al usuario.' },
  'project2.highlight3': { pt: 'Layout totalmente responsivo, otimizado para mobile e desktop.', en: 'Fully responsive layout, optimized for mobile and desktop.', es: 'Layout completamente responsivo, optimizado para móvil y escritorio.' },

  // Project 3 — Dona Ferreirinha
  'project3.desc': { pt: 'Site institucional para o negócio Dona Ferreirinha, com foco em presença digital local.', en: 'Institutional website for the Dona Ferreirinha business, focused on local digital presence.', es: 'Sitio institucional para el negocio Dona Ferreirinha, con enfoque en presencia digital local.' },
  'project3.challenge': {
    pt: 'Levar um negócio local para o ambiente digital com um site profissional, atrativo e de fácil navegação para o público-alvo.',
    en: 'Bringing a local business to the digital environment with a professional, attractive, and easy-to-navigate website for the target audience.',
    es: 'Llevar un negocio local al entorno digital con un sitio profesional, atractivo y de fácil navegación para el público objetivo.',
  },
  'project3.solution': {
    pt: 'Criado um site institucional com React e Tailwind, destacando os produtos e serviços da marca com design limpo e acessível, priorizando a conversão e o contato direto com o cliente.',
    en: 'An institutional website was created with React and Tailwind, highlighting the brand\'s products and services with a clean and accessible design, prioritizing conversion and direct customer contact.',
    es: 'Se creó un sitio institucional con React y Tailwind, destacando los productos y servicios de la marca con diseño limpio y accesible, priorizando la conversión y el contacto directo con el cliente.',
  },
  'project3.highlight1': { pt: 'Design limpo e acessível voltado ao público local.', en: 'Clean and accessible design for the local audience.', es: 'Diseño limpio y accesible orientado al público local.' },
  'project3.highlight2': { pt: 'Seções de produtos e serviços com apresentação visual atrativa.', en: 'Product and service sections with attractive visual presentation.', es: 'Secciones de productos y servicios con presentación visual atractiva.' },
  'project3.highlight3': { pt: 'Integração com canais de contato direto (WhatsApp, Instagram).', en: 'Integration with direct contact channels (WhatsApp, Instagram).', es: 'Integración con canales de contacto directo (WhatsApp, Instagram).' },

  // Project 4 — Marta Gonçalves
  'project4.desc': { pt: 'Site institucional para fisioterapeuta em Faro, Portugal, com design profissional e bilíngue.', en: 'Institutional website for a physiotherapist in Faro, Portugal, with a professional bilingual design.', es: 'Sitio institucional para fisioterapeuta en Faro, Portugal, con diseño profesional y bilingüe.' },
  'project4.challenge': {
    pt: 'Criar uma presença digital profissional para uma fisioterapeuta que transmitisse confiança aos pacientes e facilitasse o agendamento de consultas.',
    en: 'Creating a professional digital presence for a physiotherapist that conveyed trust to patients and facilitated appointment booking.',
    es: 'Crear una presencia digital profesional para una fisioterapeuta que transmitiera confianza a los pacientes y facilitara la programación de consultas.',
  },
  'project4.solution': {
    pt: 'Desenvolvido com Next.js e Tailwind, o site apresenta as especialidades, depoimentos de pacientes e múltiplos canais de contato, com suporte bilíngue e design responsivo voltado à conversão.',
    en: 'Built with Next.js and Tailwind, the site presents specialties, patient testimonials, and multiple contact channels, with bilingual support and a conversion-focused responsive design.',
    es: 'Desarrollado con Next.js y Tailwind, el sitio presenta las especialidades, testimonios de pacientes y múltiples canales de contacto, con soporte bilingüe y diseño responsivo orientado a la conversión.',
  },
  'project4.highlight1': { pt: 'Design limpo e profissional que transmite credibilidade e cuidado ao paciente.', en: 'Clean and professional design that conveys credibility and patient care.', es: 'Diseño limpio y profesional que transmite credibilidad y cuidado al paciente.' },
  'project4.highlight2': { pt: 'Suporte a dois idiomas (Português e Inglês) para alcance ampliado.', en: 'Bilingual support (Portuguese and English) for broader reach.', es: 'Soporte en dos idiomas (Portugués e Inglés) para mayor alcance.' },
  'project4.highlight3': { pt: 'Integração com múltiplos canais de contato: WhatsApp, email e telefone.', en: 'Integration with multiple contact channels: WhatsApp, email, and phone.', es: 'Integración con múltiples canales de contacto: WhatsApp, email y teléfono.' },

  // Project 5 — Ana Rodrigues Fisio (Demo)
  'project5.desc': { pt: 'Projeto de demonstração: site institucional para uma clínica de fisioterapia, criado para mostrar como a presença digital pode reforçar a confiança e atrair novos pacientes.', en: 'Demo project: institutional website for a physiotherapy clinic, built to showcase how a digital presence can build trust and attract new patients.', es: 'Proyecto de demostración: sitio institucional para una clínica de fisioterapia, creado para mostrar cómo la presencia digital puede reforzar la confianza y atraer nuevos pacientes.' },
  'project5.challenge': {
    pt: 'Como projeto demo, o desafio foi criar do zero uma identidade visual e uma estrutura de conteúdo coerentes para uma clínica de fisioterapia fictícia, simulando as necessidades reais de um negócio da área da saúde: transmitir credibilidade, apresentar especialidades e facilitar o contato com pacientes.',
    en: 'As a demo project, the challenge was to build from scratch a coherent visual identity and content structure for a fictional physiotherapy clinic, simulating the real needs of a healthcare business: conveying credibility, presenting specialties, and making it easy for patients to get in touch.',
    es: 'Como proyecto demo, el desafío fue crear desde cero una identidad visual y una estructura de contenido coherentes para una clínica de fisioterapia ficticia, simulando las necesidades reales de un negocio del área de la salud: transmitir credibilidad, presentar especialidades y facilitar el contacto con los pacientes.',
  },
  'project5.solution': {
    pt: 'Desenvolvido com React e Tailwind CSS, o site reúne seções de especialidades, sobre a profissional e contato, com um design clean e acolhedor pensado para transmitir confiança ao paciente. Por ser um projeto demo, serviu também como vitrine para validar componentes e padrões visuais reutilizáveis em entregas reais para clientes do setor de saúde e bem-estar.',
    en: 'Built with React and Tailwind CSS, the site brings together specialty, about, and contact sections with a clean, welcoming design meant to convey trust to patients. As a demo project, it also served as a showcase to validate reusable components and visual patterns for real client deliveries in the health and wellness sector.',
    es: 'Desarrollado con React y Tailwind CSS, el sitio reúne secciones de especialidades, sobre la profesional y contacto, con un diseño limpio y acogedor pensado para transmitir confianza al paciente. Al ser un proyecto demo, también sirvió como vitrina para validar componentes y patrones visuales reutilizables en entregas reales para clientes del sector de salud y bienestar.',
  },
  'project5.highlight1': { pt: 'Projeto demo: criado para demonstrar o processo de construção de um site institucional do zero.', en: 'Demo project: built to showcase the end-to-end process of creating an institutional website from scratch.', es: 'Proyecto demo: creado para demostrar el proceso de construcción de un sitio institucional desde cero.' },
  'project5.highlight2': { pt: 'Design clean e acolhedor, com foco em transmitir confiança e profissionalismo.', en: 'Clean, welcoming design focused on conveying trust and professionalism.', es: 'Diseño limpio y acogedor, enfocado en transmitir confianza y profesionalismo.' },
  'project5.highlight3': { pt: 'Estrutura de seções (especialidades, sobre, contato) pensada para conversão de visitantes em pacientes.', en: 'Section structure (specialties, about, contact) designed to convert visitors into patients.', es: 'Estructura de secciones (especialidades, sobre, contacto) pensada para convertir visitantes en pacientes.' },
  'project5.highlight4': { pt: 'Layout responsivo, otimizado para acesso via mobile e desktop.', en: 'Responsive layout, optimized for mobile and desktop access.', es: 'Diseño responsivo, optimizado para acceso vía móvil y escritorio.' },

  // Project 6 — Hengu Hotel
  'project6.desc': { pt: 'Site institucional para o Hengu Hotel, em Encantado (RS), apresentando a estrutura e facilitando reservas via WhatsApp.', en: 'Institutional website for Hengu Hotel, in Encantado (RS), showcasing the property and making WhatsApp reservations easy.', es: 'Sitio institucional para el Hengu Hotel, en Encantado (RS), que presenta la estructura y facilita las reservas vía WhatsApp.' },
  'project6.challenge': {
    pt: 'O hotel precisava de uma presença digital que transmitisse conforto e confiança, destacando sua localização estratégica no Vale do Taquari e simplificando o processo de reserva para os hóspedes.',
    en: 'The hotel needed a digital presence that conveyed comfort and trust, highlighting its strategic location in the Vale do Taquari region and simplifying the booking process for guests.',
    es: 'El hotel necesitaba una presencia digital que transmitiera comodidad y confianza, destacando su ubicación estratégica en el Vale do Taquari y simplificando el proceso de reserva para los huéspedes.',
  },
  'project6.solution': {
    pt: 'Desenvolvido com React, TypeScript e Tailwind CSS, o site apresenta a estrutura do hotel, sua localização e diferenciais, com botão de reserva direto pelo WhatsApp e otimização para SEO local.',
    en: 'Built with React, TypeScript, and Tailwind CSS, the site presents the hotel\'s facilities, location, and highlights, with a direct WhatsApp booking button and local SEO optimization.',
    es: 'Desarrollado con React, TypeScript y Tailwind CSS, el sitio presenta la estructura del hotel, su ubicación y diferenciales, con un botón de reserva directo por WhatsApp y optimización para SEO local.',
  },
  'project6.highlight1': { pt: 'Reserva facilitada via WhatsApp, direto da página inicial.', en: 'Easy booking via WhatsApp, right from the homepage.', es: 'Reserva facilitada vía WhatsApp, directo desde la página de inicio.' },
  'project6.highlight2': { pt: 'SEO local otimizado, destacando a localização em Encantado (RS).', en: 'Optimized local SEO, highlighting the location in Encantado (RS).', es: 'SEO local optimizado, destacando la ubicación en Encantado (RS).' },
  'project6.highlight3': { pt: 'Layout responsivo, com identidade visual acolhedora e profissional.', en: 'Responsive layout with a welcoming, professional visual identity.', es: 'Diseño responsivo, con identidad visual acogedora y profesional.' },

  // Contact
  'contact.title': { pt: 'Vamos construir algo incrível?', en: 'Let\'s build something amazing?', es: '¿Construimos algo increíble?' },
  'contact.desc':  {
    pt: 'Tem uma ideia ou um negócio que precisa de um site profissional? Vamos conversar e tirar seu projeto do papel.',
    en: 'Do you have an idea or a business that needs a professional website? Let\'s talk and get your project off the ground.',
    es: '¿Tienes una idea o un negocio que necesita un sitio web profesional? Hablemos y llevemos tu proyecto al mundo.',
  },
  'contact.email':  { pt: 'Enviar Email', en: 'Send Email', es: 'Enviar Email' },
  'contact.copied': { pt: 'Endereço de email copiado, fico no aguardo!', en: 'Email address copied, looking forward to it!', es: '¡Dirección de email copiada, quedo a la espera!' },

  // Modal labels
  'modal.challenge':   { pt: 'O Desafio',   en: 'The Challenge', es: 'El Desafío'  },
  'modal.solution':    { pt: 'A Solução',    en: 'The Solution',  es: 'La Solución' },
  'modal.highlights':  { pt: 'Destaques',    en: 'Highlights',    es: 'Destacados'  },
  'modal.viewProject': { pt: 'Ver Projeto',  en: 'View Project',  es: 'Ver Proyecto'},

  // Footer
  'footer.rights': { pt: 'Todos os direitos reservados.', en: 'All rights reserved.', es: 'Todos los derechos reservados.' },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('pt');

  const t = (key: string) => translations[key]?.[language] || key;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};
