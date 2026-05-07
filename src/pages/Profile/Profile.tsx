import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  FaUser,
  FaEnvelope,
  FaMapMarkerAlt,
  FaSignOutAlt,
  FaPen,
  FaCheck,
  FaTimes,
} from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth';
import { Input } from '../../components/Input/Input';
import styles from './Profile.module.css';

export function Profile() {
  const navigate = useNavigate();
  const { user, logout, updateProfile } = useAuth();

  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState(user?.name ?? '');

  const handleEditName = () => {
    setEditedName(user?.name ?? '');
    setIsEditingName(true);
  };

  const handleSaveName = () => {
    const trimmed = editedName.trim();
    if (trimmed && trimmed !== user?.name) {
      updateProfile({ name: trimmed });
    }
    setIsEditingName(false);
  };

  const handleCancelEdit = () => {
    setEditedName(user?.name ?? '');
    setIsEditingName(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  if (!user) {
    return null;
  }

  const initial = user.name.charAt(0).toUpperCase();

  return (
    <div className={styles.page}>
      {/* Header */}
      <header className={styles.header}>
        <h1 className={styles.pageTitle}>Profile</h1>
      </header>

      {/* Profile Card */}
      <div className={styles.profileCard}>
        {/* Avatar */}
        <div className={styles.avatar} aria-hidden="true">
          {initial || <FaUser className={styles.avatarIcon} />}
        </div>

        {/* User Info */}
        <div className={styles.userInfo}>
          {isEditingName ? (
            <div className={styles.editNameForm}>
              <div className={styles.editNameInput}>
                <Input
                  label="Name"
                  value={editedName}
                  onChange={setEditedName}
                  placeholder="Enter your name"
                  required
                />
              </div>
              <button
                className={styles.saveButton}
                onClick={handleSaveName}
                aria-label="Save name"
                disabled={!editedName.trim()}
              >
                <FaCheck />
              </button>
              <button
                className={styles.cancelButton}
                onClick={handleCancelEdit}
                aria-label="Cancel editing"
              >
                <FaTimes />
              </button>
            </div>
          ) : (
            <div className={styles.nameRow}>
              <h2 className={styles.userName}>{user.name}</h2>
              <button
                className={styles.editButton}
                onClick={handleEditName}
                aria-label="Edit name"
              >
                <FaPen />
              </button>
            </div>
          )}

          <div className={styles.emailRow}>
            <FaEnvelope aria-hidden="true" />
            <p className={styles.userEmail}>{user.email}</p>
          </div>
        </div>
      </div>

      {/* Saved Addresses */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Saved Addresses</h2>
        <div className={styles.addressList} role="list">
          {user.savedAddresses.map((address) => (
            <div key={address.id} className={styles.addressCard} role="listitem">
              <div className={styles.addressIcon}>
                <FaMapMarkerAlt aria-hidden="true" />
              </div>
              <div className={styles.addressInfo}>
                {address.label && (
                  <p className={styles.addressLabel}>{address.label}</p>
                )}
                <p className={styles.addressStreet}>{address.street}</p>
                <p className={styles.addressCityZip}>
                  {address.city}, {address.zipCode}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Log Out */}
      <div className={styles.logoutSection}>
        <button
          className={styles.logoutButton}
          onClick={handleLogout}
          aria-label="Log out"
        >
          <FaSignOutAlt aria-hidden="true" />
          Log Out
        </button>
      </div>
    </div>
  );
}

export default Profile;
