import {
  Directive,
  Inject,
  Input,
  OnDestroy,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { GlobalPermissions } from '@esn/shared/global-permissions';
import { SectionPermissions } from '@esn/shared/section-permissions';
import { Store } from '@ngrx/store';
import * as fromAuth from '@esn/client/auth/reducers';
import { filter, map, takeUntil } from 'rxjs/operators';
import { isAllowed } from '@esn/shared/checkPermisson';
import { DOCUMENT } from '@angular/common';
import { Subject } from 'rxjs';

@Directive({
  selector: '[esnWithPermission]',
})
export class WithPermissionDirective implements OnDestroy {
  private hasView = false;
  private destroyed$ = new Subject();

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private store: Store<fromAuth.State>,
    @Inject(DOCUMENT) private document: Document,
  ) {}

  @Input() set esnWithPermission(
    permission: GlobalPermissions | SectionPermissions,
  ) {
    if (!permission?.length && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
      return;
    }
    this.store
      .select(fromAuth.selectUser)
      .pipe(
        takeUntil(this.destroyed$),
        filter((user) => !!user),
        map((user) =>
          isAllowed(
            [
              ...user.permissions,
              ...(user.memberships?.find(
                (m) => m.section.shortCode === this.getTenant(),
              )?.permissions ?? []),
            ],
            permission,
          ),
        ),
      )
      .subscribe((allowed) => {
        if (allowed && !this.hasView) {
          this.viewContainer.createEmbeddedView(this.templateRef);
          this.hasView = true;
        } else if (!allowed && this.hasView) {
          this.viewContainer.clear();
          this.hasView = false;
        }
      });
  }

  ngOnDestroy() {
    this.destroyed$.complete();
  }

  private getTenant() {
    const [tenant, ...tail] = this.document.location.hostname.split('.');
    if (tenant === 'localhost') {
      return 'tumi';
    }
    return tenant;
  }
}
