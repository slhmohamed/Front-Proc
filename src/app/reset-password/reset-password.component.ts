import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  form: any = {
    token:null,
    password: null
    
  };
  isSuccessful = false;
  isResetFailed = false;
  errorMessage = '';
  reset=false;
  token: string;
  constructor(private authService: AuthService,private route: ActivatedRoute) { }
  
  

  ngOnInit(): void {
    this.route.queryParams
    .subscribe(params => {
      this.token=params['token'];
      console.log("hi",this.token);
    });
  }

  onSubmit(): void {
    const { password } = this.form;

    this.authService.reset(this.token,password).subscribe(
      ( data: any) => {
       
        this.reset=true;
        console.log(data);
        this.isSuccessful = true;
        this.isResetFailed = false;
      },
      (err:any) => {
        this.reset=false;
        //this.errorMessage = err.error.message;
        this.errorMessage="Problem resetting password";
        this.isResetFailed = true;
      }
    );
  }


}
function password(password: any) {
  throw new Error('Function not implemented.');
}

