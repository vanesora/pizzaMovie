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
  

  constructor(
    private router: Router,
    public storageService: StorageService,
  ) {
  }

  ngOnInit() {
  }

  registro() {
    this.storageService.setValue('page', 'Register')
    this.router.navigate(['/register']);
  }
}
