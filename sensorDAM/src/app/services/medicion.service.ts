import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Mediciones } from '../models/dispositivosInterface';

@Injectable({
  providedIn: 'root'
})
export class MedicionService {
  urlApi = 'http://localhost:3000';

  constructor(private http: HttpClient ) {}

  getMedicionById(id: number){
    return this.http.get<Mediciones>(this.urlApi + '/api/medicion/' + id);
  }

  getMediciones(id: number){
    return this.http.get<Array<Mediciones>>(this.urlApi + '/api/medicion/' + id + '/todas');
  }

  setMedicion(medicion: Mediciones){
    return this.http.post(this.urlApi + '/api/medicion/agregar', medicion);
  }

}
