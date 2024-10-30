import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector:   
 'app-authentication',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <h1>Componente de Autenticação</h1>

    <header class="row spacing">
      <nav class="col-md-8 col-md-offset-2">
        <ul class="nav nav-tabs">
        @if (!isLoggedIn) {
          <li><a class="nav-link" routerLinkActive="active" [routerLink]="['signup']">SignUp</a></li>
          <li><a class="nav-link" routerLinkActive="active" [routerLink]="['signin']">SignIn</a></li>   
          }
          <li><a class="nav-link" routerLinkActive="active" [routerLink]="['logout']">Logout</a></li>
        </ul>
      </nav>
    </header>

    <router-outlet></router-outlet>
  `
})
export class AuthenticationComponent implements OnInit  
 {
  isLoggedIn = false;

  ngOnInit() {
    // Verifica se o usuário está logado ao iniciar o componente
    this.isLoggedIn = !!localStorage.getItem('UserLogado'); // 'currentUser' deve ser a chave usada ao salvar os dados de login
  }
 }