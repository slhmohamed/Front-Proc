import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PrdSp } from 'src/app/models/prdSp';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-prd-sp',
  templateUrl: './prd-sp.component.html',
  styleUrls: ['./prd-sp.component.css']
})
export class PrdSpComponent implements OnInit {

  displayedColumns: string[] = ['id', 'valeur','action'];
  prdSps:PrdSp[]=[];
  prdSp:any={};
    dataSource: MatTableDataSource<PrdSp>;
    prdSpDetail:FormGroup;
    editForm:FormGroup;
    private deleteId:number;
    closeResult : string ;
    prd:PrdSp;
   
  
    @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;
    @ViewChild(MatSort,{static:true}) sort: MatSort;
    httpClient: any;
  
    constructor(private userService: UserService, private tokenStorageService: TokenStorageService,
      private fb:FormBuilder, httpClient:HttpClient,private modalService:NgbModal) { 
        userService.getAllPrdSp().subscribe((prdSps) =>{
            for(const prd of prdSps){
              const newPrd= new PrdSp();
              this.prdSps.push(newPrd);
            }
  
            console.log(this.prdSps);
            this.dataSource = new MatTableDataSource<PrdSp>(this.prdSps);
            this.dataSource.paginator=this.paginator;
              this.dataSource.sort=this.sort; 
        });
  
    }
  
    ngOnInit(): void {
      this.getAllPrdSp();
      this.prdSpDetail= this.fb.group({
        id :[''],
        valeur: ['']
       } );
  
       this.editForm = this.fb.group({
        id :[''],
         valeur: ['']
        
         
       } );
    }
  
    getAllPrdSp(){
      this.userService.getAllPrdSp()
      .subscribe({
        next:(res)=>{
          this.prdSps=res;
        
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
  
     /* ajouter prdSp*/
  
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
  
    addPrdSp() {
     
      if(this.prdSpDetail.valid){
        this.userService.addPrd(this.prdSpDetail.value)
        .subscribe((result) => {
          this.ngOnInit(); //reload the table
        });
      this.modalService.dismissAll(); //dismiss the modal
      }
      
    }
  
     /* update prdSp */
  
     openEdit(targetModal, prdSp: PrdSp) {
      this.prdSp= prdSp;
      this.modalService.open(targetModal, {
       
       size: 'lg'
      });
      this.editForm.patchValue( {
        id: prdSp.id, 
        valeur: prdSp.valeur
        
      });
    
    }
   
    
  
  
    onSavePrdSp() {
    
      this.userService.updatePrd(this.editForm.value,this.editForm.value.id)
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
  
    /* delete prdSP*/
  
    openDelete(targetModal, prdSp: PrdSp) {
      this.deleteId = prdSp.id;
     this.modalService.open(targetModal, {
       backdrop: 'static',
       size: 'lg'
     });
    }
  
    onDeletePrdSp() {
     
      
      this.userService.deletePrd(this.deleteId)
        .subscribe((results) => {
          this.ngOnInit();
          this.modalService.dismissAll();
        });
     }
  
    

}
