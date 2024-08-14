import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastrarComponent } from './pages/Filme/cadastrar/cadastrar.component';
import { ListarComponent } from './pages/Filme/listar/listar.component';
import { CadastrarGeneroComponent } from './pages/Genero/cadastrar-genero/cadastrar-genero.component';
import { ListarGeneroComponent } from './pages/Genero/listar-genero/listar-genero.component';
import { CadastrarUsuarioComponent } from './pages/Usuario/cadastrar-usuario/cadastrar-usuario.component';
import { ListarUsuarioComponent } from './pages/Usuario/listar-usuario/listar-usuario.component';
import { LoginUsuarioComponent } from './pages/Usuario/login-usuario/login-usuario.component';
import { AlterarComponent } from './pages/Filme/alterar/alterar.component';
import { adminGuard } from './guards/admin.guard';

const routes: Routes = [
  {
    path:"",
    redirectTo: "pages/usuario/login",
    pathMatch: "full" 
  },
  {
    path:"pages/filme/cadastrar",
    component: CadastrarComponent,
    canActivate: [adminGuard]
  },
  {
    path:"pages/filme/listar",
    component: ListarComponent
  },
  {
    path:"pages/filme/alterar/:id",
    component: AlterarComponent,
    canActivate: [adminGuard]
  },
  {
    path:"pages/genero/cadastrar",
    component: CadastrarGeneroComponent,
    canActivate: [adminGuard]
  },
  {
    path:"pages/genero/listar",
    component: ListarGeneroComponent,
    canActivate: [adminGuard]
  },
  {
    path:"pages/usuario/cadastrar",
    component: CadastrarUsuarioComponent
  },
  {
    path:"pages/usuario/listar",
    component: ListarUsuarioComponent,
    canActivate: [adminGuard]
  },
  {
    path:"pages/usuario/login",
    component: LoginUsuarioComponent
  },
  //Caso alguma rota não seja encontrada o usuario sera redirecionado para a tela de login
  { path: "**",
    redirectTo: "pages/usuario/login" 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
