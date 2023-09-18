import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../pages/styles/bodyHome.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faStoreSlash, faTruckFast } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import MenuCard from '../components/CardMenu';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import Swal from 'sweetalert2';
import pruebaApi from '../api/pruebaApi';
import { useAuth } from '../context/AuthContext';


export const BodyHome = () => {
  const { user } = useAuth();
  const [cargarProducto, setCargarProducto] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 720);
  const textTextBanner = window.innerWidth <= 720 ? "Tu plato favorito a un clic de distancia!" : "Tu paladar merece lo mejor. Siente la excelencia";
  const textButtonBanner = window.innerWidth <= 720 ? "¡Ordenar Ya!" : "Comprar ahora";
  const bannerImages = [

    '/src/assets/banner/Bannerrapiburguerjpeg.jpg',
    '/src/assets/banner/bannerPsh1.jpg',
    '/src/assets/banner/bannerPsh2.jpg',
    '/src/assets/banner/bannerPsh3.jpg'
  ];
  const bannerImagesMini = [
    '/src/assets/banner/bannerMobile.jpg',
    '/src/assets/banner/bannerMobile1.jpg',
    '/src/assets/banner/bannerMobile2.jpg',
    '/src/assets/banner/bannerMobile3.jpeg'
  ];
  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => {
      if (isMobile) {
        return ((prevIndex + 1) % bannerImagesMini.length);
      }
      else {
        return ((prevIndex + 1) % bannerImages.length);
      }
    });
  }

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => {
      if (isMobile) {
        return (prevIndex - 1 + bannerImagesMini.length) % bannerImagesMini.length;
      } else {
        return (prevIndex - 1 + bannerImages.length) % bannerImages.length;
      }
    });
  };
  const cargarProductoDB = async () => {
    try {
      const resp = await pruebaApi.get('/api/mostrarMenus');
      const primerosElementos = resp.data.menus.slice(0, 6);
      setCargarProducto(primerosElementos);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSolicitarPedido = () => {
    window.location.href = "/pedidos";
  };
  function iniciarSesionRedirect() {
    Swal.fire({
      title: "Estás a un paso de comprar en Rapiburguers",
      text: "Accede con tu cuenta para continuar",
      icon: "info",
      showConfirmButton: false
    });

    setTimeout(() => {
      window.location.href = "/login";
    }, 4000);
  }
  const bannerClass = `banner banner-${currentImageIndex}${isMobile ? ' mobile' : ''}`;

  const currentBannerImage = isMobile ? bannerImagesMini[currentImageIndex] : bannerImages[currentImageIndex];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 720);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  useEffect(() => {
    const nextImage = () => {
      setCurrentImageIndex((prevIndex) => {
        if (isMobile) {
          return (prevIndex + 1) % bannerImagesMini.length;
        } else {
          return (prevIndex + 1) % bannerImages.length;
        }
      });
    };
    const intervalId = setInterval(nextImage, currentImageIndex === 0 ? 7000 : 5000);
    return () => clearInterval(intervalId);
  }, [currentImageIndex, bannerImages.length, bannerImagesMini.length, isMobile]);

  useEffect(() => {
    cargarProductoDB()
  }, [])
  return (
    <>

      {/* ----------------banner---------------- */}
      <div className={bannerClass} style={{ backgroundImage: `url(${currentBannerImage})` }}>
        <div className="banner-body">
          <div className="banner-container-text">
            <p className='banner-text1'>{`${textTextBanner}`}</p>
            <p className='banner-text2'>en cada bocado.</p>
          </div>
        </div>
        <div className='button-container-banner'>
          <button className="btn btn-warning btn-lg my-button-buy button-banner" onClick={user ? handleSolicitarPedido : iniciarSesionRedirect}>
          {`${textButtonBanner}`}
          </button>
        </div>
        <button className="btn btn-link banner-control" onClick={handlePrevImage}>
          <i className="fa-solid fa-arrow-left banner-control" style={{ position: 'absolute', top: '50%', left: '20px', transform: 'translateY(-50%)' }}></i>
        </button>
        <button className="btn btn-link banner-control" onClick={handleNextImage}>
          <i className="fa-solid fa-arrow-right banner-control" style={{ position: 'absolute', top: '50%', right: '20px', transform: 'translateY(-50%)' }}></i>
        </button>
      </div>
      <hr />
      {/* ----------------menús---------------- */}
      <div className="container-fluid">
        <h3 className="text-center text-uppercase poppins-regular font-weight-bold display-5">
          Nuestros menús más pedidos
        </h3>
        <br />

        <div className='home-menus row'>

          <div className='home-contenedor-cards-menus'>
            {cargarProducto.map((elemento, index) => (
              <div key={index} className='col-12 col-sm-6 col-md-4 col-lg-2 p-2' onClick={
                user === null
                  ? () => {
                    window.location.href = "/login";
                  }
                  : () => {
                    window.location.href = "/pedidos";
                  }
              }>
                <div className='custom-card mb-2'>
                  <MenuCard
                    nombre={elemento.nombre}
                    descripcion={elemento.detalle}
                    imagenSrc={elemento.imagen}
                  />
                </div>
              </div>
            ))}
          </div>

        </div>
        <div className="text-center">

          <button className="btn btn-warning btn-lg my-button-buy" onClick={user ? handleSolicitarPedido : iniciarSesionRedirect}>
            {user ? "Elije tu hamburguesa" : "Hacer un pedido"}
          </button>

        </div>

      </div>
      <hr />
      {/* ----------------servicios---------------- */}
      <div className="container-fluid">
        <h3 className="text-center text-uppercase poppins-regular font-weight-bold display-5">Nuestros servicios</h3>
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
          <div className="col-12  col-md-4">
            <div className="service-item">
              <FontAwesomeIcon className='service-icon' icon={faStoreSlash} />
              <h5 className="text-center text-uppercase poppins-regular font-weight-bold">Reservaciones de local</h5>
              <p className="text-center">Hacemos reservas para todo tipos de eventos en nuestro local, que tu gente disfrute de las más auténticas y deliciosas hamburguesas. </p>
            </div>
          </div>
        </div>
      </div>
      <hr />
      {/* ----------------sobre nosotros---------------- */}
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-lg-6 espacio-mBlanco">
            <img src="src/assets/images/nosotros/hamburguesa-nosotros-2.jpg" className='img-fluid rounded shadow-sm my-img' alt="imagen de hamburguesa" />
          </div>
          <div className="col-12 col-lg-6 d-flex flex-column justify-content-center align-items-start">
            <div className='d-flex flex-column align-items-start' >
              <h1 className='display-2 fw-bold d-flex flex-column align-items-center m-2'>Sobre Rapiburgers</h1>
              <h1 className='text-center display-5 m-2'>Pasión por las Hamburguesas</h1>
              <h5 className='text-xl m-2'>Bienvenidos a nuestro apasionante mundo de sabores en el restaurante de hamburguesas. En nuestro establecimiento, fusionamos la tradición de las hamburguesas clásicas con una dosis de innovación culinaria, creando una experiencia gastronómica que deleita a los amantes de la comida en cada mordisco. </h5>
              <br />
              <Link to="/aboutus" className="btn btn-warning btn-lg rounded-pill m-2">Ver más</Link>
            </div>
          </div>
        </div>
      </div>
      <hr />





      {/* ----------------mapa---------------- */}
      <div className='text-center mb-4'>
        <h2 className='fw-bold display-5 mb-3'>Dónde estamos?</h2>
        <div className="container-fluid">
          <div className="row">

            <div className="col-12 col-md-6">
              <img src="https://media.traveler.es/photos/6221e27bd380db76a3a865f7/master/w_1600%2Cc_limit/275105567_3784919721633284_4999341144694882386_n.jpg" alt="hamburgueseria" className='img-fluid mb-3 rounded shadow-lg ' />
            </div>
            <div className="col-12 col-md-6 d-flex align-items-center">
              <div className='mb-3'>
                <h3>Nos encontramos en Gral Paz 576 - San Miguel de Tucumán - Argentina</h3>
                <h5>Encuéntranos también por nuestros canales de comunicación!</h5>
                <a href="https://www.facebook.com/" className="btn btn-primary btn-lg mx-2" target="_blank"><i className="fa-brands fa-facebook"></i></a>
                <a href="https://www.instagram.com/" className="btn btn-danger btn-lg mx-2" target="_blank"><i className="fa-brands fa-instagram"></i></a>
                <a className="btn btn-success btn-lg mx-2" href='https://www.whatsapp.com/?lang=es_LA' target='_blank'><FontAwesomeIcon icon={faWhatsapp} /></a>
              </div>
            </div>
          </div>
        </div>
        <iframe className='w-75 ' src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14240.408879082126!2d-65.2072018!3d-26.8367009!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94225d3ad7f30f1d%3A0xf8606cd659b8e3e4!2sRollingCode%20School!5e0!3m2!1ses-419!2sar!4v1690391123408!5m2!1ses-419!2sar" width="1000" height="450" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
      </div>
    </>
  )
}

export default BodyHome;
