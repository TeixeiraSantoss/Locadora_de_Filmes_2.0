import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { GeneroModel } from 'src/app/models/genero.model';

@Component({
  selector: 'app-cadastrar-genero',
  templateUrl: './cadastrar-genero.component.html',
  styleUrls: ['./cadastrar-genero.component.css']
})
export class CadastrarGeneroComponent {
  
  constructor(private client : HttpClient){}

  generos : GeneroModel[] = []
  ultimoId: number = 0
  nome: string = ""

  ngOnInit(): void{
    this.client.get<GeneroModel[]>
    ("https://localhost:7187/api/genero/listar").subscribe
    ({
      next: (generos) => {
        this.generos = generos

        if(generos.length > 0)
          {
            const ultimoGenero: GeneroModel = generos[generos.length - 1]

            if(ultimoGenero.id !== undefined)
              {
                this.ultimoId = (ultimoGenero.id += 1)
                console.log("Ultimo id: ", this.ultimoId)
              }
          }
      },
      error: (erro) => {
        console.log(erro)
      }
    })
  }

  cadastrar() : void
  {
    let genero : GeneroModel = {
      id: this.ultimoId,
      nome: this.nome
    }

    this.client.post<GeneroModel>
    ("https://localhost:7187/api/genero/cadastrar", genero).subscribe
    ({
      next: () =>{
        console.log("Genero cadastrado com sucesso");
        this.limparFormulario()
      },
      error: (erro) => {
        console.log(erro);
      }
    })
  }

  limparFormulario()
  {
    this.nome = ""
  }
}
