import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { QuestService } from './quest.service';
import { SlideQuestionComponent } from './components/slide.question.component';
import { ResultComponent } from './components/result.component';

@NgModule({
  declarations: [
    AppComponent,
    SlideQuestionComponent,
    ResultComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [QuestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
