import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { FilmeInter } from '../services/FilmesApi';
import { Link } from 'react-router-dom';
import './FilmeCard.css';  // Import the CSS file

interface FilmeCardProps {
    filme: FilmeInter;
}

const FilmeCard: React.FC<FilmeCardProps> = ({ filme }) => {
    return (
        <Card className="h-100 d-flex flex-column">
            <Card.Body className="d-flex flex-column">
                <Card.Title><Link to={'/Filme/' + filme.id}>{filme.nome}</Link></Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Categoria: {filme.categoria}</Card.Subtitle>
                <Card.Text>
                    Descrição: {filme.descricao}
                </Card.Text>
                <Card.Text>
                    Duração: {filme.duracao}
                </Card.Text>
                <Card.Text>
                    Data de Lançamento: {filme.dataDeLancamento}
                </Card.Text>
                <div className="mt-auto">
                    <Button variant="primary" className="w-100">
                        <Link to={`/Avaliar/Filme/${filme.id}`} className="btn-link">
                            Avaliar
                        </Link>
                    </Button>
                </div>
            </Card.Body>
        </Card>
    )
}

export default FilmeCard;
