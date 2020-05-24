import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationSheetComponent } from '../../components/navigation-sheet/navigation-sheet.component';

@Component({
  selector: 'esn-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild(MatSidenav) sidenav: MatSidenav;
  pageTitle$;

  constructor(private bottomSheet: MatBottomSheet) {}

  ngOnInit() {}

  @HostListener('document:click', ['$event'])
  async onClick() {
    this.bottomSheet.dismiss();
    await this.sidenav.close();
  }

  showNavSheet(ev: MouseEvent) {
    ev.stopPropagation();
    this.bottomSheet.open(NavigationSheetComponent);
  }

  showSidenav(ev: MouseEvent) {
    ev.stopPropagation();
    this.sidenav.open();
  }
}
