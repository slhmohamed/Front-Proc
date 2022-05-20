import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProfilProc } from 'src/app/models/profilProc';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-profil-proc',
  templateUrl: './profil-proc.component.html',
  styleUrls: ['./profil-proc.component.css']
})
export class ProfilProcComponent implements OnInit {
  displayedColumns: string[] = ['id', 'valeur','action'];
profils:ProfilProc[]=[];
profil:any={};
  dataSource: MatTableDataSource<ProfilProc>;
  profilDetail:FormGroup;
  editForm:FormGroup;
  private deleteId:number;
  closeResult : string ;
  profi:ProfilProc;
 

  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;
  @ViewChild(MatSort,{static:true}) sort: MatSort;
  httpClient: any;

  constructor(private userService: UserService, private tokenStorageService: TokenStorageService,
    private fb:FormBuilder, httpClient:HttpClient,private modalService:NgbModal) { 
      userService.getAllProfils().subscribe((profils) =>{
          for(const profil of profils){
            const newProfil = new ProfilProc();
            this.profils.push(newProfil);
          }

          console.log(this.profils);
          this.dataSource = new MatTableDataSource<ProfilProc>(this.profils);
          this.dataSource.paginator=this.paginator;
            this.dataSource.sort=this.sort; 
      });

  }

  ngOnInit(): void {
    this.getAllProfils();
    this.profilDetail= this.fb.group({
      id :[''],
      valeur: ['']
     } );

     this.editForm = this.fb.group({
      id :[''],
       valeur: ['']
      
       
     } );
  }

  getAllProfils(){
    this.userService.getAllProfils()
    .subscribe({
      next:(res)=>{
        this.profils=res;
      
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

  addStatut() {
   
    if(this.profilDetail.valid){
      this.userService.addProfi(this.profilDetail.value)
      .subscribe((result) => {
        this.ngOnInit(); //reload the table
      });
    this.modalService.dismissAll(); //dismiss the modal
    }
    
  }

   /* update profil */

   openEdit(targetModal, profi: ProfilProc) {
    this.profi = profi;
    this.modalService.open(targetModal, {
     
     size: 'lg'
    });
    this.editForm.patchValue( {
      id: profi.id, 
      valeur: profi.valeur
      
    });
  
  }
 
  


  onSaveProfil() {
  
    this.userService.updateProfi(this.editForm.value,this.editForm.value.id)
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

  openDelete(targetModal, profil: ProfilProc) {
    this.deleteId = profil.id;
   this.modalService.open(targetModal, {
     backdrop: 'static',
     size: 'lg'
   });
  }

  onDeleteProfil() {
   
    
    this.userService.deleteProfi(this.deleteId)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
      });
   }

  






}
