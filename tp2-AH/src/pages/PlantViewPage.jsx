import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Card, Button } from 'react-bootstrap';

function PlantViewPage() {
  const [plant, setPlant] = useState({});
  const { idPlant } = useParams();
  const navigate = useNavigate();

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
      });
  }, [idPlant]);

  const handleDelete = () => {
    const confirmDelete = window.confirm('¿Está seguro de que desea eliminar esta planta?');

    if (confirmDelete) {
      fetch(`http://localhost:2023/plants/${idPlant}`, {
        method: 'DELETE',
        headers: { 'token': localStorage.getItem('token') }
      })
        .then(() => {
          navigate('/plants', { replace: true });
        })
        .catch((error) => console.error('Error al eliminar la planta:', error));
    }
  };

  return (
    
    <div className="d-flex justify-content-center align-items-start mb-5" style={{ height: '82vh' }}>      
      <Card style={{ width: '500px', height: '500px', border: 'none'}} className="mx-auto shadow rounded-bottom-0">
        <Card.Img variant="top" src={`/img/plantas/${plant.imagen}`} alt={plant.imagen} style={{height: 'auto', width: 'auto', margin: '15px'}} />
        <Card.Body className="bg-success shadow-lg">
          <Card.Title style={{ color: 'white', textTransform: 'uppercase'}}>{plant.nombre}</Card.Title>
          <br/>
          <Card.Text style={{ color: 'white'}}>Nombre científico: {plant.nombre_cientifico}</Card.Text>
          <Card.Text style={{ color: 'white'}}>Estacion: {plant.estacion}</Card.Text>
          <Card.Text style={{ color: 'white'}}>Kg/km2: {plant.kg_cosecha_km2}</Card.Text>
          <Card.Text style={{ color: 'white'}}>Luz: {plant.luz}</Card.Text>
          <Card.Text style={{ color: 'white'}}>Ph: {plant.ph}</Card.Text>
          <Link to={`/plants/${idPlant}/edit`}>
            <Button variant="primary" style={{ border: '2px solid #081055' }}>Editar Planta</Button>
          </Link>
          <Button className="mx-5" variant="danger" style={{ border: '2px solid #230004' }} onClick={handleDelete}>Eliminar Planta</Button>          
        </Card.Body>
      </Card>
    </div>
  );
}

export default PlantViewPage;
