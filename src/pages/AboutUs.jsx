import React from 'react';
import './styles/about.css';
import 'font-awesome/css/font-awesome.min.css';
import ImagenPaulo from '../assets/images/profiles/yo.jpeg';
import ImagenAugusto from '../assets/images/profiles/Augusto.jpeg';
import ImagenNicolas from '../assets/images/profiles/Nico.jpeg';
import ImagenSantiago from '../assets/images/profiles/Santiago.jpg';
import Header from '../components/Header';
import { Footer } from '../components/Footer';


export const AboutUs = () => {

    const imgPaulo = ImagenPaulo;
    const imgAugusto = ImagenAugusto;
    const imgNico = ImagenNicolas;
    const imgSantiago = ImagenSantiago;


    return (
        <>
            <Header />
            <div className="container-aboutus">
                <h1 className='title-nosotros'>Nuestro equipo</h1>
                <div className="container-cuadrado">
                    <div className="cuadrado cuadrado1"></div>
                    <div className="cuadrado cuadrado2"></div>
                    <div className="cuadrado cuadrado3"></div>
                </div>
                <div className="container-cardsA">
                    <div className="cardA">
                        <div className="cover-card">
                            <img src={imgPaulo} alt="Paulo, integrante del grupo" className='imgAbout' />
                        </div>
                        <h2>Paulo Srur</h2>
                        <p className="p-espacio1">Tengo 19 años, soy estudiante de licenciatura en informática en la UNT, un apasionado de la tecnología y la programación desde chico, nunca dejaré de aprender y uno de mis objetivos es convertir esta pasión en una carrera sólida. Full stack MERN en progreso. Se inglés y un poco de portugués. Mi hobbie es el fútbol y aguante Messi. </p>
                        <div className="wrapper">
                            <ul className="iconos">
                                <li className="github"><a href="https://www.github.com" target="_blank"><i className="fa fa-github fa-2x" aria-hidden="true"></i></a></li>
                                <li className="instagram"><a href="https://www.instagram.com" target="_blank"><i className="fa fa-instagram fa-2x" aria-hidden="true"></i></a> </li>
                                <li className="linkedin"><a href="https://www.linkedin.com" target="_blank"><i className="fa fa-linkedin fa-2x" aria-hidden="true"></i></a> </li>
                            </ul>
                        </div>
                        <hr />
                        <div className="footer-card">
                            <h3 className="user-name"> Rolling Code</h3>
                            <i>45i</i>
                        </div>
                    </div>
                    <div className="cardA">
                        <div className="cover-card">
                            <img src={imgAugusto} alt="Augusto, integrante del grupo"  className='imgAbout'/>
                        </div>
                        <h2>Augusto Romera</h2>
                        <p className="p-espacio2">Tengo 24 años, soy estudiante de ingeniería en sistemas de información, con estudios en rolling code para full stack developer disfruto explorando la naturaleza y los momentos al aire libre. Además, encuentro fascinación en la lógica y en enfrentar desafíos.</p>
                        <div className="wrapper">
                            <ul className="iconos">
                                <li className="github"><a href="https://www.github.com" target="_blank"><i className="fa fa-github fa-2x" aria-hidden="true"></i></a></li>
                                <li className="instagram"><a href="https://www.instagram.com" target="_blank"><i className="fa fa-instagram fa-2x" aria-hidden="true"></i></a> </li>
                                <li className="linkedin"><a href="https://www.linkedin.com" target="_blank"><i className="fa fa-linkedin fa-2x" aria-hidden="true"></i></a> </li>
                            </ul>
                        </div>
                        <hr />
                        <div className="footer-card">
                            <h3 className="user-name"> Rolling Code</h3>
                            <i>45i</i>
                        </div>
                    </div>
                    <div className="cardA">
                        <div className="cover-card">
                            <img src={imgNico} alt="Nicolas, integrante del grupo"  className='imgAbout'/>
                        </div>
                        <h2>Nicolas Chia</h2>
                        <p className="p-espacio3">Tengo 28 años, soy Técnico Mecatrónico y estudio Ing Civil en la UTN. También estoy desarrollando habilidades para ser un Full Stack Developer en Rolling Code. Soy apasionado por el fútbol y compartir con amigos.</p>
                        <div className="wrapper">
                            <ul className="iconos">
                                <li className="github"><a href="https://www.github.com" target="_blank"><i className="fa fa-github fa-2x" aria-hidden="true"></i></a></li>
                                <li className="instagram"><a href="https://www.instagram.com" target="_blank"><i className="fa fa-instagram fa-2x" aria-hidden="true"></i></a> </li>
                                <li className="linkedin"><a href="https://www.linkedin.com" target="_blank"><i className="fa fa-linkedin fa-2x" aria-hidden="true"></i></a> </li>
                            </ul>
                        </div>
                        <hr />
                        <div className="footer-card">
                            <h3 className="user-name"> Rolling Code</h3>
                            <i>45i</i>
                        </div>
                    </div>
                    <div className="cardA">
                        <div className="cover-card">
                            <img src={imgSantiago} alt="Santiago, integrante del grupo." className='imgAbout' />
                        </div>
                        <h2>Santiago Gonzalez</h2>
                        <p className="p-espacio5">Tengo 19 años, soy estudiante del Colegio Lorenzo Massa, programador Full stack, con un nivel medio-avanzado de ingles. En mi tiempo libre me gusta ver series y ir al gimnasio. y Espero poder seguir desarrollando mis habilidades como programador constantemente. </p>
                        <div className="wrapper">
                            <ul className="iconos">
                                <li className="github"><a href="https://www.github.com" target="_blank"><i className="fa fa-github fa-2x" aria-hidden="true"></i></a></li>
                                <li className="instagram"><a href="https://www.instagram.com" target="_blank"><i className="fa fa-instagram fa-2x" aria-hidden="true"></i></a> </li>
                                <li className="linkedin"><a href="https://www.linkedin.com" target="_blank"><i className="fa fa-linkedin fa-2x" aria-hidden="true"></i></a> </li>
                            </ul>
                        </div>
                        <hr />
                        <div className="footer-card">
                            <h3 className="user-name"> Rolling Code</h3>
                            <i>45i</i>
                        </div>
                    </div>
                </div>
            </div>
            <Footer className="footer-container" />

        </>
    )
};
