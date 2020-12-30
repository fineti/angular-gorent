import {AfterViewInit, Component, ElementRef, OnInit, ViewEncapsulation} from '@angular/core';
import {LoginService} from './services/login.service';
import {url} from 'inspector';
import {ActivatedRoute, NavigationEnd, NavigationStart, Router} from '@angular/router';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'angular-gorent';
  isHomepage = true;

  constructor(private loginService: LoginService,
              private elementRef: ElementRef,
              private router: Router) {
  }

  ngOnInit() {
    if (localStorage.getItem('user')) {
      this.loginService.isLogged = true;
      const uType = localStorage.getItem('typeUser');
      this.loginService.userType = uType.slice(1, uType.length - 1);
    }
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if(event.url === '/')
         this.isHomepage = true;
        else
         this.isHomepage = false;
        console.log(this.isHomepage);
      }
    });
  }
}
