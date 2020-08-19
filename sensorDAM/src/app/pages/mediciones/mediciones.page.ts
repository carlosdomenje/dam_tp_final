import { Component, OnInit } from '@angular/core';
import { MedicionService } from '../../services/medicion.service';
import { ActivatedRoute } from '@angular/router';
import { Mediciones } from '../../models/dispositivosInterface';

@Component({
  selector: 'app-mediciones',
  templateUrl: './mediciones.page.html',
  styleUrls: ['./mediciones.page.scss'],
})
export class MedicionesPage implements OnInit {
  devMed: number;
  MedsList: Array<Mediciones> = new Array<Mediciones>();

  constructor(private devMedicion: MedicionService,
              private route: ActivatedRoute) {
    this.devMed = +route.snapshot.paramMap.get('devId');
    console.log(this.devMed);
   }

  ngOnInit() {
    this.obtenerMediciones();
  }


  /**
   * Obtiene la medicion al suscribirse al servicio que contiene el get
   * donde el parametro de consulta es por ID. 
   */
  obtenerMediciones(){
    this.devMedicion.getMediciones(+this.devMed)
    .subscribe((meds) => {
      console.log(meds);
      meds.forEach(medicion => {
        console.log(medicion);
        this.MedsList.push(medicion); });
    });
  }

}
