import { inject, Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import { UserService } from '../app/services/user.service';
import { BASE_URL } from '../app/shared/constants/urls';


export const TokenInterceptor: HttpInterceptorFn = (req, next) => {

  const userService = inject(UserService)
  const tokenData = userService.getToken();

  if (tokenData) {
    const requestUrl: Array<string> = req.url.split('/');
    const apiUrl = BASE_URL.split('/');

    if (requestUrl[2] === apiUrl[2]) {

      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${tokenData.value}`,
          token: `${tokenData.value}`
        }
      });
    }
  }
  return next(req).pipe(
    catchError(error => {
      return throwError(() => new Error(error.error.message || 'Erro desconhecido.'));
    })
  );
}
