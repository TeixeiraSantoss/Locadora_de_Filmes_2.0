namespace Back.Model;
public class UsuarioModel
{
    public int id { get; set; }
    public string username { get; set; }
    public string senha { get; set; }    
    public string email { get; set; }
    public int idade { get; set; }
    public string Role { get; set; } = "User";
}