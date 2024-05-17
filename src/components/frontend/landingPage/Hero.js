import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/landinPage/Hero.css';

function Hero() {
    const navigate = useNavigate();

    const handleRegisterClick = () => {
        navigate('/register');
    };

    return (
        <section className="hero">
            <div className="hero-content">
                <h1>La herramienta colaborativa imprescindible para organizar tus procesos</h1>
                <p>Empieza a dominar tus procesos de negocio con una herramienta que multiplicará tu eficiencia.</p>
                <button className="hero-register-button" onClick={handleRegisterClick}>
                    Registrarse gratis
                </button>
            </div>
            <div className="hero-video">
                <p>VIDEO DE LA APP</p>
            </div>
        </section>
    );
}

export default Hero;