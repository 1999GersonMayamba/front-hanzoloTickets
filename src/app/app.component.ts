import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Subscription, BehaviorSubject } from 'rxjs';
import { GeneralConstants } from './constants/GeneralConstants';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { AuthService } from './Services/auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit, OnDestroy {

  loggedIn$!: BehaviorSubject<boolean>;
  private isLoggedIn_subscription!: Subscription;


  constructor(
    private authService: AuthService,
    private router: Router,
    @Inject(DOCUMENT) private document: any
  ) { }


  logout(): void {
  }

  ngOnInit() {

    this.loggedIn$  =  this.authService.isUserLoged;

    this.isLoggedIn_subscription  = this.authService.isUserLoged.subscribe(
      (status) => {
        // this.setBodyClassName(status);

        // if (status) {
        //   this.handleLoginSuccess();
        // } else {
        //   this.handleLoginError();
        // }
      }
    );

    // check and validate token
    if (this.authService.hasToken()) {
    }

  }



  ngOnDestroy(): void {
    if (this.isLoggedIn_subscription)  { this.isLoggedIn_subscription.unsubscribe(); }
  }


  private handleLoginError() {
    this.router.navigate(['/login']);
  }



}
