import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  route='Preview'
  user:User;
  constructor() { 
    this.user={
      gender:'Feme',
      email:'vanesora@gmail.com',
      lastname: 'Sora',
      name:'Vanessa',
      password:'1234',
      picture:'',
      type:'ADMIN'      
    }
  }

  ngOnInit() {
  }

}
