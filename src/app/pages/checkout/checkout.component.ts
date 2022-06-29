import { Product } from './../products/interface/product.interface';
import { Details } from './../../shared/interface/order.interface';
import { switchMap, tap } from 'rxjs/operators';
import { DataService } from './../products/services/data.service';
import { Component, OnInit } from '@angular/core';
import { Store } from 'src/app/shared/interface/store.interface';
import { NgForm } from '@angular/forms';
import { Order } from 'src/app/shared/interface/order.interface';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart-service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  model = {
    name: "",
    store: "",
    shippingAddress: "",
    city: ""
  }
  isDelivery = false;
  cart: Product[] = [];
  stores: Store[] = []
  constructor(private dataSvc: DataService, private shoppingCartSvc: ShoppingCartService) { }

  ngOnInit(): void {
    this.getStores();
    this.getDataCart();
  }

  onPickupOrDelivery(value: boolean): void {
    this.isDelivery = value;
  }

  onSubmit({ value: formData }: NgForm): void {
    console.log("Guardar", formData);
    const data: Order = {
      ...formData,
      date: this.getCurrentDay(),
      pickup: this.isDelivery
    }
    this.dataSvc.saveOrder(data)
    .pipe(
      tap( res => console.log('Order ->', res)),
      switchMap( (order) => {
        const details = this.prepareDetails();
        return this.dataSvc.saveDetailsOrder(details);
      }),
      tap( res => console.log('Finish ->', res)),
    )
    .subscribe()
  }

  private getStores(): void {
    this.dataSvc.getStores()
      .pipe(
        tap((stores: Store[]) => this.stores = stores))
      .subscribe()
  }

  private getCurrentDay(): string {
    return new Date().toLocaleDateString();
  }

  private prepareDetails(): Details[]{
    const details : Details[] = [];
    this.cart.forEach( res => {
      console.log(res);
    })
    return details;
  }

  private getDataCart(): void {
    this.shoppingCartSvc.cartAction$
    .pipe(
      tap((products: Product[]) => this.cart = products)
    )
    .subscribe()

  }
}
