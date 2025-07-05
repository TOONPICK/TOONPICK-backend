import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@contexts/auth-context';
import { Routes } from '@constants/routes';
import memberService from '@services/member-service';
import { MemberProfile } from '@models/member';
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
  const [memberProfile, setMemberProfile] = useState<MemberProfile | null>(null);

  useEffect(() => {
    if (!state.isAuthenticated) {
      navigate(Routes.LOGIN);
      return;
    }

    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const response = await memberService.getMemberProfile();
        
        if (response.success && response.data) {
          setMemberProfile(response.data);
        } else {
          setError(response.message || '사용자 데이터를 불러오는데 실패했습니다.');
        }
      } catch (error) {
        setError('사용자 데이터를 불러오는데 실패했습니다.');
        console.error('Error fetching user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [state.isAuthenticated, navigate]);

  // 프로필 업데이트 함수
  const updateProfile = async (updatedProfile: MemberProfile) => {
    setMemberProfile(updatedProfile);
  };

  if (error) return <div className={styles.error}>{error}</div>;
  if (isLoading) return <Spinner />;
  if (!memberProfile) return <div className={styles.error}>프로필 정보를 불러오는 중입니다.</div>;

  return (
    <div className={styles.profilePage}>
      <div className={styles.container}>
        <ProfileHeader memberProfile={memberProfile} />
        <StatsOverview memberProfile={memberProfile} />
        <QuickActions />
        <ContentTabs 
          activeTab={activeTab}
          onTabChange={setActiveTab}
          memberProfile={memberProfile}
        />
      </div>
    </div>
  );
};

export default UserProfilePage; 
