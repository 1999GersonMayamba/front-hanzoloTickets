import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-render',
  templateUrl: './render.component.html',
  styleUrls: ['./render.component.css']
})
export class RenderComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {

    this.router.navigate(['/manutencaoList']);
  }

}
