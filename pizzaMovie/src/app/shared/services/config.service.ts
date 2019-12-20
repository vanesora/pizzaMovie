import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  page='home';

  menu=[
    {title: 'Home', class : 'fa-space-shuttle', visible: true, auth: false, page: 'home'},
    {title: 'Los más vistos', class : 'fa-jedi', visible: false, auth: false, page: 'mostViewed'},
    {title: 'Últimos estrenos', class : 'fa-rocket', visible: false, auth: false, page: 'lastReleases'},
    {title: 'Recomendaciones', class : 'fa-robot', visible: false, auth: false, page: 'recommendations'},
    {title: 'Favoritos', class : 'fa-meteor', visible: false, auth: false, page: 'favorites'},
    {title: 'Pide tu pizza', class : 'fa-pizza-slice', visible: false, auth: false, page: 'pizza'},
    {title: 'Perfil', class : 'fa-user-astronaut', visible: false, auth: false, page: 'profile'},
    {title: 'Agregar película o serie', class : 'fa-hand-spock', visible: false, auth: false, page: 'uploadMovie'},
    {title: 'Editar película o serie', class : 'fa-hand-spock', visible: false, auth: false, page: 'editMovie'}
  ]

  auth={
    free:['home', 'mostViewed', 'lastReleases', 'recommendations', 'pizza', 'profile'],
    premium:['home', 'mostViewed', 'lastReleases', 'recommendations', 'pizza', 'profile', 'favorites'],
    admin:['home',  'profile', 'uploadMovie', 'editMovie'],
  }

  constructor() { }

  
}
