import { Component, OnInit } from '@angular/core';
import { Item } from '../Item';
import { purchasedItem } from '../purchasedItem';
import { ItemService } from '../item.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  itemList : Item[]
  currentItem : Item
  currentSelect = -1
  name = "Type"
  quantity = "Quantity"
  total = "Total"
  price = 0
  i = 0

  constructor(private service: ItemService, public alertController: AlertController) {}
  ngOnInit() {
    this.itemList = this.service.getAllItems();
  }
  ionViewDidEnter() {
    this.itemList = [...this.service.getAllItems()];
  }
  buttonClicked(value: Number) {
    if (this.quantity == "0" || this.quantity == "Quantity") {
      this.quantity = "" + value;
    }
    else {
      this.quantity += "" + value;
    }
    this.total = (this.price * Number(this.quantity)).toFixed(2) + "";
  }
  itemSelected(value: Item) {
    this.name = value.itemName;
    this.price = Number(value.price);
    if (this.quantity == "Quantity") {
      this.quantity = "" + 0;
    }
    this.total = "" + Number(this.quantity) * this.price;
    this.currentItem = value;
    this.currentSelect = Number(this.currentItem.id) - 1;
  }
  async buyPressed() {
    if (this.name == "Type" || this.total == "Total" || this.quantity == "0" || this.currentItem.id == undefined) {
      const alert = await this.alertController.create({
        header: "Error",
        message: "Please enter a valid quantity and choose an item before attempting to buy.",
        buttons: ['OK']
      });
      await alert.present();
    }
    else {
      if (Number(this.quantity) > this.currentItem.itemQuantity) {
        const alert = await this.alertController.create({
          header: "Error",
          message: "Requested quantity exceeds amount available for product. Please enter a valid amount.",
          buttons: ['OK']
        });
        await alert.present();
      }
      else {
        var idx = this.itemList.findIndex(x => x.id == this.currentItem.id)
        this.itemList[idx].itemQuantity = Number(this.itemList[idx].itemQuantity) - Number(this.quantity);
        var d = new Date()

        const temp: purchasedItem = {
          id: this.i,
          itemName: this.itemList[idx].itemName,
          itemQuantity: Number(this.quantity),
          datePurchased: d.toLocaleDateString() + " " + d.toLocaleTimeString(),
          totalCost: Number(this.total)
        }

        this.service.addToHistory(temp);
        const alert = await this.alertController.create({
          header: 'Success',
          message: this.name + ' successfully purchased!',
          buttons: ['OK']
        });

        await alert.present();
        this.i++;
      }
      this.total = "0"
      this.quantity = "0"
    }
  }
}
