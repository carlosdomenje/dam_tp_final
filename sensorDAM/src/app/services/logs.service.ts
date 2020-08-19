import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LogRiego } from '../models/dispositivosInterface';

@Injectable({
  providedIn: 'root'
})
export class LogsService {
  urlApi = 'http://localhost:3000';

  constructor( private http: HttpClient ) { }
  
  /* Obtiene el listado de logs de la BD 
  * a traves de un Observable que lo da el metodo http
  * - Cuando aplico el metodo getListado, tengo que suscribirme al service.
  * - Creo una Inteface de datos con el modelo de dispositivos.
  * */
  getLogsRiegos(id: number){
    return this.http.get<Array<LogRiego>>(this.urlApi + '/api/logs/' + id);
  }

  getLogById(id: number){
    return this.http.get<LogRiego>(this.urlApi + '/api/logs/ultimo/' + id);
  }

  setLogRiego(logRiego: LogRiego){
    return this.http.post(this.urlApi + '/api/logs/agregar', logRiego);
  }
}
