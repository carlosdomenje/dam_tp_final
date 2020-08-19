import { Pipe, PipeTransform } from '@angular/core';
import { stringify } from 'querystring';

@Pipe({
  name: 'evNames'
})
export class EvNamesPipe implements PipeTransform {
    newName: string = 'Electro';
  transform(name: string): string {
    this.newName = name;
    this.newName = 'Electrovalvula ' + this.newName.substring(2);

    return this.newName;
  }

}
