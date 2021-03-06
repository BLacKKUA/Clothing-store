import { Component, OnInit } from '@angular/core';
import { AngularFireStorageReference, AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css']
})
export class AdminProductComponent implements OnInit {
  // products: Array<IProducts>;
  arrAdminProducts = [];
  prodName: string;
  productImage: string;
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadState: Observable<string>;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;
  urlImage: string;
  description: any;
  price: any;
  firestore: any;
  product: any;

  constructor(
    private productsService: ProductsService,
    private prStorage: AngularFireStorage
  ) {
    this.getAdminProducts();
  }

  ngOnInit() {
  }

  // public getProducts(): void {
  //   this.firestore.collection('products').snapshotChanges().subscribe(
  //     arrayProducts => {
  //       this.product = arrayProducts.map(product => {
  //         return {
  //           id: product.payload.doc.id,
  //           ...product.payload.doc.data()
  //         } as IProducts;
  //       });
  //     }
  //   );
  // }

  private getAdminProducts(): void {
    this.arrAdminProducts = this.productsService.getProducts();
  }
  public addProd(): void {
    const newProd = {
      id: 3,
      category: 't-shirt',
      name: this.prodName,
      description: this.description,
      price: this.price
    };
    this.productsService.addProducts(newProd);
    this.prodName = '';
    this.description = '';
    this.price = '';
  }
  public upload(event): void {
    const id = Math.random().toString(36).substring(2);
    this.ref = this.prStorage.ref(`images/${id}`);
    this.task = this.ref.put(event.target.files[0]);
    this.uploadState = this.task.snapshotChanges().pipe(map(s => s.state));
    this.uploadProgress = this.task.percentageChanges();
    this.task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = this.ref.getDownloadURL();
        this.downloadURL.subscribe(url => this.productImage = url);
      })
    ).subscribe();
  }
}
