/**
 * Screening Types (DASS - Depression, Anxiety, Stress Scale)
 * Sesuai dengan backend screening model
 */

export interface IScreening {
  _id: string;
  therapyId: string;
  depressionScore: number;
  depressionInterpretation: string;
  anxietyScore: number;
  anxietyInterpretation: string;
  stressScore: number;
  stressInterpretation: string;
  totalScreeningScore: number;
  totalScreeningInterpretation: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateScreeningInput {
  therapyId: string;
  depressionScore: number;
  depressionInterpretation: string;
  anxietyScore: number;
  anxietyInterpretation: string;
  stressScore: number;
  stressInterpretation: string;
  totalScreeningScore: number;
  totalScreeningInterpretation: string;
}

export interface IUpdateScreeningInput {
  therapyId?: string;
  depressionScore?: number;
  depressionInterpretation?: string;
  anxietyScore?: number;
  anxietyInterpretation?: string;
  stressScore?: number;
  stressInterpretation?: string;
  totalScreeningScore?: number;
  totalScreeningInterpretation?: string;
}
