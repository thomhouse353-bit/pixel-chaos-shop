export type RewardMode = 'fixed' | 'range' | 'formula' | 'indeterminate';

export interface Character {
  id: string;
  name: string;
  displayText: string; // texto mostrado ao jogador (ex: "~70M")
  rewardMode: RewardMode;
  fixedValue: number | null;
  minValue: number | null;
  maxValue: number | null;
  formulaText: string | null; // expressão segura, ex: "base*multiplier + rand(0,5000000)"
  probabilityWeight: number;
  enabled: boolean;
  createdBy?: string;
  updatedBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface RewardLog {
  id: string;
  characterId: string;
  userId: string; // quem recebeu
  actualValue: number;
  modeUsed: string;
  metadata: {
    formulaResult?: string;
    seed?: number;
    [key: string]: any;
  };
  createdAt: Date;
}

export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  targetTable: string;
  targetId: string;
  before: any;
  after: any;
  createdAt: Date;
}