import React from 'react'

const MenuCard = ({ imagenSrc, nombre, descripcion }) => {
    return (
      <div className="home-card-menus">
        <img src={imagenSrc} alt={nombre} className="home-imagen-menus" />
        <div className='home-contenedor-info-menus'>
          <h2 className='home-nombre-menus'>{nombre}</h2>
          <p className='home-descripcion-menus'>{descripcion}</p>
        </div>
      </div>
    );
  };
  
  export default MenuCard;