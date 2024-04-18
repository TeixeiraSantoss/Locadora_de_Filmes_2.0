using Back.Data;
using Back.Model;
using Microsoft.AspNetCore.Mvc;

namespace Back.Controllers;

[ApiController]
//Rota base do Controller
[Route("api/usuario")]
public class UsuarioController : ControllerBase
{
    //Instanciando o Contexto do Banco
    private readonly Contexto _ctx;

    public UsuarioController(Contexto ctx) {
        _ctx = ctx;
    }

    //
    //Cadastro
    [HttpPost("cadastrar")]
    public IActionResult Cadastrar([FromBody] UsuarioModel usuario)
    {
        try
        {
            //1º Criar um Objeto do tipo "UsuarioModel" que vai receber os dados vindos do FRONT pelo "usuario"
            UsuarioModel novoUsuario = new UsuarioModel
            {
                nome = usuario.nome,
                idade = usuario.idade
            };
            //Adicionando o "novousuario" a tabela "usuarios" no Banco
            _ctx.Usuarios.Add(novoUsuario);
            //Salvando as alterações feitas
            _ctx.SaveChanges();


            return Created("usuario Cadastrado com Sucesso", novoUsuario);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);            
        }
    }
    //Fim Cadastro
    //

    //
    //Listar
    [HttpGet("listar")]
    public IActionResult Listar(){
        try
        {
            //1º Criar uma lista para receber os "usuarios" de "Usuarios"
            List<UsuarioModel> usuarios = _ctx.Usuarios.ToList();

            if(usuarios.Count == 0)
            {
                return NotFound("Nenhum  Usuario encontrado");
            } 
            return Ok(usuarios);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    //Fim Listar
    //

    //
    //Buscar por Nome
    [HttpPost("buscar")]
    public IActionResult Buscar([FromQuery] string nome)
    {
        try
        {
            //Cria uma lista de usuarios que vai receber todos as entidades do banco com o "nome" correspondente
            //Foi usado o metodo "Where" pois com ele é possivel retornar multiplas entidades do banco, difente do "FirstOrDefault" ou "SingleOrDefault"
            List<UsuarioModel>? usuarios = _ctx.Usuarios.Where(u => u.nome.Equals(nome)).ToList();

            //Verifica se a lista de "usuarios" não é nula
            if(usuarios != null)
            {
                return Ok(usuarios);
            }
            return NotFound("Nenhum usuario foi encontrado");

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
            //"Find" é usado para encontrar uma entidade pela sua chave primaria
            //Nesse caso vai encontrar na tabela "Usuarios" um "usuario" com o "id" correspondente
            UsuarioModel? usuarioCadastrado = _ctx.Usuarios.Find(id);

            if(usuarioCadastrado != null)
            {
                //"Remove" MARCA para EXCLUSÃO na tabela "Usuarios" o usuario que corresponder ao "id" fornecido
                _ctx.Usuarios.Remove(usuarioCadastrado);

                //"SaveChanges" EXCLUI o usuario marcado na tabela
                _ctx.SaveChanges();
                return Ok("Usuario excluido com sucesso");
            };
            
            return NotFound("Usuario não encontrado");            
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    //Fim Excluir
    //
}
