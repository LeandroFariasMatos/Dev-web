export interface Filme {
    id: number;
    nome: string;
    descricao: string;
    duracao: number;
    categoria: string;
    dataDeLancamento: string;
}

const API_URL = 'http://localhost:8080/filmes';

export const fetchFilmes = async (): Promise<Filme[]> => {
    const response = await fetch(API_URL);
    if (!response.ok){
        throw new Error('Erro buscar os filmes');
    }
    return response.json();
}