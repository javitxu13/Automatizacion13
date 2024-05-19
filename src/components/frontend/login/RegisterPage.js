import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, googleProvider, signInWithPopup } from '../../backend/firebase/firebaseConfig';
import '../style/login/RegisterPage.css';

function RegisterPage() {
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
        console.log('Attempting to register with email:', email);

        fetch('http://localhost:5000/api/users/register', {
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

    const handleGoogleLogin = () => {
        setLoading(true);
        setError('');
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                console.log('Google login successful:', result.user);
                setLoading(false);
                navigate('/');
            })
            .catch((error) => {
                console.error('Google login error:', error);
                setError(error.message);
                setLoading(false);
            });
    };

    return (
        <div className="register-container">
            <div className="register-logo">DGR</div>
            <div className="register-title">Regístrate con...</div>

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
            <div className="social-logins">
                <button onClick={handleGoogleLogin} className="google-login">Google</button>
            </div>
            {error && <div className="error-message">{error}</div>}
            <button className="forgot-password">¿Has olvidado tu contraseña?</button>
            <div className="login-link">¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></div>
        </div>
    );
}

export default RegisterPage;
