import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { QuestService } from './quest.service';
import { SlideQuestionComponent } from './components/slide.question.component';
import { ResultComponent } from './components/result.component';
import { AuthServiceConfig, AuthService } from './auth/auth.service';
import { GoogleLoginProvider } from './auth/providers/google-login-provider';

const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('586244264006-ufp9g3raj6dfg5ijk6002f2ul857kpe5.apps.googleusercontent.com')
  }
]);

export function provideConfig() {
  return config;
}

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
  providers: [
    QuestService,
    AuthService,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
