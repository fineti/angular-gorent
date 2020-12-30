import {Component, EventEmitter, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginService} from '../services/login.service';
import {ClientService} from '../services/client.service';
import {HostService} from '../services/host.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,
              public loginService: LoginService) { }

  ngOnInit(): void {
  }

  onSubmit(loginForm: NgForm) {
    this.loginService.onLogin(loginForm.value.username, loginForm.value.password, this.router);
    loginForm.reset();
  }
}
