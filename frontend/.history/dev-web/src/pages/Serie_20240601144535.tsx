import React, { useEffect } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

interface RouteParams {
    id: string;
  }
  

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
            </Container>
        </>
       
    )
}


export default Serie;
