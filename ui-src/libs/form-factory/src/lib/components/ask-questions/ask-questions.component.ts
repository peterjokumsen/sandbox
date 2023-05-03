import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { QuestionDefinition } from '../../models';
import { LoggerService } from '@sandbox/logging';

@Component({
  selector: 'ff-ask-questions',
  templateUrl: './ask-questions.component.html',
  styleUrls: ['./ask-questions.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AskQuestionsComponent implements OnInit {
  private _logger = inject(LoggerService);

  @Input() definition?: QuestionDefinition;

  ngOnInit(): void {
    this._logger.log(this.definition);
  }
}
