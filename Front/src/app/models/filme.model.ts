import { GeneroModel } from "./genero.model";

export interface FilmeModel{
    id: number;
    nome: string;
    classif_ind: number;
    ano_lanc: number;
    generoId: number;
    genero?: GeneroModel;
}
