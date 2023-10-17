import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

/**
 * Classe che si occupa della presentazione e degli eventi relativi a un dialog
 */
@Component({
  selector: 'app-logout-dialog',
  templateUrl: './logout-dialog.component.html',
  styleUrls: ['./logout-dialog.component.scss']
})
export class LogoutDialogComponent implements OnInit {

  /**
   * Attributo che descrive il tipo di dialog (titolo + descrizione)
   */
  public fromPage!: {title: string, description: string};

  /**
   * Costruttore della classe di presentazione e gestione degli eventi relativi a un dialog
   * @param dialogRef Riferimento programmatico al dialog grafico (per triggerarne la chiusura)
   * @param mydata Descrizione (titolo + descrizione) del dialog
   */
  constructor( public dialogRef: MatDialogRef<LogoutDialogComponent>, @Optional() @Inject(MAT_DIALOG_DATA) public mydata: any) {}

  /**
   * Metodo che inizializza titolo e descrizione del dialog
   */
  ngOnInit(): void {
    this.fromPage = this.mydata;
  }

  /**
   * Metodo che segnala la scelta dell'opzione "Rimani" nel dialog
   */
  public stay(): void {
    this.dialogRef.close({ event: 'stay-option' });
  }

  /**
   * Metodo che segnala la scelta dell'opzione "Esci" nel dialog
   */
  public exit(): void {
    this.dialogRef.close({ event: 'exit-option' });
  }
}
