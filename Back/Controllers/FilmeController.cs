using Back.Data;
using Back.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Back.Controllers;

[ApiController]
[Route("api/filme")]
public class FilmeController : ControllerBase
{

    //Contexto do Banco
    private readonly Contexto _ctx;

    //Construtor
    public FilmeController(Contexto ctx)
    {
        _ctx = ctx;
    }

    //
    //Cadastrar Filme
    [HttpPost("cadastrar")]
    public IActionResult Cadastrar([FromBody] FilmeModel filme)
    {
        try
        {            
            //Verifica se o "GeneroId" corresponde a algum genero cadastrado no Banco
            GeneroModel? generoCadastrado = _ctx.Generos.FirstOrDefault(g => g.id == filme.GeneroId);

            //Caso encontre um genero correspondente no banco, execulta o codigo
            if(generoCadastrado != null)
            {
                //1º Criar um Objeto do tipo "FilmeModel" que vai receber os dados vindos do FRONT 
                FilmeModel novoFilme = new FilmeModel
                {
                    nome = filme.nome,
                    classif_ind = filme.classif_ind,
                    ano_lanc = filme.ano_lanc,
                    alugado = false,
                    Genero = generoCadastrado,
                    //Defini um genero pelo "id"
                    GeneroId = filme.GeneroId
                };
                //Adicionando o "novoFilme" a tabela "Filmes" no Banco
                _ctx.Filmes.Add(novoFilme);
                //Salvando as alterações feitas
                _ctx.SaveChanges();
                
                return Created("Filme Cadastrado com Sucesso", novoFilme);
            }

            return BadRequest("Não foi possivel cadastrar um novo filme");
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);            
        }
    }
    //Fim Cadastrar
    //

    //
    //Buscar Filme por "nome"
    [HttpGet("buscar")]
    //Posteriormente aplicar outros parametros de busca como:
    //"Classificação Indicativa"
    //"Genero"
    //"Ano de Lançamento"
    public IActionResult Buscar([FromQuery] string nome)
    {
        try
        {
            //Verifica se o nome fornecido bate com o nome de algum "FilmeModel" registrado na tabela "Filmes"
            FilmeModel filmeCadastrado = _ctx.Filmes.FirstOrDefault(f => f.nome == nome);

            if(filmeCadastrado != null)
            {
                return Ok(filmeCadastrado);
            }
            return NotFound("Filme não encontrado");
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    //Fim Buscar
    //

    //
    //Listar Filmes
    [HttpGet("listar")]
    public IActionResult Listar()
    {
        try
        {
            //1º Criar uma "List" para receber os dados do Banco
            //".Include" para adicionar o "Genero" relacionado na listagem
            List<FilmeModel> filmes = _ctx.Filmes.Include(x => x.Genero).ToList();

            //Caso a tabela "Filmes" esteja vazia, retorna um "NotFound()"
            //Caso tenha algum "FilmeModel" retorna um "Ok()" com os dados da lista
            return filmes.Count == 0 ? NotFound("Nenhum Filme Encontrado") : Ok(filmes);            
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    //Fim Listar
    //

    //
    //Excluir Filme
    [HttpDelete("excluir/{id}")]
    public IActionResult Excluir([FromRoute] int id)
    {
        try
        {
            List<FilmeModel> filmes = _ctx.Filmes.Include(x => x.Genero).ToList();
            //1º Faz uma busca pelo "id" recebido na tabela "Filmes"
            FilmeModel? filmeCadastrado = _ctx.Filmes.Find(id); 
            if(filmeCadastrado != null)
            {
                //Caso o "filmeCadastrado" seja "null"
                //Remove esse filme da tabela "Filmes"
                _ctx.Filmes.Remove(filmeCadastrado);
                
                //E salva as alterações
                _ctx.SaveChanges();

                return Ok(filmes);
            }
            return NotFound("Filme não encontrado");
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    //Fim Excluir
    //
}
