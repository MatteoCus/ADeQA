import { Injectable } from '@angular/core';
import { AuthInformationsService } from '../auth-informations/auth-informations.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

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
