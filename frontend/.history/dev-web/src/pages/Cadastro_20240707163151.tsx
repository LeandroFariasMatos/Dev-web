import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Navbar, Nav, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Cadastro: React.FC = () => {
  const navigate = useNavigate();
  const [nome, setNome] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [senha, setSenha] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const user = localStorage.getItem('user');
    setIsLoggedIn(!!user);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      nome,
      email,
      senha,
    };

    try {
      const response = await fetch('http://localhost:8080/usuario/cadastro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Erro ao fazer cadastro');
      }

      navigate('/Login');
    } catch (error) {
      console.error('Erro ao fazer cadastro', error);
      setError('Erro ao fazer cadastro. Tente novamente.');
    }
  };

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/Home">Home</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/Filmes" disabled={!isLoggedIn}>Filmes</Nav.Link>
            <Nav.Link href="/Series" disabled={!isLoggedIn}>Séries</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Container className="mt-5">
        <h1>Cadastro</h1>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formName">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Senha</Form.Label>
            <Form.Control
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Cadastrar
          </Button>
        </Form>
        <Button
          variant="link"
          className="mt-3"
          onClick={() => navigate('/Login')}
        >
          Já tem uma conta? Faça login aqui
        </Button>
      </Container>
    </>
  );
};

export default Cadastro;
