import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchInput from "./components/SearchInput.jsx";
import { Container, Row, Col, Card, InputGroup } from 'react-bootstrap';

function PlaguesList() {
  const [plagues, setPlagues] = useState([]);
  const [filteredPlagues, setFilteredPlagues] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:2023/plagues", {
      method: "GET",
      headers: {
        token: localStorage.getItem("token"),
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else if (response.status === 401) {
          navigate("/login", { replace: true });
        }
      })
      .then((data) => {
        setPlagues(data);
        setFilteredPlagues(data);
      });

    return () => {};
  }, [navigate]);

  const handleSearch = (searchTerm) => {
    const filtered = plagues.filter((plague) =>
      plague.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPlagues(filtered);
  };
  
  return (
    <Container>
      <h3 className="display-4 mb-4" style={{ fontWeight: 'bold', color: '#006400' }}>LISTA DE PLAGAS</h3>
      <Link to="/plagues/create" className="btn btn-warning ms-3" style={{ border: '2px solid #dba100' }}>
          Crear nueva Plaga
        </Link>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <InputGroup className="mb-3">
            <SearchInput onSearch={handleSearch} />
          </InputGroup>
        </Col>
      </Row>
      <Row xs={1} md={3} className="g-4">
        {filteredPlagues.map((plague) => (
          <Col key={plague.id}>
            <Card style={{ backgroundColor: plague.deleted ? (plague.deleted === true ? 'red' : 'white') : 'white'}}className="mx-auto shadow-lg">
              <Card.Img
                variant="top"
                src={`/img/plagas/${plague.imagen}`}
                alt={plague.imagen}
                style={{height: 'auto', width: 'auto', margin: '15px'}}
              />
              <Card.Body className="bg-success">
                <Link style={{ textDecoration: 'none',  cursor: 'pointer', textAlign: 'center' }} to={`/plagues/${plague.id}`} 
                onMouseEnter={(e) => { e.target.style.color = 'yellow'; }} onMouseLeave={(e) => { e.target.style.color = 'white'; }}>
                  <Card.Title style={{ color: 'white', textTransform: 'uppercase'}}>{plague.nombre}</Card.Title>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default PlaguesList;

