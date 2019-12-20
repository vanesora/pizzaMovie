import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/shared/services/config.service';
import { interval, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PopUpComponent } from 'src/app/shared/components/pop-up/pop-up.component';
import { StorageService } from 'src/app/shared/services/storage.service';
import { MovieService } from 'src/app/shared/services/movie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  llamarPopUp: Subscription;

  constructor(
    public configService: ConfigService,
    public movieService: MovieService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<{}>,
    public storageService: StorageService,
  ) {
    this.dialogRef = null;
    this.llamarPopUp = interval(30000).subscribe((x => {
      this.openPopup();
    }));
  }

  ngOnInit() {
  }

  openPopup() {
    if (this.storageService.session.type == 'USER_FREE') {
      if (this.dialogRef === null) {
        this.dialogRef = this.dialog.open(PopUpComponent, {
          width: '450px',
          height: '380px',
        });
        return this.onReadyDB().then();
      }
      if (this.dialogRef != null) {
        this.dialogRef.afterClosed().subscribe(result => {
          this.dialogRef = null;
        });
      }
    }else{
      this.llamarPopUp.unsubscribe()
    }

  }

  onReadyDB(tries = 20): Promise<any> {
    return new Promise((resolve, reject) => {
      if (tries <= 0) {
        reject('max tries onReadyDB');
        console.error('max tries onReadyDB');
      }
      if (this.storageService.pay == true) {
        this.dialog.closeAll()
        resolve(true);
      } else {
        setTimeout(() => {
          this.onReadyDB(tries--).then(() => {
            resolve(true);
          });
        }, 300);
      }
    });
  }

}
