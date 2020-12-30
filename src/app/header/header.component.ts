import {Component, Input, OnInit} from '@angular/core';
import {LoginService} from '../services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input()
  isHomepage: boolean;

  constructor(public loginService: LoginService) { }

  ngOnInit(): void {
  }

  onLogout() {
    this.loginService.onSwitchMode();
  }

}
