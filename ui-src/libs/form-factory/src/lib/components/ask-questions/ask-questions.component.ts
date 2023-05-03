import {
  ChangeDetectionStrategy,
  Component, Input, OnInit,
  ViewEncapsulation
} from '@angular/core';
import { QuestionDefinition } from '../../models';

@Component({
  selector: 'ff-ask-questions',
  templateUrl: './ask-questions.component.html',
  styleUrls: ['./ask-questions.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AskQuestionsComponent implements OnInit {
  @Input() definition?: QuestionDefinition;

  ngOnInit(): void {
    console.log(this.definition);
  }
}
