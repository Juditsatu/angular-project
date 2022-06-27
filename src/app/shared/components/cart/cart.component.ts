import { ShoppingCartService } from './../../services/shopping-cart-service';
import { Component } from "@angular/core";

@Component({
    selector:'app-cart',
    template:`
    <ng-container *ngIf="{ total: total$ | async, quantity: quantity$ | async } as dataCart">
        <mat-icon>shopping_basket</mat-icon>
        <ng-container *ngIf="dataCart.total">
            {{ dataCart.total | currency }}
            ({{dataCart.quantity}})
        </ng-container>
    </ng-container>`
})

export class CartComponent {
    quantity$ = this.shoppingCartSvc.quantityAction$;
    total$ = this.shoppingCartSvc.totalAction$;
    cart$ = this.shoppingCartSvc.cartAction$;

    constructor(private shoppingCartSvc: ShoppingCartService) {}
}