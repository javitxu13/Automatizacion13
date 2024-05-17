import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import '../style/profile/ProfilePage.css';

function ProfilePage() {
    const { userProfile, setUserProfile } = useContext(UserContext);
    const [profileImage, setProfileImage] = useState(userProfile.profileImage);
    const [editMode, setEditMode] = useState({
        firstName: false,
        lastName: false,
        email: false,
        numEmployees: false,
        role: false,
        companyName: false,
        industry: false,
        phone: false,
    });
    const [editedProfile, setEditedProfile] = useState(userProfile);
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const newImage = URL.createObjectURL(e.target.files[0]);
            setProfileImage(newImage);
            setEditedProfile({ ...editedProfile, profileImage: newImage });
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedProfile({ ...editedProfile, [name]: value });
    };

    const handleSave = () => {
        setUserProfile(editedProfile);
        navigate('/dashboard');
    };

    const toggleEditMode = (field) => {
        setEditMode((prev) => ({ ...prev, [field]: !prev[field] }));
    };

    return (
        <div className="unique-profile-container">
            <h2 className="unique-profile-title">Perfil</h2>
            <div className="unique-profile-image-container">
                <img
                    src={profileImage}
                    alt="Profile"
                    className="unique-profile-image"
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="unique-profile-image-upload"
                />
            </div>
            <div className="unique-profile-details">
                {Object.keys(userProfile).map((key) => (
                    key !== 'profileImage' && (
                        <div className="unique-profile-item" key={key}>
                            <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>
                            {editMode[key] ? (
                                <input
                                    type={key === 'email' ? 'email' : 'text'}
                                    name={key}
                                    value={editedProfile[key]}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <span>{userProfile[key]}</span>
                            )}
                            <button
                                className="edit-button"
                                onClick={() => toggleEditMode(key)}
                            >
                                <img
                                    src="path/to/pencil-icon.png"
                                    alt="Edit"
                                    className="edit-icon"
                                />
                            </button>
                        </div>
                    )
                ))}
            </div>
            <button className="unique-save-button" onClick={handleSave}>
                Guardar
            </button>
        </div>
    );
}

export default ProfilePage;
