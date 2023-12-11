import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, map, throwError } from "rxjs";
import { AuthService } from "../service/auth.service";
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from "@angular/material/snack-bar";
import { LoadingService } from "../service/loading.service";

@Injectable()
export class ServerErrorInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    private loadingService: LoadingService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if(error instanceof HttpErrorResponse && !request.url.includes('auth/logar') && error.status === 403){
          this.authService.logOut()
          this.loadingService.requisicaoFinalizada(request.url)
          this.loadingService.estadoRequisicao(false)
        }else if (error.error) {
          this.serverErrorHandler(error, request, next)
        }
        return throwError(() => error);
      })
    );
  }

  private serverErrorHandler(error: HttpErrorResponse, request: HttpRequest<unknown>, next: HttpHandler) {
    if( error?.error?.status === 0){
      this.openSnackBar('Desculpe, ocorreu um erro inesperado. Por favor, tente novamente mais tarde. Se o problema persistir, entre em contato com o suporte técnico para obter assistência adicional.');
    }else if (error?.error?.status === 401) {
      if(error?.error?.detail == 'access_denied_reason'){
        this.openSnackBar('Entre em sua conta ou cadastre-se.')
      }else{
        this.openSnackBar(error?.error?.detail)
      }
     }else if (error?.error?.status === 400){
      this.openSnackBar(error?.error?.detail)
     }else if (error?.error?.status === 404){
      this.openSnackBar(error?.error?.detail)
     }else if (error?.error?.status === 409){
      this.openSnackBar(error?.error?.detail)
     }else if (error.error.status === 500){
      this.openSnackBar('Desculpe, ocorreu um erro inesperado. Pedimos desculpas pelo inconveniente causado. Por favor, tente novamente mais tarde. Se o problema persistir, entre em contato com o suporte técnico para obter assistência adicional.')
    }
    this.loadingService.requisicaoFinalizada(request.url)
    this.loadingService.estadoRequisicao(false)
  }

  openSnackBar(mensagem : string, horizontalPosition ?: MatSnackBarHorizontalPosition , verticalPosition ?: MatSnackBarVerticalPosition   ) {
    this._snackBar.open(mensagem, 'ERRO', {
      horizontalPosition : horizontalPosition ? horizontalPosition : 'center' as MatSnackBarHorizontalPosition ,
      verticalPosition: verticalPosition ? verticalPosition : 'bottom' as MatSnackBarVerticalPosition ,
    });
  }

}
