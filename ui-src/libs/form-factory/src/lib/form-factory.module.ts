import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AskQuestionsComponent } from './components/ask-questions/ask-questions.component';

@NgModule({
  imports: [CommonModule],
  declarations: [AskQuestionsComponent],
  exports: [AskQuestionsComponent],
})
export class FormFactoryModule {}
