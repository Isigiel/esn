import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'esn-invite',
  template: `
    <p>
      invite works!
    </p>
    <pre>{{ invite$ | async | json }}</pre>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InviteComponent implements OnInit {
  invite$;
  constructor(private route: ActivatedRoute) {
    this.invite$ = this.route.data.pipe(map((data) => data.invite));
  }

  ngOnInit(): void {}
}
