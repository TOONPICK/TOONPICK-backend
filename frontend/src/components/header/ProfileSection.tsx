import React from 'react';
import Search from '@components/search-bar';
import NotificationComponent from '@components/notification';
import ProfileWidget from '@components/profile-widget';
import ProfileIcon from '@components/profile-icon';
import { FiSun, FiMoon } from 'react-icons/fi';
import styles from './style.module.css';

interface ProfileSectionProps {
  navigate: any;
  state: any;
  isDarkTheme: boolean;
  toggleTheme: () => void;
  isProfileOpen: boolean;
  toggleProfile: () => void;
  profileButtonRef: React.RefObject<HTMLButtonElement>;
  setIsProfileOpen: (open: boolean) => void;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({
  navigate,
  state,
  isDarkTheme,
  toggleTheme,
  isProfileOpen,
  toggleProfile,
  profileButtonRef,
  setIsProfileOpen
}) => {
  return (
    <div className={styles.rightSection}>
      <Search navigate={navigate} />
      <button onClick={toggleTheme} className={styles.iconButton}>
        {isDarkTheme ? (
          <FiSun className={styles.icon} color="white" size={24} />
        ) : (
          <FiMoon className={styles.icon} color="white" size={24} />
        )}
      </button>
      <NotificationComponent />
      <div className={styles.profileContainer}>
        {state.isAuthenticated ? (
          <>
            <button
              ref={profileButtonRef}
              className={styles.profileButton}
              onClick={toggleProfile}
            >
              <ProfileIcon />
            </button>
            <ProfileWidget
              isOpen={isProfileOpen}
              onClose={() => setIsProfileOpen(false)}
              buttonRef={profileButtonRef}
            />
          </>
        ) : (
          <button onClick={() => navigate('/login')} className={styles.loginButton}>Login</button>
        )}
      </div>
    </div>
  );
};

export default ProfileSection; 