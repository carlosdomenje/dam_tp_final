import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Mediciones } from '../models/dispositivosInterface';

@Injectable({
  providedIn: 'root'
})
export class MedicionService {
  urlApi = 'http://localhost:3000';

  constructor(private http: HttpClient ) {}

  getMedicionById(id: Number){
    return this.http.get<Mediciones>(this.urlApi + '/api/medicion/' + id);
  }
}
