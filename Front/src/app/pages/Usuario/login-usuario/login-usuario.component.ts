import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioModel } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-login-usuario',
  templateUrl: './login-usuario.component.html',
  styleUrls: ['./login-usuario.component.css']
})
export class LoginUsuarioComponent {
  constructor(private http: HttpClient, private router: Router) {}

  senha: string = ""
  email: string = ""

  isAdmin: boolean = false;
  adminPassword: string = ''

  login(): void
  {
    if (this.isAdmin && this.adminPassword !== '1234') {
      alert('Senha de administrador incorreta!');
      return;
    }

    const role = this.isAdmin ? 'admin' : 'user';
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('role', role);

    if (role === 'admin') {
      this.router.navigate(['pages/filme/listar']);
    } else {
      this.router.navigate(['/login']);
    }

    const loginData = {
      email: this.email,
      senha: this.senha
    };

    this.http.post<UsuarioModel>
    ('https://localhost:7187/api/usuario/login', loginData)
    .subscribe
    ({
      next: () =>
        {
          console.log("Login realizado com sucesso")
          this.router.navigate(["pages/filme/listar"])
        },
        error: (erro) =>
        {
          console.log(erro)
        }
    })
  }
}

