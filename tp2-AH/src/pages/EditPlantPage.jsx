import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

function EditPlantPage() {
  const { idPlant } = useParams();
  const navigate = useNavigate();
  const [plant, setPlant] = useState({ nombre: '' });
  const [updatedPlant, setUpdatedPlant] = useState({
    nombre: '',
    estacion: '',
    imagen: '',
    kg_cosecha_km2: '',
    luz: '',
    nombre_cientifico: '',
    ph: '',
    plagas: '',
    tipo: '',
    tipo_terreno: '',
  });

  useEffect(() => {
    fetch(`http://localhost:2023/plants/${idPlant}`, {
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
        setPlant(data);
        setUpdatedPlant(data);
      });
  }, [idPlant, navigate]);

  const handleUpdate = (event) => {
    event.preventDefault();
    fetch(`http://localhost:2023/plants/${idPlant}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'token': localStorage.getItem('token')
      },
      body: JSON.stringify(updatedPlant)
    })
      .then((response) => {
        if (response.ok) {
          navigate(`/plants/${idPlant}`);
        } else if (response.status === 401) {
          navigate('/login', { replace: true });
        }
      })
      .catch((error) => console.error('Error al actualizar la planta:', error));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === 'plagas') {
      const plagasArray = value.split(',').map(id => id.trim());//trim elimina espacios en blanco
      setUpdatedPlant({ ...updatedPlant, [name]: plagasArray });
    } else {
      setUpdatedPlant({ ...updatedPlant, [name]: value });
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-start mb-5" style={{ height: '100vh' }}>
      <Form style={{ width: '600px' }} className="mx-auto">
        <Form.Group className="mb-3" controlId="formPlantName">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            name="nombre"
            value={updatedPlant.nombre}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEstacion">
          <Form.Label>Estacion</Form.Label>
          <Form.Control
            type="text"
            name="estacion"
            value={updatedPlant.estacion}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formImagen">
          <Form.Label>Imagen</Form.Label>
          <Form.Control
            type="text"
            name="imagen"
            value={updatedPlant.imagen}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formKgCosecha">
          <Form.Label>Kg Cosecha (por km²)</Form.Label>
          <Form.Control
            type="text"
            name="kg_cosecha_km2"
            value={updatedPlant.kg_cosecha_km2}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formLuz">
          <Form.Label>Luz</Form.Label>
          <Form.Control
            type="text"
            name="luz"
            value={updatedPlant.luz}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formNombreCientifico">
          <Form.Label>Nombre Científico</Form.Label>
          <Form.Control
            type="text"
            name="nombre_cientifico"
            value={updatedPlant.nombre_cientifico}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPh">
          <Form.Label>pH</Form.Label>
          <Form.Control
            type="text"
            name="ph"
            value={updatedPlant.ph}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPlagas">
          <Form.Label>Plagas (IDs separados por coma)</Form.Label>
          <Form.Control
            type="text"
            name="plagas"
            value={updatedPlant.plagas}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formTipo">
          <Form.Label>Tipo</Form.Label>
          <Form.Control
            type="text"
            name="tipo"
            value={updatedPlant.tipo}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formTipoTerreno">
          <Form.Label>Tipo de Terreno</Form.Label>
          <Form.Control
            type="text"
            name="tipo_terreno"
            value={updatedPlant.tipo_terreno}
            onChange={handleInputChange}
          />
        </Form.Group>

        {updatedPlant.deleted !== undefined && ( // Solo se va a ver si esta deleted, en caso contrario no
          <Form.Group className="mb-3" controlId="formDeleted">
            <Form.Label>Eliminada</Form.Label>
            <Form.Control
              as="select"
              name="deleted"
              value={updatedPlant.deleted}
              onChange={handleInputChange}
            >
              <option value={false}>No</option>
              <option value={true}>Sí</option>
            </Form.Control>
          </Form.Group>
        )}

        <Button variant="primary" type="submit" onClick={handleUpdate}>
          Actualizar Planta
        </Button>
      </Form>
    </div>
  );
}

export default EditPlantPage;


