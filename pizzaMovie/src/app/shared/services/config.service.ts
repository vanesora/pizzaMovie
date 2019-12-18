import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  page='home';

  menu=[
    {title: 'Home', class : 'fa-space-shuttle', visible: true, auth: true, page: 'home'},
    {title: 'Los más vistos', class : 'fa-jedi', visible: false, auth: true, page: 'mostViewed'},
    {title: 'Últimos estrenos', class : 'fa-rocket', visible: false, auth: true, page: 'lastReleases'},
    {title: 'Recomendaciones', class : 'fa-robot', visible: false, auth: true, page: 'recommendations'},
    {title: 'Favoritos', class : 'fa-meteor', visible: false, auth: true, page: 'favorites'},
    {title: 'Pide tu pizza', class : 'fa-pizza-slice', visible: false, auth: true, page: 'pizza'},
    {title: 'Perfil', class : 'fa-user-astronaut', visible: false, auth: true, page: 'profile'},
    {title: 'Agregar película o serie', class : 'fa-hand-spock', visible: false, auth: true, page: 'uploadMovie'}
  ]

  constructor() { }

  
}
