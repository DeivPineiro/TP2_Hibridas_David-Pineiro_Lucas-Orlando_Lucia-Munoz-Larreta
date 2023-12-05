import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

function CreatePlaguePage() {
  const navigate = useNavigate();
  const [newPlague, setNewPlague] = useState({
    nombre: '',
    nombre_cientifico: '',
    solucion: '',
    imagen: '',
  });

  const handleCreate = (event) => {
    event.preventDefault();
    
    fetch('http://localhost:2023/plagues', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'token': localStorage.getItem('token'),
      },
      body: JSON.stringify(newPlague),
    })
      .then((response) => {
        if (response.ok) {
          navigate('/plagues');
        } else if (response.status === 401) {
          navigate('/login', { replace: true });
        }
      })
      .catch((error) => console.error('Error al crear la plaga:', error));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewPlague({ ...newPlague, [name]: value });
  };

  return (
    <div className="d-flex justify-content-center align-items-start mb-5" style={{ height: '100vh' }}>
      <Form style={{ width: '600px' }} className="mx-auto">
        <Form.Group className="mb-3" controlId="formPlagueName">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            name="nombre"
            value={newPlague.nombre}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPlagueScientificName">
          <Form.Label>Nombre Científico</Form.Label>
          <Form.Control
            type="text"
            name="nombre_cientifico"
            value={newPlague.nombre_cientifico}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPlagueSolution">
          <Form.Label>Solución</Form.Label>
          <Form.Control
            type="text"
            name="solucion"
            value={newPlague.solucion}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPlagueImage">
          <Form.Label>Imagen</Form.Label>
          <Form.Control
            type="text"
            name="imagen"
            value={newPlague.imagen}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Button variant="success" type="submit" onClick={handleCreate}>
          Crear Plaga
        </Button>
      </Form>
    </div>
  );
}

export default CreatePlaguePage;
