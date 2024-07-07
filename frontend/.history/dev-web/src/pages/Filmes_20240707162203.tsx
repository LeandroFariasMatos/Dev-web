import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner, Alert, Navbar, Nav, Button, Form, Modal, Pagination } from 'react-bootstrap';
import FilmeCard from '../components/FilmeCard';
import { fetchFilmes, FilmeInter } from '../services/FilmesApi';
import { Link } from 'react-router-dom';
import moment from 'moment';

const Filmes: React.FC = () => {
    const [filmes, setFilmes] = useState<FilmeInter[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [newFilme, setNewFilme] = useState<Partial<FilmeInter>>({
        nome: '',
        descricao: '',
        duracao: 0,
        categoria: '',
        dataDeLancamento: ''
    });
    const [formattedDate, setFormattedDate] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [searchText, setSearchText] = useState<string>(''); // Novo estado para o texto de pesquisa
    const filmesPerPage = 9;

    // Verificar se o usuário está logado
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            setIsLoggedIn(true);
        }
    }, []);

    useEffect(() => {
        const getFilmesData = async () => {
            try {
                const filmesData = await fetchFilmes();
                setFilmes(filmesData);
                setLoading(false);
            } catch (error) {
                setError('Erro ao buscar os filmes');
                setLoading(false);
            }
        };

        getFilmesData();
    }, []);

    useEffect(() => {
        if (error) {
            const errorTimeout = setTimeout(() => setError(null), 3000);
            return () => clearTimeout(errorTimeout);
        }
    }, [error]);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (name === 'dataDeLancamento') {
            setFormattedDate(value);
            const formattedDate = moment(value, 'YYYY-MM-DD').format('DD/MM/YYYY');
            setNewFilme(prevState => ({
                ...prevState,
                [name]: formattedDate
            }));
        } else {
            setNewFilme(prevState => ({
                ...prevState,
                [name]: name === 'duracao' ? parseInt(value) : value
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = {
            nome: newFilme.nome,
            descricao: newFilme.descricao,
            duracao: newFilme.duracao,
            categoria: newFilme.categoria,
            dataDeLancamento: newFilme.dataDeLancamento
        };
        try {
            const response = await fetch('http://localhost:8080/filmes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Erro ao adicionar filme');
            }

            const addedFilme = await response.json();
            setFilmes([...filmes, addedFilme]);
            handleCloseModal();
        } catch (error) {
            console.error('Erro ao adicionar filme', error);
            setError('Erro ao adicionar filme');
        }
    };

    const indexOfLastFilme = currentPage * filmesPerPage;
    const indexOfFirstFilme = indexOfLastFilme - filmesPerPage;
    const filteredFilmes = filmes
        .filter(filme => selectedCategory === '' || filme.categoria === selectedCategory)
        .filter(filme => searchText === '' || filme.nome.toLowerCase().includes(searchText.toLowerCase())); // Filtragem por nome

    const currentFilmes = filteredFilmes.slice(indexOfFirstFilme, indexOfLastFilme);

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
                        <Nav.Link as={Link} to="/Filmes">Filmes</Nav.Link>
                        <Nav.Link as={Link} to="/Series">Séries</Nav.Link>
                    </Nav>
                    {isLoggedIn && (
                        <>
                            <Navbar.Text className="mr-3">
                                Bem-vindo, {JSON.parse(localStorage.getItem('user')!).nome}!
                            </Navbar.Text>
                            <Button variant="outline-light" onClick={() => {
                                localStorage.removeItem('user');
                                window.location.href = '/Login';
                            }}>Logout</Button>
                        </>
                    )}
                </Container>
            </Navbar>
            <Container>
                <div className="d-flex justify-content-between align-items-center my-4">
                    <h1>Filmes</h1>
                    <div className="d-flex align-items-center">
                        <Form.Control
                            type="text"
                            placeholder="Pesquisar por nome..."
                            value={searchText}
                            onChange={handleSearchChange}
                        />
                        <Button variant="primary" className="ml-2" onClick={handleShowModal}>Adicionar Filme</Button>
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
                    {currentFilmes.map(filme => (
                        <Col key={filme.id} sm={12} md={6} lg={4} className="mb-4">
                            <FilmeCard filme={filme} />
                            {isLoggedIn && (
                                <Button variant="secondary">
                                    <Link to={`/avaliar/${filme.id}`}>
                                        Avaliar
                                    </Link>   
                                </Button>
                            )}
                        </Col>
                    ))}
                </Row>
                <Pagination>
                    {[...Array(Math.ceil(filteredFilmes.length / filmesPerPage)).keys()].map(number => (
                        <Pagination.Item key={number + 1} active={number + 1 === currentPage} onClick={() => paginate(number + 1)}>
                            {number + 1}
                        </Pagination.Item>
                    ))}
                </Pagination>
            </Container>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Adicionar Filme</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formNome">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                type="text"
                                name="nome"
                                value={newFilme.nome}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formDescricao">
                            <Form.Label>Descrição</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="descricao"
                                value={newFilme.descricao}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formDuracao">
                            <Form.Label>Duração</Form.Label>
                            <Form.Control
                                type="number"
                                name="duracao"
                                value={newFilme.duracao}
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
                                value={newFilme.categoria}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Selecione uma categoria</option>
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
}

export default Filmes;
