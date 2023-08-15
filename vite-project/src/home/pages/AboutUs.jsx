import React from 'react';
import '../css/about.css';
import 'font-awesome/css/font-awesome.min.css';
import { Navbar } from '../../components/Navbar';
import ImagenPaulo from '../../img/yo.jpeg';
import ImagenAugusto from '../../img/Augusto.jpeg';
import ImagenNicolas from '../../img/Nico.jpeg';

export const AboutUs = () => {

    const imgPaulo = ImagenPaulo;
    const imgAugusto = ImagenAugusto;
    const imgNico = ImagenNicolas;


  return (
    <>
     <h1 className='title-nosotros'>Nuestro equipo</h1>

     <div className="container-cuadrado">
        <div className="cuadrado cuadrado1"></div>
        <div className="cuadrado cuadrado2"></div>
        <div className="cuadrado cuadrado3"></div>
    </div>
    <div className="container-cards">
    <div className="card">
            <div className="cover-card">
                <img src={imgPaulo} alt="Paulo, integrante del grupo"/>
            </div>
            <h2>Paulo Srur</h2>
            <p className="p-espacio1">Hola! soy Paulo y tengo 19 años, un apasionado de la tecnología y la programación desde chico, nunca dejaré de aprender y uno de mis objetivos es convertir esta pasión en una carrera sólida. Full stack MERN en progreso. Mi hobbie es el fútbol y aguante Messi. </p>

            <div className="wrapper">
                <ul className="iconos">
                    <li className="facebook"><a href="https://www.facebook.com" target="_blank"><i className="fa fa-facebook fa-2x" aria-hidden="true"></i></a></li>
                    <li className="instagram"><a href="https://www.instagram.com" target="_blank"><i className="fa fa-instagram fa-2x" aria-hidden="true"></i></a> </li>
                    <li className="linkedin"><a href="https://www.linkedin.com" target="_blank"><i className="fa fa-linkedin fa-2x" aria-hidden="true"></i></a> </li>
                </ul>
               </div>

            <hr/>
            <div className="footer-card">
                <h3 className="user-name"> Rolling Code</h3>
                <i>45i</i>
            </div>
         </div>
        
         <div className="card">
            <div className="cover-card">
                <img src={imgAugusto} alt="Augusto, integrante del grupo"/>
            </div>
            <h2>Augusto Romera</h2>
            <p className="p-espacio2">Augusto Romera, 24 años, soy estudiante de ingeniería en sistemas de información, con estudios en rolling code para full stack developer disfruto explorando la naturaleza y los momentos al aire libre. Además, encuentro fascinación en la lógica y en enfrentar desafíos.</p>

            <div className="wrapper">
                <ul className="iconos">
                    <li className="facebook"><a href="https://www.facebook.com" target="_blank"><i className="fa fa-facebook fa-2x" aria-hidden="true"></i></a></li>
                    <li className="instagram"><a href="https://www.instagram.com" target="_blank"><i className="fa fa-instagram fa-2x" aria-hidden="true"></i></a> </li>
                    <li className="linkedin"><a href="https://www.linkedin.com" target="_blank"><i className="fa fa-linkedin fa-2x" aria-hidden="true"></i></a> </li>
                </ul>
               </div>

            <hr/>
            <div className="footer-card">
                <h3 className="user-name"> Rolling Code</h3>
                <i>45i</i>
            </div>
         </div>

         <div className="card">
            <div className="cover-card">
                <img src={imgNico} alt="Nicolas, integrante del grupo"/>
            </div>
            <h2>Nicolas Chia</h2>
            <p className="p-espacio3">Nicolas Chia, 28 años, soy Técnico Mecatrónico y estudio Ing Civil en la UTN. También estoy desarrollando habilidades para ser un Full Stack Developer en Rolling Code. Soy apasionado por el fútbol y compartir con amigos</p>

            <div className="wrapper">
                <ul className="iconos">
                    <li className="facebook"><a href="https://www.facebook.com" target="_blank"><i className="fa fa-facebook fa-2x" aria-hidden="true"></i></a></li>
                    <li className="instagram"><a href="https://www.instagram.com" target="_blank"><i className="fa fa-instagram fa-2x" aria-hidden="true"></i></a> </li>
                    <li className="linkedin"><a href="https://www.linkedin.com" target="_blank"><i className="fa fa-linkedin fa-2x" aria-hidden="true"></i></a> </li>
                </ul>
               </div>

            <hr/>
            <div className="footer-card">
                <h3 className="user-name"> Rolling Code</h3>
                <i>45i</i>
            </div>
         </div>

         <div className="card">
            <div className="cover-card">
                <img src="/img/ro.jpg" alt="Belen, integrante del grupo."/>
            </div>
            <h2>Belen Cordoba</h2>
            <p className="p-espacio4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, culpa. Rerum, repellat quos. Et esse iusto reprehenderit assumenda voluptas. Tempore, ab. Fuga reprehenderit quam voluptate ipsam consequatur officia modi obcaecati.</p>
                   
            <div className="wrapper">
                <ul className="iconos">
                    <li className="facebook"><a href="https://www.facebook.com" target="_blank"><i className="fa fa-facebook fa-2x" aria-hidden="true"></i></a></li>
                    <li className="instagram"><a href="https://www.instagram.com" target="_blank"><i className="fa fa-instagram fa-2x" aria-hidden="true"></i></a> </li>
                    <li className="linkedin"><a href="https://www.linkedin.com" target="_blank"><i className="fa fa-linkedin fa-2x" aria-hidden="true"></i></a> </li>
                </ul>
               </div>

            <hr/>
            <div className="footer-card">
                <h3 className="user-name"> Rolling Code</h3>
                <i>45i</i>
            </div>
         </div>

         <div className="card">
            <div className="cover-card">
                <img src="/img/yo (3).jpeg" alt="Santiago, integrante del grupo."/>
            </div>
            <h2>Santiago Gonzalez</h2>
            <p className="p-espacio5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto officiis sint, in est laborum odit repellendus quis laudantium rerum quas atque perferendis commodi qui provident, asperiores facere consectetur illum. Saepe! </p>

           <div className="wrapper">
            <ul className="iconos">
                <li className="facebook"><a href="https://www.facebook.com" target="_blank"><i className="fa fa-facebook fa-2x" aria-hidden="true"></i></a></li>
                <li className="instagram"><a href="https://www.instagram.com" target="_blank"><i className="fa fa-instagram fa-2x" aria-hidden="true"></i></a> </li>
                <li className="linkedin"><a href="https://www.linkedin.com" target="_blank"><i className="fa fa-linkedin fa-2x" aria-hidden="true"></i></a> </li>
            </ul>
           </div>

            <hr/>
            <div className="footer-card">
                <h3 className="user-name"> Rolling Code</h3>
                <i>45i</i>
            </div>
         </div>
    </div>
    




    </>
  )
}
