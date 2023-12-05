import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

function EditPlaguePage() {
  const { idPlague } = useParams();
  const navigate = useNavigate();
  const [plague, setPlague] = useState({ nombre: '' });
  const [updatedPlague, setUpdatedPlague] = useState({
    nombre: '',
    nombre_cientifico: '',
    solucion: '',
    imagen: '',
    deleted: false,
  });

  useEffect(() => {
    fetch(`http://localhost:2023/plagues/${idPlague}`, {
      method: 'GET',
      headers: { 'token': localStorage.getItem('token') }
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else if (response.status === 401) {
          navigate('/login', { replace: true });
        }
      })
      .then((data) => {
        setPlague(data);
        setUpdatedPlague(data);
      });
  }, [idPlague, navigate]);

  const handleUpdate = (event) => {
    event.preventDefault();
    fetch(`http://localhost:2023/plagues/${idPlague}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'token': localStorage.getItem('token')
      },
      body: JSON.stringify(updatedPlague)
    })
      .then((response) => {
        if (response.ok) {
          navigate(`/plagues/${idPlague}`);
        } else if (response.status === 401) {
          navigate('/login', { replace: true });
        }
      })
      .catch((error) => console.error('Error al actualizar la plaga:', error));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === 'deleted') {
      setUpdatedPlague({ ...updatedPlague, [name]: value === 'true' });
    } else {
      setUpdatedPlague({ ...updatedPlague, [name]: value });
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-start mb-5" style={{ height: '100vh' }}>
      <Form style={{ width: '600px' }} className="mx-auto">
        <Form.Group className="mb-3" controlId="formPlagueName">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            name="nombre"
            value={updatedPlague.nombre}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPlagueScientificName">
          <Form.Label>Nombre Científico</Form.Label>
          <Form.Control
            type="text"
            name="nombre_cientifico"
            value={updatedPlague.nombre_cientifico}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPlagueSolution">
          <Form.Label>Solución</Form.Label>
          <Form.Control
            type="text"
            name="solucion"
            value={updatedPlague.solucion}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPlagueImage">
          <Form.Label>Imagen</Form.Label>
          <Form.Control
            type="text"
            name="imagen"
            value={updatedPlague.imagen}
            onChange={handleInputChange}
          />
        </Form.Group>

        {updatedPlague.deleted !== undefined && ( // Solo se va a ver si está deleted, en caso contrario no
          <Form.Group className="mb-3" controlId="formDeleted">
            <Form.Label>Eliminada</Form.Label>
            <Form.Control
              as="select"
              name="deleted"
              value={updatedPlague.deleted.toString()}
              onChange={handleInputChange}
            >
              <option value="false">No</option>
              <option value="true">Sí</option>
            </Form.Control>
          </Form.Group>
        )}

        <Button variant="primary" type="submit" onClick={handleUpdate}>
          Actualizar Plaga
        </Button>
      </Form>
    </div>
  );
}

export default EditPlaguePage;
