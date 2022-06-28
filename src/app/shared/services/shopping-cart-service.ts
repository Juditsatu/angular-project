import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import { Product } from './../../pages/products/interface/product.interface';
@Injectable(
    { providedIn: 'root' }
)
export class ShoppingCartService {
    products: Product[] = [];

    private cartSubject = new BehaviorSubject<Product[]>([]);
    private totalSubject = new BehaviorSubject<number>(0);
    private quantitySubject = new BehaviorSubject<number>(0);

    get totalAction$(): Observable<number>{
        return this.totalSubject.asObservable();
    }
    get quantityAction$(): Observable<number>{
        return this.quantitySubject.asObservable();
    }
    get cartAction$(): Observable<Product[]>{
        return this.cartSubject.asObservable();
    }

    updateCart(product: Product): void {
        this.addtoCart(product);
        this.quantityProducts();
        this.calcTotal();
    }

    private addtoCart(product: Product): void {
        const isProductInCart = this.products.find(({id}) => id === product.id)

        if (isProductInCart){
            isProductInCart.qty += 1;
        } else {
            this.products.push({...product, qty: 1})
        }
        
        this.cartSubject.next(this.products);
    }

    private quantityProducts(): void {
        const quantity = this.products.reduce((acc, prod) => acc += prod.qty, 0);
        this.quantitySubject.next(quantity);
    }

    private calcTotal(): void {
        const total = this.products.reduce( (acc, prod) => acc += ( prod.price * prod.qty), 0);
        this.totalSubject.next(total);
    }
}