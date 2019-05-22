export const CHECKBOXES = 'checkboxes';
export const RADIOBUTTON = 'radiobutton';

export interface IQuestionSettings {
  type: string;
  shuffle?: boolean;
  lastCustomOption?: string;
}

export interface IQuestion {
  question: string;
  answers: string[];
  config: IQuestionSettings;
}
