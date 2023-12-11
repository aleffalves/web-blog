import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ModalConfirmacaoComponent } from 'src/app/shared/modais/modal-confirmacao/modal-confirmacao.component';
import { Album } from 'src/app/shared/model/album.model';
import { AlbumService } from 'src/app/shared/service/album.service';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {

  @Input() albuns ?: Album[] = new Array()
  @Input() totalPagesAlbuns : number = 0

  idUsuarioLogado ?: number
  page : number = 0;
  limit : number = 5;

  constructor(
    private albumService : AlbumService,
    public dialog : MatDialog,
    private authService : AuthService
  ) { }

  ngOnInit() {
    this.idUsuarioLogado = this.authService.getDecodedToken().id
  }

  buscarAlbuns(page : number, limit : number){
    this.albumService.buscarAlbuns(page, limit).subscribe({
      next : (albuns) => {
        albuns.content?.forEach(p => this.albuns?.push(p))
        this.page = albuns.number as number
        this.limit = albuns.size as number
        this.totalPagesAlbuns = (albuns.totalPages as number)-1
      }
    })
  }


  deletar(album : Album){
    let modal = this.dialog.open(ModalConfirmacaoComponent, {data : {}})
    modal.afterClosed().subscribe({
      next : (res) => {
        if(res){
          this.albumService.deletar(album.id).subscribe({})
          this.albuns?.splice(this.albuns?.findIndex( a => a == album), 1)
        }
      }
    })
  }


  verMais(){
    this.buscarAlbuns(this.page+1, this.limit)
  }


}
