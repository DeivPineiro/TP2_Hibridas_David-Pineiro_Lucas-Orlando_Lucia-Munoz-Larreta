import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';

function Home() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '83vh' }}> 
    <Container className="mt-5">
      <Row>
        <Col xs={12} md={6} className="text-center">
        <h1 className="display-4 mb-4" style={{ fontWeight: 'bold', color: '#006400' }}>PLANTOPIA WIKI</h1>
          <p className="lead">
          ¡Bienvenido a la Administración de la Wiki de PLANTOPIA! Manejar esta responsabilidad conlleva un gran cuidado. Toda la información que gestionamos está seleccionada, verificada y editada con precisión. Sigamos manteniendo estos altos estándares en nuestro trabajo.
          </p>
        </Col>
        <Col xs={12} md={6} className="text-center">
          <Image
            src="/img/mock.png" 
            alt="Plantopia Wiki"
            fluid            
          />
        </Col>
      </Row>
    </Container> 
    </div> 
  );
}

export default Home;

