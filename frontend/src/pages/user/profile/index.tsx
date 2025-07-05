import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@contexts/auth-context';
import { Routes } from '@constants/routes';
import styles from './style.module.css';

import ProfileHeader from './sections/profile-header/index';
import StatsOverview from './sections/stats-overview/index';
import QuickActions from './sections/quick-actions/index';
import ContentTabs from './sections/content-tabs/index';
import Spinner from '@components/spinner';

const UserProfilePage: React.FC = () => {
  const { state } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('reading');

  useEffect(() => {
    if (!state.isAuthenticated) {
      navigate(Routes.LOGIN);
      return;
    }

    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        // TODO: API 연동
        setIsLoading(false);
      } catch (error) {
        setError('사용자 데이터를 불러오는데 실패했습니다.');
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [state.isAuthenticated, navigate]);

  if (error) return <div className={styles.error}>{error}</div>;
  if (isLoading) return <Spinner />;

  return (
    <div className={styles.profilePage}>
      <div className={styles.container}>
        {state.memberProfile ? (
          <>
            <ProfileHeader memberProfile={state.memberProfile} />
            <StatsOverview memberProfile={state.memberProfile} />
            <QuickActions />
            <ContentTabs 
              activeTab={activeTab}
              onTabChange={setActiveTab}
              memberProfile={state.memberProfile}
            />
          </>
        ) : (
          <div className={styles.error}>프로필 정보를 불러오는 중입니다.</div>
        )}
      </div>
    </div>
  );
};

export default UserProfilePage; 
