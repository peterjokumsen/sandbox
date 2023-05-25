import { Component } from '@angular/core';

@Component({
  selector: 'sandbox-root',
  template: `<sandbox-nx-welcome></sandbox-nx-welcome>
    <router-outlet></router-outlet>`,
  styles: [''],
})
export class AppComponent {
  title = 'basic-pwa';
}
