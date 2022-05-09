import {Component, Inject, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ApiService } from './services/api.service';
import { MatSort, Sort } from '@angular/material/sort';
import {LiveAnnouncer} from '@angular/cdk/a11y';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Seafood'
  count?:number

  displayedColumns: string[] = ['date', 'productName', 'category', 'brands', 'price', 'amount', 'comment', 'action'];
  dataSource !: MatTableDataSource<any>

  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort
  
  constructor(private dialog: MatDialog, private api: ApiService, private _liveAnnouncer: LiveAnnouncer){

  }
  ngOnInit(): void {
    this.getAllProducts()
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: "30%"
    }).afterClosed().subscribe(val=>{
      if(val === "save"){
        this.getAllProducts()
      }
    })
    
  }

  getAllProducts(){
    this.api.getProduct()
    .subscribe({
      next: (res)=>{
        this.dataSource = new MatTableDataSource(res)
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort
      },
      error: (err)=>{
        alert("Error while fetching the goods!")
      }
    })
    
  }

  editProduct(row: any){
    this.dialog.open(DialogComponent, {
      width: "30%",
      data: row
    }).afterClosed().subscribe(val=>{
      if(val === "update"){
        this.getAllProducts()
      }
    })
  }

  deleteProduct(id: number){
    this.api.deleteProduct(id)
    .subscribe({
      next: (res)=>{
        alert("Product deleted successfully")
        this.getAllProducts()
        window.location.reload()
      },
      error: ()=>{
        alert("Error while deleting the records!")
      }
    })
    window.location.reload()
  }

  

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase()

    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage()
    }
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

}

