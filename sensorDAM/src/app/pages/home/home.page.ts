import { Component, OnInit, OnDestroy } from '@angular/core';
import { DispositivosService } from '../../services/dispositivos.service';
import { Dispositivos } from 'src/app/models/dispositivosInterface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  constructor(private devService: DispositivosService, 
              private router: Router) {}

  DevsList: Array<Dispositivos> = new Array<Dispositivos>();
  
  /*
  * Obtengo el listado de dispositivos que hay en la BD
  * Para ello utilizo el Servicio y copio los datos a una 
  * variable Local para mostrar en el HTML.
  */
  ngOnInit(): void {
    this.devService.getListadoDispositivos()
        .subscribe((devs) => {
          console.log(devs);
          devs.forEach(dev => {
            console.log(dev);
            this.DevsList.push(dev); });
        });
  }

  showDevicePage(dispositivoID){
    this.router.navigate(['/dispositivo', dispositivoID]);
  }

}
