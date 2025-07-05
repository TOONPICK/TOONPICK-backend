import React from 'react';
import { MemberProfile } from '@models/member';
import styles from './style.module.css';

import ReadingTab from './tabs/reading-tab/index';
import ReviewsTab from './tabs/reviews-tab/index';
import PreferencesTab from './tabs/preferences-tab/index';
import AchievementsTab from './tabs/achievements-tab/index';

interface ContentTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  memberProfile: MemberProfile;
}

const ContentTabs: React.FC<ContentTabsProps> = ({
  activeTab,
  onTabChange,
  memberProfile
}) => {
  const tabs = [
    { id: 'reading', label: '읽은 웹툰', icon: '📚' },
    { id: 'reviews', label: '내 리뷰', icon: '✍️' },
    { id: 'preferences', label: '취향 분석', icon: '🎯' },
    { id: 'achievements', label: '업적', icon: '🏆' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'reading':
        return <ReadingTab memberProfile={memberProfile} />;
      case 'reviews':
        return <ReviewsTab memberProfile={memberProfile} />;
      case 'preferences':
        return <PreferencesTab memberProfile={memberProfile} />;
      case 'achievements':
        return <AchievementsTab memberProfile={memberProfile} />;
      default:
        return <ReadingTab memberProfile={memberProfile} />;
    }
  };

  return (
    <div className={styles.contentTabs}>
      <div className={styles.tabNavigation}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`${styles.tabButton} ${activeTab === tab.id ? styles.active : ''}`}
            onClick={() => onTabChange(tab.id)}
          >
            <span className={styles.tabIcon}>{tab.icon}</span>
            <span className={styles.tabLabel}>{tab.label}</span>
          </button>
        ))}
      </div>
      <div className={styles.tabContent}>
        {renderTabContent()}
      </div>
    </div>
  );
};

export default ContentTabs; 