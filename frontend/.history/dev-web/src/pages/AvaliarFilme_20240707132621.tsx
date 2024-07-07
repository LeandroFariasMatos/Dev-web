import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import ClasificaoEstrelas from '../components/ClassificacaoEstrelas';

const AvaliacaoFilme: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [review, setReview] = useState<string>('');
  const [rating, setRating] = useState<number>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      filmeId: id,
      review,
      rating
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

      // Você pode redirecionar usando um componente <Link> do React Router DOM
      // ou qualquer outra forma de navegação que seja adequada para você.
    } catch (error) {
      console.error('Erro ao enviar avaliação', error);
    }
  };

  return (
    <Container>
      <h1>Avaliar Filme</h1>
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
          <ClasificaoEstrelas rating={rating} setRating={setRating} />
        </Form.Group>
        <Button variant="primary" type="submit">Enviar</Button>
      </Form>
      {/* Exemplo de redirecionamento usando Link */}
      <Link to="/Filmes">Voltar para Filmes</Link>
    </Container>
  );
};

export default AvaliacaoFilme;
