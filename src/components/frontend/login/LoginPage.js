import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../style/login/LoginPage.css';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleEmailChange = (event) => setEmail(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value);

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');  // Reset errors
        console.log('Attempting to login with email:', email);

        fetch('http://localhost:5000/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        })
        .then(response => {
            return response.json().then(data => {
                if (!response.ok) {
                    throw new Error(data.error);
                }
                return data;
            });
        })
        .then(data => {
            console.log('Success:', data);
            setLoading(false);
            navigate('/');  // Redirect to home page or wherever you need
        })
        .catch((error) => {
            console.error('Error:', error);
            setError(error.message);
            setLoading(false);
        });
    };

    return (
        <div className="login-container">
            <div className="login-logo">DGR</div>
            <div className="login-title">Hacer Login con...</div>
            <div className="social-logins">
                <button className="google-login">G</button>
                <button className="microsoft-login">M</button>
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Correo electrónico"
                    required
                    aria-label="Correo electrónico"
                />
                <input
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="Contraseña"
                    required
                    aria-label="Contraseña"
                />
                <button
                    type="submit"
                    className="continue-button"
                    disabled={loading}
                >
                    {loading ? 'Cargando...' : 'Continuar'}
                </button>
            </form>
            {error && <div className="error-message">{error}</div>}
            <a href="#" className="forgot-password">¿Has olvidado tu contraseña?</a>
            <div className="register-link">¿No tienes cuenta? <Link to="/register">Regístrate</Link></div>
        </div>
    );
}

export default LoginPage;
