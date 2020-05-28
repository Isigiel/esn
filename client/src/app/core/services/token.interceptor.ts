import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AuthService } from '@esn/client/auth/services';
import { catchError, mergeMap } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    return this.authService.getTokenSilently$().pipe(
      catchError((err) => of('')),
      mergeMap((token) => {
        if (token) {
          const tokenReq = request.clone({
            setHeaders: { Authorization: `Bearer ${token}` },
          });
          return next.handle(tokenReq);
        } else {
          return next.handle(request);
        }
      }),
    );
  }
}
