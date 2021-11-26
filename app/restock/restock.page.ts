import { Component, OnInit } from '@angular/core';
import { Item } from '../Item';
import { ItemService } from '../item.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-restock',
  templateUrl: './restock.page.html',
  styleUrls: ['./restock.page.scss'],
})
export class RestockPage implements OnInit {
  itemList : Item[]
  currentItem : Item
  currentSelect = -1
  quantity: Number
  name: ""

  constructor(private service: ItemService, public alertController: AlertController) { }
  ngOnInit() {
    this.itemList = this.service.getAllItems();
  }
  itemSelected(item) {
    this.currentItem = item;
    this.name = item.itemName;
    this.currentSelect = Number(this.currentItem.id) - 1;
  }
  async restock() {
    if (this.currentItem != undefined && this.quantity != undefined && this.quantity != 0) {
      this.itemList = this.service.updateItemQuantity(this.currentItem.id, this.quantity);
    }
    else {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Please select an item and enter a valid name, quantity and price.',
        buttons: ['OK']
      });

      await alert.present();
    }
  }
}
