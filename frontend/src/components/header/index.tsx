import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@contexts/auth-context';
import { Routes as RoutePaths } from '@constants/routes';
import TopMenu from './TopMenu';
import styles from './style.module.css';
import ProfileSection from './ProfileSection';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useAuth();
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileButtonRef = useRef<HTMLButtonElement>(null);

  const toggleTheme = (): void => {
    setIsDarkTheme((prev) => !prev);
    const theme = isDarkTheme ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', theme);
  };

  const toggleProfile = () => {
    setIsProfileOpen(prev => !prev);
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerTitle}>
        <h1 onClick={() => navigate(RoutePaths.HOME)}>TOONPICK</h1>
        <TopMenu navigate={navigate} />
        <ProfileSection
          navigate={navigate}
          state={state}
          isDarkTheme={isDarkTheme}
          toggleTheme={toggleTheme}
          isProfileOpen={isProfileOpen}
          toggleProfile={toggleProfile}
          profileButtonRef={profileButtonRef}
          setIsProfileOpen={setIsProfileOpen}
        />
      </div>
    </header>
  );
};

export default Header;
