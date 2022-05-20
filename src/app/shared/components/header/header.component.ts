import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  roleadmin=['ROLE_ADMIN'];
  ch:string='Admin: ';
  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();
  constructor(private tokenStorageService: TokenStorageService) { }


  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      //console.log(this.roles);
     

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      //this.username = user.username;
      if(this.roles[0]=='ROLE_ADMIN'){
        this.username='Admin: '+user.username;
        
      }else{
        this.username='User: '+user.username;
      }
      
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  toggleSideBar() {
    this.toggleSideBarForMe.emit();
    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  }
}