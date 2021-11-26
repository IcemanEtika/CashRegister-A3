import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from '../item.service';
import { purchasedItem } from '../purchasedItem';

@Component({
  selector: 'app-history-view',
  templateUrl: './history-view.page.html',
  styleUrls: ['./history-view.page.scss'],
})
export class HistoryViewPage implements OnInit {
  currentItem: purchasedItem
  constructor(private service: ItemService, private activated_route: ActivatedRoute) { }

  ngOnInit() {
    this.activated_route.paramMap.subscribe(
      paramMap => {
        if (!paramMap.has('id')) {
          return;
        }
        else {
          const id = paramMap.get('id');
          this.currentItem = this.service.getItemById(id);
        }
      }
    )
  }

}
