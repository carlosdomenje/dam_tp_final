import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicionService } from '../../services/medicion.service';
import * as Highcharts from 'highcharts';
import { Mediciones, Dispositivos } from '../../models/dispositivosInterface';
import { DispositivosService } from '../../services/dispositivos.service';
import { LogsService } from '../../services/logs.service';
import { Log } from '../../models/Log';
import { ElectrovalvulaService } from '../../services/electrovalvula.service';
declare var require: any;
require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/solid-gauge')(Highcharts);


@Component({
  selector: 'app-dispositivo',
  templateUrl: './dispositivo.page.html',
  styleUrls: ['./dispositivo.page.scss'],
})
export class DispositivoPage implements OnInit {

  id: string;
  private valorObtenido: number=0;
  public myChart;
  private chartOptions;
  valorMedicion: number = 0;
  numSensor: number = 0;
  fechaMedicion: string = '0-0-0T0:0:0.000Z';
  time: string;
  valveState: boolean = false;
  buttonColor: string = 'danger';
  estadoValvula: string = 'VALVULA CERRADA';
  nuevaMedicion: Mediciones = null;
  dispositivo: Dispositivos;
  newLog: Log = new Log(-1,'',-1);
  electroName: string = ' ';
  constructor(private route: ActivatedRoute,
              private devMedicion: MedicionService,
              private router: Router,
              private devService: DispositivosService,
              private logRiego: LogsService,
              private electro: ElectrovalvulaService) {

      this.id = route.snapshot.paramMap.get('id');
      console.log(this.id);
      this.newLog.SelectrovalvulaId = -1;
      this.newLog.Sfecha = '';
      this.newLog.Sapertura = -1;
      this.refreshData();
  }

  /*
  * Funcion para refrescar los datos del componente que muestra los valores 
  * obtenidos de la ultima medicion.
  */
  refreshData(){
    setTimeout(() => {
      this.valorObtenido = this.valorMedicion;
      // llamo al update del chart para refrescar y mostrar el nuevo valor
      this.myChart.update({series: [{
          name: 'kPA',
          data: [this.valorObtenido],
          tooltip: {
              valueSuffix: ' kPA'
          }
      }]});
    }, 1000);
  }

  /*
  * Control de la electrovalvula
  * Comienza en estado OFF y presionando el boton
  * cambia su color y texto indicando que esta encendida
  * luego de apagarse, genera una nueva medicion y ademas 
  * actualiza el valor en el componente
   */
  onElectrovalvula() {
    if (!this.valveState){
      this.valveState = true;
      this.buttonColor = 'success';
      this.estadoValvula = 'ABIERTA';
      this.time = new Date().toISOString();


      this.newLog.SelectrovalvulaId = this.dispositivo.electrovalvulaId;
      this.newLog.Sfecha = this.time;
      this.newLog.Sapertura = 1;
      this.insertLog(this.newLog);

    } else{
        this.time = new Date().toISOString();
        this.buttonColor = 'danger';
        this.valveState = false;
        this.estadoValvula = 'CERRADA';
        this.nuevaMedicion.fecha = this.time;
        this.nuevaMedicion.valor = Math.round(Math.random() * 100).toString();
        this.nuevaMedicion.dispositivoId = +this.id;
        this.enviarMedicion(this.nuevaMedicion);

        this.newLog.SelectrovalvulaId = this.dispositivo.electrovalvulaId;
        this.newLog.Sfecha = this.time;
        this.newLog.Sapertura = 0;
        this.insertLog(this.newLog);
    }
  }

  /**
   * Funcion que envia la medicion al apagar la electrovalvula
   * donde se genera un valor aleatorio de medicion y se adjunta
   * la fecha en la que fue cambiada.
   * Una vez que realiza el envio, vuelve a consulta por el ultimo
   * valor y actualiza la pantalla con el resultado.
   */
  enviarMedicion(medicion: Mediciones){
    this.devMedicion.setMedicion(medicion)
      .subscribe((result) => {
        this.obtenerMedicion();
        this.refreshData();
      });
  }

  /* Obtengo el valor de la medicion asociada al id del dispositivo */
  ngOnInit() {
    this.obtenerMedicion();
    this.obtenerDispositivo();
  }

  

  /**
   * Obtiene la medicion al suscribirse al servicio que contiene el get
   * donde el parametro de consulta es por ID. 
   */
  obtenerMedicion(){
    this.devMedicion.getMedicionById(+this.id)
    .subscribe((meds) => {
      console.log(meds);
      this.nuevaMedicion = meds;
      this.valorMedicion = +meds.valor;
      this.numSensor = meds.dispositivoId;
      this.fechaMedicion = meds.fecha;
    });
  }

  /**
   * Inserta un Log en la Base de Datos dependiendo el estado de la EV.
   */
  insertLog(log){
    this.logRiego.setLogRiego(log)
      .subscribe((result) => {
        console.log(result);
      });
  }

  /**
   * Leo el ultimo LOG para saber en que estado esta la EV y asi modificar el boton de ON / OFF.
   */
  readLastLog(id: number){
    this.logRiego.getLogById(id)
      .subscribe((result) => {
        console.log('LOG ULTIMO');
        console.log(result);
        if (result != null){
          if (result.apertura === 1){
            this.valveState = true;
            this.buttonColor = 'success';
            this.estadoValvula = 'ABIERTA';
          } else{
            this.buttonColor = 'danger';
            this.valveState = false;
            this.estadoValvula = 'CERRADA';
          }
        }
      });
  }

  /**
   * Navego a la pagina de Listado de Mediciones
   */
  goMediciones(){
    this.router.navigate(['/mediciones', this.id]);
  }

  /**
   * Navego a la pagina de Listado de Logs del Dispositivo
   */
  goLogs(){
    console.log('ID: ' + this.dispositivo.electrovalvulaId);
    this.router.navigate(['/logs', this.dispositivo.electrovalvulaId]);
  }

  /**
   * Funcion para obtener todos los parametros del dispoitivo en cuestion
   */
  obtenerDispositivo(){
    this.devService.getDispositivo(+this.id)
        .subscribe((dev) => {
          console.log(dev);
          this.dispositivo = dev;
          this.readLastLog(dev.electrovalvulaId);
          this.readEvName(dev.electrovalvulaId);
        });
  }

  /**
   * Funcion para obtener el nombre de la electrovalvula asociada al dispositivo
   */
  readEvName(id){
    this.electro.getEvName(id)
      .subscribe((name) => {
        console.log('ElectroV: ' + name.nombre);
        console.log(name);
        this.electroName = name.nombre;
      });
  }


  ionViewDidEnter() {
    this.generarChart();
    this.readLastLog(this.dispositivo.electrovalvulaId);
  }

  generarChart() {
    this.chartOptions = {
      chart: {
          type: 'gauge',
          plotBackgroundColor: null,
          plotBackgroundImage: null,
          plotBorderWidth: 0,
          plotShadow: false
        }
        , title: {
          text: 'SENSOR Nº ' + this.numSensor
        }

        , credits: { enabled: false }
        , pane: {
            startAngle: -150,
            endAngle: 150
        }
        // the value axis
      , yAxis: {
        min: 0,
        max: 100,
  
        minorTickInterval: 'auto',
        minorTickWidth: 1,
        minorTickLength: 10,
        minorTickPosition: 'inside',
        minorTickColor: '#666',
  
        tickPixelInterval: 30,
        tickWidth: 2,
        tickPosition: 'inside',
        tickLength: 10,
        tickColor: '#666',
        labels: {
            step: 2,
            rotation: 'auto'
        },
        title: {
            text: 'kPA'
        },
        plotBands: [{
            from: 0,
            to: 10,
            color: '#55BF3B' // green
        }, {
            from: 10,
            to: 30,
            color: '#DDDF0D' // yellow
        }, {
            from: 30,
            to: 100,
            color: '#DF5353' // red
        }]
    }
    ,
  
    series: [{
        name: 'kPA',
        data: [this.valorObtenido],
        tooltip: {
            valueSuffix: ' kPA'
        }
    }]

    };
    this.myChart = Highcharts.chart('highcharts', this.chartOptions );
  }

}
