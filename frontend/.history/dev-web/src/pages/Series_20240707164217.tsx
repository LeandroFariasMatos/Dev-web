import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner, Alert, Navbar, Nav, Button, Form, Modal, Pagination } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { SerieInter, fetchSeries } from '../services/SeriesApi';
import SerieCard from '../components/SerieCard';
import moment from 'moment';

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
    const [formattedDate, setFormattedDate] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [searchText, setSearchText] = useState<string>('');
    const seriesPerPage = 9;
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userName = user.nome || '';
    const navigate = useNavigate();

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

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => setError(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (name === 'dataDeLancamento') {
            setFormattedDate(value);
            const formattedDate = moment(value, 'YYYY-MM-DD').format('DD/MM/YYYY');
            setNewSerie(prevState => ({
                ...prevState,
                [name]: formattedDate
            }));
        } else {
            setNewSerie(prevState => ({
                ...prevState,
                [name]: name === 'temporadas' || name === 'episodios' ? parseInt(value) : value
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = {
            nome: newSerie.nome,
            descricao: newSerie.descricao,
            temporadas: newSerie.temporadas,
            episodios: newSerie.episodios,
            categoria: newSerie.categoria,
            dataDeLancamento: newSerie.dataDeLancamento
        };
        try {
            const response = await fetch('http://localhost:8080/series', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Erro ao adicionar série');
            }

            const addedSerie = await response.json();
            setSeries([...series, addedSerie]);
            handleCloseModal();
        } catch (error) {
            console.error('Erro ao adicionar série', error);
            setError('Erro ao adicionar série');
        }
    };

    const indexOfLastSerie = currentPage * seriesPerPage;
    const indexOfFirstSerie = indexOfLastSerie - seriesPerPage;
    const filteredSeries = series
        .filter(serie => selectedCategory === '' || serie.categoria === selectedCategory)
        .filter(serie => searchText === '' || serie.nome.toLowerCase().includes(searchText.toLowerCase())); // Filtragem por nome

    const currentSeries = filteredSeries.slice(indexOfFirstSerie, indexOfLastSerie);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    };

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/Home">Home</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="/Filmes">Filmes</Nav.Link>
                        <Nav.Link href="/Series">Séries</Nav.Link>
                    </Nav>
                    <Navbar.Text>
                        Bem-vindo, {userName}!
                    </Navbar.Text>
                </Container>
            </Navbar>
            <Container>
                <div className="d-flex justify-content-between align-items-center my-4">
                    <h1>Séries</h1>
                    <div className="d-flex align-items-center">
                        <Form.Control
                            type="text"
                            placeholder="Pesquisar por nome..."
                            value={searchText}
                            onChange={handleSearchChange}
                        />
                        {user && user.role === 'ADMIN' && (
                            <Button variant="primary" className="ml-2" onClick={handleShowModal}>Adicionar Série</Button>
                        )}
                    </div>
                </div>
                {loading && <Spinner animation="border" />}
                {error && <Alert variant="danger">{error}</Alert>}
                <Form.Group controlId="formCategoriaFilter" className="mb-4">
                    <Form.Label>Filtrar por Categoria</Form.Label>
                    <Form.Control
                        as="select"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="">Todas as categorias</option>
                        <option value="DRAMA">Drama</option>
                        <option value="COMEDIA">Comédia</option>
                        <option value="ROMANCE">Romance</option>
                        <option value="TERROR">Terror</option>
                        <option value="FICCAO_CIENTIFICA">Ficção Científica</option>
                        <option value="ACAO">Ação</option>
                        <option value="MUSICAL">Musical</option>
                        <option value="ESPORTE">Esporte</option>
                    </Form.Control>
                </Form.Group>
                <Row>
                    {currentSeries.map(serie => (
                        <Col key={serie.id} sm={12} md={6} lg={4} className="mb-4">
                            <SerieCard serie={serie} />
                        </Col>
                    ))}
                </Row>
                <Pagination>
                    {[...Array(Math.ceil(filteredSeries.length / seriesPerPage)).keys()].map(number => (
                        <Pagination.Item key={number + 1} active={number + 1 === currentPage} onClick={() => paginate(number + 1)}>
                            {number + 1}
                        </Pagination.Item>
                    ))}
                </Pagination>
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
                                min="0"
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
                                min="0"
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formCategoria">
                            <Form.Label>Categoria</Form.Label>
                            <Form.Control
                                as="select"
                                name="categoria"
                                value={newSerie.categoria}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Selecione uma categoria</option>
                                <option value="DRAMA">Drama</option>
                                <option value="COMEDIA">Comédia</option>
                                <option value="ROMANCE">Romance</option>
                                <option value="TERROR">Terror</option>
                                <option value="FICCAO_CIENTIFICA">Ficção Cientifica</option>
                                <option value="ACAO">Ação</option>
                                <option value="MUSICAL">Musical</option>
                                <option value="ESPORTE">Esporte</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formDataDeLancamento">
                            <Form.Label>Data de Lançamento</Form.Label>
                            <Form.Control
                                type="date"
                                name="dataDeLancamento"
                                value={formattedDate}
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
};

export default Series;
