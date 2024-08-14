import { UsuarioModel } from 'src/app/models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-cadastrar-usuario',
  templateUrl: './cadastrar-usuario.component.html',
  styleUrls: ['./cadastrar-usuario.component.css']
})
export class CadastrarUsuarioComponent {
  constructor(private client: HttpClient){}

  //Atributos que vão ser carregados com dados pelo Front
  username: string = ""
  idade: string = ""
  senha: string = ""
  email: string = ""
  Role: string = "User"
  ultimoId: number = 0

  usuarios: UsuarioModel[] = []

  ngOnInit(): void
  {
    this.client.get<UsuarioModel[]>
    ("https://localhost:7187/api/usuario/listar")
    .subscribe
    ({
      next: (usuarios) =>
        {
          this.usuarios = usuarios
          
          if(usuarios.length > 0)
            {
              const ultimoUsuario: UsuarioModel = usuarios[usuarios.length - 1]
  
              if(ultimoUsuario.id !== undefined)
                {
                  this.ultimoId = (ultimoUsuario.id += 1)
                  console.log("Ultimo id: ", this.ultimoId)
                }
            }
        },
      error: (erro) =>
        {
          console.log(erro)
        }
    })
  }

  cadastrar(): void
  {
    let novoUsuario: UsuarioModel = 
    {
      id: this.ultimoId,
      username: this.username,
      idade: Number.parseInt(this.idade),
      senha: this.senha,
      email: this.email,
      Role: this.Role
    }

    this.client.post<UsuarioModel>
    ("https://localhost:7187/api/usuario/cadastrar", novoUsuario)
    .subscribe
    ({
      next: () =>
        {
          console.log("Usuario cadastrado com sucesso")
          this.limparFormulario()
        },
      error: (erro) =>
        {
          console.log(erro)
        }
    })
  }

  limparFormulario()
  {
    this.username = ""
    this.idade = ""
    this.senha = ""
    this.email = ""
  }
}
