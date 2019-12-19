import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/shared/services/storage.service';

import { interval, Subscription} from 'rxjs';
import { MatDialog } from '@angular/material';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PopUpComponent } from 'src/app/shared/components/pop-up/pop-up.component';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {
  llamarPopUp: Subscription;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<{}>,
    public storageService: StorageService,
  ) {
    this.dialogRef = null;
    this.llamarPopUp= interval(600000).subscribe((x =>{
        this.openPopup();
    }));
  }

  ngOnInit() {
  }

  openPopup() {
    if (this.dialogRef === null ){
      this.dialogRef = this.dialog.open(PopUpComponent, {
        width: '450px',
        height: '380px',
      });
    }

    this.dialogRef.afterClosed().subscribe(result => {
      this.dialogRef = null;
    });
  }


  registro() {
    this.storageService.setValue('page', 'Register')
    this.router.navigate(['/register']);
  }
}
