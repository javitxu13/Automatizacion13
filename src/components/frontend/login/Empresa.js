import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import Select from 'react-select';
import { UserContext } from './../context/UserContext';
import { auth, sendPasswordResetEmail } from '../../backend/firebase/firebaseConfig';
import 'react-phone-input-2/lib/style.css';
import '../style/login/EmpresaPage.css';

const industryOptions = [
    { value: 'technology', label: 'Tecnología' },
    { value: 'finance', label: 'Finanzas' },
    { value: 'healthcare', label: 'Salud' },
    // Agrega más opciones según sea necesario
];

function EmpresaPage() {
    const { setUserProfile, userProfile } = useContext(UserContext);
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState('');
    const [industry, setIndustry] = useState(null);
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');
    const [emailSent, setEmailSent] = useState(false);

    useEffect(() => {
        if (!auth.currentUser) {
            navigate('/login');
        }
    }, [navigate]);

    const handleCompanyNameChange = (event) => setCompanyName(event.target.value);
    const handleIndustryChange = (selectedOption) => setIndustry(selectedOption);
    const handlePhoneChange = (value) => setPhone(value);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!companyName || !industry || !phone) {
            setError('Por favor, complete todos los campos.');
            return;
        }

        const userProfileData = {
            ...userProfile,
            companyName,
            industry: industry.label,
            phone
        };

        try {
            if (auth.currentUser) {
                await sendPasswordResetEmail(auth, userProfile.email);
                setEmailSent(true); // Indica que se ha enviado el correo de restablecimiento de contraseña
                fetch('http://localhost:5000/api/submit-form', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userProfileData),
                })
                .then(response => response.json())
                .then(data => {
                    if (data.error) {
                        throw new Error(data.error);
                    }
                    setUserProfile(userProfileData);
                    alert('Registro completado. Por favor, verifica tu correo electrónico.');
                })
                .catch((error) => {
                    setError(error.message);
                });
            } else {
                setError('La sesión ha expirado. Por favor, vuelve a iniciar sesión.');
                navigate('/login');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const checkEmailVerification = async () => {
        if (auth.currentUser) {
            await auth.currentUser.reload(); // Recarga el estado del usuario
            if (auth.currentUser.emailVerified) {
                navigate('/dashboard'); // Si el correo está verificado, permite la navegación
            } else {
                alert('Por favor, verifica tu correo electrónico antes de continuar.');
            }
        } else {
            setError('La sesión ha expirado. Por favor, vuelve a iniciar sesión.');
            navigate('/login');
        }
    };

    useEffect(() => {
        if (emailSent) {
            const interval = setInterval(() => {
                checkEmailVerification(); // Verifica periódicamente si el correo está verificado
            }, 5000); // Verifica cada 5 segundos

            return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
        }
    }, [emailSent]);

    return (
        <div className="empresa-container">
            <div className="empresa-sidebar">
                <div className="empresa-logo">DGR</div>
                <img src="path/to/your/image.png" alt="Diagram" />
            </div>
            <div className="empresa-content">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="companyName">Nombre de la empresa</label>
                    <input
                        type="text"
                        id="companyName"
                        value={companyName}
                        onChange={handleCompanyNameChange}
                        placeholder="Nombre de la empresa"
                        required
                    />
                    <label htmlFor="industry">Industria</label>
                    <Select
                        id="industry"
                        value={industry}
                        onChange={handleIndustryChange}
                        options={industryOptions}
                        placeholder="Seleccione su industria"
                        required
                    />
                    <label htmlFor="phone">Teléfono</label>
                    <PhoneInput
                        country={'es'}
                        value={phone}
                        onChange={handlePhoneChange}
                        inputProps={{
                            name: 'phone',
                            required: true,
                            autoFocus: true,
                        }}
                    />
                    {error && <div className="error-message">{error}</div>}
                    <button type="submit" className="continue-button">Continuar</button>
                </form>
                {emailSent && (
                    <div className="verification-message">
                        <p>Correo de verificación enviado. Por favor, verifica tu correo electrónico.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default EmpresaPage;
