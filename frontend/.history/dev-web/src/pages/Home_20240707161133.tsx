import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';

const Home: React.FC = () => {
  // Recuperando nome do usuário do localStorage
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userName = user.nome || '';

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
      <Container className="mt-5">
        <h1>Bem-vindo à sua página inicial</h1>
        {/* Conteúdo da página Home */}
      </Container>
    </>
  );
};

export default Home;
