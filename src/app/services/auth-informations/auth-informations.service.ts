import { Injectable } from '@angular/core';

/**
 * Classe che contiene le informazioni fondamentali di autenticazione: token e userId
 */
@Injectable({
  providedIn: 'root'
})
export class AuthInformationsService {

   /**
   * Token per l'autenticazione durante l'uso delle API
   */
  private token: string = "";

   /**
   * Id utente per acquisire informazioni da visualizzare a video
   */
  private userId: string = "";

  /**
   * Costruttore, cerca di ottenere il token da localStorage qualora l'utente avesse già eseguito l'accesso in precedenza
   */
  constructor() { 
    this.token = localStorage.getItem("ADeToken") || "";
  }

  /**
   * Getter del token
   */
  public get Token() {return this.token}

  /**
   * Getter dell'id utente
   */
  public get UserId() {return this.userId}

  /**
   * Setter del token (con salvataggio in localStorage)
   * @param token Valore del nuovo token
   */
  public set Token(token: string) {
    localStorage.setItem("ADeToken", token);
    this.token = token
  }

  /**
   * Setter dell'identificativo utente
   * @param userId Valore del nuovo identificativo dell'utente
   */
  public set UserId(userId: string) {this.userId = userId}
}
