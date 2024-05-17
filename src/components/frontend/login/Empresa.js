import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import Select from 'react-select';
import { UserContext } from './../context/UserContext';
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

    const handleCompanyNameChange = (event) => setCompanyName(event.target.value);
    const handleIndustryChange = (selectedOption) => setIndustry(selectedOption);
    const handlePhoneChange = (value) => setPhone(value);

    const handleSubmit = (event) => {
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
            navigate('/dashboard');
        })
        .catch((error) => {
            setError(error.message);
        });
    };

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
            </div>
        </div>
    );
}

export default EmpresaPage;
