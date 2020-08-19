import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LogsPageRoutingModule } from './logs-routing.module';

import { LogsPage } from './logs.page';
import { FechaPipe } from '../../pipes/fecha.pipe';
import { EvNamesPipe } from '../../pipes/ev-names.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LogsPageRoutingModule
  ],
  declarations: [LogsPage, FechaPipe, EvNamesPipe]
})
export class LogsPageModule {}
