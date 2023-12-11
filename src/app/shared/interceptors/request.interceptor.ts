import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { AuthService } from "../service/auth.service";
import { LoadingService } from "../service/loading.service";

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private loadingService: LoadingService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = request.clone({
      setHeaders: {'content-type': 'application/json', accept: 'application/json'}
    })

    if (!request.url.includes('auth/logar')){
      const token = this.authService.getAuthToken();
      if (token){
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        })
      } else {
        this.authService.logOut()
      }
    }
    this.loadingService.estadoRequisicao(true)
    this.loadingService.requisicaoEnviada(request.url)
    return next.handle(request).pipe(map((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        this.loadingService.requisicaoFinalizada(request.url)
        if (!this.loadingService.requisicoesAbertas()) {
          this.loadingService.estadoRequisicao(false)
        }
      }
      return event
    }))
  }

}
