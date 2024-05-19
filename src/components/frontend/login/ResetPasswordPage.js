import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getAuth, verifyPasswordResetCode, confirmPasswordReset } from 'firebase/auth';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function ResetPasswordPage() {
    const auth = getAuth();
    const navigate = useNavigate();
    const query = useQuery();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const oobCode = query.get('oobCode');

    useEffect(() => {
        if (!oobCode) {
            setError('Código de verificación no válido.');
        }
    }, [oobCode]);

    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden.');
            return;
        }

        try {
            await verifyPasswordResetCode(auth, oobCode);
            await confirmPasswordReset(auth, oobCode, password);
            setSuccess(true);
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="reset-password-container">
            <div className="reset-password-form-container">
                <h2>Restablecer Contraseña</h2>
                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">Contraseña restablecida con éxito. Redirigiendo al inicio de sesión...</div>}
                {!success && (
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="password">Nueva Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={handlePasswordChange}
                            placeholder="Nueva Contraseña"
                            required
                        />
                        <label htmlFor="confirmPassword">Confirmar Nueva Contraseña</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            placeholder="Confirmar Nueva Contraseña"
                            required
                        />
                        <button type="submit" className="reset-button">Restablecer Contraseña</button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default ResetPasswordPage;
