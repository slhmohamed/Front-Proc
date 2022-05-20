import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Priorite } from 'src/app/models/priorite';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-priorite',
  templateUrl: './priorite.component.html',
  styleUrls: ['./priorite.component.css']
})
export class PrioriteComponent implements OnInit {

  displayedColumns: string[] = ['id', 'valeur','action'];
  priorites:Priorite[]=[];
  priorite:any={};
    dataSource: MatTableDataSource<Priorite>;
    prioriteDetail:FormGroup;
    editForm:FormGroup;
    private deleteId:number;
    closeResult : string ;
    prio:Priorite;
   
  
    @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;
    @ViewChild(MatSort,{static:true}) sort: MatSort;
    httpClient: any;
  
    constructor(private userService: UserService, private tokenStorageService: TokenStorageService,
      private fb:FormBuilder, httpClient:HttpClient,private modalService:NgbModal) { 
        userService.getAllPriorites().subscribe((priorites) =>{
            for(const priorite of priorites){
              const newPriorite= new Priorite();
              this.priorites.push(newPriorite);
            }
  
            console.log(this.priorites);
            this.dataSource = new MatTableDataSource<Priorite>(this.priorites);
            this.dataSource.paginator=this.paginator;
              this.dataSource.sort=this.sort; 
        });
  
    }
  
    ngOnInit(): void {
      this.getAllPriorites();
      this.prioriteDetail= this.fb.group({
        id :[''],
        valeur: ['']
       } );
  
       this.editForm = this.fb.group({
        id :[''],
         valeur: ['']
        
         
       } );
    }
  
    getAllPriorites(){
      this.userService.getAllPriorites()
      .subscribe({
        next:(res)=>{
          this.priorites=res;
        
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
  
     /* ajouter priorite*/
  
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
  
    addPriorite() {
     
      if(this.prioriteDetail.valid){
        this.userService.addPri(this.prioriteDetail.value)
        .subscribe((result) => {
          this.ngOnInit(); //reload the table
        });
      this.modalService.dismissAll(); //dismiss the modal
      }
      
    }
  
     /* update priorite */
  
     openEdit(targetModal, prio: Priorite) {
      this.prio= prio;
      this.modalService.open(targetModal, {
       
       size: 'lg'
      });
      this.editForm.patchValue( {
        id: prio.id, 
        valeur: prio.valeur
        
      });
    
    }
   
    
  
  
    onSavePriorite() {
    
      this.userService.updatePri(this.editForm.value,this.editForm.value.id)
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
  
    /* delete priorite*/
  
    openDelete(targetModal, priorite: Priorite) {
      this.deleteId = priorite.id;
     this.modalService.open(targetModal, {
       backdrop: 'static',
       size: 'lg'
     });
    }
  
    onDeletePriorite() {
     
      
      this.userService.deletePri(this.deleteId)
        .subscribe((results) => {
          this.ngOnInit();
          this.modalService.dismissAll();
        });
     }
  
    

}
