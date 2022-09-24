import { Component, OnInit } from '@angular/core';
import { GeneralConstants } from 'src/app/constants/GeneralConstants';
import { Utilizador } from 'src/app/Models/utilizador';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {


  SeeConfigMenu!: boolean;

  constructor() { }

  ngOnInit(): void {

    this.SeeMenusForRoles();
  }


  SeeMenusForRoles()
  {
       var data = localStorage.getItem(GeneralConstants.UserData.DataUserJson) as string;
       var dataJson = JSON.parse(data) as Utilizador;
       var dataFind = dataJson.roles.find(o => o === 'Admin' || o === 'SuperAdmin');

       if(dataFind != null)
            this.SeeConfigMenu =  true;
        else
            this.SeeConfigMenu =  false;

  }

}
