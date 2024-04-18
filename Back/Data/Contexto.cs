using Back.Model;
using Microsoft.EntityFrameworkCore;

namespace Back.Data;
public class Contexto : DbContext
{
    public Contexto(DbContextOptions<Contexto> options) : base(options){ }
    
    //Definir um "DbSet" para cada entidade
    //O "DbSet" define o nome da tabela no banco e a entidade que essa tabela vai incorporar
    public DbSet<FilmeModel> Filmes { get; set; }
    public DbSet<UsuarioModel> Usuarios { get; set; }
}