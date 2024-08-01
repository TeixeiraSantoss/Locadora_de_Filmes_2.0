using Back.Data;
using Back.Model;
using Microsoft.AspNetCore.Mvc;

namespace Back.Controllers;

[ApiController]
//Rota base do Controller
[Route("api/usuario")]
public class UsuarioController : ControllerBase
{
    private readonly IConfiguration _config;
    //Instanciando o Contexto do Banco
    private readonly Contexto _ctx;

    public UsuarioController(Contexto ctx, IConfiguration config) {
        _ctx = ctx;
        _config = config;
    }

    //
    //Cadastro
    //Registra um novo Usuario no sistema
    [HttpPost("cadastrar")]
    public IActionResult Cadastrar([FromBody] UsuarioModel usuario)
    {
        try
        {
            //Verifica se o "usuario" já existe no banco ou não
            var usuarioExistente = _ctx.Usuarios.SingleOrDefault(u => u.email == usuario.email);
            if(usuarioExistente != null)
            {
                return BadRequest("Este usuario já existe.");
            }

            //1º Criar um Objeto do tipo "UsuarioModel" que vai receber os dados vindos do FRONT pelo "usuario"
            UsuarioModel novoUsuario = new UsuarioModel
            {
                username = usuario.username,

                //Transforma a senha que está vindo do front com "string" para uma criptografia que transforma a senha em "Hash" e armazena ela de forma segura no BD
                senha = BCrypt.Net.BCrypt.HashPassword(usuario.senha),
                email = usuario.email,
                idade = usuario.idade
            };
            //Adicionando o "novousuario" a tabela "usuarios" no Banco
            _ctx.Usuarios.Add(novoUsuario);
            //Salvando as alterações feitas
            _ctx.SaveChanges();


            return Created("Usuario Cadastrado com Sucesso", novoUsuario);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);            
        }
    }
    //Fim Cadastro
    //


    //
    //Inicio Login
    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginModel usuario)
    {
        //Recebe um usuario cadastrado caso o username do "usuario" for igual ao username de algun usuario cadastrado no Banco
        var usuarioCadastrado = _ctx.Usuarios.SingleOrDefault(u => u.email == usuario.email);

        //Verifica se a senha do "usuario" é igual a senha do "usuarioCadastrado"
        if(usuarioCadastrado == null || !BCrypt.Net.BCrypt.Verify(usuario.senha, usuarioCadastrado.senha))
        {
            return Unauthorized(new {message = "Senha ou Email invalido"});
        }

        return Ok(new {message = "Login realizado com sucesso!"});

    }

    //Fim Login
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
            List<UsuarioModel>? usuarios = _ctx.Usuarios.Where(u => u.username.Equals(nome)).ToList();

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
    //Inicio Buscar por id
        [HttpGet("buscar/{id}")]
        public IActionResult BuscarId([FromRoute] int id)
        {
            try
            {
                UsuarioModel usuarioCadastrado = _ctx.Usuarios.Find(id);
                return Ok(usuarioCadastrado);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }
    //Fim Buscar por id
    //

    //
    //Excluir
    [HttpDelete("excluir/{id}")]
    public IActionResult Excluir([FromRoute] int id)
    {
        try
        {
            List<UsuarioModel> usuarios = _ctx.Usuarios.ToList(); 
            //"Find" é usado para encontrar uma entidade pela sua chave primaria
            //Nesse caso vai encontrar na tabela "Usuarios" um "usuario" com o "id" correspondente
            UsuarioModel? usuarioCadastrado = _ctx.Usuarios.Find(id);

            if(usuarioCadastrado != null)
            {
                //"Remove" MARCA para EXCLUSÃO na tabela "Usuarios" o usuario que corresponder ao "id" fornecido
                _ctx.Usuarios.Remove(usuarioCadastrado);

                //"SaveChanges" EXCLUI o usuario marcado na tabela
                _ctx.SaveChanges();
                return Ok(usuarios);
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
