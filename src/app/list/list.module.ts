import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { ListPage } from './list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: ListPage,
        children: [
          {
            path: 'watch-list',
            children: [
              {
                path: '',
                loadChildren: './watch-list/watch-list.module#WatchListPageModule'
              }
            ]
          },
          {
            path: 'watched-list',
            children: [
              {
                path: '',
                loadChildren: './watched-list/watched-list.module#WatchedListPageModule'
              }
            ]
          },
          {
            path: '',
            redirectTo: '/list/watch-list',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/list/watch-list',
        pathMatch: 'full'
      }
    ])
  ],
  declarations: [ListPage]
})
export class ListPageModule {}
