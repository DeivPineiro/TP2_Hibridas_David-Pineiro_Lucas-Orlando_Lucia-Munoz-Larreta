import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <Container className="mt-5">
      <Row>
        <Col xs={12} className="text-center">
          <h1 className="display-1">404</h1>
          <p className="lead">Página no encontrada :'(</p>
          <p className="mb-4">La página que estás buscando no existe.</p>
          <Link to="/home" className="btn btn-primary">
            Volver al Inicio
          </Link>
        </Col>
      </Row>
    </Container>
  );
}

export default NotFoundPage;
