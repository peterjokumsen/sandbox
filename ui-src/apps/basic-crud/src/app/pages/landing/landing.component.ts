import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormFactoryModule, QuestionDefinition } from '@sandbox/form-factory';

@Component({
  selector: 'sandbox-landing',
  standalone: true,
  imports: [CommonModule, FormFactoryModule],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingComponent {
  definition: QuestionDefinition = {
    questions: {
      name: {},
      email: {},
    },
  };
}
