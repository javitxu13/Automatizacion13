import React from 'react';
import { useNavigate } from 'react-router-dom';
import flujogramaIcon from '../img/flujograma.png';
import automationIcon from '../img/automation.png';
import NavigationMenu from '../profile/NavigationMenu';
import '../style/sidebar/SidebarOrganizacion.css';

const SidebarOrganizacion = () => {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div className="sidebar-organizacion">
            <NavigationMenu />
            <div className="navbar-item" onClick={() => handleNavigation('/flowchart')}>
                <span className="navbar-title">Flujograma</span>
                <img src={flujogramaIcon} alt="Flujograma" className="navbar-icon" />
            </div>
            <div className="navbar-item" onClick={() => handleNavigation('/automation')}>
                <span className="navbar-title">Automatización</span>
                <img src={automationIcon} alt="Automatización" className="navbar-icon" />
            </div>
        </div>
    );
};

export default SidebarOrganizacion;
