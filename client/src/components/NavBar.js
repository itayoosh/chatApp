import { Container, Nav } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';

function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-success text-white">
      <Container>
        <Navbar.Brand>Chats App</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/chats" className="text-white">Chats</Nav.Link>
            <Nav.Link href="/search" className="text-white">Search</Nav.Link>
            <Nav.Link href="/myProfile" className="text-white">My Profile</Nav.Link>
            <Nav.Link href="/logOut" className="text-white">Log Out</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
