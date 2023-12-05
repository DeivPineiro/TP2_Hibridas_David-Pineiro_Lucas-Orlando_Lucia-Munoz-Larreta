import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      const token = localStorage.getItem('token');

      if (!token) {        
        navigate('/login');
        return;
      }
      try {
        const response = await fetch('http://localhost:2023/api/session', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'token': token
          },
          body: JSON.stringify({ token }),
        });

        if (response.ok) {         
          localStorage.removeItem('token');        
          navigate('/login');
        } else {          
          console.error('Error al cerrar sesión');
        }
      } catch (error) {
        console.error('Error al cerrar sesión:', error);
      }
    };

    logout();
  }, [navigate]);

  return null; 
};

export default Logout;
