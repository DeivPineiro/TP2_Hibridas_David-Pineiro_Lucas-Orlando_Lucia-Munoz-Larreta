import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Card, Button } from 'react-bootstrap';

function PlagueViewPage() {
  const [plague, setPlague] = useState({});
  const { idPlague } = useParams();
  const navigate = useNavigate();

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
      });
  }, [idPlague]);

  const handleDelete = () => {
    console.log(idPlague);
    const confirmDelete = window.confirm('¿Está seguro de que desea eliminar esta plaga?');

    if (confirmDelete) {
      fetch(`http://localhost:2023/plagues/${idPlague}`, {
        method: 'DELETE',
        headers: { 'token': localStorage.getItem('token') }
      })
        .then(() => {
          navigate('/plagues', { replace: true });
        })
        .catch((error) => console.error('Error al eliminar la plaga:', error));
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-start mb-5" style={{ height: '82vh' }}>
      <Card style={{ width: '500px', height: '500px', border: 'none', backgroundColor: 'white' }} className="mx-auto shadow-lg rounded-bottom-0">
        <Card.Img variant="top" src={`/img/plagas/${plague.imagen}`} alt={plague.imagen} style={{height: 'auto', width: 'auto', margin: '15px'}} />
        <Card.Body className="bg-success shadow-lg">
          <Card.Title style={{ color: 'white', textTransform: 'uppercase'}}>{plague.nombre}</Card.Title>
          <br/>
          <Card.Text style={{ color: 'white'}}>Nombre cientifico: {plague.nombre_cientifico}</Card.Text>
          <Card.Text style={{ color: 'white'}}>Solución: {plague.solucion}</Card.Text>          
          <Link to={`/plagues/${idPlague}/edit`}>
            <Button variant="primary" style={{ border: '2px solid #081055' }}>Editar Plaga</Button>
          </Link>
          <Button className="mx-5" variant="danger" style={{ border: '2px solid #230004' }} onClick={handleDelete}>Eliminar Plaga</Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default PlagueViewPage;

