import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthInformationsService } from 'src/app/services/auth-informations/auth-informations.service';
import { LogoutDialogComponent } from '../logout-dialog/logout-dialog.component';
import { LogoutService } from 'src/app/services/logout-service/logout.service';

/**
 * Classe che gestisce i due tipi di logout:
 * - Logout generale, nel quale si elimina anche il token di autenticazione
 * - Logout utente, nel quale si elimina sono l'identificativo dell'utente
 */
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {

  /**
   * Costruttore della classe che gestisce la barra laterale, provvista di tre icone (di cui due per i diversi tipi di logout)
   * @param dialog Dialog di logout
   */
  constructor(private logoutService: LogoutService, private dialog: MatDialog) {}

  /**
   * Metodo per gestire le interazioni con il dialog di logout generale 
   * Occorre reinserire nome utente e password per ri-ottenere il token
   */
  public openLogoutDialog(): void {
    const logoutDialog = this.dialog.open(LogoutDialogComponent, {
      data: {
        title:'Logout generale',
        description: 'Occorre reinserire username e pin'
      }
    });

    logoutDialog.afterClosed().subscribe((result) => {
      switch(result.event) {
        case "exit-option":
          this.logoutService.logout();
          break;
        case "stay-option":
          break;
        default:
          break;
      }
    });
  }

  /**
   * Metodo per gestire le interazioni con il dialog di logout parziale 
   * Occorre reinserire il pin per ri-accedere ai servizi in qualità di operatore
   */
  public openLogoutUserDialog(): void {
    const logoutDialog = this.dialog.open(LogoutDialogComponent, {
      data: {
        title:'Logout parziale',
        description: 'Occorre reinserire il pin'
      }
    });

    logoutDialog.afterClosed().subscribe((result) => {
      switch(result.event) {
        case "exit-option":
          this.logoutService.logoutUserId();
          break;
        case "stay-option":
          break;
        default:
          break;
      }
    });
  }

}
