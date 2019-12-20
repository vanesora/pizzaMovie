import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/shared/services/movie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {

  url = "http://localhost:3977/api/";

  constructor(
    public movieService: MovieService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  back(){
    this.router.navigate(['/home'])
  }

}
