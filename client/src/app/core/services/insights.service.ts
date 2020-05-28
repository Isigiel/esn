import { Injectable } from '@angular/core';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class InsightsService {
  private appInsights = new ApplicationInsights({
    config: {
      instrumentationKey: environment.insightsKey,
    },
  });

  constructor() {
    if (environment.production) {
      this.appInsights.loadAppInsights();
    }
  }

  setUserId(userId: string) {
    this.appInsights.setAuthenticatedUserContext(userId);
  }

  clearUserId() {
    this.appInsights.clearAuthenticatedUserContext();
  }

  logPageView(name?: any, uri?: string) {
    if (!environment.production) {
      console.log(name, uri);
    }
    this.appInsights.trackPageView({ name, uri });
  }
}
