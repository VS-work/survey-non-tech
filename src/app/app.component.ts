import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { IQuestion, CHECKBOXES, RADIOBUTTON } from './common/question.desc';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  question: IQuestion;

  ngOnInit() {
    this.question = {
      question: 'Is this code shit?',
      answers: ['first', 'second', 'third'],
      config: {
        type: CHECKBOXES
        // type: RADIOBUTTON
      }
    };
  }
}
