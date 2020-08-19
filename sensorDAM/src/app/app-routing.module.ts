import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'dispositivo/:id',
    loadChildren: () => import('./pages/dispositivo/dispositivo.module').then( m => m.DispositivoPageModule)
  },
  {
    path: 'logs/:eleId',
    loadChildren: () => import('./pages/logs/logs.module').then( m => m.LogsPageModule)
  },
  {
    path: 'mediciones/:devId',
    loadChildren: () => import('./pages/mediciones/mediciones.module').then( m => m.MedicionesPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
