import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Alert } from 'react-bootstrap';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        setError(''); 

        fetch('http://localhost:2023/api/session', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Error de inicio de sesión');
                }
                return res.json();
            })
            .then((result) => {
                localStorage.setItem('token', result.token);
                localStorage.setItem('User', result.account);
                console.log(result);
                navigate('/home', { replace: true });
            })
            .catch((error) => {
                setError('Error al iniciar sesión. Por favor, verifica tus credenciales.');
            });
    }

    return (
        <Container className="login-container mt-5" style={{ maxWidth: "400px" }}>
      <h1 className="login-title mb-4">Iniciar Sesión</h1>
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            placeholder="Ingrese su email"
            value={email}
            onChange={handleEmail}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Contraseña:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Ingrese su contraseña"
            value={password}
            onChange={handlePassword}
            required
          />
        </Form.Group>

        <Button variant="success" type="submit">
          Ingresar
        </Button>
      </Form>
    </Container>
    );
}

export default Login;
