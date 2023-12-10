import { Component, Inject, OnInit } from '@angular/core';
import { Album } from '../../model/album.model';
import { Imagem } from '../../model/imagem.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { AlbumService } from '../../service/album.service';

@Component({
  selector: 'app-modal-form-album',
  templateUrl: './modal-form-album.component.html',
  styleUrls: ['./modal-form-album.component.css']
})
export class ModalFormAlbumComponent implements OnInit {

  selectedFiles?: FileList;
  previews: string[] = [];

  album : Album = new Album()

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialogRef<any>,
    private _snackBar: MatSnackBar,
    private albumService: AlbumService
  ) { }

  ngOnInit() {
  }

  selectFiles(event: any): void {
    this.selectedFiles = event.target.files;

    this.previews = [];
    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();

        let nomeArquivo = this.selectedFiles[i].name;
        let extensao = nomeArquivo.substring(nomeArquivo.lastIndexOf(".")+1, nomeArquivo.length);

        reader.readAsDataURL(this.selectedFiles[i]);
        reader.onload = (e: any) => {
          let imagem = new Imagem()

          imagem.byteImagem = reader.result?.toString()
          imagem.nome = nomeArquivo
          imagem.extensao = extensao

          this.album.imagens.push(imagem)

          this.previews.push(e.target.result);
        };

      }
    }
  }

  salvar(){
    if(!this.album.nome) return this.openSnackBar('Defina um nome para o álbum.', 'Atenção')
    if(!this.album.imagens?.length) return this.openSnackBar('Adicione ao menos 1 imagem para o álbum.', 'Atenção')

    this.albumService.salvar(this.album).subscribe({
      next : () => {
        this.openSnackBar('Álbum criado com sucesso.', 'OK')
        this.dialog.close()
      }
    })
  }

  cancelar(){
    this.dialog.close()
  }

  openSnackBar(mensagem : string, alerta : string, horizontalPosition ?: MatSnackBarHorizontalPosition , verticalPosition ?: MatSnackBarVerticalPosition   ) {
    this._snackBar.open(mensagem, alerta, {
      horizontalPosition : horizontalPosition ? horizontalPosition : 'center' as MatSnackBarHorizontalPosition ,
      verticalPosition: verticalPosition ? verticalPosition : 'bottom' as MatSnackBarVerticalPosition ,
    });
  }


}
