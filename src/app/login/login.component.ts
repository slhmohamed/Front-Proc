import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { AppRoutingModule } from '../app-routing.module';
import { RecuperateComponent } from '../recuperate/recuperate.component';
import { MatDialog,MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage =  '';
  roles: string[] = [];
  invalid=false;
 
 
  

  constructor(private router:Router,private authService: AuthService, private tokenStorage: TokenStorageService, private dialog: MatDialog) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.invalid=false;
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
      this.router.navigate(['/user/dashboard'])
        
      },
      
      err => {
        
      // this.errorMessage = err.error.message;
        this.errorMessage="Aucun nom d'utilisateur ou mot de passe correspondant";
        this.isLoginFailed = true;
       this.invalid=true;
      } 
    );
  }

  reloadPage(): void {
    window.location.reload();
    /*
    this.roles = this.tokenStorage.getUser().roles;
    if (this.roles==['ROLE_COLLABORATEUR']){
      this.router.navigate['/user'];
    }
    else{
      this.router.navigate['/admin'];
    }
    */
    
    
  }

  openDialog() {
    this.dialog.open(RecuperateComponent, {
    });
  }

 
}
