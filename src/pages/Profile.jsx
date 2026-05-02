import { useState } from "react";
import { useStore } from "../context/StoreContext";
import "../styles/Profile.css";

export default function Profile() {
  const { user, setUser, showNotification } = useStore();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    setUser(formData);
    setIsEditing(false);
    showNotification("Profile updated successfully");
  };

  const handleCancel = () => {
    setFormData(user);
    setIsEditing(false);
  };

  return (
    <div className="profile-container">
      <h2>👤 User Profile</h2>
      
      <div className="profile-card">
        {!isEditing ? (
          <div className="profile-view">
            <div className="profile-field">
              <label>Name:</label>
              <p>{user.name}</p>
            </div>
            <div className="profile-field">
              <label>Email:</label>
              <p>{user.email}</p>
            </div>
            <div className="profile-field">
              <label>Phone:</label>
              <p>{user.phone}</p>
            </div>
            
            <button onClick={() => setIsEditing(true)} className="btn-edit">
              ✏️ Edit Profile
            </button>
          </div>
        ) : (
          <div className="profile-edit">
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Phone:</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-actions">
              <button onClick={handleSave} className="btn-save">✓ Save</button>
              <button onClick={handleCancel} className="btn-cancel">✕ Cancel</button>
            </div>
          </div>
        )}
      </div>

      <div className="profile-section">
        <h3>Account Information</h3>
        <div className="info-grid">
          <div className="info-box">
            <h4>Member Since</h4>
            <p>May 2024</p>
          </div>
          <div className="info-box">
            <h4>Total Orders</h4>
            <p>12</p>
          </div>
          <div className="info-box">
            <h4>Points Earned</h4>
            <p>1,250</p>
          </div>
          <div className="info-box">
            <h4>Loyalty Level</h4>
            <p>Gold</p>
          </div>
        </div>
      </div>
    </div>
  );
}