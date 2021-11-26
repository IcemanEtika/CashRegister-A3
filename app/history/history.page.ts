import { Component, OnInit } from '@angular/core';
import { purchasedItem } from '../purchasedItem';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  itemList : purchasedItem[]
  constructor(private service: ItemService) { }

  ngOnInit() {
    this.itemList = this.service.getAllHistoryItems();
  }

}
