import { Injectable } from '@angular/core';
import { createEffect } from '@ngrx/effects';
import { filter, map, mergeMap, tap } from 'rxjs/operators';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { InsightsService } from '@esn/client/core/services/insights.service';

@Injectable()
export class RouterEffects {
  updateTitle$ = createEffect(
    () =>
      this.router.events.pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          let route = this.activatedRoute;
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        mergeMap((route) => route.data),
        map((data) => `ESN app - ${data.title}`),
        tap((title) => this.titleService.setTitle(title)),
      ),
    {
      dispatch: false,
    },
  );

  trackPageView$S = createEffect(
    () =>
      this.router.events.pipe(
        filter((event) => event instanceof NavigationEnd),
        map((event) => {
          let route = this.activatedRoute;
          while (route.firstChild) {
            route = route.firstChild;
          }
          return { route, event };
        }),
        tap(({ route, event }: { route: any; event: NavigationEnd }) =>
          this.insightsService.logPageView(
            route.component.name,
            event.urlAfterRedirects,
          ),
        ),
      ),
    {
      dispatch: false,
    },
  );

  constructor(
    private router: Router,
    private titleService: Title,
    private insightsService: InsightsService,
    private activatedRoute: ActivatedRoute,
  ) {}
}
