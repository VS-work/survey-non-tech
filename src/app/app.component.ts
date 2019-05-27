import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { IQuestion, CHECKBOXES, RADIOBUTTON } from './common/question.desc';
import { QuestService } from './quest.service';

const host = 'http://localhost:3000';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  question: IQuestion;
  interval;

  constructor(private http: HttpClient, private questService: QuestService) {
  }

  async ngOnInit() {
    await this.configure();
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  start() {
    this.nextQuestion();
    this.interval = setInterval(async () => {
      this.nextQuestion();
    }, 10000);
  }

  private async nextQuestion() {
    this.question = await this.http.get<any>(`${host}/question/${this.questService.session.id}`).toPromise();
  }

  private async configure() {
    this.questService.session.id = (await this.http.get<any>(`${host}/session`).toPromise()).id;
    this.questService.session.properties = (await this.http.get<any>(`${host}/configure/${this.questService.session.id}/10`).toPromise()).properties;
  }
}
