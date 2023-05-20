import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'pj-ui-button-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button-list.component.html',
  styles: [
    `
      .button-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
      }
    `,
    `
      .button-container .btn {
        width: 200px; /* Set the width of the button or container */
        white-space: nowrap; /* Prevent line breaks within the label */
        overflow: hidden; /* Hide any overflow */
        text-overflow: ellipsis; /* Display an ellipsis (...) when the label overflows */
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonListComponent<T = string> {
  @Output() itemClick = new EventEmitter<T>();

  @Input() items: T[] | null = [];
  @Input() buttonType:
    | 'warning'
    | 'danger'
    | 'primary'
    | 'secondary'
    | 'success' = 'primary';
  @Input() transformLabel: (item: T) => string = (item) => JSON.stringify(item);
}
