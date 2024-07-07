import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { SerieInter, fetchSerieById } from '../services/SeriesApi';
import 'bootstrap/dist/css/bootstrap.min.css';


interface RouteParams {
    id: string;
}

interface Review {
    id: number;
    comentario: string;
    tipo: number;
    nota: number;
    id_tipo: number;
}

interface RatingProps {
  rating: number;
}

const Rating: React.FC<RatingProps> = ({ rating }) => {
  return (
    <div className="rating">
      {'⭐️'.repeat(rating)}
    </div>
  );
};

interface ReviewCardProps {
  review: Review;
}


const Serie: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [serie, setSerie] = useState<SerieInter>();
    const [error, setError] = useState<string | null>(null);

    const minhaFuncao = (id: string) => {
      console.log(`ID recebido: ${id}`);
      // Faça algo com o ID
    };
  
    // Use a função com o ID
    useEffect(() => {
      if (id !== undefined) {
        minhaFuncao(id);
        const getSerieById = async () => {
          try {
              const serie = await fetchSerieById(id);
              console.log(serie);
              setSerie(serie);
          }catch (error){
              setError('Error buscar os filmes');
          }
      };
  
      getSerieById();
    } else {
      console.error('ID is undefined');
    }
    }, [id]);

    const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
        return (
          <div className="media mb-4">
            <img src="https://via.placeholder.com/64" className="mr-3 rounded-circle" alt="User avatar" />
            <div className="media-body">
              <h5 className="mt-0">User</h5> 
              <Rating rating={review.nota} />
              <p>{review.comentario}</p>
            </div>
          </div>
        );
      };
      
      const Reviews: React.FC = () => {
        const [reviews, setReviews] = useState<Review[]>([]);
        const [loading, setLoading] = useState<boolean>(true);
      
        useEffect(() => {
          if (id !== undefined) {
            fetch('http://localhost:8080/avaliacoes/series?id='+id)  // Substitua pela URL da sua API
            .then(response => {
              if (!response.ok) {
                throw new Error('Erro na resposta da rede');
              }
              return response.json();
            })
            .then(data => {
              setReviews(data);
              setLoading(false);
            })
            .catch(error => {
              console.error('Erro ao buscar as avaliações:', error);
              setLoading(false);
            });
          } else {
            console.error('ID is undefined');
          }
        }, [id]);
      
        if (loading) {
          return <div>Carregando...</div>;
        }
      
        return (
          <div className="container mt-5">
            <div className="card">
              <div className="card-header">
                <h2>Avaliações de {serie?.nome ? serie.nome : 'Série'} </h2>
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
                <Reviews />
            </Container>
        </>
       
    )
}

export default Serie;
