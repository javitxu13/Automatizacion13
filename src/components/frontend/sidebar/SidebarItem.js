import React from 'react';

function SidebarItem({ label, icon, onClick }) {
    return (
        <button className="sidebar-item" onClick={onClick}>
            {icon && <img src={icon} alt="" className="sidebar-icon" />}
            {label}
        </button>
    );
}

export default SidebarItem;
