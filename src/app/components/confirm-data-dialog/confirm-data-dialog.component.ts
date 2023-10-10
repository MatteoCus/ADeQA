import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

/**
 * Classe che gestisce un dialog di conferma per l'aggiornamento/inserimento di log
 */
@Component({
  selector: 'app-confirm-data-dialog',
  templateUrl: './confirm-data-dialog.component.html',
  styleUrls: ['./confirm-data-dialog.component.scss']
})
export class ConfirmDataDialogComponent implements OnInit {

  /**
   * Attributo che descrive il tipo di dialog (titolo + descrizione)
   */
  public fromPage!: {title: string, description: string};

  /**
   * Costruttore della classe di presentazione e gestione degli eventi relativi a un dialog
   * @param dialogRef Riferimento programmatico al dialog grafico (per triggerarne la chiusura)
   * @param mydata Descrizione (titolo + descrizione) del dialog
   */
  constructor( public dialogRef: MatDialogRef<ConfirmDataDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public mydata: any) {}

  /**
   * Metodo che inizializza titolo e descrizione del dialog
   */
  ngOnInit(): void {
    this.fromPage = this.mydata;
  }

  /**
   * Metodo che segnala la scelta dell'opzione "Conferma" nel dialog
   */
  public confirm(): void {
    this.dialogRef.close({ event: 'confirm-option' });
  }

  /**
   * Metodo che segnala la scelta dell'opzione "Annulla" nel dialog
   */
  public cancel(): void {
    this.dialogRef.close({ event: 'cancel-option' });
  }
}
