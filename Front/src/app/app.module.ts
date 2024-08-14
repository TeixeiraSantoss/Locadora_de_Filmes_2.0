import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Componentes
import { CadastrarComponent } from './pages/Filme/cadastrar/cadastrar.component';
import { ListarComponent } from './pages/Filme/listar/listar.component';
import { FormsModule } from '@angular/forms';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CadastrarGeneroComponent } from './pages/Genero/cadastrar-genero/cadastrar-genero.component';
import { ListarGeneroComponent } from './pages/Genero/listar-genero/listar-genero.component';
import { ListarUsuarioComponent } from './pages/Usuario/listar-usuario/listar-usuario.component';
import { CadastrarUsuarioComponent } from './pages/Usuario/cadastrar-usuario/cadastrar-usuario.component';
import { LoginUsuarioComponent } from './pages/Usuario/login-usuario/login-usuario.component';
import { AlterarComponent } from './pages/Filme/alterar/alterar.component';
@NgModule({
  declarations: [
    AppComponent,
    CadastrarComponent,
    ListarComponent,
    CadastrarGeneroComponent,
    ListarGeneroComponent,
    ListarUsuarioComponent,
    CadastrarUsuarioComponent,
    LoginUsuarioComponent,
    AlterarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
