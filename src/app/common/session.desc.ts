export interface ISessionProperties {
  quantity: number;
  question: number;
  passed: string[];
}

export interface ISession {
  id: string;
  properties: ISessionProperties;
}
