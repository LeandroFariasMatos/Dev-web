import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { FilmeInter } from '../services/FilmesApi';
import { Link } from 'react-router-dom';

interface FilmeCardProps {
    filme: FilmeInter;
}

const FilmeCard: React.FC<FilmeCardProps> = ({ filme }) => {
    return (
        <Card className="h-100">
            <Card.Body>
                <Card.Title><Link to={'/Filme/' + filme.id}>{filme.nome}</Link></Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Categoria : {filme.categoria}</Card.Subtitle>
                <Card.Text>
                    Descrição : {filme.descricao}
                </Card.Text>
                <Card.Text>
                    Duração : {filme.duracao}
                </Card.Text>
                <Card.Text>
                    Data de Lançamento : {filme.dataDeLancamento}
                </Card.Text>
                <Button variant="primary"><Link to ={`/Avaliar/Filme/${filme.id}`}>Avaliar</Link></Button>
            </Card.Body>
        </Card>
    )
}

export default FilmeCard;