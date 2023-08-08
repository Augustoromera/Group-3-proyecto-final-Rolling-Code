import React, { useState, } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from 'react-bootstrap';
import contactApi from '../../api/contactApi';



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
    <div className="container-fluid">
      <h1 className="text-center">Contacto</h1>
      <p className="text-center">
        No dudes en ponerte en contacto con nosotros si tienes dudas o sugerencias. <br />
        Si quieres trabajar con nosotros, postulate aquí.
      </p>
      <h2 className="text-center">Completa el formulario con tus datos</h2>

      <div className="row d-flex justify-content-center ">
        <div className="col-12 col-lg-4 ">
          <Form onSubmit={handleContact}>
            <Form.Group className="mb-3 " controlId="firstName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                required
                minLength={2}
                maxLength={50}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="lastName">
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                required
                minLength={2}
                maxLength={50}
                onChange={(e) => setLastname(e.target.value)}
              />
              <hr />
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                required
                onChange={(e) => setEmail(e.target.value)}
                minLength={2}
                maxLength={50}
              />
              <hr />
            </Form.Group>

            <Form.Group className="mb-3" controlId="phone">
              <Form.Label>Teléfono (opcional)</Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                minLength={5}
                maxLength={12}
                onChange={(e) => setPhone(e.target.value)}
              />
              <hr />
            </Form.Group>

            <Form.Group className="mb-3" controlId="subject">
              <Form.Label>Asunto</Form.Label>
              <Form.Control
                type="text"
                name="subject"
                minLength={4}
                maxLength={20}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
              <hr />
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
                onChange={(e) => setMessage(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Enviar
            </Button>
          </Form>
        </div>
      </div>
     
    </div>
  );
};
