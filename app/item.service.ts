import { templateJitUrl } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Item } from './Item';
import { purchasedItem } from './purchasedItem';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private items: Item[] = [{
    id: '1',
    itemName: 'Pants',
    itemQuantity: 20,
    price: 50.7
  },
  {
    id: '2',
    itemName: 'Shoes',
    itemQuantity: 50,
    price: 90
  },
  {
    id: '3',
    itemName: 'Jacket',
    itemQuantity: 40,
    price: 110
  },
  {
    id: '4',
    itemName: 'Shirt',
    itemQuantity: 15,
    price: 15
  },
  {
    id: '5',
    itemName: 'Hats',
    itemQuantity: 10,
    price: 20.5
  }]
  private itemHistory: purchasedItem[] = []
  constructor() { }
  getAllItems() {
    return this.items;
  }
  getAllHistoryItems() {
    return this.itemHistory;
  }
  getItemById(id) {
    return {...this.itemHistory.find(item => {return item.id == id})};
  }
  addNewItem(name, price, quantity) {
    this.items.push({
      id: this.items.length + 1 + "",
      itemName: name,
      itemQuantity: quantity,
      price: price
    });
    return this.items;
  }
  addToHistory(purchasedItem) {
    this.itemHistory.push(purchasedItem);
  }
  updateItemQuantity(id, quantity) {
    this.items.find(item => {
      if (item.id == id) {
        item.itemQuantity = Number(parseInt(item.itemQuantity.toString()) + parseInt(quantity.toString()))
      }
    });
    return this.items;
  }
}
