import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  infoUser: any;

  constructor() {
    this.infoUser = JSON.parse(localStorage.getItem('user'));
    console.log('this.infoUser | home component: ', this.infoUser.name);
  }

  ngOnInit(): void {
  }

}
