/**
 * Screening Types (DASS - Depression, Anxiety, Stress Scale)
 * Sesuai dengan backend screening model
 */

export interface IScreening {
  _id: string;
  therapyId: string;
  screeningScore: number;
  counselorInterpretation: string;
  parentInterpretation: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateScreeningInput {
  therapyId: string;
  screeningScore: number;
}

export interface IUpdateScreeningInput {
  therapyId?: string;
  screeningScore?: number;
}
