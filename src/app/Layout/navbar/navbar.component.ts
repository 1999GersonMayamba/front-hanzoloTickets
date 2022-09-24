import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  nome!: string;
  email!: string;
  data: any;

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {

    this.data = localStorage.getItem('NossaSeguros3CX');
    var dado =  JSON.parse(this.data);
    this.nome = dado.firstName;
    this.email = dado.email;

  }


  LogOut()
  {
      //Remover os dados do local storage
      localStorage.removeItem('NossaSeguros3CX');
      window.location.reload();
  }

}
