import { Character } from '@/types/character';

// Dados iniciais para personagens
export const initialCharacters: Character[] = [
  {
    id: '1',
    name: 'Dragão Celestial',
    displayText: '~70M',
    rewardMode: 'indeterminate',
    fixedValue: null,
    minValue: 65000000,
    maxValue: 75000000,
    formulaText: null,
    probabilityWeight: 1,
    enabled: true
  },
  {
    id: '2',
    name: 'Goblin Ladrão',
    displayText: '5000',
    rewardMode: 'fixed',
    fixedValue: 5000,
    minValue: null,
    maxValue: null,
    formulaText: null,
    probabilityWeight: 10,
    enabled: true
  },
  {
    id: '3',
    name: 'Mago Arcano',
    displayText: '10K-20K',
    rewardMode: 'range',
    fixedValue: null,
    minValue: 10000,
    maxValue: 20000,
    formulaText: null,
    probabilityWeight: 5,
    enabled: true
  },
  {
    id: '4',
    name: 'Golem de Pedra',
    displayText: 'Variável',
    rewardMode: 'formula',
    fixedValue: null,
    minValue: null,
    maxValue: null,
    formulaText: 'base * 2 + rand(1000, 5000)',
    probabilityWeight: 3,
    enabled: true
  }
];

// Função para calcular recompensa baseada no modo
export const calculateReward = (character: Character, baseValue: number = 1000, level: number = 1): number => {
  const multiplier = level * 0.5;
  
  switch (character.rewardMode) {
    case 'fixed':
      return character.fixedValue || 0;
      
    case 'range':
      if (character.minValue !== null && character.maxValue !== null) {
        return Math.floor(Math.random() * (character.maxValue - character.minValue + 1)) + character.minValue;
      }
      return 0;
      
    case 'formula':
      if (character.formulaText) {
        try {
          // Sanitização básica da fórmula
          const sanitizedFormula = character.formulaText
            .replace(/[^0-9+\-*/()., baselevelmultiplierrand]/g, '')
            .replace(/rand\(([^)]+)\)/g, (_, args) => {
              const [min, max] = args.split(',').map(Number);
              return String(Math.floor(Math.random() * (max - min + 1)) + min);
            });
            
          // Substituir variáveis
          const formula = sanitizedFormula
            .replace(/base/g, String(baseValue))
            .replace(/level/g, String(level))
            .replace(/multiplier/g, String(multiplier));
            
          // Avaliar a expressão (com cuidado)
          // eslint-disable-next-line no-eval
          return Math.floor(eval(formula));
        } catch (error) {
          console.error('Erro ao calcular fórmula:', error);
          return 0;
        }
      }
      return 0;
      
    case 'indeterminate':
      if (character.minValue !== null && character.maxValue !== null) {
        return Math.floor(Math.random() * (character.maxValue - character.minValue + 1)) + character.minValue;
      }
      return 0;
      
    default:
      return 0;
  }
};