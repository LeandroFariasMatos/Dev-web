import React from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userName = user.nome || '';

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/Login');
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
          <Navbar.Text className="mr-3">
            Bem-vindo, {userName}!
          </Navbar.Text>
          <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
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
