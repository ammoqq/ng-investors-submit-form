import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class PayuService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Bearer 8ffd7305-6f0f-44be-8f3a-86a490bc8902'
    })
  };

  oauthOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/x-www-form-urlencoded',
      // 'Accept': '*/*',
      'Access-Control-Allow-Origin': 'http://localhost:4200'
    })
  };

  sendPayu(): Observable<any> {
    // this.getOAuth().subscribe( token => {
    //   console.log(token)
    // })
    let response = {
  	"access_token": "8ffd7305-6f0f-44be-8f3a-86a490bc8902",
  	"token_type": "bearer",
  	"expires_in": 43199,
  	"grant_type": "client_credentials"
  }
  var body = {
  'notifyUrl': 'https://your.eshop.com/notify',
  'customerIp': '127.0.0.1',
  'merchantPosId': '145227',
  'description': 'RTV market',
  'currencyCode': 'PLN',
  'totalAmount': '21000',
  'products': [
    {
      'name': 'Wireless mouse',
      'unitPrice': '15000',
      'quantity': '1'
    },
    {
      'name': 'HDMI cable',
      'unitPrice': '6000',
      'quantity': '1'
    }
  ]
};
    return this.http.post('https://secure.payu.com/api/v2_1/orders/', body, this.httpOptions)
  }

  getOAuth(): Observable<any> {
    return this.http.post('https://secure.payu.com/pl/standard/user/oauth/authorize?grant_type=client_credentials&client_id=145227&client_secret=12f071174cb7eb79d4aac5bc2f07563f', '', this.oauthOptions)
  }
}
