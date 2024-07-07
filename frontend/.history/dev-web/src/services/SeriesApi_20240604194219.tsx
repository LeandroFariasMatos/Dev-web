export interface SerieInter {
    id: number;
    nome: string;
    descricao: string;
    temporadas: number;
    episodios: number;
    categoria: string;
    dataDeLancamento: string;
}

const API_URL = 'http://localhost:8080/series';

export const fetchSeries = async (): Promise<SerieInter[]> => {
    const response = await fetch(API_URL);
    if (!response.ok){
        throw new Error('Erro buscar os series');
    }
    return response.json();
}

export const fetchSerieById = async (id: string): Promise<SerieInter> => {
    const response = await fetch(API_URL+'/SerieById/'+id);
    if (!response.ok){
        throw new Error('Erro buscar a serie');
    }
    return response.json();
}