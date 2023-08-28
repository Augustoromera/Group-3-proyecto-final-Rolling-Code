import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../pages/styles/bodyHome.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faStoreSlash, faTruckFast } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import pruebaApi from '../api/pruebaapi';

export const BodyHome = () => {
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

      {/* ----------------banner---------------- */}
      <div className="banner">
        <div className="banner-body">
          <h3 className="text-uppercase">Bienvenido a Rapiburgers</h3>
          <p>Las mejores hamburguesas y la mejor calidad los encuentras en Rapiburgers</p>
        </div>
      </div>
      <hr />

      {/* ----------------sobre nosotros---------------- */}
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-lg-6">
            <img src="src/assets/images/nosotros/hamburguesa-nosotros-2.jpg" className='img-fluid rounded shadow-sm h-100 w-100 ' alt="imagen de hamburguesa" />
          </div>
          <div className="col-12 col-lg-6 d-flex flex-column justify-content-center align-items-start ">
            <div className='d-flex flex-column align-items-start' >
              <h1 className='display-2 fw-bold d-flex flex-column align-items-center'>Sobre Nosotros</h1>
              <h1 className='text-center display-5'>Rapiburgers</h1>
              <h5 className='text-xl'>Bienvenidos a nuestro apasionante mundo de sabores en el restaurante de hamburguesas. En nuestro establecimiento, fusionamos la tradición de las hamburguesas clásicas con una dosis de innovación culinaria, creando una experiencia gastronómica que deleita a los amantes de la comida en cada mordisco. </h5>
              <br />
              <Link to="/aboutus" className="btn btn-warning btn-lg rounded-pill">Ver más</Link>
            </div>
          </div>
        </div>
      </div>
      <hr />

      {/* ----------------servicios---------------- */}
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

      {/* ----------------menús---------------- */}
      <div className="container">
        <h3 className="text-center text-uppercase poppins-regular font-weight-bold">Nuestros menús más pedidos</h3>
        <br />
        <div className="row">
          {cargarProducto.map((menu) => (
            <div key={menu._id} className="col-md-4 col-lg-3 mb-4">
              <Card className='h-100'>
                <img src={menu.imagen} alt={menu.nombre} className="card-img-top img-fluid img-card-home" />
                <Card.Body className='d-flex flex-column'>
                  <Card.Title>{menu.nombre}</Card.Title>
                  <Card.Text>{menu.detalle}</Card.Text>
                  <div className="mt-auto">
                    <Card.Text > $ {menu.precio}</Card.Text>
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
        <div className='text-center'>
          <Link to="/" className="btn btn-warning btn-lg rounded-pill ">Ver menús</Link>
        </div>
      </div>
      <hr />

      {/* ----------------mapa---------------- */}
      <div className='text-center mb-4'>
        <h2 className='fw-bold'>Dónde estamos?</h2>
        <iframe className='w-75 ' src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14240.408879082126!2d-65.2072018!3d-26.8367009!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94225d3ad7f30f1d%3A0xf8606cd659b8e3e4!2sRollingCode%20School!5e0!3m2!1ses-419!2sar!4v1690391123408!5m2!1ses-419!2sar" width="1000" height="450" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
      </div>
    </>
  )
}

export default BodyHome;