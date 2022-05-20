import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';




@Component({
  selector: 'app-recuperate',
  templateUrl: './recuperate.component.html',
  styleUrls: ['./recuperate.component.css']
})
export class RecuperateComponent implements OnInit {

  form: any = {
    email: null,
    
  };
  isSuccessful = false;
  isRecuperateFailed = false;
  errorMessage = '';
  recuperate=false;
  invalid=false;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }
  onSubmit(): void {
    const {  email } = this.form;

    this.authService.recuperate(email).subscribe(
      ( data: any) => {
        console.log(data);
        this.isSuccessful = true;
       this.isRecuperateFailed = false
        this.recuperate=true;
        this.invalid=false;
       
      },
      (err:any) => {
        this.errorMessage = err.error.message;
        //this.errorMessage="The email does not exist"
        this.invalid=true;
        this.recuperate=false;
       this.isRecuperateFailed = true;
        this.isSuccessful = false;
        
      }
    );
  }

 
  


  


}
