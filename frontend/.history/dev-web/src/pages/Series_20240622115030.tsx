import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner, Alert, Navbar, Nav, Button, Form, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { SerieInter, fetchSeries } from '../services/SeriesApi';
import SerieCard from '../components/SerieCard';

const Series: React.FC = () => {
    const [series, setSeries] = useState<SerieInter[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [newSerie, setNewSerie] = useState<Partial<SerieInter>>({
        nome: '',
        descricao: '',
        temporadas: 0,
        episodios: 0,
        categoria: '',
        dataDeLancamento: ''
    });

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

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNewSerie({
            ...newSerie,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Aqui você pode adicionar a lógica para enviar a nova série para o servidor
        console.log(newSerie);
        handleCloseModal();
    };

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
                    <Button variant="primary" onClick={handleShowModal}>Adicionar Série</Button>
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

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Adicionar Série</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formNome">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                type="text"
                                name="nome"
                                value={newSerie.nome}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formDescricao">
                            <Form.Label>Descrição</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="descricao"
                                value={newSerie.descricao}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formTemporadas">
                            <Form.Label>Temporadas</Form.Label>
                            <Form.Control
                                type="number"
                                name="temporadas"
                                value={newSerie.temporadas}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formEpisodios">
                            <Form.Label>Episódios</Form.Label>
                            <Form.Control
                                type="number"
                                name="episodios"
                                value={newSerie.episodios}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formCategoria">
                            <Form.Label>Categoria</Form.Label>
                            <Form.Control
                                type="text"
                                name="categoria"
                                value={newSerie.categoria}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formDataDeLancamento">
                            <Form.Label>Data de Lançamento</Form.Label>
                            <Form.Control
                                type="date"
                                name="dataDeLancamento"
                                value={newSerie.dataDeLancamento}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Adicionar
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default Series;