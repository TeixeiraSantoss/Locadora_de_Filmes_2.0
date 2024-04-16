using Back.Model;
using Microsoft.AspNetCore.Mvc;

namespace Back.Controllers;

[ApiController]
[Route("api")]
public class FilmeController : ControllerBase
{
    //Construtor
    public FilmeController()
    {

    }

    //
    //Cadastrar Filme
    [HttpPost("cadastrar")]
    public IActionResult Cadastrar([FromBody] FilmeModel filme)
    {
        try
        {
            //1º Criar um Objeto do tipo "FilmeModel" que vai receber os dados vindos do FRONT 
            FilmeModel novoFilme = new FilmeModel
            {
                nome = filme.nome,
                classif_ind = filme.classif_ind,
                ano_lanc = filme.ano_lanc,
                alugado = filme.alugado
            };

            return Created("Filme Cadastrado com Sucesso", novoFilme);
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

    //Fim Buscar
    //

    //
    //Listar Filmes
    
    //Fim Listar
    //

    //
    //Excluir Filme

    //Fim Excluir
    //
}
