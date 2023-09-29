import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthInformationsService {

  private token: string = "";
  private userId: string = "";

  constructor() { 
    this.token = localStorage.getItem("ADeToken") || "";
  }

  public get Token() {return this.token}

  public get UserId() {return this.userId}

  public set Token(token: string) {
    localStorage.setItem("ADeToken", token);
    this.token = token
  }

  public set UserId(userId: string) {this.userId = userId}
}
