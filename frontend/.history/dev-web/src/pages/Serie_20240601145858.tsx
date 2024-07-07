import React, { useEffect } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


interface RouteParams {
    id: string;
}

const reviews = [
    {
      name: 'João da Silva',
      rating: 5,
      comment: 'Amei o filme! A história é envolvente e os personagens são muito bem desenvolvidos.',
      avatar: 'https://via.placeholder.com/64'
    },
    {
      name: 'Maria Oliveira',
      rating: 4,
      comment: 'Ótimo filme, mas achei que poderia ter mais cenas de ação.',
      avatar: 'https://via.placeholder.com/64'
    },
    {
      name: 'Carlos Souza',
      rating: 3,
      comment: 'É um bom filme, mas a trilha sonora não me agradou muito.',
      avatar: 'https://via.placeholder.com/64'
    },
    {
      name: 'Ana Pereira',
      rating: 5,
      comment: 'Simplesmente incrível! Recomendo a todos.',
      avatar: 'https://via.placeholder.com/64'
    }
];
  
const Rating = ({ rating }) => {
    return (
      <div className="rating">
        {'⭐️'.repeat(rating)}
      </div>
    );
  };
  
const ReviewCard = ({ review }) => {
    return (
      <div className="media mb-4">
        <img src={review.avatar} className="mr-3 rounded-circle" alt={review.name} />
        <div className="media-body">
          <h5 className="mt-0">{review.name}</h5>
          <Rating rating={review.rating} />
          <p>{review.comment}</p>
        </div>
      </div>
    );
  };
  
  const Reviews = () => {
    return (
      <div className="container mt-5">
        <div className="card">
          <div className="card-header">
            <h2>Avaliações de Filme</h2>
          </div>
          <div className="card-body">
            {reviews.map((review, index) => (
              <ReviewCard key={index} review={review} />
            ))}
          </div>
        </div>
      </div>
    );
  };
  

const Serie: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    const minhaFuncao = (id: string) => {
      console.log(`ID recebido: ${id}`);
      // Faça algo com o ID
    };
  
    // Use a função com o ID
    useEffect(() => {
      if (id) {
        minhaFuncao(id);
      } else {
        console.error('ID is undefined');
      }
    }, [id]);


    return(
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/Home">Home</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/Filmes">Filmes</Nav.Link>
                        <Nav.Link as={Link} to="/Series">Series</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            <Container>
                <h1>Seja bem vindo ao site Avaliação de Serie</h1>
                <div>
                    <h1>Detalhes do Item</h1>
                    <p>ID: {id}</p>
                </div>
                <Reviews />
            </Container>
        </>
       
    )
}


export default Serie;
