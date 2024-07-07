import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { SerieInter } from '../services/SeriesApi';
import { Link } from 'react-router-dom';
import './SerieCard.css'; 

interface SerieCardProps {
    serie: SerieInter;
}

const SerieCard: React.FC<SerieCardProps> = ({ serie }) => {
    return (
        <Card className="h-100">
            <Card.Body>
                <Card.Title><Link to={'/Serie/' + serie.id}>{serie.nome}</Link></Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Categoria : {serie.categoria}</Card.Subtitle>
                <Card.Text>
                    Descrição : {serie.descricao}
                </Card.Text>
                <Card.Text>
                    Temporadas : {serie.temporadas}
                </Card.Text>
                <Card.Text>
                    Episodios : {serie.episodios}
                </Card.Text>
                <Card.Text>
                    Data de Lançamento : {serie.dataDeLancamento}
                </Card.Text>
                <Button variant="primary" className="w-100">
                <Link to={`/Avaliar/Serie/${serie.id}`} className="btn-link">
                            Avaliar
                        </Link>
                </Button>
            </Card.Body>
        </Card>
    )
}

export default SerieCard;