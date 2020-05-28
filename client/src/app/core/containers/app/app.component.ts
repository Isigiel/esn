import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationSheetComponent } from '../../components/navigation-sheet/navigation-sheet.component';
import * as fromRoot from '@esn/client/store';
import { Action, Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { GlobalPermissions } from '@esn/shared/global-permissions';
import { SectionPermissions } from '@esn/shared/section-permissions';
import { debounceTime, map } from 'rxjs/operators';

@Component({
  selector: 'esn-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild(MatSidenav) sidenav: MatSidenav;
  pageTitle$;
  pageAction$: Observable<{
    icon: string;
    text: string;
    dispatch: Action;
    permission: GlobalPermissions | SectionPermissions;
  }>;
  scrollPosition$ = new BehaviorSubject(0);
  navBarRaised$ = this.scrollPosition$.pipe(
    // debounceTime(200),
    map((pos) => (pos > 5 ? 'mat-elevation-z6' : '')),
  );

  constructor(
    private bottomSheet: MatBottomSheet,
    private store: Store<fromRoot.State>,
  ) {
    this.pageTitle$ = this.store.select(fromRoot.selectCurrentRouteTitle);
    this.pageAction$ = this.store.select(fromRoot.selectCurrentRouteAction);
  }

  ngOnInit() {}

  @HostListener('document:click', ['$event'])
  async onClick() {
    this.bottomSheet.dismiss();
    await this.sidenav.close();
  }

  @HostListener('document:scroll', ['$event'])
  async onScroll(ev) {
    this.scrollPosition$.next(ev.target.scrollingElement.scrollTop);
  }

  showNavSheet(ev: MouseEvent) {
    ev.stopPropagation();
    this.bottomSheet.open(NavigationSheetComponent);
  }

  showSidenav(ev: MouseEvent) {
    ev.stopPropagation();
    this.sidenav.open();
  }

  handleAction(action) {
    this.store.dispatch(action);
  }
}
