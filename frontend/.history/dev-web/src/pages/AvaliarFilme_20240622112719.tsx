import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

export function AvaliarFilme(){
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
                <h1>Seja bem vindo ao site Avaliação de filmes</h1>
            </Container>
        </>
       
    )
}