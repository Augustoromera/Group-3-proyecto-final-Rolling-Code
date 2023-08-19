import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/bodyHome.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faStoreSlash, faTruckFast } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import pruebaApi from '../../api/pruebaApi.js';  

export const BodyHome =  () => {
	const [cargarProducto, setCargarProducto] = useState([]);

	useEffect(() => {
		const cargarProductoDB = async () => {
			try {
				const resp = await pruebaApi.get('/admin/listarMenu');
				setCargarProducto(resp.data.menus);
			} catch (error) {
				console.log(error);
			}
		};

		cargarProductoDB();
	}, []);


  return (
    <>
      <div className="banner">
        <div className="banner-body">
          <h3 className="text-uppercase">Bienvenido a Rapiburgers</h3>
          <p>Las mejores hamburguesas y la mejor calidad los encuentras en Rapiburgers</p>
        </div>
      </div>
        <hr />
        <div className="container-fluid">
          <div className="row">
            <div className="col-6">
                <img src="src/assets/images/nosotros/hamburguesa-nosotros-2.jpg" className='img-fluid rounded shadow-sm h-100 w-100 ' alt="imagen de hamburguesa" />
            </div>
            <div className="col-6 d-flex flex-column justify-content-center align-items-start ">
                
                <div className='d-flex flex-column align-items-start' >
                <h1 className='display-2 fw-bold d-flex flex-column align-items-center'>Sobre Nosotros</h1>
                <h1 className='text-center display-5'>Rapiburgers</h1>
                <h5 className='text-xl'>Bienvenidos a nuestro apasionante mundo de sabores en el restaurante de hamburguesas. En nuestro establecimiento, fusionamos la tradición de las hamburguesas clásicas con una dosis de innovación culinaria, creando una experiencia gastronómica que deleita a los amantes de la comida en cada mordisco. </h5>
                <br />
                <Link to="/" className="btn btn-warning btn-lg rounded-pill">Ver más</Link>
              </div>
            </div>
          </div>
        </div>

          <hr />
      <div className="container">
        <h3 className="text-center text-uppercase poppins-regular font-weight-bold">Nuestros servicios</h3>
        <br />
        <div className="row">
          <div className="col-12 col-sm-6 col-md-4">
            <div className="service-item">
              <FontAwesomeIcon className='service-icon' icon={faTruckFast} />
              <h5 className="text-center text-uppercase poppins-regular font-weight-bold">Envíos a domicilio</h5>
              <p className="text-center">Hacemos envíos dentro de las 4 avenidas, te enviamos tu pedido de forma más rápida del mercado gracias a nuestro equipo de cadetería.</p>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-4">
            <div className="service-item">
              <FontAwesomeIcon className='service-icon' icon={faShoppingCart} />
              <h5 className="text-center text-uppercase poppins-regular font-weight-bold">Ventas al por mayor</h5>
              <p className="text-center">Querés deleitar a todos tus invitados en tus reuniones? No tan solo vendemos por menor, sino que tenemos los mejores precios por mayor para vos!</p>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-4">
            <div className="service-item">
              <FontAwesomeIcon className='service-icon' icon={faStoreSlash} />
              <h5 className="text-center text-uppercase poppins-regular font-weight-bold">Reservaciones de local</h5>
              <p className="text-center">Hacemos reservas para todo tipos de eventos en nuestro local, que tu gente disfrute de las más auténticas y deliciosas hamburguesas. </p>
            </div>
          </div>
        </div>
      </div>

      <hr />

	  <div className="container">
	  <h3 className="text-center text-uppercase poppins-regular font-weight-bold">Menú</h3>
	  <br />
	  </div>

    <div className="row">
				{cargarProducto.map((menu) => (
					<div key={menu._id} className="col-md-4 mb-4">
						<Card>
            <img src={menu.imagen} alt={menu.nombre} className="card-img-top" />
							<Card.Body>
								<Card.Title>{menu.nombre}</Card.Title>
								<Card.Text> $ {menu.precio}</Card.Text>
							</Card.Body>
						</Card>
					</div>
				))}
			</div>

    </>
  )
}

export default BodyHome;
