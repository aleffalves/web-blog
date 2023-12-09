import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/shared/service/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  carregando: boolean = false;
  progresso?: number;

  constructor(
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
    this.loadingService.requisicao().subscribe(estado => this.carregando = estado)
    this.loadingService.transferencia().subscribe(progresso => this.progresso = (progresso <= 0 || progresso >= 100) ? undefined : progresso)
  }

}
