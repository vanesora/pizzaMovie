import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.scss'],

})
export class PopularComponent implements OnInit {

  public details = document.getElementById('details')

  constructor() { }

  ngOnInit() {
  }


}

