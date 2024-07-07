export interface Serie {
    id: number;
    nome: string;
    descricao: string;
    temporadas: number;
    episodios: number;
    categoria: string;
    dataDeLancamento: string;
}

const API_URL = 'http://localhost:8080/series';

export const fetchSeries = async (): Promise<Serie[]> => {
    const response = await fetch(API_URL);
    if (!response.ok){
        throw new Error('Erro buscar os series');
    }
    return response.json();
}