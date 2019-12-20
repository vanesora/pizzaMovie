
import { Movies } from 'src/app/shared/models/movies';
 
@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})

export class FavoritesComponent implements OnInit {
  favorites;
  indiceMovie = 0;
  listFavoriteMovie;
  movies: Movies[];
 
  constructor(
  ) { 
  }
 
  ngOnInit() {
    this.favorites=[];
    this.favorites.push(
      {title:'star wars', description:'texto de descripcion',type:'Drama', picture:'', movie:'', dateAdd:'11/12/2019'}
    )
    this.favorites.push(
      {title:'Totoro', description:'texto de descripcion2',type:'Anime', picture:'', movie:'', dateAdd:'14/12/2019'}
    )
    this.favorites.push(
      {title:'Avatar', description:'texto de descripcion3',type:'Anime', picture:'', movie:'', dateAdd:'16/12/2019'}
    )
    this.favorites.push(
      {title:'Amor', description:'texto de descripcion4',type:'Romancee', picture:'', movie:'', dateAdd:'17/12/2019'}
    )
    this.favorites.push(
      {title:'Los tres chiflados', description:'texto de descripcion5',type:'Comedia', picture:'', movie:'', dateAdd:'13/12/2019'}
    )
    this.favorites.push(
      {title:'La llorona', description:'texto de descripcion6',type:'Drama', picture:'', movie:'', dateAdd:'20/12/2019'}
    )
  }
 
  /*eliminarMovie(movie) {
    let listmovie = this.favorites.filter(movie => movie._title != movie._title)
    this.movies = JSON.parse(JSON.stringify(listmovie))
    localStorage.setItem('list', JSON.stringify(this.movies))
  }*/
  
}