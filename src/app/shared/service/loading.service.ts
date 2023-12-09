import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private transferenciaArquivo = new Subject<number>();
  private requisicaoCompleta = new Subject<boolean>();
  private requisicoes: string[] = []

  constructor() { }

  public requisicao(): Observable<boolean> {
    return this.requisicaoCompleta.asObservable();
  }

  public estadoRequisicao(carregando: boolean) {
    return this.requisicaoCompleta.next(carregando);
  }

  public transferencia(): Observable<number> {
    return this.transferenciaArquivo.asObservable()
  }

  public atualizacaoTransferencia(progresso: number) {
    return this.transferenciaArquivo.next(progresso)
  }

  public requisicaoEnviada(reqUrl: string) {
    this.requisicoes.push(reqUrl)
  }

  public requisicaoFinalizada(reqUrl: string) {
    this.requisicoes.splice(this.requisicoes.indexOf(reqUrl), 1)
  }

  public requisicoesAbertas() {
    return this.requisicoes.length > 0 ? true : false
  }

}
