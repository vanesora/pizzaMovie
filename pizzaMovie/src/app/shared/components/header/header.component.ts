import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { LoginComponent } from '../../../pages/preview/components/login/login.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    public storageService: StorageService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
  }

  logIn(){
    this.dialog.open(LoginComponent);
  }

  closeModal(){
  }

}
