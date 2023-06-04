import {
  ChangeDetectionStrategy,
  Component, inject,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigApiService } from '@sandbox/api';

@Component({
  selector: 'sandbox-landing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingComponent {
  private _configApi = inject(ConfigApiService);
  config$ = this._configApi.getConfig();
}
