using Back.Data;
using Back.Model;
using Microsoft.AspNetCore.Authorization;
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

            return Created("Genero cadastrado com sucesso", genero);
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
    //Inicio Buscar
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
    //Excluir
    [HttpDelete("excluir/{id}")]
    public IActionResult Excluir([FromRoute] int id)
    {
        try
        {
            List<GeneroModel> generos = _ctx.Generos.ToList();
            GeneroModel generoCadastrado = _ctx.Generos.FirstOrDefault(g => g.id == id);

            if(generoCadastrado != null)
            {
                _ctx.Generos.Remove(generoCadastrado);
                _ctx.SaveChanges();
                return Ok(generos);
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

    //
    //Inicio Alterar

    [HttpPost("alterar/{id}")]
    public IActionResult Alterar([FromRoute] int id, [FromBody] GeneroModel generoAlterado)
    {
        try
        {
            
            GeneroModel? generoCadstrado = _ctx.Generos.Find(id);

            if(generoCadstrado != null)
            {
                generoCadstrado.nome = generoAlterado.nome;

                _ctx.Update(generoCadstrado);
                _ctx.SaveChanges();

                return Ok("Genero Alterado com sucesso");
            }

            return NotFound("Genero não encontrado");

        }
        catch (Exception e)
        {
            
            return BadRequest(e);
        }
    }

    //Fim Alterar
    //
}