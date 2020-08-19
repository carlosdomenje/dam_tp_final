import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fecha'
})
export class FechaPipe implements PipeTransform {
  camposFecha;
  fechaNueva;
  horaNueva: string[] = [];
  hora: string = '';
  transform(fecha: string ): string {
    this.fechaNueva = fecha;
    this.camposFecha = this.fechaNueva.split('-');
    this.horaNueva = this.camposFecha[2].split('T');
    console.log(this.horaNueva);
    this.hora = this.horaNueva[1].split('.')[0];
    console.log(this.hora);
    this.fechaNueva = this.camposFecha[2].split('T')[0] + ' / ' + this.camposFecha[1] + ' / ' + this.camposFecha[0];
    this.fechaNueva = 'FECHA: ' + this.fechaNueva + ' -  HORA: ' + this.hora;
    return this.fechaNueva;
  }

}
