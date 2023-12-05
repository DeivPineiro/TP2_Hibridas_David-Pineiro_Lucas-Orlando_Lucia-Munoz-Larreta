import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function CreatePlantPage() {
    const navigate = useNavigate();
    const [newPlant, setNewPlant] = useState({
      nombre: '',
      estacion: '',
      imagen: '',
      kg_cosecha_km2: '',
      luz: '',
      nombre_cientifico: '',
      ph: '',
      plagas: [],
      tipo: '',
      tipo_terreno: '',    
    });
  
    const handleCreate = (event) => {
      event.preventDefault();
      fetch('http://localhost:2023/plants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': localStorage.getItem('token'),
        },
        body: JSON.stringify(newPlant),        
      })
        .then((response) => {
            console.log(newPlant);
          if (response.ok) {
            return response.json();
          } else if (response.status === 401) {
            navigate('/login', { replace: true });
          } else {
            throw new Error('Error al crear la planta');
          }
        })
        .then((data) => {
          navigate(`/plants`);
        })
        .catch((error) => console.error('Error al crear la planta:', error));
    };
  
    const handleInputChange = (event) => {
        const { name, value } = event.target;    
        if (name === 'plagas') {
          const plagasArray = value.split(',').map(id => id.trim());
          setNewPlant({ ...newPlant, [name]: plagasArray });
        } else {
          setNewPlant({ ...newPlant, [name]: value });
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
              value={newPlant.nombre}
              onChange={handleInputChange}
            />
          </Form.Group>
  
          <Form.Group className="mb-3" controlId="formEstacion">
            <Form.Label>Estacion</Form.Label>
            <Form.Control
              type="text"
              name="estacion"
              value={newPlant.estacion}
              onChange={handleInputChange}
            />
          </Form.Group>
  
          <Form.Group className="mb-3" controlId="formImagen">
            <Form.Label>Imagen</Form.Label>
            <Form.Control
              type="text"
              name="imagen"
              value={newPlant.imagen}
              onChange={handleInputChange}
            />
          </Form.Group>
  
          <Form.Group className="mb-3" controlId="formKgCosecha">
            <Form.Label>Kg Cosecha (por km²)</Form.Label>
            <Form.Control
              type="text"
              name="kg_cosecha_km2"
              value={newPlant.kg_cosecha_km2}
              onChange={handleInputChange}
            />
          </Form.Group>
  
          <Form.Group className="mb-3" controlId="formLuz">
            <Form.Label>Luz</Form.Label>
            <Form.Control
              type="text"
              name="luz"
              value={newPlant.luz}
              onChange={handleInputChange}
            />
          </Form.Group>
  
          <Form.Group className="mb-3" controlId="formNombreCientifico">
            <Form.Label>Nombre Científico</Form.Label>
            <Form.Control
              type="text"
              name="nombre_cientifico"
              value={newPlant.nombre_cientifico}
              onChange={handleInputChange}
            />
          </Form.Group>
  
          <Form.Group className="mb-3" controlId="formPh">
            <Form.Label>pH</Form.Label>
            <Form.Control
              type="text"
              name="ph"
              value={newPlant.ph}
              onChange={handleInputChange}
            />
          </Form.Group>
  
          <Form.Group className="mb-3" controlId="formPlagas">
          <Form.Label>Plagas (IDs separados por coma)</Form.Label>
          <Form.Control
            type="text"
            name="plagas"
            value={newPlant.plagas.join(', ')} 
            onChange={handleInputChange}
          />
        </Form.Group>
  
          <Form.Group className="mb-3" controlId="formTipo">
            <Form.Label>Tipo</Form.Label>
            <Form.Control
              type="text"
              name="tipo"
              value={newPlant.tipo}
              onChange={handleInputChange}
            />
          </Form.Group>
  
          <Form.Group className="mb-3" controlId="formTipoTerreno">
            <Form.Label>Tipo de Terreno</Form.Label>
            <Form.Control
              type="text"
              name="tipo_terreno"
              value={newPlant.tipo_terreno}
              onChange={handleInputChange}
            />
          </Form.Group>
  
          <Button variant="success" type="submit" onClick={handleCreate}>
            Crear Planta
          </Button>
        </Form>
      </div>
    );
  }
  
  export default CreatePlantPage;
  