import React from 'react';
import ProfileWidget from '@components/profile-widget';
import ProfileIcon from '@components/profile-icon';
import styles from './style.module.css';

interface ProfileContainerProps {
  state: any;
  profileButtonRef: React.RefObject<HTMLButtonElement>;
  toggleProfile: () => void;
  isProfileOpen: boolean;
  setIsProfileOpen: (open: boolean) => void;
  navigate: any;
}

const ProfileContainer: React.FC<ProfileContainerProps> = ({
  state,
  profileButtonRef,
  toggleProfile,
  isProfileOpen,
  setIsProfileOpen,
  navigate
}) => {
  return (
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
  );
};

export default ProfileContainer; 