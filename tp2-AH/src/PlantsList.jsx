import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchInput from "./components/SearchInput.jsx";
import { Container, Row, Col, Card, InputGroup } from 'react-bootstrap';

function PlantsList() {
  const [plants, setPlants] = useState([]);
  const [filteredPlants, setFilteredPlants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:2023/plants", {
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
        setPlants(data);
        setFilteredPlants(data);
      });

    return () => {};
  }, [navigate]);

  const handleSearch = (searchTerm) => {
    const filtered = plants.filter((plant) =>
      plant.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPlants(filtered);
  };

  return (
    <Container>      
      <h3 className="display-4 mb-4" style={{ fontWeight: 'bold', color: '#006400' }}>LISTA DE PLANTAS</h3>
      <Link to="/plants/create" className="btn btn-warning ms-3" style={{ border: '2px solid #dba100' }}>
          Crear nueva Planta
        </Link>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <InputGroup className="mb-3">
            <SearchInput onSearch={handleSearch} />
          </InputGroup>
        </Col>
      </Row>
      <Row xs={1} md={3} className="g-4">
        {filteredPlants.map((plant) => (
          <Col key={plant.id}>
            <Card style={{ backgroundColor: plant.deleted ? (plant.deleted === true ? 'red' : 'white') : 'white' }} className="mx-auto shadow">
              <Card.Img
                variant="top"
                src={`/img/plantas/${plant.imagen}`}
                alt={plant.imagen}
                style={{height: 'auto', width: 'auto', margin: '15px'}}
              />
              <Card.Body className="bg-success" style={{ margin: '1px solid rgba(0, 0, 0, 0)' }}>
                <Link style={{ textDecoration: 'none', cursor: 'pointer', textAlign: 'center' }} to={`/plants/${plant.id}`} 
                onMouseEnter={(e) => { e.target.style.color = 'yellow'; }} onMouseLeave={(e) => { e.target.style.color = 'white'; }}> 
                  <Card.Title style={{ color: 'white', textTransform: 'uppercase' }}>{plant.nombre}</Card.Title>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default PlantsList;


