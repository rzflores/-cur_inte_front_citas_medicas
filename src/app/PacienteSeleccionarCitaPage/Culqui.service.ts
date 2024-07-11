import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
declare var Culqi: any;

@Injectable({
  providedIn: 'root'
})
export class CulquiService {

  private apiUrl = "https://api.culqi.com/v2/orders";
  private apiKey = "pk_test_bc53d20a6a1cbb5c";
  private skKey = "sk_test_b0514415ba238157";

  constructor(private http: HttpClient, private ngZone: NgZone) { }

  public culquiToken(amount: string): Observable<string> {

    let newAmount =  parseInt(amount)
    const requestData = {
      amount: newAmount * 100,
      currency_code: "PEN",
      description: "Venta de prueba",
      order_number: this.generarNumeroAleatorio(),
      client_details: {
        first_name: "Fernando",
        last_name: "Chullo",
        email: "review158984@culqi.com",
        phone_number: "945737476"
      },
      expiration_date: this.obtenerEpochDeFechaActual(),
      confirm: false
    };

    const requestOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.skKey}`,
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<any>(this.apiUrl, requestData, requestOptions)
      .pipe(
        map(response => response.id),
        catchError(error => {
          console.error("Error en la solicitud a la API de Culqi:", error);
          throw error;
        })
      );
  }

  public configurarCulqi(precio: string): void {
    this.culquiToken(precio).subscribe(dataId => {
      console.log(dataId);

      // Ejecutar dentro de la zona de Angular
      this.ngZone.run(() => {
        console.log(Culqi);

        Culqi.publicKey = this.apiKey;
        
        Culqi.settings({
          currency: "PEN",
          amount: `${precio}00`,
          title: "Citas Web",
          order: dataId,
          // xculqirsaid: 'de35e120-e297-4b96-97ef-10a43423ddec',
          // rsapublickey: `-----BEGIN PUBLIC KEY-----
          // MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDswQycch0x/7GZ0oFojkWCYv+g
          // r5CyfBKXc3Izq+btIEMCrkDrIsz4Lnl5E3FSD7/htFn1oE84SaDKl5DgbNoev3pM
          // C7MDDgdCFrHODOp7aXwjG8NaiCbiymyBglXyEN28hLvgHpvZmAn6KFo0lMGuKnz8
          // HiuTfpBl6HpD6+02SQIDAQAB
          // -----END PUBLIC KEY-----`,
        });

        Culqi.options({
          lang: "auto",
          paymentMethods: {
            tarjeta: true,
            yape: false,
            billetera: false,
            bancaMovil: false,
            agente: false,
            cuotealo: false,
          },
          installments: false,
          logo: "https://static.culqi.com/v2/v2/static/img/logo.png"
        });

        Culqi.open();
      });
    }, error => {
      console.error("Error al obtener el token de Culqi:", error);
    });
  }

  public closeCulqui(){
    Culqi.close();

  }

  private generarNumeroAleatorio(): string {
    const numeroDecimal = Math.random();
    const numeroEntero = Math.floor(numeroDecimal * Math.pow(10, 9));
    return String(numeroEntero).padStart(9, '0');
  }

  private obtenerEpochDeFechaActual(): number {
    return Math.floor(Date.now() / 1000) + 86400;
  }
}
