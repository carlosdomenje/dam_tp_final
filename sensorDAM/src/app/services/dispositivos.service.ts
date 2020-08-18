import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Dispositivos } from '../models/dispositivosInterface';



@Injectable({
  providedIn: 'root'
})
export class DispositivosService {
  urlApi = 'http://localhost:3000';
  // listado:Array<Dispositivo> = new Array<Dispositivo>();

  constructor(private http: HttpClient ) {}

  /* Obtiene el listado de dispositivos de la BD 
  * a traves de un Observable que lo da el metodo http
  * - Cuando aplico el metodo getListado, tengo que suscribirme al service.
  * - Creo una Inteface de datos con el modelo de dispositivos.
  * */
  getListadoDispositivos(){
    return this.http.get<Array<Dispositivos>>(this.urlApi + '/api/dispositivo/');
  }

  /* Promise que obtiene un dispositivo por id de la BD */
  // getDispositivo(id): Promise<Dispositivo>{
  //   return this.http.get(this.urlApi + '/api/dispositivo/' + id).toPromise().then((dispositivo: Dispositivo) => {
  //     return dispositivo;
  //   });
  // }
}
