import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner, Alert, Navbar, Nav, Button } from 'react-bootstrap';
import FilmeCard from '../components/FilmeCard';
import { fetchFilmes, FilmeInter } from '../services/FilmesApi';
import { Link } from 'react-router-dom';

const Filmes: React.FC = () => {
    const [filmes, setFilmes] = useState<FilmeInter[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getFilmes = async () => {
            try {
                const filmes = await fetchFilmes();
                setFilmes(filmes);
                setLoading(false);
            } catch (error) {
                setError('Erro ao buscar os filmes');
                setLoading(false);
            }
        };

        getFilmes();
    }, []);

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/Home">Home</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/Filmes">Filmes</Nav.Link>
                        <Nav.Link as={Link} to="/Series">Séries</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            <Container>
                <div className="d-flex justify-content-between align-items-center my-4">
                    <h1>Filmes</h1>
                    <Button variant="primary">Adicionar Filme</Button>
                </div>
                {loading && <Spinner animation="border" />}
                {error && <Alert variant="danger">{error}</Alert>}
                <Row>
                    {filmes.map(filme => (
                        <Col key={filme.id} sm={12} md={6} lg={4} className="mb-4">
                            <FilmeCard filme={filme} />
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    )
}

export default Filmes;
