import { Injectable } from '@angular/core';
//import { HttpClient } from 'selenium-webdriver/http';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';
import { shareReplay, flatMap, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})


export class ProductService {

  constructor(private http: HttpClient) { }

  private baseUrl: string = "http://localhost:62900/api/product/getproducts";

  private productUrl: string ="http://localhost:62900/api/product/addproducts";

  private deleteUrl: string = "http://localhost:62900/api/product/deleteproduct/";

  private updateUrl: string = "http://localhost:62900/api/product/updateproduct/";

  private product$: Observable<Product[]>;

  getProducts(): Observable<Product[]>
  {
     if(!this.product$)
     {
       this.product$ = this.http.get<Product[]>(this.baseUrl).pipe(shareReplay());
     }

     return this.product$;
  }

  getProductsById(id: number): Observable<Product>
  {
    
     return this.getProducts().pipe(flatMap(result => result), first(product => product.productId == id));
  }

  insertProduct(newProduct: Product) : Observable<Product>
  {
      return this.http.post<Product>(this.productUrl, newProduct);
  }

  updateProduct(id: number, editProduct: Product) : Observable<Product>
  {
      return this.http.put<Product>(this.updateUrl + id, editProduct);
  }

  //Delete Product

  deleteProduct(id: number) : Observable<any>
  {
     return this.http.delete(this.deleteUrl + id);
  }

  //Clear cache
  clearCache()
  {
    this.product$ = null;
  }

}
