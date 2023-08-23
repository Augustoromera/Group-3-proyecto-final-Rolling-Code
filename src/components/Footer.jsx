import React from 'react'
import "../pages/styles/footer.css"
import logofooter from "../assets/images/logo/logotipo.png"
export const Footer = () => {
    return (
        <>
            <footer className="pie-pagina">
                <div className="grupo-1">
                    <div className="box">
                        <figure>
                            <a href="#">
                                <img src={logofooter} alt="Logo fachero" />
                            </a>
                        </figure>
                    </div>
                    <div className="box">
                        <h2>SOBRE NOSOTROS</h2>
                        <p>Somos una empresa pequeña que prioriza la calidad por encima de la cantidad y siempre esta dispuesta a escuchar al cliente</p>

                    </div>
                    <div className="box">
                        <h2>SIGUENOS</h2>
                        <div className="red-social">
                            <a href="#" className="fa fa-facebook"></a>
                            <a href="#" className="fa fa-instagram"></a>
                            <a href="#" className="fa fa-twitter"></a>
                            <a href="#" className="fa fa-youtube"></a>
                        </div>
                    </div>
                </div>
                <div className="grupo-2">
                    <small>&copy; 2023 <b>Mila que te como</b> - Todos los Derechos Reservados.</small>
                </div>
            </footer>
        </>
    )
}
