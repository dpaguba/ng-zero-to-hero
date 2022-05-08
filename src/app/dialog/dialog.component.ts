import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  brands = ["American Seafood", "Pacific Seafood", "Trident Seafoods", "Bumble Bee Foods", "Other"]

  productForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private api: ApiService, private dialog: MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      brands: ['', Validators.required],
      price: ['', Validators.required],
      amount: ['', Validators.required],
      date: ['', Validators.required],
      comment: ['', Validators.nullValidator]
    })
  }

  addProduct(){
    if(this.productForm.valid){
      this.api.postProduct(this.productForm.value)
      .subscribe({
        next: (res)=>{
          alert("Product added successfully")
          this.productForm.reset()
          this.dialog.close()
          
        },
        error: ()=>{
          alert("Error while adding the product")
          this.dialog.close()
        }
      })
    }
  }

}
