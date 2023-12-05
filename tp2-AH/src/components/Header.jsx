import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Header = () => {
    const [links] = useState([
      { url: '/home', texto: 'Home' },
      { url: '/plants', texto: 'Plantas' },
      { url: '/plagues', texto: 'Plagas' },
      { url: '/about', texto: 'Nosotros' },
      { url: '/logout', texto: 'Cerrar sesión' },
    ]);
  
    return (
      <Navbar bg="light" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand as={Link} to="/home">
            <img
              src="/img/mock horizontal.png" 
              width="150"            
              className="d-inline-block align-top"
              alt="Logo"
            />
            {' PlantoWiki'}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="ml-auto">
              {links.map((element, index) => (
                <Nav.Link key={index} as={Link} to={element.url} className='text-success'>
                  {element.texto}
                </Nav.Link>
              ))}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  };

  export default Header;

  