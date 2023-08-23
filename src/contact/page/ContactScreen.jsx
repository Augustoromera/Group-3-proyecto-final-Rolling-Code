import React, { useState, } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from 'react-bootstrap';
import contactApi from '../../api/contactApi';
import Header from '../../home/components/Header';


export const ContactScreen = () => {
 
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  

  const handleContact = async (e) => {
    e.preventDefault();

    // Validaciones
    if (name.trim() === '') {
      alert('Por favor, ingresa tu nombre.');
      return;
    }

    if (lastname.trim() === '') {
      alert('Por favor, ingresa tu apellido.');
      return;
    }

    if (email.trim() === '') {
      alert('Por favor, ingresa tu correo electrónico.');
      return;
    }

    // Expresión regular para validar el formato del correo electrónico
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      alert('Por favor, ingresa un correo electrónico válido.');
      return;
    }



    // Mandar datos al backend
    try {
      const resp = await contactApi.post('/auth/new', {
        name,
        lastname,
        email,
        phone,
        subject,
        message,
      });
      console.log(resp);
      alert('Formulario enviado correctamente');

      // Redireccionar a la misma página después de enviar el formulario
      window.location.reload();

    } catch (error) {
      console.log('Error al enviar el formulario');
      alert('Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo más tarde.');
    }

    
};
 
  return (
    <>
    <Header />

    <div className="container-fluid">
      <h1 className="text-center">Contacto</h1>
      <p className="text-center">
        No dudes en ponerte en contacto con nosotros si tienes dudas o sugerencias. <br />
        Nuestro equipo se pondrá en contacto contigo cuanto antes!
      </p>
      
            <br />
      <div className="row ">
      <div className="col-12 col-lg-6 mb-4">
        <div>
            <img src="https://viajes.nationalgeographic.com.es/medio/2022/05/26/de-hamburgo-para-el-mundo_b927e79b_2000x1333.jpg" className='img-fluid rounded-3 shadow-lg w-lg-75 ' alt="hamburguesas" />
        </div>
        </div>
        <div className="col-12 col-lg-6 px-lg-5 d-flex align-items-center ">
          <div>
        <h2 className='mb-5'>Completa el formulario con tus datos</h2>
          <Form onSubmit={handleContact}>
            <div className="row">
              <div className="col-12 col-md-6 col-lg-6">
              <Form.Group className="mb-3 " controlId="firstName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text" name="firstName" required minLength={2} maxLength={50} onChange={(e) => setName(e.target.value)} placeholder='Ingresa tu nombre' />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" required onChange={(e) => setEmail(e.target.value)} minLength={2} maxLength={50} placeholder='Ingresa tu email' />
            </Form.Group>
              </div>
              <div className="col-12 col-md-6 col-lg-6">
              <Form.Group className="mb-3" controlId="lastName">
              <Form.Label>Apellido</Form.Label>
              <Form.Control type="text" name="lastName" required minLength={2} maxLength={50} onChange={(e) => setLastname(e.target.value)} placeholder='Ingresa tu apellido' />
            </Form.Group>
            <Form.Group className="mb-3" controlId="phone">
              <Form.Label>Teléfono (opcional)</Form.Label>
              <Form.Control type="tel" name="phone" minLength={5} maxLength={12} onChange={(e) => setPhone(e.target.value)} />
            </Form.Group>
              </div>
              <div className="col-12">
              <Form.Group className="mb-3" controlId="subject">
              <Form.Label>Asunto</Form.Label>
              <Form.Control type="text" name="subject" minLength={4} maxLength={20} onChange={(e) => setSubject(e.target.value)} required placeholder='Ingresa un asunto' />
            </Form.Group>

            <Form.Group className="mb-3" controlId="message">
              <Form.Label>Mensaje</Form.Label>
              <Form.Control as="textarea" rows={4} name="message" required minLength={5} maxLength={75} onChange={(e) => setMessage(e.target.value)} placeholder='Escribe un mensaje' />
            </Form.Group>
              </div>
            </div>
            <Button variant="primary" type="submit" className="mb-4" >
              Enviar
            </Button>
          </Form>
        </div>
        </div>
        <div className='text-center mb-4'>
            <h2 className='fw-bold'>Dónde estamos?</h2>
            <iframe className='w-75 ' src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14240.408879082126!2d-65.2072018!3d-26.8367009!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94225d3ad7f30f1d%3A0xf8606cd659b8e3e4!2sRollingCode%20School!5e0!3m2!1ses-419!2sar!4v1690391123408!5m2!1ses-419!2sar" width="1000" height="450" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>

      </div>
    </div>
    </>
  );
};
