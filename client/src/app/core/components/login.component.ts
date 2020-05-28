import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'esn-login',
  template: `
    <img src="/assets/images/waiting.svg" alt="not found" />
    <ng-container *ngIf="accident; else wait">
      <h1 class.gt-md="mat-display-3" class="mat-display-1">
        Hey, there's no login data to process right now. <br />
        Feel free to move along
      </h1>
      <a mat-raised-button color="primary" routerLink="/">Back to main page</a>
    </ng-container>
    <ng-template #wait>
      <h1 class.gt-sm="mat-display-3" class="mat-display-2">
        Hang on, we're logging you in!
      </h1>
    </ng-template>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
      }
      img {
        width: 50vmin;
        margin: 5vmin 0;
      }
      h1 {
        max-width: 800px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  accident = !(
    window.location.search.includes('code=') &&
    window.location.search.includes('state=')
  );
}
