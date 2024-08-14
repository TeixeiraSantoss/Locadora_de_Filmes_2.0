import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { GeneroModel } from 'src/app/models/genero.model';

@Component({
  selector: 'app-listar-genero',
  templateUrl: './listar-genero.component.html',
  styleUrls: ['./listar-genero.component.css']
})
export class ListarGeneroComponent {
  constructor(private client: HttpClient){}

  generos: GeneroModel[] = []

  //Variaveis utilizadas para fazer a pesquisa

    //1º - um array que vai ser utilizado para fazer a pesquisa
    generosFiltrados: GeneroModel[] = []

    //2º - uma variavel que vai receber oque esta sendo digitado pelo usuario
    private _termoPesquisa: string = ""

    //3º - Getter e Setter para o termo de pesquisa
    public get termoPesquisa(): string
    {
      return this._termoPesquisa
    }

    public set termoPesquisa(value: string)
    {
      this._termoPesquisa = value;

      //IF de uma linha
      //Caso "termoPesquisa" seja "true", o metodo "filtrarGenero" será chamado, caso "false" retorna a lista "generos"
      this.generosFiltrados = this.termoPesquisa ? this.filtrarGenero(this.termoPesquisa) : this.generos
    }

    //4º - um metodo que itere a lista "generos" usando o "_termoPesquisa" como referencia

    filtrarGenero(termoPesquisa: string): GeneroModel[]
    {
      //convertendo o "termoPesquisa" para minusculo
      termoPesquisa = termoPesquisa.toLocaleLowerCase()

      return this.generos.filter(genero => genero.nome.toLocaleLowerCase().indexOf(termoPesquisa) !== -1);
    }

  ngOnInit(): void
  {
    this.client.get<GeneroModel[]>
    ("https://localhost:7187/api/genero/listar").subscribe
    ({
      next: (generos) =>
        {
          this.generos = generos
          this.generosFiltrados = generos
        },
        error: (erro) => 
        {
          console.log(erro)
        }
    })
  }

  excluir(id: number): void
  {
    this.client.delete<GeneroModel[]>
    (`https://localhost:7187/api/genero/excluir/${id}`).subscribe
    ({
      next: () => 
      {
        this.generos = this.generos.filter(genero => genero.id !== id)
        this.generosFiltrados = this.generosFiltrados.filter(genero => genero.id !== id)
      },
      error: (erro) =>
      {
        console.log(erro)
      }
    })
  }
}
