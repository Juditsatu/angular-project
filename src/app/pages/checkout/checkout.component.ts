import { tap } from 'rxjs/operators';
import { DataService } from './../products/services/data.service';
import { Component, OnInit } from '@angular/core';
import { Store } from 'src/app/shared/interface/store.interface';

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

  stores: Store[] = []
  constructor(private dataSvc: DataService) { }

  ngOnInit(): void {
    this.getStores();
  }

  onPickupOrDelivery(value: boolean): void {
    this.isDelivery = value;
  }

  onSubmit(value:any): void {
    console.log("Guardar", value)
  }

  private getStores(): void {
    this.dataSvc.getStores()
      .pipe(
        tap((stores: Store[]) => this.stores = stores))
      .subscribe()
  }
}
