namespace Back.Model;
public class FilmeModel
{
    public int id { get; set; }
    public string nome { get; set; }
    public int classif_ind { get; set; }
    public int ano_lanc { get; set; }
    public bool alugado { get; set; }
}