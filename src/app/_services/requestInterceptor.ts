import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError} from 'rxjs/operators';
import { Router } from '@angular/router';
import { NotificationService } from './notification.service';
import { LoadingService } from './loading.service';
import { environment } from 'src/environments/environment';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor(private router: Router
    ,private notificationService: NotificationService
    ,private loadingService:LoadingService
    ){}

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
      let authToken = localStorage.getItem('token') || '';
      let secureReq = req;
      if(req.url.indexOf('bing')<0)
        secureReq = req.clone({
          //url:'http://localhost:5000/api'+ req.url,
          url:environment.apiUrl+ req.url,
          headers: req.headers.set('Authorization', authToken)
        });
      let ok: string;
      return next.handle(secureReq).pipe(

        catchError((error: HttpErrorResponse) => {
          let errorMsg = '';
          this.loadingService.hide();
          if(error.status === 401){
            localStorage.removeItem("token");
            this.router.navigate(['main/login']);
          }
          if(error.status === 400){
            this.notificationService.error(error.error.message);
          }
          if(error.status === 500){
            this.notificationService.error("Ocurrio un error inesperado, por favor intente nuevamente");
          }
          console.log(errorMsg);
          return throwError(errorMsg);
        })
      )
  }
}

function tap(arg0: (event: any) => "" | "succeeded", arg1: (error: any) => string): import("rxjs").OperatorFunction<HttpEvent<any>, unknown> {
  throw new Error('Function not implemented.');
}

function finalize(arg0: () => void): import("rxjs").OperatorFunction<unknown, HttpEvent<any>> {
  throw new Error('Function not implemented.');
}

