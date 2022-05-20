import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/_services/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { Role } from 'src/app/models/role';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['id', 'email', 'username','roles','action'];
  users:User[]=[];
  dataSource: MatTableDataSource<User>;
  userDetail:FormGroup;
  editForm:FormGroup;
  private deleteId:number;
  form:any={role:null};
  r:string;

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  isLoggedIn;
  username;
  hidden=true;
  
  roleAdmin=	[ { "id": 1, "name": "ROLE_ADMIN" } ]
   /*************** */
   user:any={};
   role:Role[] ;
   roles:any=[{"name":"ROLE_ADMIN"},{"name":"ROLE_COLLABORATEUR"}];
   
  



  
  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;
  @ViewChild(MatSort,{static:true}) sort: MatSort;
  httpClient: any;


  constructor( private userService: UserService, private tokenStorageService: TokenStorageService,
    private formBuilder:FormBuilder, httpClient:HttpClient,private modalService:NgbModal,private route:ActivatedRoute ) { 
   userService.getAllUsers().subscribe((users) => {
     
    
     for (const user of users) {
      const newUser = new User();
       this.users.push(newUser);
      
     }
    
     //console.log(this.users);
     this.dataSource = new MatTableDataSource<User>(this.users);
     this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort; 
   });
 }

 ngOnInit() {
  this.getAllUsers();
  this.getAllRoles();
  this.userDetail=this.formBuilder.group({
    id:[''],
   username:['',Validators.required],
   email:['',Validators.required],
   password:['',Validators.required],
   role:{}
 })

 this.isLoggedIn = !!this.tokenStorageService.getToken();

 if (this.isLoggedIn) {
  const user = this.tokenStorageService.getUser();
  this.username = user.username;
 
 }
 this.editForm=this.formBuilder.group({
  id:[''],
  username:['',Validators.required],
  email:['',Validators.required],
  password:['',Validators.required],
  roles:{}
 })
 
  
 }

 getAllUsers(){
  this.userService.getAllUsers()
  .subscribe({
    next:(res)=>{
      this.users=res;
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

getAllRoles(){
  this.userService.getAllRoles()
  .subscribe(
      response => {
       
        this.role = response;
        //console.log(response);
      }
    );
}

refresh() {
  this.getAllUsers();
  this.getAllRoles();
  this.dataSource.data = [...this.dataSource.data];
  this.dataSource.paginator = this.paginator;
}

deleteUser( id:number){
  this.userService.deleteUser(id)
  .subscribe({
     next:(res)=>{
       //alert("utilisateur supprimé avec succée!");
       this.refresh();
     },
     error:()=>{
       alert("erreur lors de la suppression");
     }
  }); 
  

 }

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}

addUser(){
  console.log(this.userDetail.value);
  if(this.userDetail.valid){
    this.userService.addUser(this.userDetail.value)
    .subscribe({
      next:(res)=>{
       
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.ngOnInit();
        this.userDetail.reset();
        this.modalService.dismissAll();
      }, error:(err)=>{
        //alert("erreur lors de l'ajout!")
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    })
  }
}



openDelete(targetModal, id:number) {
this.deleteId = id;
this.modalService.open(targetModal, {
  backdrop: 'static',
  size: 'lg'
});
}

delete() {
  this.userService.deleteUser(this.deleteId);
}

open(content, id:number) {  

this.modalService.open(content , { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {  

  if (result === 'yes') {  
    this.deleteUser(id);  
  }  

}, (reason)=>{

});  

}  


openn(content) {
  this.modalService.open(content, {
   
  });
}



 
getRoles(roles:any[]):string{
  let str:string='';
  roles?.forEach(element => {
     str=str+''+element.name;
     

 })
 return str;
}

openDetails(targetModal, user: User) {
  this.user = user;
  this.modalService.open(targetModal, {
  
 });

}


openEdit( targetModal,user:User) {
 
  user.password='';
  this.user=user;
  this.modalService.open(targetModal);
 
 this.editForm.setValue( {
  
    id: user.id, 
    username: user.username,
    email: user.email,
    password:user.password,
    roles :user.roles
    
    
  });
  
  
}


update() {
 
  console.log(this.editForm.value.id);
  let roles=[]
  roles.push(this.editForm.value.roles[0].name)
  let obj={
    "username":this.editForm.value.username,
    "email":this.editForm.value.email,
    "password":this.editForm.value.password,
    "role":roles
  }
  console.log(obj);
  
  this.userService.updateUser(obj,this.editForm.value.id)
  .subscribe({
    next:(res)=>{/*
      alert("utilisateur modifié avec succée!")
      this.userDetail.reset();
      this.refresh();*/
      this.ngOnInit();
      
      this.modalService.dismissAll();
    }, error:(err)=>{
      alert("erreur lors de la modif!")
      
    
    }
  })
}

 

  

 

}
