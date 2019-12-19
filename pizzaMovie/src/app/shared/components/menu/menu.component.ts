import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(
    public configService: ConfigService
  ) { }

  ngOnInit() {
  }

  viewComponent(select){
    this.configService.page=select.page;
    this.configService.menu.map(data=>{
      data.visible=false;
      return data
    })
    select.visible=true;
  }

}
