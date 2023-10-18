import { Injectable } from '@angular/core';
import { Fetch$Params } from 'src/app/api/fn/operators/fetch';
import { OperatorsService } from 'src/app/api/services';

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
   * Tema predefinito dell'utente autenticato
   */
  private userTheme: "DM" | "WM" | undefined = undefined;

  /**
   * Costruttore, cerca di ottenere il token da localStorage qualora l'utente avesse già eseguito l'accesso in precedenza
   */
  constructor() {
    this.token = localStorage.getItem("ADeToken") || "";
    this.userId = sessionStorage.getItem("ADeUserId") as any as number || 0;
    this.userName = sessionStorage.getItem("ADeUserName") || "";
    this.userTheme = sessionStorage.getItem("ADeUserTheme") as "DM" | "WM";
  }

  /**
   * Getter del token
   */
  public get Token(): string { return this.token }

  /**
   * Getter dell'id utente
   */
  public get UserId(): number { return this.userId }

  /**
   * Getter del nome utente
   */
  public get UserName(): string { return this.userName; }

  /**
   * Getter del tema predefinito
   */
  public get UserTheme(): "DM" | "WM" { return this.userTheme!; }

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
   * Setter del tema predefinito
   * @param userTheme Nuovo tema
   */
  public set UserTheme(userTheme: "DM" | "WM") {
    this.userTheme = userTheme;
    sessionStorage.setItem("ADeUserTheme", this.userTheme!);
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
   * Rimuove l'id ed il tema dell'utente da sessionStorage
   * Imposta il tema chiaro (evita che i form di login abbiano tema scuro)
   */
  public clearUser(): void {
    this.userId = 0;
    this.userName = "";
    sessionStorage.removeItem("ADeUserId");
    sessionStorage.removeItem("ADeUserTheme");

    document.body.classList.remove('theme-dark');
  }
}
