import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/landinPage/Header.css';

function Header() {
    const navigate = useNavigate();

    const handleRegisterClick = () => {
        navigate('/register');
    };

    return (
        <header className="header">
            <div className="header-logo">DGR</div>
            <nav className="header-nav">
                <a href="#features">Features</a>
                <a href="#pricing">Pricing</a>
                <a href="#blog">Blog</a>
            </nav>
            <button className="header-register-button" onClick={handleRegisterClick}>
                Registrarse gratis
            </button>
        </header>
    );
}

export default Header;
