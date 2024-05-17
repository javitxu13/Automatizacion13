import React from 'react';

function SidebarItem({ label, icon, onClick, className }) {
    return (
        <button className={`sidebar-item ${className}`} onClick={onClick}>
            {icon && <img src={icon} alt="" className="sidebar-icon" />}
            {label}
        </button>
    );
}

export default SidebarItem;
