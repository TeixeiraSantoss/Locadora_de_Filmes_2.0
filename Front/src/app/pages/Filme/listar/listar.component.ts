import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FilmeModel } from 'src/app/models/filme.model';
import { GeneroModel } from 'src/app/models/genero.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent {
  //"client" vai permitir que eu acesse os metodos HTTP
  constructor(private client: HttpClient, private authService: AuthService) {}

  //Variaveis
  service = this.authService;

  //Lista de filmes vinda da API
  public filmes: FilmeModel[] = [];
  public generos: GeneroModel[] = [];

  //Lista de filmes que vai ser manipulada para fazer a filtragem
  public filmesFiltrados: FilmeModel[] = [];

  //
  //INICIO FILTRO

  //Vai receber o termo de pesquisa
  private _termoPesquisa: string = "";

  //Getter para obter o "_termoPesquisa"
  public get termoPesquisa(): string{
    return this._termoPesquisa;
  }

  //Setter para definir o "_termoPesquisa"
  public set termoPesquisa(value: string){
    this._termoPesquisa = value;

    this.filmesFiltrados = this.termoPesquisa ? this.filtrarFilme(this.termoPesquisa) : this.filmes
  
  }

  filtrarFilme(filtraPor: string): FilmeModel[]{
    filtraPor = filtraPor.toLocaleLowerCase()

    return this.filmes.filter(filme => filme.nome.toLocaleLowerCase().indexOf(filtraPor) !== -1);
  }


  ngOnInit(): void{
    //Fazendo uma requisição para obter uma lista de "FilmeModel"
    this.client.get<FilmeModel[]>
    ("https://localhost:7187/api/filme/listar")
    //"subscribe" vai receber a resposta da requisição
    .subscribe({
      //Caso o retorno seja bem sucedido
      next: (filmes) => {
        this.filmes = filmes;
        this.filmesFiltrados = filmes;
        this.carregarGeneros();
        console.table(filmes)
      },
      //Caso o retorno seja um "error"
      error: (erro) =>{
        console.log(erro);
      }
    })
  }

  carregarGeneros(): void {
    // Obter a lista de gêneros
    this.client.get<GeneroModel[]>("https://localhost:7187/api/genero/listar")
      .subscribe({
        next: (generos) => {
          this.generos = generos;
          // Mapear o gênero para cada filme
          this.filmes.forEach(filme => {
            filme.genero = this.generos.find(g => g.id === filme.generoId);
          });
        },
        error: (erro) => {
          console.log(erro);
        }
      });
  }

  excluir(id: number): void
  {
    this.client.delete<FilmeModel[]>
    (`https://localhost:7187/api/filme/excluir/${id}`)
    .subscribe
    ({
      next: () => {
        this.filmes = this.filmes.filter(filme => filme.id !== id)
        this.filmesFiltrados = this.filmesFiltrados.filter(filme => filme.id !== id)
      },
      error: (erro) => {
        console.log(erro)
      }
    })
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
