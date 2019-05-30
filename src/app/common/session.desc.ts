export interface ISessionProperties {
  quantity: number;
  question: number;
  passed: string[];
}

export interface ISession {
  id: string;
  properties: ISessionProperties;
}

export enum Phases {
  Blank, InProgress, Finished
}

export interface TestResult {
  total: number;
  resultByTags: {
    [s: string]: {
      right: number,
      wrong: number,
      rightPercent: number,
      wrongPercent: number
    }
  };
}
