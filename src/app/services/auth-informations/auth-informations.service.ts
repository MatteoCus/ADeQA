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
  private userId: number = 0;

  /**
   * Nome dell'utente autenticato
   */
  private userName: string = "";

  /**
   * Costruttore, cerca di ottenere il token da localStorage qualora l'utente avesse già eseguito l'accesso in precedenza
   */
  constructor() {
    this.token = localStorage.getItem("ADeToken") || "";
    this.userId = sessionStorage.getItem("ADeUserID") as any as number || 0;
    this.userName = sessionStorage.getItem("ADeUserName") || "";
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
   * Getter del nome utente
   */
  public get UserName() {return this.userName}

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
   * Setter del nome utente
   * @param userName Valore del nuovo nome dell'utente
   */
  public set UserName(userName: string) {
    this.userName = userName;
    sessionStorage.setItem("ADeUserName", this.userName);
  }

  /**
   * Metodo per ripristinare a stato di default il token e l'identificativo utente
   * Rimuove il token da localStorage e le informazioni da sessionStorage
   */
  public clear(): void {
    this.token = "";
    localStorage.removeItem("ADeToken");
    this.clearUser();
  }

  /**
   * Metodo per eseguire il logout rispetto all'ultimo passo di autenticazione (quando si ottiene l'identificativo utente)
   * Rimuove l'id ed il nome dell'utente da sessionStorage
   */
  public clearUser(): void {
    this.userId = 0;
    this.userName = "";
    sessionStorage.removeItem("ADeUserId");
    sessionStorage.removeItem("ADeUserName");
  }
}
