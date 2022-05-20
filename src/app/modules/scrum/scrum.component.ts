import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Scrum } from 'src/app/models/scrum';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-scrum',
  templateUrl: './scrum.component.html',
  styleUrls: ['./scrum.component.css']
})
export class ScrumComponent implements OnInit {
  displayedColumns: string[] = ['id', 'valeur','action'];
  scrums:Scrum[]=[];
  scrum:any={};
    dataSource: MatTableDataSource<Scrum>;
    scrumDetail:FormGroup;
    editForm:FormGroup;
    private deleteId:number;
    closeResult : string ;
    scru:Scrum;
   
  
    @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;
    @ViewChild(MatSort,{static:true}) sort: MatSort;
    httpClient: any;
  
    constructor(private userService: UserService, private tokenStorageService: TokenStorageService,
      private fb:FormBuilder, httpClient:HttpClient,private modalService:NgbModal) { 
        userService.getAllScrums().subscribe((scrums) =>{
            for(const scrum of scrums){
              const newScrum = new Scrum();
              this.scrums.push(newScrum);
            }
  
            console.log(this.scrums);
            this.dataSource = new MatTableDataSource<Scrum>(this.scrums);
            this.dataSource.paginator=this.paginator;
              this.dataSource.sort=this.sort; 
        });
  
    }
  
    ngOnInit(): void {
      this.getAllScrums();
      this.scrumDetail= this.fb.group({
        id :[''],
        valeur: ['']
       } );
  
       this.editForm = this.fb.group({
        id :[''],
         valeur: ['']
        
         
       } );
    }
  
    getAllScrums(){
      this.userService.getAllScrums()
      .subscribe({
        next:(res)=>{
          this.scrums=res;
        
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
  
     /* ajouter profil*/
  
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
  
    addScrum() {
     
      if(this.scrumDetail.valid){
        this.userService.addScru(this.scrumDetail.value)
        .subscribe((result) => {
          this.ngOnInit(); //reload the table
        });
      this.modalService.dismissAll(); //dismiss the modal
      }
      
    }
  
     /* update profil */
  
     openEdit(targetModal, scru: Scrum) {
      this.scru = scru;
      this.modalService.open(targetModal, {
       
       size: 'lg'
      });
      this.editForm.patchValue( {
        id: scru.id, 
        valeur: scru.valeur
        
      });
    
    }
   
    
  
  
    onSaveScrum() {
    
      this.userService.updateScru(this.editForm.value,this.editForm.value.id)
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
  
    /* delete profil */
  
    openDelete(targetModal, scrum: Scrum) {
      this.deleteId = scrum.id;
     this.modalService.open(targetModal, {
       backdrop: 'static',
       size: 'lg'
     });
    }
  
    onDeleteScrum() {
     
      
      this.userService.deleteScru(this.deleteId)
        .subscribe((results) => {
          this.ngOnInit();
          this.modalService.dismissAll();
        });
     }
  

}
