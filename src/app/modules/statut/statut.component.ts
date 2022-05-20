import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Statut } from 'src/app/models/statut';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { UserService } from 'src/app/_services/user.service';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-statut',
  templateUrl: './statut.component.html',
  styleUrls: ['./statut.component.css']
})
export class StatutComponent implements OnInit {
displayedColumns: string[] = ['id', 'valeur','action'];
statuts:Statut[]=[];
statut:any={};
dataSource: MatTableDataSource<Statut>;
  statutDetail:FormGroup;
  editForm:FormGroup;
  private deleteId:number;
  closeResult : string ;
  statu:Statut;
 

  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;
  @ViewChild(MatSort,{static:true}) sort: MatSort;
  httpClient: any;

  constructor(private userService: UserService, private tokenStorageService: TokenStorageService,
    private fb:FormBuilder, httpClient:HttpClient,private modalService:NgbModal) { 
      userService.getAllStatuts().subscribe((statuts) =>{
          for(const statut of statuts){
            const newStatut = new Statut();
            this.statuts.push(newStatut);
          }

          console.log(this.statuts);
          this.dataSource = new MatTableDataSource<Statut>(this.statuts);
          this.dataSource.paginator=this.paginator;
            this.dataSource.sort=this.sort; 
      });

  }

  ngOnInit(): void {
    this.getAllStatuts();
    this.statutDetail= this.fb.group({
      id :[''],
      valeur: ['']
     } );

     this.editForm = this.fb.group({
      id :[''],
       valeur: ['']
      
       
     } );

  }

  getAllStatuts(){
    this.userService.getAllStatuts()
    .subscribe({
      next:(res)=>{
        this.statuts=res;
        //console.log(res);
        //console.log(this.users);
         this.dataSource=new MatTableDataSource(res);
         // this.dataSource = res;
            this.dataSource.paginator = this.paginator;
       
      }, error:(err)=>{
        alert("error while fetching records");
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /* ajouter statut */

  open(content) {
    this.modalService.open(content,  {size: 'lg',
      ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  addStatut() {
   
    if(this.statutDetail.valid){
      this.userService.addStatut(this.statutDetail.value)
      .subscribe((result) => {
        this.ngOnInit(); //reload the table
      });
    this.modalService.dismissAll(); //dismiss the modal
    }
    
  }


  /* update statut */

  openEdit(targetModal, statu: Statut) {
    this.statu = statu;
    this.modalService.open(targetModal, {
     
     size: 'lg'
    });
    this.editForm.patchValue( {
      id: statu.id, 
      valeur: statu.valeur
      
    });
  
  }
 
  


  onSaveStatus() {
  
    this.userService.updateStatu(this.editForm.value,this.editForm.value.id)
    .subscribe({
      next:(res)=>{
        //alert("Statut modifié avec succée!")
        this.ngOnInit();
        this.modalService.dismissAll();
      }, error:(err)=>{
        alert("erreur lors de la modif!")
        
      
      }
    })
  }

  /* delete statut */

  openDelete(targetModal, status: Statut) {
    this.deleteId = status.id;
   this.modalService.open(targetModal, {
     backdrop: 'static',
     size: 'lg'
   });
  }

  onDeleteStatut() {
   
    //this.httpClient.delete(deleteURL)
    this;this.userService.deleteStatu(this.deleteId)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
      });
   }

  




 
  

}
