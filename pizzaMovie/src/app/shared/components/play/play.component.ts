import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/shared/services/movie.service';
import { Router } from '@angular/router';
import { ConfigService } from 'src/app/shared/services/config.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {

  url = "http://localhost:3977/api/";

  constructor(
    public movieService: MovieService,
    public configService: ConfigService,

  ) { }

  ngOnInit() {
  }

  back(){
    this.configService.page='home'
  }

}
