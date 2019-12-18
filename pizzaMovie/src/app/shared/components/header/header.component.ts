import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { LoginComponent } from '../../../pages/preview/components/login/login.component';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    public storageService: StorageService,
    public dialog: MatDialog,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  logIn(){
    this.dialog.open(LoginComponent);
    setTimeout(() => {
      this.dialog.closeAll()
    }, 18000)
  }

  logOut(){
    this.storageService.cleanUser();
    this.router.navigate(['/home']);
  }

  closeModal(){
  }

}
