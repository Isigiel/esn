import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InviteRoutingModule } from './invite-routing.module';
import { InviteComponent } from './invite.component';
import { SharedModule } from '@esn/client/shared';

@NgModule({
  declarations: [InviteComponent],
  imports: [CommonModule, InviteRoutingModule, SharedModule],
})
export class InviteModule {}
