import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { QuestService } from './quest.service';
import { SlideQuestionComponent } from './components/slide.question.component';

@NgModule({
  declarations: [
    AppComponent,
    SlideQuestionComponent
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
