import React from 'react'
import "../pages/styles/footer.css"
import logofooter from "../assets/images/logo/logotipo.png"
export const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <>
            <footer className="pie-pagina">
                <div className="grupo-1">
                    <div className="box">
                        <figure>
                            <a href="#">
                                <img src={logofooter} alt="Logo rapiburger" />
                            </a>
                        </figure>
                    </div>
                    <div className="box">
                        <h2>SOBRE NOSOTROS</h2>
                        <p>
                            En nuestra historia, buscamos constantemente la calidad en nuestros platillos. Somos una pequeña empresa que esconde tesoros culinarios. Nuestro servicio siempre te escucha.</p>

                    </div>
                    <div className="box">
                        <h2>SIGUENOS</h2>
                        <div className="red-social">
                            <a href="https://www.facebook.com/" className="fa fa-facebook" target='_blank'></a>
                            <a href="https://www.instagram.com/" className="fa fa-instagram" target='_blank'></a>
                            <a href="https://twitter.com/?lang=es" className="fa fa-twitter" target='_blank'></a>
                            <a href="https://www.youtube.com/" className="fa fa-youtube" target='_blank'></a>
                        </div>
                    </div>
                </div>
                <div className="grupo-2">
                    <small>&copy; {currentYear} <b>Rapiburguers</b> - Todos los Derechos Reservados.</small>
                </div>
            </footer>
        </>
    )
}
