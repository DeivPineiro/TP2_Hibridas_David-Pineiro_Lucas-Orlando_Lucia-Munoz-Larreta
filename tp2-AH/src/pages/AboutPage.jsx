import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';

function AboutPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '83vh' }}>
    <Container className="mt-5">
      <Row>
        <Col xs={12} className="text-center">
        <h1 className="display-4 mb-4" style={{ fontWeight: 'bold', color: '#006400' }}>NOSOTROS</h1>
          <p className="lead">
            En PLANTOPIA WIKI, nos dedicamos a ofrecer una plataforma confiable y precisa para la administración de información sobre plantas y plagas. Nuestro compromiso es mantener altos estándares de calidad y veracidad en cada detalle.
          <br/>
            Con un equipo apasionado por la botánica y la protección de cultivos, trabajamos arduamente para brindarte la mejor experiencia posible en la gestión de datos relacionados con la flora y la fauna.
          </p>
        </Col>
      </Row>
      <Row>
        <Col xs={12} className="text-center mt-4">
          <Image
            src="/img/plagues.png" 
            alt="Plantopia Wiki"
            fluid
            style={{ maxWidth: '400px' }}  
          />
        </Col>
      </Row>
    </Container>
    </div>
  );
}

export default AboutPage;
