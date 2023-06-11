import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'pj-sandbox-lazy-landing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lazy-landing.component.html',
  styleUrls: ['./lazy-landing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LazyLandingComponent {}
