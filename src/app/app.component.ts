import { Component, OnInit, TemplateRef } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { IQuestion } from './common/question.desc';
import { QuestService } from './quest.service';
import { Phases, TestResult, TestSummary } from './common/session.desc';
import { GoogleLoginProvider, AuthService, SocialUser } from 'angularx-social-login';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

const host = 'http://localhost:3000';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  modalRef: BsModalRef;
  user: SocialUser;
  question: IQuestion;
  totalQuestions: number;
  currentQuestion: number;
  remainTimeLabel: string;
  phase: Phases;
  testResult: TestResult;
  time: number = null;
  ready = false;
  passedSessions: TestSummary[] = [];

  constructor(private http: HttpClient, private questService: QuestService, private authService: AuthService, private modalService: BsModalService) {
    this.totalQuestions = 10;
    this.currentQuestion = 1;
    this.phase = Phases.Blank;
  }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.ready = true;
    });
  }

  async openModal(template: TemplateRef<any>) {
    this.passedSessions = await this.http.get<any>(`${host}/passed-sessions/${this.user.id}`).toPromise();
    this.modalRef = this.modalService.show(template);
  }

  async start() {
    await this.configure();
    await this.nextQuestion();
  }

  async stop() {
    await this.http.get<any>(`${host}/abandon/${this.questService.session.id}`).toPromise();
    this.phase = Phases.Finished;
    this.questService.session.id = null;
    this.questService.session.properties.quantity = null;
    this.questService.session.properties.question = null;
    this.questService.session.properties.passed = [];
    this.question = null;
  }

  async processQuestion() {
    await this.nextQuestion();
  }

  showRemainTime(time: number) {
    this.time = time;
    this.remainTimeLabel = `${time} sec`;
  }

  async processAnswer(result: string | string[]) {
    await this.http.post<any>(`${host}/answer/${this.questService.session.id}`, { origin: this.question, result }).toPromise();
    if (this.currentQuestion < this.totalQuestions) {
      this.processQuestion();
      this.currentQuestion++;
    } else {
      this.question = null;
      this.testResult = await this.http.post<any>(`${host}/finish/${this.questService.session.id}`, this.user).toPromise();
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

  signInWithGoogle() {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signOut() {
    this.authService.signOut();
  }

  private async nextQuestion() {
    this.phase = Phases.InProgress;
    this.question = await this.http.get<any>(`${host}/question/${this.questService.session.id}`).toPromise();
  }

  private async configure() {
    this.questService.session.id = (await this.http.get<any>(`${host}/session`).toPromise()).id;
    this.questService.session.properties = (await this.http.get<any>(`${host}/configure/${this.questService.session.id}/${this.totalQuestions}`).toPromise()).properties;
    this.currentQuestion = 1;
    this.question = null;
  }
}
