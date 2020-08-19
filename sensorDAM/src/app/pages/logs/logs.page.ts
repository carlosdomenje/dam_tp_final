import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LogsService } from '../../services/logs.service';
import { LogRiego } from '../../models/dispositivosInterface';
import { ElectrovalvulaService } from '../../services/electrovalvula.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.page.html',
  styleUrls: ['./logs.page.scss'],
})
export class LogsPage implements OnInit {

  devElectro: number;
  LogsList: Array<LogRiego> = new Array<LogRiego>();
  electroName: string = ' ';

  constructor(private route: ActivatedRoute, 
              private logRiego: LogsService,
              private electro: ElectrovalvulaService) {

    this.devElectro = +route.snapshot.paramMap.get('eleId');

  }

  ngOnInit() {
    
    this.obtenerLogs();
  }

  /**
   * Obtiene la medicion al suscribirse al servicio que contiene el get
   * donde el parametro de consulta es por ID.
   */
  obtenerLogs(){
    this.logRiego.getLogsRiegos(this.devElectro)
    .subscribe((logs) => {
      console.log(logs);
      logs.forEach(log => {
        console.log(log);
        this.LogsList.push(log); });
      this.readEvName(this.devElectro);

    });
  }

  /**
   * Funcion para obtener el nombre de la electrovalvula asociada al dispositivo
   */
  readEvName(id: number){
    this.electro.getEvName(id)
      .subscribe((name) => {
        console.log('ElectroV: ' + name.nombre);
        console.log(name);
        this.electroName = name.nombre;
      });
  }


}
