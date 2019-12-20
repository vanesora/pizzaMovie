import { Component, OnInit } from '@angular/core';
import { PopupPayService } from '../../services/popup-pay.service';

@Component({
  selector: 'app-stiky',
  templateUrl: './stiky.component.html',
  styleUrls: ['./stiky.component.scss']
})
export class StikyComponent implements OnInit {

  constructor(
    public payService: PopupPayService
  ) { }

  ngOnInit() {
  }

  goPremium(){
    this.payService.openAlertDialog('payInto');
  }

}
