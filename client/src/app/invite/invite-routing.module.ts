import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InviteComponent } from './invite.component';
import { AuthGuard } from '@esn/client/auth/guards/auth.guard';
import { InviteResolverService } from '@esn/client/invite/invite-resolver.service';

const routes: Routes = [
  {
    path: ':inviteId',
    canActivate: [AuthGuard],
    resolve: { invite: InviteResolverService },
    component: InviteComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InviteRoutingModule {}
