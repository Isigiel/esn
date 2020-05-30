import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'esn-section',
  template: `
    <div fxLayout="row" fxLayoutAlign="center">
      <markdown [data]="(section$ | ngrxPush).about"></markdown>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        padding: 1rem;
      }
      markdown {
        max-width: 900px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionComponent {
  section$;
  constructor(private route: ActivatedRoute) {
    this.section$ = this.route.data.pipe(map((data) => data.section));
  }
}
