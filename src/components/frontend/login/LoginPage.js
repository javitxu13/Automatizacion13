import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, signInWithEmailAndPassword, googleProvider, signInWithPopup } from '../../backend/firebase/firebaseConfig';
import { UserContext } from '../context/UserContext';
import '../style/login/LoginPage.css';

function LoginPage() {
    const { setUserProfile } = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleEmailChange = (event) => setEmail(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');  // Reset errors
        console.log('Attempting to login with email:', email);

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/dashboard');  // Redirect to dashboard page
        } catch (error) {
            console.error('Error:', error);
            setError(error.message);
            setLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        setLoading(true);
        setError('');
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                console.log('Google login successful:', result.user);
                const { displayName, email, photoURL } = result.user;
                const [firstName, lastName] = displayName.split(' ');

                // Update user profile context with Google data
                setUserProfile({
                    firstName: firstName || '',
                    lastName: lastName || '',
                    email: email || '',
                    profileImage: photoURL || '',
                    numEmployees: '',
                    role: '',
                    companyName: '',
                    industry: '',
                    phone: '',
                });

                setLoading(false);
                navigate('/dashboard');  // Redirect to profile page
            })
            .catch((error) => {
                console.error('Google login error:', error);
                setError(error.message);
                setLoading(false);
            });
    };

    return (
        <div className="login-container">
            <div className="login-logo">DGR</div>
            <div className="login-title">Hacer Login con...</div>

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
            <div className="register-link">¿No tienes cuenta? <Link to="/register">Regístrate</Link></div>
        </div>
    );
}

export default LoginPage;
