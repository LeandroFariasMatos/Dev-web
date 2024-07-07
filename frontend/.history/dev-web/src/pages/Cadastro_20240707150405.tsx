import React, { useState } from 'react';
import { Container, Form, Button, Navbar, Nav, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Cadastro: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      email,
      password,
    };

    try {
      const response = await fetch('http://localhost:8080/cadastro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Erro ao cadastrar');
      }

      // Sucesso no cadastro, redirecionar para a página de login
      navigate('/Login');
    } catch (error) {
      console.error('Erro ao cadastrar', error);
      setError('Erro ao cadastrar. Tente novamente.');
    }
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
        </Container>
      </Navbar>
      <Container className="mt-5">
        <h1>Cadastro</h1>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
