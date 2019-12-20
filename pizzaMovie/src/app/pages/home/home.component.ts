import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/shared/services/config.service';
import { interval, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PopUpComponent } from 'src/app/shared/components/pop-up/pop-up.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  llamarPopUp: Subscription;

  constructor(
    public configService: ConfigService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<{}>,
  ) {
    this.dialogRef = null;
    this.llamarPopUp = interval(6000000).subscribe((x => {
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

}
