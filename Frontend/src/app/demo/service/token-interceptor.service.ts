import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenService } from './tokenService';
import { BehaviorSubject, Observable, Subscription, catchError, filter, finalize, switchMap, take, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
  private isRefreshingToken: boolean = false;
  private tokenRefreshSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor(private cookieService: CookieService, private tokenService: TokenService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const Token = this.cookieService.get('authToken');
    const refreshToken = this.cookieService.get('refreshToken');
    const jwthelper = new JwtHelperService();

    if (req.url.endsWith('refresh-token')) {
      let tokenizedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${refreshToken}`
        }
      });

      return next.handle(tokenizedReq);
    } else if (!jwthelper.isTokenExpired(Token)) {
      let tokenizedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${Token}`
        }
      });

      return next.handle(tokenizedReq).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) { // Unauthorized error
            return this.handleUnauthorizedError(req, next, refreshToken);
          } else {
            return throwError(error);
          }
        })
      );
    }

    return next.handle(req);
  }

  private handleUnauthorizedError(req: HttpRequest<any>, next: HttpHandler, refreshToken: string): Observable<HttpEvent<any>> {
    if (!this.isRefreshingToken) {
      this.isRefreshingToken = true;
      this.tokenRefreshSubject.next(null);

      return this.tokenService.refreshAccesToken(refreshToken).pipe(
        switchMap((res: any) => {
          this.cookieService.set('authToken', res.token);

          this.tokenRefreshSubject.next(res.token);
          return next.handle(this.addTokenToRequest(req, res.token));
        }),
        finalize(() => {
          this.isRefreshingToken = false;
        })
      );
    } else {
      return this.tokenRefreshSubject.pipe(
        filter(token => token !== null),
        take(1),
        switchMap(token => {
          return next.handle(this.addTokenToRequest(req, !!token ? token:""));
        })
      );
    }
  }

  private addTokenToRequest(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}