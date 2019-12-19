import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogModule } from '@angular/material';

const material = [
  MatDialogModule,
];

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss']
})
export class TermsComponent implements OnInit {

  constructor() { }

  ngOnInit() {}
}
