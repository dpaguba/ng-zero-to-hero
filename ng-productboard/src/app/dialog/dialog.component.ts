import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  brands = ["American Seafood", "Pacific Seafood", "Trident Seafoods", "Bumble Bee Foods", "Other"]

  productForm!: FormGroup
  actionBtn: string = "Save"

  constructor(private formBuilder: FormBuilder, private api: ApiService, 
    private dialog: MatDialogRef<DialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public editData: any) { }

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

    if(this.editData){
      this.actionBtn = "Update"
      this.productForm.controls["productName"].setValue(this.editData.productName)
      this.productForm.controls["category"].setValue(this.editData.category)
      this.productForm.controls["brands"].setValue(this.editData.brands)
      this.productForm.controls["price"].setValue(this.editData.price)
      this.productForm.controls["amount"].setValue(this.editData.amount)
      this.productForm.controls["date"].setValue(this.editData.date)
      this.productForm.controls["comment"].setValue(this.editData.comment)
    }
  }

  addProduct(){
    if (!this.editData){
      if(this.productForm.valid){
        this.api.postProduct(this.productForm.value)
        .subscribe({
          next: (res)=>{
            alert("Product added successfully")
            this.productForm.reset()
            this.dialog.close("save")
          },
          error: ()=>{
            alert("Error while adding the product")
            this.dialog.close()
          }
        })
      }
    }else{
      this.updateProduct()
    }
    // window.location.reload()
  }

  updateProduct(){
    this.api.putProduct(this.productForm.value, this.editData.id)
    .subscribe({
      next: (res)=>{
        alert("Product updated successfully")
        this.productForm.reset()
        this.dialog.close("update")
      },
      error: ()=>{
        alert("Error while updating the record!")
      }
    })
    // window.location.reload()
  }

  


}
