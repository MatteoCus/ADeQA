import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthInformationsService } from 'src/app/services/auth-informations/auth-informations.service';

/**
 * Classe che gestisce la visualizzazione principale
 */
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  /**
   * Costruttore della classe che gestisce la vista principale, reindirizza al login con username in assenza delle informazioni di autenticazione necessarie (token, userId)
   * @param authInfoService Servizio per gestire le informazioni relative all'autenticazione 
   * @param router Router per eseguire dei reindirizzamenti su browser
   */
  constructor(private authInfoService: AuthInformationsService, private router: Router) {
    if(this.authInfoService.Token == "" || this.authInfoService.UserId as any as number == 0 || this.authInfoService.UserName == ""){
      this.router.navigate(['login/username']);
    }
  }

}
