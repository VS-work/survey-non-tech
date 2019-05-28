import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { IQuestion } from './common/question.desc';
import { QuestService } from './quest.service';
import { Phases } from './common/session.desc';

const host = 'http://localhost:3000';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  question: IQuestion;
  totalQuestions: number;
  currentQuestion: number;
  intervalValue: number;
  remainTimeLabel: string;
  phase: Phases;

  constructor(private http: HttpClient, private questService: QuestService) {
    this.intervalValue = 61000;
    this.totalQuestions = 10;
    this.currentQuestion = 1;
    this.phase = Phases.Blank;
  }

  async start() {
    await this.configure();
    await this.nextQuestion();
  }

  async processQuestion() {
    await this.nextQuestion();
  }

  showRemainTime(time: number) {
    this.remainTimeLabel = `${time} sec`;
  }

  async processAnswer(result: string | string[]) {
    await this.http.post<any>(`${host}/answer/${this.questService.session.id}`, { question: this.question, result }).toPromise();
    if (this.currentQuestion < this.totalQuestions) {
      this.processQuestion();
      this.currentQuestion++;
    } else {
      this.question = null;
      this.phase = Phases.Finished;
    }
  }

  isBlank(): boolean {
    return this.phase === Phases.Blank;
  }

  isInProgress(): boolean {
    return this.phase === Phases.InProgress && !!this.question;
  }

  isFinished(): boolean {
    return this.phase === Phases.Finished;
  }

  private async nextQuestion() {
    this.phase = Phases.InProgress;
    this.question = await this.http.get<any>(`${host}/question/${this.questService.session.id}`).toPromise();
  }

  private async configure() {
    this.questService.session.id = (await this.http.get<any>(`${host}/session`).toPromise()).id;
    this.questService.session.properties = (await this.http.get<any>(`${host}/configure/${this.questService.session.id}/${this.totalQuestions}`).toPromise()).properties;
  }
}
