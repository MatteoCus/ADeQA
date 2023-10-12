import { Injectable } from '@angular/core';
import { AuthInformationsService } from '../auth-informations/auth-informations.service';
import { Router } from '@angular/router';

/**
 * Classe che gestisce il logout dell'utente in due modalità:
 * -) Logout utente: l'utente conserva il token in 'localStorage' ma perde le altre informazioni
 * -) Logout completo: l'utente perde anche il token
 */
@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  /**
   * Costruttore della classe di gestione del logout
   * @param authInfoService Servizio per gestire le informazioni relative all'autenticazione 
   * @param router Router per eseguire dei reindirizzamenti su browser
   */
  constructor(private authInfoService: AuthInformationsService, private router: Router) { }

  /**
   * Metodo che gestisce il logout completo da parte dell'utente, eliminando anche il token di autenticazione
   */
  public logout(): void {
    this.authInfoService.clear();
    this.router.navigate(['login/username']);
  }

  /**
   * Metodo che gestisce il logout parziale da parte dell'utente, eliminando solo l'identificativo utente
   */
  public logoutUserId(): void {
    this.authInfoService.clearUser();
    this.router.navigate(['login/pin']);
  }
}
