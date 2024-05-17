import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import '../style/profile/NavigationMenu.css';

const NavigationMenu = () => {
    const { userProfile, setUserProfile } = useContext(UserContext);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleNavigation = (path) => {
        navigate(path);
    };

    const handleImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            const newImage = URL.createObjectURL(event.target.files[0]);
            setUserProfile({ ...userProfile, profileImage: newImage });
        }
    };

    return (
        <div className="whimsical-main-container">
            <div className="whimsical-header-area">
                <div className="whimsical-profile-menu">
                    <div className="whimsical-profile-image-container">
                        <input
                            type="file"
                            id="whimsical-profile-image-upload"
                            accept="image/*"
                            onChange={handleImageChange}
                            style={{ display: 'none' }}
                        />
                        <img
                            src={userProfile.profileImage}
                            alt="Profile"
                            className="whimsical-profile-pic"
                            onClick={() => document.getElementById('whimsical-profile-image-upload').click()}
                        />
                        <button onClick={toggleDropdown} className="whimsical-dropdown-toggle">
                            ▼
                        </button>
                    </div>
                    {isDropdownOpen && (
                        <div className="whimsical-dropdown-menu">
                            <button onClick={() => handleNavigation('/perfil')}>
                                <img src="path/to/profile-icon.png" alt="Perfil" />
                            </button>
                            <button onClick={() => handleNavigation('/settings')}>
                                <img src="path/to/settings-icon.png" alt="Configuración" />
                            </button>
                            <button onClick={() => handleNavigation('/plan')}>
                                <img src="path/to/plan-icon.png" alt="Plan" />
                            </button>
                            <button onClick={() => handleNavigation('/logout')}>
                                <img src="path/to/logout-icon.png" alt="Cerrar sesión" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NavigationMenu;
