import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-light text-center py-3 footer">
      <p>&copy; {new Date().getFullYear()} Plantopia Todos los derechos reservados</p>
    </footer>
  );
};

export default Footer;

