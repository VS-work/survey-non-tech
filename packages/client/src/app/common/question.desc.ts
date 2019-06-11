export const CHECKBOXES = 'checkboxes';
export const RADIOBUTTON = 'radiobutton';

export interface IQuestionSettings {
  type: string;
  shuffle?: boolean;
  complex?: boolean;
  slow?: boolean;
}

export interface Answer {
  answer: string;
  correct?: boolean;
  last?: boolean
}

export interface IQuestion {
  question: string;
  answers: Answer[];
  config: IQuestionSettings;
}
