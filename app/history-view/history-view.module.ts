import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistoryViewPageRoutingModule } from './history-view-routing.module';

import { HistoryViewPage } from './history-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistoryViewPageRoutingModule
  ],
  declarations: [HistoryViewPage]
})
export class HistoryViewPageModule {}
