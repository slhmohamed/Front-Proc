import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Couverture } from 'src/app/models/couverture';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-couverture',
  templateUrl: './couverture.component.html',
  styleUrls: ['./couverture.component.css']
})
export class CouvertureComponent implements OnInit {

  displayedColumns: string[] = ['id', 'valeur','action'];
  couvertures:Couverture[]=[];
  couverture:any={};
    dataSource: MatTableDataSource<Couverture>;
    couvertureDetail:FormGroup;
    editForm:FormGroup;
    private deleteId:number;
    closeResult : string ;
    couv:Couverture;
   
  
    @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;
    @ViewChild(MatSort,{static:true}) sort: MatSort;
    httpClient: any;
  
    constructor(private userService: UserService, private tokenStorageService: TokenStorageService,
      private fb:FormBuilder, httpClient:HttpClient,private modalService:NgbModal) { 
        userService.getAllCouverture().subscribe((couvertures) =>{
            for(const couv of couvertures){
              const newCouv= new Couverture();
              this.couvertures.push(newCouv);
            }
  
            console.log(this.couvertures);
            this.dataSource = new MatTableDataSource<Couverture>(this.couvertures);
            this.dataSource.paginator=this.paginator;
              this.dataSource.sort=this.sort; 
        });
  
    }
  
    ngOnInit(): void {
      this.getAllCouverture();
      this.couvertureDetail= this.fb.group({
        id :[''],
       
        valeur: ['']
       } );
  
       this.editForm = this.fb.group({
        id :[''],
        valeur: ['']
        
         
       } );
    }
  
    getAllCouverture(){
      this.userService.getAllCouverture()
      .subscribe({
        next:(res)=>{
          this.couvertures=res;
        
           this.dataSource=new MatTableDataSource(res);
           
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
  
     /* ajouter couverture*/
  
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
  
    addCouverture() {
     
      if(this.couvertureDetail.valid){
        this.userService.addCouv(this.couvertureDetail.value)
        .subscribe((result) => {
          this.ngOnInit(); //reload the table
        });
      this.modalService.dismissAll(); //dismiss the modal
      }
      
    }
  
     /* update prdSp */
  
     openEdit(targetModal, couv: Couverture) {
      this.couv= couv;
      this.modalService.open(targetModal, {
       
       size: 'lg'
      });
      this.editForm.patchValue( {
        id: couv.id, 
        valeur: couv.valeur
        
      });
    
    }
   
    
  
  
    onSaveCouverture() {
    
      this.userService.updateCouv(this.editForm.value,this.editForm.value.id)
      .subscribe({
        next:(res)=>{
          //alert("Profil modifié avec succée!")
          this.ngOnInit();
          this.modalService.dismissAll();
        }, error:(err)=>{
          alert("erreur lors de la modif!")
          
        
        }
      })
    }
  
    /* delete couv */
  
    openDelete(targetModal, couv: Couverture) {
      this.deleteId = couv.id;
     this.modalService.open(targetModal, {
       backdrop: 'static',
       size: 'lg'
     });
    }
  
    onDeleteCouverture() {
     
      
      this.userService.deleteCouv(this.deleteId)
        .subscribe((results) => {
          this.ngOnInit();
          this.modalService.dismissAll();
        });
     }
  
    


}
