import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'esn-not-found',
  template: `
    <img src="/assets/images/not-found.svg" alt="not found" />
    <h1 class="mat-display-3" fxHide.gt-md>404</h1>
    <h1 class="mat-display-4" fxHide fxShow.gt-md>Page not found</h1>
    <a mat-raised-button color="primary" routerLink="/">Back to main page</a>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
      img {
        width: 50vmin;
        margin: 5vmin 0;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
