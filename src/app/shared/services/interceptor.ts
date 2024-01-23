import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import {
  Observable,
  catchError,
  finalize,
  map,
  throwError,
} from 'rxjs';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/modules/auth/services/login.service';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
  private countRequest = 0;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private loadingService: LoadingService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loadingService.showLoading();

    this.countRequest++;

    const token = localStorage.getItem('token');

    if (token) {
      if (!req.headers.has('service')) {
        req = req.clone({
          headers: req.headers.set('Authorization', `Bearer ${token}`),
        });
      }
    }

    return next.handle(req).pipe(
      finalize(() => {
        this.countRequest--;

        if (!this.countRequest) {
          this.loadingService.hideLoading();
        }
      }),
      map((event: HttpEvent<any>) => event),
      catchError((err: HttpErrorResponse) => {
        if (err.ok === false) {
          if (!req.headers.has('service')) {
            // Tratar error
          }
        }

        // Token caducado
        if (err.status === 401) {
          if (!req.headers.has('service')) {
            this.loginService.logout();
            // TERMINAR CUALQUIER INSTANCIA
          }
        }
        return throwError(() => err);
      })
    );
  }
}
