import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { TokenApiModel } from '../models/token-api.model';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService,private router : Router, private messageService: MessageService )  {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const myToken = this.auth.getToken();
    const MyAdmin = this.auth.getRoleFromToken();
    if(MyAdmin == 'admin'){
    if(myToken){
      request = request.clone({
        setHeaders: {Authorization: `Bearer ${myToken}`}
      });
    }
    return next.handle(request)
    .pipe(
      catchError((err:any)=>{
        if(err instanceof HttpErrorResponse){
          if(err.status === 401){
            return this.handleUnAuthorizedError(request,next);
          }
        }
        return throwError(()=> new Error(err.error.message))
      })
    );
    } else {
      if(myToken){
        request = request.clone({
          setHeaders: {Authorization: `Bearer ${myToken}`}
        });
      }
      return next.handle(request)
      .pipe(
        catchError((err:any)=>{
          if(err instanceof HttpErrorResponse){
            if(err.status === 401){
              return this.handleUnAuthorizedErrorUser(request,next);
            }
          }
          return throwError(()=> new Error(err.error.message))
        })
      );
    }

  }





  handleUnAuthorizedError(req: HttpRequest<any>, next: HttpHandler)
  {
    let tokenApiModel = new TokenApiModel();
    tokenApiModel.accessToken = this.auth.getToken()!;
    tokenApiModel.refreshToken = this.auth.getRefreshToken()!;
    return this.auth.renewToken(tokenApiModel)
    .pipe(
      switchMap((data : TokenApiModel)=>{
        this.auth.storeRefreshToken(data.refreshToken);
        this.auth.storeToken(data.accessToken);
        req = req.clone({
          setHeaders: {Authorization: `Bearer ${data.accessToken}`}
        })
        return next.handle(req);
      }),
      catchError(err => {
        return throwError(()=>{
          this.messageService.add({
              severity: 'warn',
              summary: 'Lỗi',
              detail: 'Hết hạn đăng nhập, vui lòng đăng nhập lại',
              life: 3000,
            });
            this.router.navigate(['/login'])
            localStorage.clear();
        })
      })
    )
    }

    handleUnAuthorizedErrorUser(req: HttpRequest<any>, next: HttpHandler)
  {
    let tokenApiModel = new TokenApiModel();
    tokenApiModel.accessToken = this.auth.getToken()!;
    tokenApiModel.refreshToken = this.auth.getRefreshToken()!;
    return this.auth.renewToken(tokenApiModel)
    .pipe(
      switchMap((data : TokenApiModel)=>{
        this.auth.storeRefreshToken(data.refreshToken);
        this.auth.storeToken(data.accessToken);
        req = req.clone({
          setHeaders: {Authorization: `Bearer ${data.accessToken}`}
        })
        return next.handle(req);
      }),
      catchError(err => {
        return throwError(()=>{
          this.messageService.add({
              severity: 'warn',
              summary: 'Lỗi',
              detail: 'Hết hạn đăng nhập, vui lòng đăng nhập lại',
              life: 3000,
            });
            this.router.navigate(['/userLogin'])
            localStorage.clear();
        })
      })
    )
    }
}
