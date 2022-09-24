//import { Utilizador } from '../models/utilizador';
import { GeneralConstants } from './../constants/GeneralConstants';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, isDevMode } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, empty, Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


 // test = window['env']['backendBaseUrl'] || 'http://localhosst:5151/api/v1'
 //'https://10.11.1.236:9657/api/V1/'; //'http://10.11.1.68:9605/api/'

 // baseUrl = 'https://10.11.1.236:9657/api/'//process.env.API_URL;//GlobalConstants.ApiURL;

 baseUrl = 'http://localhost:5001/api/'  //isDevMode() ? environmentProd.ApiUrl : environment.ApiUrl
 //'https://api-call-cost.digitalfactory.co.ao/api/'


   httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

   isUserLoged = new BehaviorSubject<boolean>(false);
  onLogin  = new Subject<any>(); // deprecated
  onLogout  = new Subject<any>(); // deprecated

  private token!: string;

  constructor(private http: HttpClient, private router: Router)
  {

    // try and find out if there was a localstorage token was set
    this.verifyUserLoged();
  }


  verifyUserLoged() {
    var data = localStorage.getItem(GeneralConstants.UserData.DataUserJson);
    if(data == null)
    {
      return false;
    }
    else
    {
      var dado =  JSON.parse(data);
      this.token = dado.jwToken;
      this.isUserLoged.next(this.token ?  true : false);
      return true;
    }

  }

  getToken(): string {
    return this.token;
  }

  hasToken(): boolean  {
    return this.getToken() ? true : false;
  }


  logout() {
    localStorage.removeItem(GeneralConstants.USER_AUTH.TOKEN_KEY);
    localStorage.removeItem(GeneralConstants.USER_AUTH.USERID_KEY);
    localStorage.removeItem(GeneralConstants.USER_AUTH.USERNAME_KEY);
    localStorage.removeItem(GeneralConstants.USER_AUTH.USERROLES_KEY);
    localStorage.removeItem(GeneralConstants.USER_AUTH.USERPERMISSOES_KEY);
    localStorage.removeItem(GeneralConstants.USER_AUTH.USER_TIPO_ID_KEY);
    localStorage.removeItem(GeneralConstants.USER_AUTH.USER_OPERACAO_KEY);
    this.isUserLoged.next(false);
    this.router.navigate(['/login']);
  }

  postter(url: string, data: any): Observable<any> {
    //let body = `username=${data.userName}&password=${data.password}&grant_type=password`;
    let body = JSON.stringify(data);
   // const encodedSyntax = encodeURIComponent(body);
    return this.http.post<any>(this.baseUrl + url, body, this.httpOptions);
  }

  updatter(url: string, data: any): Observable<any> {
    //let body = `username=${data.userName}&password=${data.password}&grant_type=password`;
    let body = JSON.stringify(data);
   // const encodedSyntax = encodeURIComponent(body);
    return this.http.put<any>(this.baseUrl + url, body, this.httpOptions);
  }

  errorHandler(error: HttpErrorResponse) {
    return empty();
  }

  getter(url: any): Observable<any> {
    return this.http.get(this.baseUrl + url);
}



}
