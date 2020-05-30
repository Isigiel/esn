import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'esn-invite',
  template: `
    <div
      style="padding: 1rem;"
      *ngrxLet="invite$ as invite"
      fxLayout="column"
      fxLayoutAlign="center center"
      fxLayoutGap="2rem"
      fxLayout.gt-md="row"
    >
      <img src="/assets/images/welcome.svg" alt="welcome" fxFlex="30vmin" />
      <div>
        <h1>You've received an Invite!</h1>
        <h3>
          This invite by {{ invite.creator.name }} allows you to join
          {{ invite.section.name }} as a member on esn.world
        </h3>
        <button
          mat-raised-button
          color="primary"
          (click)="claimInvite()"
          *ngIf="!invite.claimer; else claimed"
        >
          Accept invite
        </button>
        <ng-template #claimed>
          <strong>This invite has already been used.</strong><br />
          <small
            >If you believe this is a mistake please ask the creator of the
            invite, {{ invite.creator.name }}, about this.</small
          >
        </ng-template>
      </div>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InviteComponent {
  invite$;
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
  ) {
    this.invite$ = this.route.data.pipe(map((data) => data.invite));
  }

  async claimInvite() {
    const invite = await this.invite$.pipe(first()).toPromise();
    await this.http.post(`/api/invite/${invite.id}`, {}).toPromise();
    await this.router.navigate(['/']);
    location.reload();
  }
}
