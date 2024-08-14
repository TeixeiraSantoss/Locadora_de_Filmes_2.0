import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-listar-usuario',
  templateUrl: './listar-usuario.component.html',
  styleUrls: ['./listar-usuario.component.css']
})
export class ListarUsuarioComponent {
  constructor(private client: HttpClient){}

  usuarios : UsuarioModel[] = []

  //
  //Inicio Pesquisar

    usuariosFiltrados: UsuarioModel[] = []

    private _termoPesquisa: string = ""

    public get termoPesquisa(): string
    {
      return this._termoPesquisa
    }

    public set termoPesquisa(value: string)
    {
      this._termoPesquisa = value

      if(this.termoPesquisa)
        {
          this.usuariosFiltrados = this.filtrarUsuario(this.termoPesquisa)
        }else
          {
            this.usuariosFiltrados = this.usuarios
          }

      //Outra forma de execultar as condições necessarias
      // this.usuariosFiltrados = this.termoPesquisa ? this.filtrarUsuario(this.termoPesquisa) : this.usuarios
    }
    
    filtrarUsuario(termoPesquisa: string): UsuarioModel[]
    {
      termoPesquisa = termoPesquisa.toLocaleLowerCase()

      return this.usuarios.filter(usuario => usuario.username.toLocaleLowerCase().indexOf(termoPesquisa) !== -1)
    }

  //Fim Pesquisar
  //

  ngOnInit(): void
  {
    this.client.get<UsuarioModel[]>
    ("https://localhost:7187/api/usuario/listar")
    .subscribe
    ({
      next: (usuarios) =>
        {
          this.usuarios = usuarios
          this.usuariosFiltrados = usuarios
        },
      error: (erro) =>
        {
          console.log(erro)
        }
    })
  }

  excluir(id: number) : void
  {
    this.client.delete
    (`https://localhost:7187/api/usuario/excluir/${id}`)
    .subscribe
    ({
      next: () =>
        {
          //O metodo "filter" cria um novo array, com todos os elementos iterados que passarem pela condição fornecida
          this.usuarios = this.usuarios.filter(usuario => usuario.id !== id)
          this.usuariosFiltrados = this.usuariosFiltrados.filter(usuario => usuario.id !== id)
        },
        error: (erro) =>
          {
            console.log(erro)
          }
    })
  }
}
