import { GeneralConstants } from './../constants/GeneralConstants';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, isDevMode } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, empty, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class GeneralService {


    //baseUrl = 'http://10.11.1.68:5054/api/';   baseUrl = 'http://localhost:5000/api/'
//http://10.25.100.33:8036/api/V1/
    baseUrl = 'http://localhost:5001/api/V1/' //isDevMode() ? environmentProd.ApiUrl : environment.ApiUrl
    //https://api-call-cost.digitalfactory.co.ao/api/V1/

    //process.env.API_URL;//GlobalConstants.ApiURL;//'https://10.11.1.236:9657/api/v1/'; //'http://10.11.1.68:9605/api/v1/'
     httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }




    constructor(private http: HttpClient) { }

    getter(url: any): Observable<any> {
        return this.http.get(this.baseUrl + url);
    }

    getterUrl(url: any): Observable<any> {
      return this.http.get(url);
  }


    postter(url: string, data:any): Observable<any> {
      let body = JSON.stringify(data);
        return this.http.post(this.baseUrl + url, body, this.httpOptions);
    }

   RequestPedido(url: string, data:any): Observable<any> {


    //Moantar os dados no form para poder fazer o pedido
      const formData = new FormData();
      formData.append('idModeloReport', data.idModeloReport)
      formData.append('idInstituicao', data.idInstituicao)
      formData.append('CardFile', data.CardFile)

      return this.http.post(this.baseUrl + url, formData);
    }

    updatter(url: string, data: any): Observable<any> {
        let body = JSON.stringify(data);
        return this.http.put(this.baseUrl + url, body, this.httpOptions);
    }

    patcher(url: string, data: any): Observable<any> {
        let body = JSON.stringify(data);
        return this.http.patch(this.baseUrl + url, body, this.httpOptions);
    }

    deletter(url: string): Observable<any> {
        return this.http.delete(this.baseUrl + url, this.httpOptions);
    }

    // getterFile(url: string): any {
    //     return new Promise((resolve, reject) => {
    //         var xhr = new XMLHttpRequest();
    //         xhr.open("GET", "../../assets/" + url, true);
    //         xhr.responseType = "blob";
    //         xhr.onload = function (e) {
    //             var reader = new FileReader();
    //             reader.onload = function (event) {
    //                 var res = event.target.result;
    //                 resolve(res);
    //             }
    //             var file = this.response;
    //             reader.readAsDataURL(file)
    //         };
    //         xhr.send()
    //     });
    // }
}
