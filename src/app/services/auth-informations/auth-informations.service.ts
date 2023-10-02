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
  private userId: number = 0

  /**
   * Costruttore, cerca di ottenere il token da localStorage qualora l'utente avesse già eseguito l'accesso in precedenza
   */
  constructor() {
    this.token = localStorage.getItem("ADeToken") || "";
    this.userId = sessionStorage.getItem("ADeUserID") as any as number || 0;
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
   * Setter dell'identificativo utente (con salvataggio in sessionStorage)
   * @param userId Valore del nuovo identificativo dell'utente
   */
  public set UserId(userId: number) {
    this.userId = userId;
    sessionStorage.setItem("ADeUserId", this.userId as any as string);
  }

  /**
   * Metodo per ripristinare a stato di default il token e l'identificativo utente
   * Rimuove il token da localStorage e l'id utente da sessionStorage
   */
  public clear(): void {
    this.token = "";
    this.userId = 0;
    localStorage.removeItem("ADeToken");
    sessionStorage.removeItem("ADeUserId");
  }

  /**
   * Metodo per eseguire il logout rispetto all'ultimo passo di autenticazione (quando si ottiene l'identificativo utente)
   * Rimuove l'id utente da sessionStorage
   */
  public clearUser(): void {
    this.userId = 0;
    sessionStorage.removeItem("ADeUserId");
  }
}
