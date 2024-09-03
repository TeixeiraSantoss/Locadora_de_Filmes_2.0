namespace Back.Model;
public class FilmeModel
{
    public int id { get; set; }
    public string nome { get; set; }
    public int classif_ind { get; set; }
    public int ano_lanc { get; set; }
    //Chave estrangeira para Genero
    //Ao fazer um cadastro informar APENAS o "GeneroId", pois o EF identifica AUTOMATICAMENTE qual o genero está sendo informado
    public int generoId { get; set; }
    //Representa a relação de 1 para N com Genero
    public GeneroModel? genero { get; set; }
}
