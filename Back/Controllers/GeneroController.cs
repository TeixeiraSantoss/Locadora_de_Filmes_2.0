using Back.Data;
using Back.Model;
using Microsoft.AspNetCore.Mvc;

namespace Back.Controllers;
[ApiController]
[Route("api/genero")]
public class GeneroController : ControllerBase
{
    private readonly Contexto _ctx;
    public GeneroController(Contexto ctx)
    {
        _ctx = ctx;
    }

    //
    //Cadastrar
    [HttpPost("cadastrar")]
    public IActionResult Cadastrar([FromBody] GeneroModel genero)
    {
        try
        {
            GeneroModel novoGenero = new GeneroModel
            {
                nome = genero.nome
            };

            _ctx.Generos.Add(novoGenero);
            _ctx.SaveChanges();

            return Ok("Genero cadastrado com sucesso");
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    //Fim Cadastrar
    //

    //
    //Listar
    [HttpGet("listar")]
    public IActionResult Listar()
    {
        try
        {
            if(_ctx.Generos.ToList().Capacity != 0)
            {
                List<GeneroModel> generos = _ctx.Generos.ToList();
                    if(generos != null)
                    {
                        return Ok(generos);
                    }
            };

            return NotFound("Nenhum genero encontrado");
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    //Fim Listar
    //

    //
    //Buscar por nome
    [HttpGet("buscar")]
    public IActionResult Buscar([FromQuery] string nome)
    {
        try
        {
            GeneroModel generoCadastrado = _ctx.Generos.FirstOrDefault(g => g.nome == nome);

            if(generoCadastrado != null)
            {
                return Ok(generoCadastrado);
            }

            return NotFound("Nenhum genero encontrado");
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    //Fim Buscar
    //


    //
    //"Buscar" po id
    [HttpGet("buscar/{id}")]
    public IActionResult BuscarId([FromRoute] int id)
    {
        try
        {
            GeneroModel generoCadastrado = _ctx.Generos.FirstOrDefault(g => g.id == id);
            return Ok(generoCadastrado);
        }
        catch (Exception e)
        {
            return BadRequest(e);
        }
    }
    //Fim Bucar
    //


    //
    //Excluir
    [HttpDelete("excluir/{id}")]
    public IActionResult Excluir([FromRoute] int id)
    {
        try
        {
            GeneroModel generoCadastrado = _ctx.Generos.FirstOrDefault(g => g.id == id);

            if(generoCadastrado != null)
            {
                _ctx.Generos.Remove(generoCadastrado);
                _ctx.SaveChanges();
                return Ok("Genero excluido com sucesso");
            }

            return NotFound("Nenhum genero encontrado");
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    //Fim Excluir
    //
}