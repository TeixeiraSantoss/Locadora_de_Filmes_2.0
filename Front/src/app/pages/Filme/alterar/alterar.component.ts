import { HttpClient } from '@angular/common/http';
import { BlockParameter } from '@angular/compiler';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FilmeModel } from 'src/app/models/filme.model';
import { GeneroModel } from 'src/app/models/genero.model';

@Component({
  selector: 'app-alterar',
  templateUrl: './alterar.component.html',
  styleUrls: ['./alterar.component.css']
})
export class AlterarComponent {
  constructor(private client: HttpClient, private route: ActivatedRoute) {}
  
  generos: GeneroModel[] = []

  filmeId: number = 0;
  nome: string = "";
  classif_ind: string = "";
  ano_lanc: string = "";
  GeneroId: number = 0;  

  //Requisição que recebe uma lista de "Genero" da "API", e recebe essa lista em memoria no front
  ngOnInit(): void{

    //Recuperando o "id" da URL
    this.route.params.subscribe
    (
      {
        next: (parametros) =>
          {
            let { id } = parametros;
          

        //Requisição para obter uma lista de Generos
        this.client.get<GeneroModel[]>
          ("https://localhost:7187/api/genero/listar")
          .subscribe({
            //caso a requisição funcione, vai execultar esse código
            
            //basicamente, esse trecho está recebendo uma lista de "generos" da "API", e está recebendo para o array "generos" declrado junto aos atributos
            next: (generos) => {
              console.table(generos);
              this.generos = generos;
            },

            //caso a requisição falhe
            error : (erro) => {
              console.log(erro)
            }
          })

          //Requisição para obter o Filme que será alterado
          this.client.get<FilmeModel>
          (`https://localhost:7187/api/filme/buscar/${id}`)
          .subscribe
          ({
            next: (filme) =>
              {
                this.filmeId = filme.id;
                this.nome = filme.nome;
                this.classif_ind = filme.classif_ind.toString();
                this.ano_lanc = filme.ano_lanc.toString();
                this.GeneroId = filme.GeneroId;
              }
          })

        }
      }
    )
  }

  //Função "Cadastrar"
  alterar(id: number): void
  {
    //Objeto carregado com os dados do formulario
    //Vai ser enviado para a API
    let filme: FilmeModel = {
      id: id,
      nome: this.nome,
      classif_ind: Number.parseInt(this.classif_ind),
      ano_lanc: Number.parseInt(this.ano_lanc),
      GeneroId: this.GeneroId
    }

    //Faz uma requisção para a API, e envia o objeto "filme"
    this.client.post<FilmeModel>
    (`https://localhost:7187/api/filme/alterar/${id}`, filme).subscribe
    ({
      next: () => {
        console.log("Filme alterado com sucesso");
        this.limparFormulario()
      },
      error: (erro) => {
        console.log(this.GeneroId)
        console.log(erro, "Nao foi possivel cadastrar");
      }
    })
  }

  limparFormulario()
  {
    this.nome = ""
    this.classif_ind = ""
    this.ano_lanc = ""
    this.GeneroId = 0
  }
}
