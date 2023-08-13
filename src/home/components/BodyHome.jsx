import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/bodyHome.css';

export const BodyHome = () => {
  return (
    <>
      <div className="banner">
	    <div className="banner-body">
	        <h3 className="text-uppercase">Bienvenido a Rapiburgers</h3>
	        <p>Las mejores hamburguesas y la mejor calidad los encuentras en Rapiburgers</p>
	        <a href="menu.html" className="btn btn-warning"> &nbsp; Ir al menu</a>
	    </div>
	</div>
    </>
  )
}

export default BodyHome;
