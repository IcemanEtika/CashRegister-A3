import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'cashregister',
    pathMatch: 'full'
  },
  {
    path: 'cashregister',
    children: [
      {
        path: '',
        loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'manager',
        loadChildren: () => import('./manager/manager.module').then( m => m.ManagerPageModule)
      },
      {
        path: 'manager/restock',
        loadChildren: () => import('./restock/restock.module').then( m => m.RestockPageModule)
      },
      {
        path: 'manager/add',
        loadChildren: () => import('./add-item/add-item.module').then( m => m.AddItemPageModule)
      },
      {
        path: 'manager/history',
        loadChildren: () => import('./history/history.module').then( m => m.HistoryPageModule)
      },
      {
        path: 'manager/history/:id',
        loadChildren: () => import('./history-view/history-view.module').then( m => m.HistoryViewPageModule)
      },
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
