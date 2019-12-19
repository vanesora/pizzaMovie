import { Component, Inject } from '@angular/core';
import { MatDialogModule } from '@angular/material';

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
  ) { }

  ngOnInit() {
  }

}
