import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner, Alert, Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { SerieInter, fetchSeries } from '../services/SeriesApi';
import SerieCard from '../components/SerieCard';

const Series: React.FC = () => {
    const [series, setSeries] = useState<SerieInter[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getSeries = async () => {
            try {
                const series = await fetchSeries();
                setSeries(series);
                setLoading(false);
            } catch (error) {
                setError('Erro ao buscar as séries');
                setLoading(false);
            }
        };

        getSeries();
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
                    <h1>Séries</h1>
                    <Button variant="primary">Adicionar Série</Button>
                </div>
                {loading && <Spinner animation="border" />}
                {error && <Alert variant="danger">{error}</Alert>}
                <Row>
                    {series.map(serie => (
                        <Col key={serie.id} sm={12} md={6} lg={4} className="mb-4">
                            <SerieCard serie={serie} />
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
}

export default Series;
