import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ItemService } from '../item.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.page.html',
  styleUrls: ['./add-item.page.scss'],
})
export class AddItemPage implements OnInit {
  name = ''
  price = ''
  quantity = ''

  constructor(private service: ItemService, public alertController: AlertController,
    private location: Location) { }

  ngOnInit() {}

  async save() {
    if (this.name == '' || this.price == '' || this.quantity == '' || Number(this.price) <= 0 || Number(this.quantity) <= 0) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Please enter a valid product name, price and quantity.',
        buttons: ['OK']
      });
      await alert.present();
    }
    else {
      let x = this.service.addNewItem(this.name, this.price, this.quantity);
      this.location.back();

      const alert = await this.alertController.create({
        header: 'Success',
        message: 'Item successfully added!',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

}
