import { Component, Input, OnInit,ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/_services/user.service';
import { ColDef, GridApi, GridOptions, GridReadyEvent, SideBarDef } from 'ag-grid-community';
import "ag-grid-enterprise";
import { Scrum } from 'src/app/models/scrum';
import { Statut } from 'src/app/models/statut';
import { ProfilProc } from 'src/app/models/profilProc';
import { Priorite } from 'src/app/models/priorite';
import { Couverture } from 'src/app/models/couverture';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Produit } from 'src/app/models/Produit';
import { Procedure } from 'src/app/models/procedure';
import { PrdSp } from 'src/app/models/prdSp';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { MATERIAL_SANITY_CHECKS_FACTORY } from '@angular/material/core/common-behaviors/common-module';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  colors = ['Red', 'Green', 'Blue'];
 // couv=['OUI','NON'];
  slectedProcDeleted:any=[];
  closeResult:String;
  scrum:string[]=[];
  statuts:string[]=[];
  profilProcs:string[]=[];
  priorites:string[]=[];
  sprints:string[]=[];
  couvertures:string[]=[];
  products:Produit[]=[];
  prdSps:string[]=[];
  private roles: string[] = [];
  proc:any;
  prod: Produit[]=[];
  procs: Procedure[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showCollaborateurBoard:boolean = false;
  username?: string;
  private deleteId:number;
  private gridApi!: GridApi;
  procedureDetail:FormGroup;
  @Input()data: Procedure[];
  @Input()id:number;

  



  columnDefs: ColDef[] = [
    {headerName:'CheckBox',field: '',headerCheckboxSelection:true,headerCheckboxSelectionFilteredOnly: true,
                  checkboxSelection: true,editable:false,width:54,maxWidth: 82,minWidth:54},
		{headerName:'Nom',field:"name" ,width: 210},
    {headerName:"profilProc",field: 'profilProc.valeur',width: 140,
    cellEditor: 'agRichSelectCellEditor',
    cellEditorParams: {
      values: this.profilProcs,
    },},
    {headerName:"Traitement",field: 'traitement',width: 130},
    {headerName:"PrdSp",field: 'prdSp.valeur',width: 130,  cellEditor: 'agSelectCellEditor',
    cellEditorParams: {
      values: this.prdSps,
    },},
    {headerName:'Priorité',field: 'prio.valeur',width: 130,
    cellEditor: 'agSelectCellEditor',
    cellEditorParams: {
      values: this.priorites,
    },},
    {headerName:'Scrum',field: 'scrum.valeur',width: 130,
    cellEditor: 'agRichSelectCellEditor',
    cellEditorParams: {
      values: this.scrum,
    },},
    {headerName:'Sprint',field: 'sprint',width: 130},
    {headerName:'JiraDev',field: 'jiraDev',width: 130},
    {headerName:'QuiDev',field: 'quiDev',width: 130},
    {headerName:'JiraQa',field: 'jiraQa',width: 130},
    {headerName:'QuiQa',field: 'quiQa',width: 130},
    {headerName:'statutDev',field: 'statutDev.valeur',width: 130,
    cellEditor: 'agSelectCellEditor',
    cellEditorParams: {
      values: this.statuts,
    },},
    {headerName:'statutQa',field: 'statutQa.valeur',width: 130,
    cellEditor: 'agSelectCellEditor',
    cellEditorParams: {
      values: this.statuts,
    },},
    {headerName:"traduction",field: 'statutTrad.valeur',width: 130,
    cellEditor: 'agSelectCellEditor',
    cellEditorParams: {
      values: this.statuts,
    },},
    {headerName:'Couverture',field: 'couverture.valeur',width: 130,
    cellEditor: 'agSelectCellEditor',
    cellEditorParams: {
      values: this.couvertures,
    },
    },
    {headerName:'DateMAJ',field: 'dateMAJ',width: 130},
    {headerName:'CommentaireMig',field: 'commentaireMig',width: 130,
    cellEditorPopup: true,
    cellEditor: 'agLargeTextCellEditor'},
    {headerName:'PrioritéJas',field: 'prioJas.valeur',width: 130,
    cellEditor: 'agSelectCellEditor',
    cellEditorParams: {
      values: this.priorites,
    },},
    {headerName:'JiraJas',field: 'jiraJas',width: 130},
    {headerName:'StatutJasper',field: 'statutJasper.valeur',width: 130,
    cellEditor: 'agSelectCellEditor',
    cellEditorParams: {
      values: this.statuts,
    },},
    {headerName:'CommentaireJas',field: 'commentaireJas',width: 130,
    cellEditorPopup: true,
    cellEditor: 'agLargeTextCellEditor'},
	];

 
    
 public defaultColDef: ColDef = {
   initialWidth: 100,
   sortable: true,
   resizable: true,
   editable:true,
   filter: 'agSetColumnFilter'
  };
  public rowSelection='multiple';
  public paginationPageSize = 10;
  row: Procedure;
  clss: string;
  msg: string;
  procSlected:any=[];
  
  constructor(private httpClient:HttpClient, private userService:UserService,private modalService:NgbModal,private fb:FormBuilder,
    private tokenStorageService: TokenStorageService){

  }
  ngOnInit(): void {
    //this.getAllProcs();
    this.getAllScrum();
    this.getAllStatus();
    this.getAllProfilProc();
    this.getAllPrio();
    this.getAllCouv();
    this.getAllPrdSp();
    this.getAllProducts();
    this.procedureDetail= this.fb.group({
      id:[''],
      name: [''],
      profilProc:[''],
      traitement:[''],
      prio:[''],
      scrum:[''],
      sprint:[''],
      prdSp:[''],
      couverture:[''],
      commentaireMig:[''],
      jiraDev:[''],
      quiDev:[''],
      statutDev:[''],
      jiraQa:[''],
      quiQa:[''],
      statutQa:[''],
      statutTrad:[''],
      jiraJas:[''],
      prioJas:[''],
      statutJasper:[''],
      commentaireJas:[''],
      dateMAJ:['']
     } );
     this.isLoggedIn = !!this.tokenStorageService.getToken();

     if (this.isLoggedIn) {
       const user = this.tokenStorageService.getUser();
       this.roles = user.roles
 
       this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
       this.showCollaborateurBoard = this.roles.includes('ROLE_COLLABORATEUR');
 
       //this.username = user.username;
       if(this.roles[0]=='ROLE_ADMIN'){
         this.username='Admin: '+user.username;
         
       }else{
         this.username='User: '+user.username;
       }
       
     }
  
  }

  /*addProcedureById(theId:number){
    console.log(this.procedureDetail);
      this.userService.addProcedureById(this.procedureDetail.value)
      .subscribe(() => {
        this.ngOnInit(); //reload the table
        console.log(this.procedureDetail);
      });
    this.modalService.dismissAll(); //dismiss the modal
    
  }

  addProcedure(){
    console.log(this.procedureDetail);
      this.userService.addProcedureById(this.procedureDetail.value)
      .subscribe(() => {
        this.ngOnInit(); //reload the table
        console.log(this.procedureDetail);
      });
    this.modalService.dismissAll(); //dismiss the modal
    
  }*/


  addProcedure(){
    this.userService.createProcedureForProduct(this.procedureDetail.value,this.id)
    .subscribe(() => {
        this.userService.getAllProcsById(this.id)
        .subscribe({
          next:(res)=>{
            this.data=res;
            this.procedureDetail.reset();
          },
          error:()=>{
            alert("erreur ");
          }
       });
    });
  this.modalService.dismissAll(); //dismiss the modal
  }

  onFilterTextBoxChanged() {
    this.gridApi.setQuickFilter(
      (document.getElementById('filter-text-box') as HTMLInputElement).value
    );
  }
 
  onRowDataChange(event){
    this.row=event.data;
    this.userService.updateProcedure(this.row,this.row.id)
    .subscribe(
      {
        next:()=>{
          this.modalService.dismissAll();
          console.log(this.row);
          alert("modification enregistrée!");
        }, error:(err)=>{
          alert("erreur lors de la modif!");
        }
      }
    )
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }
  getAllScrum(){
    let scrums: Scrum[];
     this.userService.getAllScrums()
       .subscribe({
         next:(res)=>{
           scrums=res; 
           for(const s of scrums)
           {
             this.scrum.push(s.valeur);
           }
         }
   })
 }
 
 getAllStatus(){
   let statut: Statut[];
    this.userService.getAllStatuts()
      .subscribe({
        next:(res)=>{
          statut=res; 
          for(const i of statut)
          {
            this.statuts.push(i.valeur);
          }
        }
  })
 }

 getAllProducts(){
  this.userService.getAllProducts()
  .subscribe({
    next:(res)=>{
      this.products=res;
      //console.log(res);
      //console.log(this.users);
       // this.dataSource = res;
    }, error:(err)=>{
      alert("error while fetching records");
    }
  })
}
 
 getAllProfilProc(){
   let profil: ProfilProc[];
    this.userService.getAllProfils()
      .subscribe({
        next:(res)=>{
          profil=res; 
          for(const i of profil)
          {
            this.profilProcs.push(i.valeur);
          }
        }
  })
 }
 
 getAllPrio(){
   let prio: Priorite[];
    this.userService.getAllPriorites()
      .subscribe({
        next:(res)=>{
          prio=res; 
          for(const i of prio)
          {
            this.priorites.push(i.valeur);
          }
        }
  })
 }
 getAllPrdSp(){
  let prd: PrdSp[];
   this.userService.getAllPrdSp()
     .subscribe({
       next:(res)=>{
         prd=res; 
         for(const i of prd)
         {
           this.prdSps.push(i.valeur);
         }
       }
 })
}

 getAllCouv(){
  let couv: Couverture[];
   this.userService.getAllCouverture()
     .subscribe({
       next:(res)=>{
         couv=res;
         for(const i of couv)
         {
           this.couvertures.push(i.valeur);
         }
       }
 })
}

 /* affecter à */
 open(content) {
  this.modalService.open(content,  {size: 'lg',
    ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}
open1(content) {
  this.modalService.open(content,  {size: 'xl',
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

openDelete(targetModal, rowSelection:any) {
 
 this.modalService.open(targetModal, {
   backdrop: 'static',
   size: 'lg'
 });
 console.log(rowSelection);
}

onRowSelected(event){
  let x:any;
  x=event.data;
  this.proc=x;
  console.log(this.proc);
  
  let prodct={
    "commentaireJas":  this.proc.commentaireJas,
"commentaireMig": this.proc.commentaireMig,
"couverture": this.proc.couverture.valeur,
"dateMAJ": this.proc.dateMAJ,
 "id":this.proc.id,
"jiraDev": this.proc.jiraDev,
"jiraJas": this.proc.jiraJas,
"jiraQa": this.proc.jiraQa,
"name": this.proc.name,
"prdSp": this.proc.prdSp.valeur,
"prio": this.proc.prio.valeur,
"prioJas": this.proc.prioJas.valeur,
"profilProc": this.proc.profilProc.valeur,
"quiDev": this.proc.quiDev,
"quiQa": this.proc.quiQa,
"scrum": this.proc.scrum.valeur,
"sprint": this.proc.sprint,
"statutDev": this.proc.statutDev.valeur,
"statutJasper": this.proc.statutJasper.valeur,
"statutQa": this.proc.statutQa.valeur,
"statutTrad": this.proc.statutTrad.valeur,
"traitement": this.proc.traitement,
  }
  console.log(prodct);
  this.slectedProcDeleted.push(this.proc.id)
this.procSlected.push(prodct);
console.log(this.procSlected);
console.log(this.slectedProcDeleted); 


}
deleteProcFromAll(){
  console.log(this.slectedProcDeleted);
 
  this.userService.deleteFromAllProducts(this.slectedProcDeleted).subscribe(res=>{
    this.slectedProcDeleted=[]
    window.location.reload()
  })
  
}
deleteProcFromProduct(){
  this.userService.deleteProcFromProduct(this.proc,this.id)
  .subscribe((results) => {
    //this.ngOnInit();
    this.userService.getAllProcsById(this.id)
        .subscribe({
          next:(res)=>{
            this.data=res;
          },
          error:()=>{
            alert("erreur ");
          }
       });
    this.modalService.dismissAll();
  });
}

selectedProduit:Produit;
getElement(prod:Produit){
  console.log("add");
  
  console.log(this.prod);
  
  this.selectedProduit=prod;
  console.log(this.selectedProduit.id);
  console.log(this.procSlected);

  
}
affecterA(){
  console.log("selected");
  
 console.log(this.procSlected);
 console.log(this.selectedProduit.id);
 
 
  this.userService.updateProductProc(this.procSlected,this.selectedProduit.id).subscribe(res=>{
  this.procSlected=[]
    
  })
  
}



}


