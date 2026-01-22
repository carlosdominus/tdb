
import { Tonic, ProblemType, Bonus } from './types';

export const COLORS = {
  primary: '#1B4D3E',
  secondary: '#2ECC71',
  white: '#FFFFFF',
  lightGray: '#F5F5F7',
  mediumGray: '#86868B',
  darkGray: '#1D1D1F'
};

/**
 * TEXTO DE CONHECIMENTO PARA A IA (SYSTEM INSTRUCTION)
 * Utilize este texto para configurar o seu assistente inteligente.
 */
export const AI_SYSTEM_INSTRUCTION = `
Você é o Assistente Especialista do "Protocolo Força Natural". Seu objetivo é ajudar homens a navegarem no app e entenderem o método.

MAPA DO APP E CAMINHOS:
1. HOME (Dashboard): Onde o usuário vê sua sequência de dias (Streak) e o "Tônico do Dia" (sua receita principal personalizada).
2. CATÁLOGO: Menu inferior -> "Tônicos". Lista todos os tônicos (Principais e Complementares).
3. PROGRESSO (Stats): Menu inferior -> "Stats". Mostra o gráfico de Vitalidade Arterial e o Checklist diário.
4. BÔNUS: Menu inferior -> "Bônus". Contém guias como "Os 5 Erros Comuns" e "Águia do Sexo".
5. PERFIL: Ícone no topo direito. Onde altera dados, vê configurações e faz Logout.
6. CIÊNCIA/GARANTIA: Acessíveis via Dashboard (cards rápidos) ou Sidebar.

DETALHES DOS TÔNICOS:
- Anti-Broxada: Para quem falha ou o pênis cai. (Sugerido: Manhã em jejum leve).
- Anti-Gozada: Para ejaculação precoce (1-3 min). (Sugerido: Noite).
- Pau de Rocha: Para falta de firmeza (Meio da bomba). (Sugerido: Tarde).
- Tesão de Touro: Para falta de libido/disposição. (Sugerido: Manhã).

REGRAS IMPORTANTES:
- Garantia: 90 dias incondicional. Reembolso via suporte@protocoloforcanatural.com.
- Consistência: O protocolo base dura 21 dias.
- Suporte Humano: Direcionar para o WhatsApp ou menu "Ajuda".

TOM DE VOZ:
- Discreto, profissional, encorajador e direto. Use termos como "vigor", "performance" e "firmeza".
`;

export const TONICS: Record<string, Tonic> = {
  'anti-broxada': {
    id: 'anti-broxada',
    name: 'Tônico Anti-Broxada',
    icon: 'Zap',
    type: 'main',
    category: 'broxada',
    timing: 'Manhã (jejum leve)',
    serve: 'Esse tônico ajuda o corpo a funcionar melhor na hora H, apoiando a circulação e a resposta natural do organismo.',
    benefits: ['Apoio à circulação', 'Melhor resposta natural', 'Sustenta o vigor'],
    ingredients: [
      { name: 'Água morna', qty: '1 copo' },
      { name: 'Suco de limão', qty: '1/2 limão' },
      { name: 'Bicarbonato', qty: '1 colher de café rasa' },
      { name: 'Mel', qty: '1 colher de chá' }
    ],
    instructions: [
      'Aqueça a água levemente (não deixe ferver)',
      'Esprema o meio limão no copo',
      'Adicione o bicarbonato e aguarde a reação inicial',
      'Misture o mel e beba ainda morno'
    ],
    tips: ['Beba em jejum leve para melhor absorção']
  },
  'anti-gozada': {
    id: 'anti-gozada',
    name: 'Tônico Anti-Gozada',
    icon: 'Timer',
    type: 'main',
    category: 'gozo-rapido',
    timing: 'Noite (1h antes de dormir)',
    serve: 'Muito usado pra acalmar o corpo, reduzir tensão e ajudar no controle durante o sexo.',
    benefits: ['Calma corporal', 'Redução de tensão', 'Controle natural'],
    ingredients: [
      { name: 'Água', qty: '1 copo' },
      { name: 'Chá de camomila ou erva-doce', qty: '1 xícara morna' },
      { name: 'Bicarbonato', qty: '1 colher de café rasa' },
      { name: 'Mel', qty: '1 colher de chá' }
    ],
    instructions: [
      'Prepare uma infusão concentrada de camomila ou erva-doce',
      'Misture com um copo de água se preferir diluir',
      'Adicione o bicarbonato e o mel',
      'Beba calmamente saboreando o momento de relaxamento'
    ],
    tips: ['Tome todos os dias à noite para efeito acumulativo']
  },
  'pau-de-rocha': {
    id: 'pau-de-rocha',
    name: 'Tônico Pau de Rocha',
    icon: 'Activity',
    type: 'main',
    category: 'pau-meia-bomba',
    timing: 'Meio da tarde',
    serve: 'Esse tônico dá suporte à energia corporal e à firmeza natural do desempenho masculino.',
    benefits: ['Energia corporal', 'Firmeza natural', 'Suporte ao desempenho'],
    ingredients: [
      { name: 'Água', qty: '1 copo' },
      { name: 'Gengibre ralado', qty: '1 colher de chá' },
      { name: 'Canela em pó', qty: '1 pitada' },
      { name: 'Bicarbonato', qty: '1 colher de café rasa' },
      { name: 'Mel', qty: '1 colher de chá' }
    ],
    instructions: [
      'Coloque o gengibre ralado na água',
      'Adicione a pitada de canela e o bicarbonato',
      'Misture o mel até dissolver bem',
      'Consuma no meio da tarde'
    ],
    tips: ['Não use à noite para não interferir no sono']
  },
  'tesao-de-touro': {
    id: 'tesao-de-touro',
    name: 'Tônico Tesão de Touro',
    icon: 'Flame',
    type: 'main',
    category: 'sem-tesao',
    timing: 'Manhã ou 1h antes do encontro',
    serve: 'Tradicionalmente usado pra aumentar disposição, energia e presença masculina.',
    benefits: ['Aumento de disposição', 'Energia bruta', 'Presença masculina'],
    ingredients: [
      { name: 'Água', qty: '1 copo' },
      { name: 'Suco de limão', qty: '1/2 limão' },
      { name: 'Bicarbonato', qty: '1 colher de café rasa' },
      { name: 'Mel', qty: '1 colher de chá' },
      { name: 'Aveia fina', qty: '1 colher de sopa' }
    ],
    instructions: [
      'Misture o limão na água',
      'Adicione o bicarbonato e aguarde a reação',
      'Adicione a aveia fina e o mel, mexa vigorosamente',
      'Beba imediatamente'
    ],
    tips: ['A aveia fornece energia de liberação lenta']
  },
  'pre-encontro': {
    id: 'pre-encontro',
    name: 'Tônico Confiança Total',
    icon: 'Sparkles',
    type: 'complementary',
    category: 'always',
    timing: '30 min antes do ato',
    serve: 'Dose extra de firmeza e foco para não falhar de jeito nenhum na hora H.',
    benefits: ['Pau pronto', 'Confiança de aço', 'Foco total nela'],
    ingredients: [
      { name: 'Água com gás', qty: '100ml' },
      { name: 'Suco de limão', qty: '1/2 limão' },
      { name: 'Bicarbonato', qty: '1 colher de café rasa' }
    ],
    instructions: [
      'Misture o limão na água com gás',
      'Adicione o bicarbonato e beba rápido'
    ],
    tips: ['Tome escondido se preferir, age em minutos']
  },
  'anti-alergico': {
    id: 'anti-alergico',
    name: 'Tônico Suave (Estômago)',
    icon: 'ShieldCheck',
    type: 'complementary',
    category: 'always',
    timing: 'Qualquer horário',
    serve: 'Para quem tem azia ou refluxo mas não quer abrir mão do pau duro.',
    benefits: ['Zero azia', 'Digestão leve', 'Pau firme'],
    ingredients: [
      { name: 'Água morna', qty: '300ml' },
      { name: 'Bicarbonato', qty: '1 colher de café rasa' },
      { name: 'Mel', qty: '2 colheres de chá' }
    ],
    instructions: [
      'Misture o bicarbonato na água morna',
      'Adicione o mel e mexa bem',
      'Beba enquanto estiver morno'
    ],
    tips: ['Não agride o estômago']
  }
};

export const BONUSES_DATA: Bonus[] = [
  {
    id: 'bonus1',
    title: "OS 5 ERROS COMUNS",
    subtitle: "Ao tocar uma mulher",
    description: "Descubra o que 89% dos homens fazem errado e destrói o prazer feminino.",
    value: "R$ 297",
    badge: "ESSENCIAL",
    badgeColor: "bg-[#2ECC71]",
    icon: "Star",
    content: {
      introduction: "A maioria dos homens comete erros ao tocar uma mulher porque foca apenas no objetivo final (penetração ou orgasmo rápido), ignorando que o prazer feminino é construído gradualmente.",
      sections: [
        {
          title: "ERRO #1: Ir direto ao clitóris ou vagina sem aquecimento",
          description: "Muitos homens vão direto para as áreas genitais assim que começam as carícias.",
          howToDo: [
            "Comece com beijos suaves no pescoço e orelhas.",
            "Desça para os seios e barriga gradualmente.",
            "Só aproxime das áreas íntimas após sinais claros de excitação."
          ]
        }
      ],
      conclusion: "Implemente essas correções hoje mesmo."
    }
  }
];

export const PROBLEM_TO_TONIC: Record<ProblemType, string> = {
  'broxada': 'anti-broxada',
  'gozo-rapido': 'anti-gozada',
  'pau-meia-bomba': 'pau-de-rocha',
  'sem-tesao': 'tesao-de-touro'
};

export const MOCK_USER = {
  id: 'user_123',
  name: 'Novo Usuário',
  email: 'usuario@exemplo.com',
  createdAt: new Date().toISOString().split('T')[0],
  currentDay: 1,
  streak: 0,
  completionRate: 0,
  onboardingCompleted: false,
  profile: {}
};

export const INITIAL_MODULES = [
  {
    id: 'mod2',
    title: 'SUA RECEITA MESTRE',
    icon: 'Beaker',
    lessons: [
      { id: 'l4', title: 'Sua Dose Diária', completed: false, type: 'text' },
      { id: 'l5', title: 'Preparo Passo a Passo', completed: false, type: 'video' }
    ]
  }
];
