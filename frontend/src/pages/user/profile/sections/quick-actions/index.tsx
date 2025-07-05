import React from 'react';
import { Routes } from '@constants/routes';
import styles from './style.module.css';

const QuickActions: React.FC = () => {
  const actions = [
    {
      title: '읽은 웹툰',
      description: '내가 읽은 웹툰들을 확인해보세요',
      icon: '📖',
      link: Routes.READING_HISTORY,
      color: '#667eea'
    },
    {
      title: '명작 웹툰',
      description: '내가 선정한 명작 웹툰들',
      icon: '⭐',
      link: Routes.MASTERPIECE_WEBTOONS,
      color: '#f093fb'
    },
    {
      title: '북마크',
      description: '저장해둔 웹툰들을 확인해보세요',
      icon: '🔖',
      link: '/user/bookmarked-webtoons',
      color: '#4facfe'
    },
    {
      title: '설정',
      description: '알림 및 계정 설정',
      icon: '⚙️',
      link: Routes.NOTIFICATION_SETTINGS,
      color: '#43e97b'
    }
  ];

  return (
    <div className={styles.quickActions}>
      <h2 className={styles.sectionTitle}>빠른 메뉴</h2>
      <div className={styles.actionsGrid}>
        {actions.map((action, index) => (
          <a key={index} href={action.link} className={styles.actionCard}>
            <div className={styles.actionIcon} style={{ backgroundColor: action.color }}>
              <span>{action.icon}</span>
            </div>
            <div className={styles.actionContent}>
              <h3 className={styles.actionTitle}>{action.title}</h3>
              <p className={styles.actionDescription}>{action.description}</p>
            </div>
            <div className={styles.actionArrow}>
              <span>→</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default QuickActions; 