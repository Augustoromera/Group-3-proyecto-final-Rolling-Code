import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from 'react-bootstrap';
import Header from '../components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './styles/contact.css';
import { faFacebook, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { Footer } from '../components/Footer';
import Swal from 'sweetalert2';

export const ContactScreen = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    //  ---------------------------Validaciones de campos--------------------------------

    // Validación para el campo de nombre
    if (formData.firstName.trim() === '' || !/^[A-Za-z ]+$/.test(formData.firstName)) {
      Swal.fire({
        icon: 'error',
        title: 'Error en el nombre',
        text: 'Por favor, ingresa un nombre válido.',
        background: 'black',
        color: 'white',
        customClass: {
          container: 'custom-swal-container',
          title: 'custom-swal-title',
          content: 'custom-swal-content',
          confirmButton: 'custom-swal-confirm-button',
          cancelButton: 'custom-swal-cancel-button',
        },
      });
      return;
    }

    // Validación para el campo de apellido
    if (formData.lastName.trim() === '' || !/^[A-Za-z ]+$/.test(formData.lastName)) {
      Swal.fire({
        icon: 'error',
        title: 'Error en el apellido',
        text: 'Por favor, ingresa un apellido válido.',
        background: 'black',
        color: 'white',
        customClass: {
          container: 'custom-swal-container',
          title: 'custom-swal-title',
          content: 'custom-swal-content',
          confirmButton: 'custom-swal-confirm-button',
          cancelButton: 'custom-swal-cancel-button',
        },
      });
      return;
    }

    // Validación para el campo de correo electrónico
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      Swal.fire({
        icon: 'error',
        title: 'Error en el correo electrónico',
        text: 'Por favor, ingresa un correo electrónico válido.',
        background: 'black',
        color: 'white',
        customClass: {
          container: 'custom-swal-container',
          title: 'custom-swal-title',
          content: 'custom-swal-content',
          confirmButton: 'custom-swal-confirm-button',
          cancelButton: 'custom-swal-cancel-button',
        },
      });
      return;
    }

    // Validación para el campo de teléfono
    if (formData.phone.trim() !== '' && !/^(?:\d*\+?\d*)$/.test(formData.phone)) {
      Swal.fire({
        icon: 'error',
        title: 'Error en el teléfono',
        text: 'Por favor, ingresa un teléfono válido.',
        background: 'black',
        color: 'white',
        customClass: {
          container: 'custom-swal-container',
          title: 'custom-swal-title',
          content: 'custom-swal-content',
          confirmButton: 'custom-swal-confirm-button',
          cancelButton: 'custom-swal-cancel-button',
        },
      });
      return;
    }
    
    

    // Validación para el campo de asunto
    if (formData.subject.trim() === '') {
      Swal.fire({
        icon: 'error',
        title: 'Error en el asunto',
        text: 'Por favor, ingresa un asunto.',
        background: 'black',
        color: 'white',
        customClass: {
          container: 'custom-swal-container',
          title: 'custom-swal-title',
          content: 'custom-swal-content',
          confirmButton: 'custom-swal-confirm-button',
          cancelButton: 'custom-swal-cancel-button',
        },
      });
      return;
    }

    // Validación para el campo de mensaje
    if (formData.message.trim() === '') {
      Swal.fire({
        icon: 'error',
        title: 'Error en el mensaje',
        text: 'Por favor, escribe un mensaje.',
        background: 'black',
        color: 'white',
        customClass: {
          container: 'custom-swal-container',
          title: 'custom-swal-title',
          content: 'custom-swal-content',
          confirmButton: 'custom-swal-confirm-button',
          cancelButton: 'custom-swal-cancel-button',
        },
      });
      return;
    }

    setTimeout(() => {
      Swal.fire({
        icon: 'success',
        title: 'Formulario enviado correctamente!',
        html: 'Nuestro equipo recibió tu solicitud',
        showConfirmButton: false,
        background: 'black',
        color: 'white',
        customClass: {
          container: 'custom-swal-container',
          title: 'custom-swal-title',
          content: 'custom-swal-content',
          confirmButton: 'custom-swal-confirm-button',
          cancelButton: 'custom-swal-cancel-button',
        },
        timer: 3000,
      }).then(() => {
        window.location.href = '/contact';
      });
    }, 200);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "firstName" || name === "lastName") {
      const alphabeticRegex = /^[A-Za-z ]+$/;
      if (!alphabeticRegex.test(value) && value !== "") {
        return;
      }
    }
    if (name === "phone") {
      const numericRegex =/^[0-9+]+$/
      ;
      if (!numericRegex.test(value) && value !== "") {
        return;
      }
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  return (
    <>
      <Header />
      <div className="container-fluid micontenedor principal">
        <h1 id="top" className="text-center display-3">
          Contacto
        </h1>
        <p className="text-center">
          No dudes en ponerte en contacto con nosotros si tienes dudas o sugerencias. <br />
          Nuestro equipo se pondrá en contacto contigo cuanto antes!
        </p>

        <br />
        <div className="row ">
          <div className="col-12 col-lg-6 mb-4">
            <div>
              <img
                src="https://viajes.nationalgeographic.com.es/medio/2022/05/26/de-hamburgo-para-el-mundo_b927e79b_2000x1333.jpg"
                className="img-fluid rounded-3 shadow-lg w-lg-75 "
                alt="hamburguesas"
              />
            </div>
          </div>
          <div className="col-12 col-lg-6 px-lg-5 d-flex align-items-center ">
            <div>
              <h2 className="mb-5">Completa el formulario con tus datos</h2>

              <Form className="container-fluid micontenedor" onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-12 col-md-6">
                    <Form.Group className="mb-3 " controlId="firstName">
                      <Form.Label>Nombre</Form.Label>
                      <Form.Control
                        type="text"
                        name="firstName"
                        required
                        minLength={2}
                        maxLength={50}
                        placeholder="Ingresa tu nombre"
                        value={formData.firstName}
                        onChange={(e) => handleChange(e)}
                      />
                    </Form.Group>
                  </div>
                  <div className="col-12 col-md-6">
                    <Form.Group className="mb-3" controlId="lastName">
                      <Form.Label>Apellido</Form.Label>
                      <Form.Control
                        type="text"
                        name="lastName"
                        required
                        minLength={2}
                        maxLength={50}
                        placeholder="Ingresa tu apellido"
                        value={formData.lastName}
                        onChange={(e) => handleChange(e)}
                      />
                    </Form.Group>
                  </div>
                  <div className="col-12 col-md-6">
                    <Form.Group className="mb-3" controlId="email">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        required
                        minLength={2}
                        maxLength={50}
                        placeholder="Ingresa tu email"
                        value={formData.email}
                        onChange={(e) => handleChange(e)}
                      />
                    </Form.Group>
                  </div>
                  <div className="col-12 col-md-6">
                    <Form.Group className="mb-3" controlId="phone">
                      <Form.Label>Teléfono (opcional)</Form.Label>
                      <Form.Control
                        type="tel"
                        name="phone"
                        minLength={5}
                        maxLength={12}
                        value={formData.phone}
                        onChange={(e) => handleChange(e)}
                      />
                    </Form.Group>
                  </div>
                </div>
                <div className="col-12">
                  <Form.Group className="mb-3" controlId="subject">
                    <Form.Label>Asunto</Form.Label>
                    <Form.Control
                      type="text"
                      name="subject"
                      minLength={4}
                      maxLength={20}
                      required
                      placeholder="Ingresa un asunto"
                      value={formData.subject}
                      onChange={(e) => handleChange(e)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="message">
                    <Form.Label>Mensaje</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      name="message"
                      required
                      minLength={5}
                      maxLength={75}
                      placeholder="Escribe un mensaje"
                      value={formData.message}
                      onChange={(e) => handleChange(e)}
                    />
                  </Form.Group>
                </div>

                <Button variant="primary" type="submit" className="mb-4">
                  Enviar
                </Button>
              </Form>
            </div>
          </div>
        </div>

        <div className="text-center mb-4">
          <h2 className="fw-bold display-5 mb-3">Dónde estamos?</h2>
          <div className="container-fluid micontenedor">
            <div className="row">
              <div className="col-12 col-md-6">
                <img
                  src="https://media.traveler.es/photos/6221e27bd380db76a3a865f7/master/w_1600%2Cc_limit/275105567_3784919721633284_4999341144694882386_n.jpg"
                  alt="hamburgueseria"
                  className="img-fluid mb-3 rounded shadow-lg "
                />
              </div>
              <div className="col-12 col-md-6 d-flex align-items-center">
                <div className="mb-3">
                  <h3>Nos encontramos en Gral Paz 576 - San Miguel de Tucumán - Argentina</h3>
                  <h5>Encuéntranos también por nuestros canales de comunicación!</h5>
                  <a className="btn btn-primary btn-lg mx-2" href="https://www.facebook.com/" target="_blank">
                    <FontAwesomeIcon icon={faFacebook} />
                  </a>
                  <a className="btn btn-danger btn-lg mx-2" href="https://www.instagram.com/" target="_blank">
                    <FontAwesomeIcon icon={faInstagram} />
                  </a>
                  <a href="https://www.whatsapp.com/?lang=es_LA" className="btn btn-success btn-lg mx-2" target="_blank">
                    <FontAwesomeIcon icon={faWhatsapp} />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <iframe
            className="w-75 "
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14240.408879082126!2d-65.2072018!3d-26.8367009!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94225d3ad7f30f1d%3A0xf8606cd659b8e3e4!2sRollingCode%20School!5e0!3m2!1ses-419!2sar!4v1690391123408!5m2!1ses-419!2sar"
            width="1000"
            height="450"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
      <Footer />
    </>
  );
};
