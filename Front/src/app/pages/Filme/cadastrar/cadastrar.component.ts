import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FilmeModel } from 'src/app/models/filme.model';
import { GeneroModel } from 'src/app/models/genero.model';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent {
  constructor(private client: HttpClient) {}
  
  //Criando as variaveis que vão conter os dados do formulario
  filmes: FilmeModel[] = [];
  generos: GeneroModel[] = [];

  ultimoId: number = 0;
  nome: string = "";
  classif_ind: string = "";
  ano_lanc: string = "";
  GeneroId: number = 0;  

  //Requisição que recebe uma lista de "Genero" da "API", e recebe essa lista em memoria no front
  ngOnInit(): void{
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

      this.client.get<FilmeModel[]>
        ("https://localhost:7187/api/filme/listar")
        .subscribe({
          next: (filmes) =>{
            this.filmes = filmes          

          if(filmes.length > 0){
            //obtendo o ultimo usuario da lista
            const ultimoFilme: FilmeModel = filmes[filmes.length - 1]

            if(ultimoFilme.id !== undefined){
              this.ultimoId = (ultimoFilme.id += 1)
              console.log("Ultimo id: ", this.ultimoId)
            } else{
              console.log("O ultimo usuario da lista não possui id")
            }
          } else{
            console.log("Lista de filmes vazia")
          }
          },
          error: (erro) =>{
            console.log(erro)
          }
        });
  }

  //Função "Cadastrar"
  cadastrar(): void
  {
    //Objeto carregado com os dados do formulario
    //Vai ser enviado para a API
    let filme: FilmeModel = {
      id: this.ultimoId,
      nome: this.nome,
      classif_ind: Number.parseInt(this.classif_ind),
      ano_lanc: Number.parseInt(this.ano_lanc),
      generoId: this.GeneroId
    }

    //Faz uma requisção para a API, e envia o objeto "filme"
    this.client.post<FilmeModel>
    ("https://localhost:7187/api/filme/cadastrar", filme).subscribe
    ({
      next: () => {
        console.log("Filme cadastrado com sucesso");
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
