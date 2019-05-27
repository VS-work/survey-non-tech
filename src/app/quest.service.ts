import { Injectable } from '@angular/core';
import { ISession } from './common/session.desc';

@Injectable()
export class QuestService {
  session: ISession;

  constructor() {
    this.session = {
      id: null,
      properties: {
        quantity: null,
        question: null,
        passed: []
      }
    };
  }
}
