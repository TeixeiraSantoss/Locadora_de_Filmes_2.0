import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private router: Router, private authService: AuthService) {}

  service = this.authService
  showNavbar: boolean = true;
  title = 'Front';
  isCollapsedNav = false;
  isCollapsedFilm = true;
  isCollapsedGen = true;
  isCollapsedUser = true;

  //Regra de negocio para definir quando a NavBar NÃO deve ser exibida
  ngOnInit(): void {
    this.router.events.subscribe(() => {
      // Verifica se a rota atual é 'login' ou 'cadastrar'
      // Caso seja a NavBar NÃO será exibida
      const currentRoute = this.router.url;
      this.showNavbar = !(currentRoute.includes('/pages/usuario/login') || currentRoute.includes('/pages/usuario/cadastrar'));
    });
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
