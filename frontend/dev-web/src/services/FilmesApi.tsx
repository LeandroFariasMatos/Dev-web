export interface FilmeInter {
    id: number;
    nome: string;
    descricao: string;
    duracao: number;
    categoria: string;
    dataDeLancamento: string;
}

const API_URL = 'http://localhost:8080/filmes';

export const fetchFilmes = async (): Promise<FilmeInter[]> => {
    const response = await fetch(API_URL);
    if (!response.ok){
        throw new Error('Erro buscar os filmes');
    }
    return response.json();
}

export const fetchFilmeById = async (id: string): Promise<FilmeInter> => {
    const response = await fetch(API_URL+'/FilmeById/'+id);
    if (!response.ok){
        throw new Error('Erro buscar o filme');
    }
    return response.json();
}