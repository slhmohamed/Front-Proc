import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Procedure } from 'src/app/models/procedure';
import { Produit } from 'src/app/models/Produit';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { UserService } from 'src/app/_services/user.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  products : Produit[] = [];
 /* prodDetail:Produit ={
    "name":"TEST33"
  };*/
  produit:any={}
  prodDetail:FormGroup;
  errorMessage = '';
  deleteId: number;
  data:Procedure[]=[];
  id:number=1;
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  constructor( private userService:UserService,
   private formBuilder:FormBuilder, httpClient:HttpClient,private modalService:NgbModal,
   private tokenStorageService: TokenStorageService) { }
  ngOnInit(
  ){
    this.getAllProcs();
    this.getAllProducts();
    this.prodDetail=this.formBuilder.group({
      id:'',
     name:['',Validators.required]});

     this.isLoggedIn = !!this.tokenStorageService.getToken();

     if (this.isLoggedIn) {
       const user = this.tokenStorageService.getUser();
       this.roles = user.roles;
       //console.log(this.roles);
       this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
       this.showModeratorBoard = this.roles.includes('ROLE_COLLABORATEUR');
 
       //this.username = user.username;
       if(this.roles[0]=='ROLE_ADMIN'){
         this.username='Admin: '+user.username;
         
       }else{
         this.username='User: '+user.username;
       }
     }
    }
  getAllProducts(){
   this.userService.getAllProducts()
   .subscribe({
     next:(res)=>{
       this.products=res;
       //console.log(res);
       //console.log(this.users);
        // this.dataSource = res;
      console.log(res)
     }, error:(err)=>{
       alert("error while fetching records");
     }
   })
 }




openn(content) {
  this.modalService.open(content, {
   
  });
} 

addProd(){
  if(this.prodDetail.valid){
    this.userService.createProduct(this.prodDetail.value)
    .subscribe({
      next:()=>{
        this.ngOnInit();
        this.modalService.dismissAll();
      }, error:(err)=>{
        this.errorMessage = err.error.message;
      }
    })
  }
  }

refresh() {
  this.getAllProducts();
}  


  deleteProduct( id:number){
    this.userService.deleteProduct(id)
    .subscribe({
       next:(res)=>{
         //alert("utilisateur supprimé avec succée!");
         this.ngOnInit();
       },
       error:()=>{
         alert("erreur lors de la suppression");
       }
    }); 
    
  
   }
  openDelete(targetModal, id:number) {
    this.deleteId = id;
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
    }
    
    delete() {
      this.userService.deleteProduct(this.deleteId);
    }
    
    open(content, id:number) {  
    
    this.modalService.open(content , { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {  
    
      if (result === 'yes') {  
        this.deleteProduct(id);  
      }  
    
    }, (reason)=>{
    
    });  
    
    }  

    getAllProcsById(id:number){
      this.id=id;
      this.userService.getAllProcsById(id)
      .subscribe({
        next:(res)=>{
          this.data=res;
        },
        error:()=>{
          alert("erreur ");
        }
     });
    }
      
    getAllProcs(){
      this.userService.getAllProducts()
      .subscribe({
        next:(res)=>{
          this.products=res;
          this.id=this.products[0].id;
          this.userService.getAllProcsById(this.id)
          .subscribe({
            next:(res)=>{
              console.log(this.id);
              this.data=res;
            },
            error:()=>{
              alert("erreur ");
            }
         });
    
        }})
    
    }

  show2() {
    document.getElementById('sidebar2').classList.toggle('active');
  }
  show() {
    document.getElementById('sidebar').classList.toggle('active');
  }

  columns=["col1","column2","column 3","column4","column 5","column6","column 7","column 8","column9","column 10","column11"];
   selectAllChanged(event){
     alert(event.checked);
   }
}
