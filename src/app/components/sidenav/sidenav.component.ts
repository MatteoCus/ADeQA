import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthInformationsService } from 'src/app/services/auth-informations/auth-informations.service';

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
   * Costrutttore della classe che gestisce la barra laterale, provvista di tre icone (di cui due per i diversi tipi di logout)
   * @param authInfoService Servizio per gestire le informazioni relative all'autenticazione
   * @param router Router per eseguire dei reindirizzamenti su browser
   */
  constructor(private authInfoService: AuthInformationsService, private router: Router) {}

/**
 * Metodo che gestisce il logout completo da parte dell'utente, eliminando anche il token di autenticazione
 */
  logout(): void {
    this.authInfoService.clear();
    this.router.navigate(['login/username']);
  }

  /**
   * Metodo che gestisce il logout parziale da parte dell'utente, eliminando solo l'identificativo utente
   */
  logoutUserId(): void {
    this.authInfoService.clearUser();
    this.router.navigate(['login/pin']);
  }

}
