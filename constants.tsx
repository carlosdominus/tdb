
import { Tonic, ProblemType, Bonus } from './types';

export const COLORS = {
  primary: '#1B4D3E',
  secondary: '#2ECC71',
  white: '#FFFFFF',
  lightGray: '#F5F5F7',
  mediumGray: '#86868B',
  darkGray: '#1D1D1F'
};

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
      introduction: "A maioria dos homens comete erros ao tocar uma mulher porque foca apenas no objetivo final (penetração ou orgasmo rápido), ignorando que o prazer feminino é construído gradualmente. Estudos sobre sexualidade feminina mostram que 75% das mulheres precisam de estímulo clitoriano para alcançar o orgasmo, e o toque direto e apressado é uma das principais razões para insatisfação sexual.",
      sections: [
        {
          title: "ERRO #1: Ir direto ao clitóris ou vagina sem aquecimento",
          description: "Muitos homens vão direto para as áreas genitais assim que começam as carícias, sem preparar o corpo dela.",
          whyError: "Influência de pornografia ou ansiedade para 'avançar rápido'.",
          consequences: "Ela sente desconforto ou dor, pois o clitóris é extremamente sensível (com mais de 8.000 terminações nervosas) e precisa de lubrificação natural gradual. Isso bloqueia a excitação real.",
          notToDo: "Começar com toques fortes ou rápidos nos genitais logo no início. Exemplo: Beijar a boca por 2 minutos e já ir para a vagina.",
          howToDo: [
            "Comece com beijos suaves no pescoço, orelhas e ombros.",
            "Desça para os seios e barriga com carícias leves.",
            "Só aproxime das áreas íntimas após sinais de excitação (respiração acelerada, umidade).",
            "Inicie com toques indiretos ao redor do clitóris."
          ],
          extraTip: "Dedique pelo menos 15-20 minutos ao aquecimento – pesquisas mostram que mulheres precisam de mais tempo para atingir o pico de excitação."
        },
        {
          title: "ERRO #2: Usar muita pressão ou força",
          description: "Tocar com força excessiva, como se fosse uma massagem profunda, em áreas delicadas.",
          whyError: "Acham que 'mais forte = mais prazer', confundindo com a própria sensibilidade masculina.",
          consequences: "Causa dor ou desensitização, fazendo ela se desligar do momento.",
          notToDo: "Apertar seios ou esfregar o clitóris com força. Exemplo: Usar pressão como se estivesse amassando pão.",
          howToDo: [
            "Comece com toques leves, como penas.",
            "Aumente gradualmente a pressão conforme ela reagir positivamente.",
            "Pergunte: 'Assim está bom?' ou observe gemidos/movimentos."
          ],
          extraTip: "O clitóris é mais sensível que a cabeça do pênis – use pressão equivalente a uma carícia no rosto."
        }
      ],
      conclusion: "A diferença entre 'tocar' e 'dar prazer de verdade' está no foco: tocar é mecânico; dar prazer é atento às reações dela. Implemente essas correções hoje mesmo.",
      disclaimer: "Este material é educativo e baseado em pesquisas gerais; consulte profissionais para questões pessoais."
    }
  },
  {
    id: 'bonus2',
    title: "PROTOCOLO ÁGUIA DO SEXO",
    subtitle: "Identificando Prazer Real",
    description: "Aprenda a diferenciar excitação real de fingimento e ajuste sua performance.",
    value: "R$ 197",
    badge: "DOMÍNIO",
    badgeColor: "bg-yellow-400",
    icon: "Activity",
    content: {
      introduction: "Estudos indicam que até 60-80% das mulheres já fingiram orgasmo em algum momento. Saber diferenciar excitação real de fingimento não é para 'pegar no flagra', mas para ajustar técnicas e melhorar o prazer mútuo.",
      sections: [
        {
          title: "PARTE 1: SINAIS INVOLUNTÁRIOS DE EXCITAÇÃO REAL",
          subItems: [
            { label: "SINAIS VISUAIS", items: ["Pupilas dilatadas", "Rubor facial/peitoral", "Mamilos enrijecidos", "Respiração acelerada", "Contrações musculares"] },
            { label: "SINAIS AUDITIVOS", items: ["Gemidos espontâneos e variados", "Respiração ofegante natural", "Mudança no tom de voz"] },
            { label: "SINAIS TÁTEIS", items: ["Lubrificação natural abundante", "Temperatura corporal elevada", "Tensão muscular seguida de relaxamento"] }
          ]
        }
      ],
      conclusion: "Checklist rápido: Observe visuais (rubor/mamilos), táteis (lubrificação), auditivos (gemidos naturais) e comportamentais (movimentos involuntários).",
      disclaimer: "Sinais variam por indivíduo; baseie-se em ciência, mas priorize consentimento e diálogo."
    }
  },
  {
    id: 'bonus4',
    title: "20 PENSAMENTOS ERÓTICOS",
    subtitle: "Segredos das Mulheres",
    description: "Os 20 pensamentos eróticos mais secretos que elas nunca contam.",
    value: "R$ 147",
    badge: "REVELADO",
    badgeColor: "bg-purple-500",
    icon: "Flame",
    iframeUrl: "https://drive.google.com/file/d/1sMc71po4ZwZu4OXTwjnS3RZ2mQQf7lRE/preview"
  },
  {
    id: 'bonus3',
    title: "PRESENTE SURPRESA",
    subtitle: "Massagem Sensual Completa",
    description: "Torne-se um mestre no foreplay com este guia passo a passo de massagem premium.",
    value: "R$ 300",
    badge: "PREMIUM",
    badgeColor: "bg-blue-400",
    icon: "Sparkles",
    content: {
      introduction: "Este guia premium transforma foreplay em arte, focando em relaxamento, conexão e prazer prolongado – algo que aumenta confiança e reduz ansiedade de performance.",
      sections: [
        {
          title: "PARTE 1: FUNDAMENTOS",
          description: "Crie ambiente ideal: luz baixa, música suave, temperatura agradável. Use óleos naturais (coco ou amêndoas).",
          extraTip: "Mindset: foque em dar prazer sem agenda imediata de sexo."
        }
      ],
      conclusion: "Essa massagem não só relaxa, mas constrói excitação profunda, levando a orgasmos mais intensos.",
      disclaimer: "Baseado em técnicas gerais; respeite limites e consentimento sempre."
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
