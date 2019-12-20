import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogModule } from '@angular/material';
import { PopupPayService } from '../../services/popup-pay.service';

const material = [
  MatDialogModule,
];

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss']
})
export class PopUpComponent implements OnInit {

  constructor(
    public payService: PopupPayService
  ) { }

  ngOnInit() {
  }

  goPremium(){
    this.payService.openAlertDialog('payInto');
  }

}
