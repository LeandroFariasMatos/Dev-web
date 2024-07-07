import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useParams, useHistory } from 'react-router-dom';
import ClasificaoEstrelas from '../components/ClassificacaoEstrelas';

const AvaliacaoFilme: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
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

      history.push('/Filmes');
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
    </Container>
  );
};

export default AvaliacaoFilme;