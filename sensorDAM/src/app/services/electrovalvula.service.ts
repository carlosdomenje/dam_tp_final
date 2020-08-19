import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EvName } from '../models/dispositivosInterface';

@Injectable({
  providedIn: 'root'
})
export class ElectrovalvulaService {
  urlApi = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  /* Leo de la BD el nombre de la Electrovalvula asociada al id */
  getEvName(id){
    return this.http.get<EvName>(this.urlApi + '/api/electrovalvulas/' + id);
  }
}
