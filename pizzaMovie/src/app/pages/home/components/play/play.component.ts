import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { StorageService } from 'src/app/shared/services/storage.service';
import { User } from 'src/app/shared/models/user';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {
  @ViewChild('myVideo', { static: true }) myVideo: ElementRef;
  public show:boolean = false;
  currentTime: number;
  AdTime: number;
  user;
  url = "http://localhost:3977/api/"

  constructor(
    public userService: UserService,
    public storageService: StorageService,) {
      this.user = this.storageService.session;
  }

  ngOnInit() {
    if (this.user.reproduction != undefined) {
      var diff = Math.abs(this.user.reproduction - Date.now());
      var minutes = Math.floor((diff/1000)/60);
      console.log("Llevas sin ver " + minutes + " minutos tienes que esperar 1 día");
      //Puede volver a reproducir si pasaron 1440 minutos
      if (this.user.type != 'USER_PREMIUM' && minutes < 1440) {
        console.log('no puedes reproducir aún');
        this.show = true;
      } else {
        console.log('Ya puedes volver a reproducir');
        this.show = false;
      }
    }

    //Se define cuantos minutos puede reproducir (definir en 30)
    this.AdTime = 3;
  }

  setCurrentTime(data) {
    if (this.user.type != 'USER_PREMIUM' && this.show == false) {
      this.currentTime = data.target.currentTime;
      if (this.currentTime > this.AdTime) {
        var dateNow = Date.now();
        this.user.reproduction = dateNow;
        this.user = this.userService.updateUser(this.user, undefined);
        this.storageService.setValue('reproduction', this.user.reproduction);
        this.myVideo.nativeElement.pause();
        this.show = true;
      }
    }
  }

  //mostrar ad cada x tiempo (no implementado aun)
  showAdVideo() {
    this.AdTime = this.currentTime + 3;
    this.show = false;
    this.myVideo.nativeElement.play();
  }
}
