import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from './../context/UserContext';
import { auth, googleProvider, createUserWithEmailAndPassword, signInWithPopup } from '../../backend/firebase/firebaseConfig';
import { sendEmailVerification } from 'firebase/auth';
import '../style/login/RegisterPage.css';

function RegisterPage() {
    const navigate = useNavigate();
    const { setUserProfile } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        numEmployees: '',
        email: '',
        terms: false,
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (!formData.numEmployees || !formData.email || !formData.terms) {
            setError('Por favor, complete todos los campos y acepte los términos.');
            setLoading(false);
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, formData.email, 'temporaryPassword');
            const user = userCredential.user;
            await sendEmailVerification(user);
            setUserProfile(prevProfile => ({ ...prevProfile, email: formData.email, numEmployees: formData.numEmployees }));
            navigate('/new-form');
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const user = result.user;
                setUserProfile(prevProfile => ({ ...prevProfile, email: user.email }));
                navigate('/empresa');
            })
            .catch((error) => {
                console.error('Error:', error);
                setError(error.message);
            });
    };

    return (
        <div className="register-container">
            <div className="register-sidebar">
                <div className="register-logo">DGR</div>
                <p>Empieza a dominar tus procesos</p>
            </div>
            <div className="register-form-container">
                <h2>Cuéntanos sobre tu negocio</h2>
                <p>Necesitamos algo de información para mejorar tu experiencia</p>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="numEmployees">Número de empleados</label>
                    <input
                        type="number"
                        id="numEmployees"
                        name="numEmployees"
                        value={formData.numEmployees}
                        onChange={handleChange}
                    />
                    <label htmlFor="email">Correo electrónico de la empresa</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <div className="terms-container">
                        <input
                            type="checkbox"
                            id="terms"
                            name="terms"
                            checked={formData.terms}
                            onChange={handleChange}
                        />
                        <label htmlFor="terms">
                            He leído y acepto los Términos y Condiciones y el tratamiento de mis datos de conformidad con la Política de Privacidad
                        </label>
                    </div>
                    {error && <div className="error-message">{error}</div>}
                    <button type="submit" className="continue-button" disabled={loading}>
                        {loading ? 'Cargando...' : 'Continuar'}
                    </button>
                </form>
                <div className="social-login-buttons">
                    <button className="social-button google-button" onClick={handleGoogleLogin}>Continuar con Google</button>
                    <button className="social-button microsoft-button">Continuar con Microsoft</button>
                </div>
                <div className="login-link">
                    ¿Ya tienes cuenta? <Link to="/login">Iniciar sesión</Link>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
