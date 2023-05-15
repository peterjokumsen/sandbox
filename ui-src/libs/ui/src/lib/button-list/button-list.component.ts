import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
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
    `
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonListComponent<T> {
  @Output() itemClick = new EventEmitter<T>();

  @Input() items: T[] = [];
  @Input() buttonType: 'warning' | 'danger' | 'primary' | 'secondary' | 'success' = 'primary';
  @Input() transformLabel: (item: T) => string = (item) => JSON.stringify(item);
}
