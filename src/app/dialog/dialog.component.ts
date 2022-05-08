import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  brands = ["American Seafood", "Pacific Seafood", "Trident Seafoods", "Bumble Bee Foods", "Other"]

  productForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

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
    console.log(this.productForm.value)
  }

}
