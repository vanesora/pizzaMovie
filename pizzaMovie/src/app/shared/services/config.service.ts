import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

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

  constructor(
    public storageService: StorageService
  ) { }

  authComp(){
    this.menu.map(data=>{
      data.auth=false;
    })
    this.menu.map(data => {
      if (this.storageService.session.type == 'USER_PREMIUM') {
        let valid = this.auth.premium.find(auth => auth == data.page)
        if (valid) { data.auth = true }
      }
      if (this.storageService.session.type == 'USER_FREE') {

        let valid = this.auth.free.find(auth => auth == data.page)
        if (valid) { data.auth = true }
      }
      if (this.storageService.session.type == 'USER_ADMIN') {
        let valid = this.auth.admin.find(auth => auth == data.page)
        if (valid) { data.auth = true }
      }
    })
  }

  
}
