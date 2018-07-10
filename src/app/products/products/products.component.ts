import { Component, OnInit } from "@angular/core";
import {ProductsService} from '../products.service';

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"],
  providers: [ProductsService]
})
export class ProductsComponent implements OnInit {
  page_title: string = "product list";
  products: any = [];
  filterBy: string = '';

  showHideImg: boolean = true;
  constructor(private _productsService: ProductsService) {}

  ngOnInit() {
    this._productsService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }
  toggleImage() {
    this.showHideImg = !this.showHideImg;
  }
  ratingfnparent(data:string) {
   this.page_title = data;
  }
}
