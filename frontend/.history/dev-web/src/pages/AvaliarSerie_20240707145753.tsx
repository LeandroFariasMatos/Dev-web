import React, { useState } from 'react';
import { Container, Form, Button, Navbar, Nav } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import ClassificacaoEstrelas from '../components/ClassificacaoEstrelas';

const AvaliarSerie: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [review, setReview] = useState<string>('');
  const [rating, setRating] = useState<number>(0);
  const [tipo] = useState<number>(1); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      comentario: review,
      tipo,
      id_tipo: id,
      nota: rating 
    };

    try {
      const response = await fetch('http://localhost:8080/avaliacoes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Erro ao enviar avaliação');
      }

      // Redirecionar para a página de filmes após o envio da avaliação
      window.location.href = '/Filmes';
    } catch (error) {
      console.error('Erro ao enviar avaliação', error);
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
      <Container>
        <h1>Avaliar Serie</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formReview">
            <Form.Label>Avaliação</Form.Label>
            <Form.Control
              as="textarea"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formRating">
            <Form.Label>Classificação</Form.Label>
            <ClassificacaoEstrelas rating={rating} setRating={setRating} />
          </Form.Group>
          <Button variant="primary" type="submit">Enviar</Button>
        </Form>
        <Button variant="secondary" className="mt-3" onClick={() => window.history.back()}>Voltar</Button>
      </Container>
    </>
  );
};

export default AvaliarSerie;
