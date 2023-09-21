import React from 'react'
import '../pages/styles/bodyHome.css';
import 'bootstrap/dist/css/bootstrap.min.css';
const MenuCard = ({ imagenSrc, nombre, descripcion }) => {
    return (
      <div className="home-card-menus">
        <img src={imagenSrc} alt={nombre} className="home-imagen-menus" />
        <div className='home-contenedor-info-menus'>
          <h2 className='home-nombre-menus'>{nombre}</h2>
          <p className='home-descripcion-menus text-center '><i>{descripcion}</i></p>
        </div>
      </div>
    );
  };
  
  export default MenuCard;