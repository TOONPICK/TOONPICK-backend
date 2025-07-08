import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiArrowLeft, 
  FiBell, 
  FiMail, 
  FiSmartphone, 
  FiMessageSquare, 
  FiHeart, 
  FiUsers, 
  FiGift, 
  FiSettings, 
  FiShield,
  FiRotateCcw
} from 'react-icons/fi';
import styles from './style.module.css';

interface NotificationSettings {
  webtoonUpdates: {
    enabled: boolean;
    frequency: 'instant' | 'daily' | 'weekly';
    newEpisodes: boolean;
    completedSeries: boolean;
    authorUpdates: boolean;
  };
  recommendations: {
    enabled: boolean;
    basedOnReadingHistory: boolean;
    basedOnRatings: boolean;
    basedOnSimilarUsers: boolean;
    newReleases: boolean;
    trendingWebtoons: boolean;
  };
  social: {
    comments: boolean;
    replies: boolean;
    likes: boolean;
    follows: boolean;
    mentions: boolean;
    friendActivity: boolean;
  };
  events: {
    promotions: boolean;
    newFeatures: boolean;
    surveys: boolean;
    contests: boolean;
    seasonalEvents: boolean;
  };
  system: {
    maintenance: boolean;
    security: boolean;
    updates: boolean;
  };
  delivery: {
    email: boolean;
    push: boolean;
    sms: boolean;
    inApp: boolean;
  };
}

const NotificationSettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState<NotificationSettings>({
    webtoonUpdates: {
      enabled: true,
      frequency: 'instant',
      newEpisodes: true,
      completedSeries: true,
      authorUpdates: false,
    },
    recommendations: {
      enabled: true,
      basedOnReadingHistory: true,
      basedOnRatings: true,
      basedOnSimilarUsers: true,
      newReleases: true,
      trendingWebtoons: true,
    },
    social: {
      comments: true,
      replies: true,
      likes: true,
      follows: true,
      mentions: true,
      friendActivity: false,
    },
    events: {
      promotions: true,
      newFeatures: true,
      surveys: false,
      contests: true,
      seasonalEvents: true,
    },
    system: {
      maintenance: true,
      security: true,
      updates: true,
    },
    delivery: {
      email: true,
      push: true,
      sms: false,
      inApp: true,
    },
  });

  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // TODO: API에서 설정 불러오기
    setHasChanges(false);
  }, []);

  const handleToggle = <K extends keyof NotificationSettings>(
    category: K,
    setting: keyof NotificationSettings[K]
  ) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: !prev[category][setting],
      },
    }));
    setHasChanges(true);
  };

  const handleFrequencyChange = (frequency: 'instant' | 'daily' | 'weekly') => {
    setSettings(prev => ({
      ...prev,
      webtoonUpdates: {
        ...prev.webtoonUpdates,
        frequency,
      },
    }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // TODO: API 호출로 설정 저장
      await new Promise(resolve => setTimeout(resolve, 1500)); // 임시 딜레이
      setHasChanges(false);
      alert('알림 설정이 저장되었습니다!');
    } catch (error) {
      console.error('설정 저장 실패:', error);
      alert('설정 저장에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    if (window.confirm('모든 알림 설정을 기본값으로 초기화하시겠습니까?')) {
      setSettings({
        webtoonUpdates: {
          enabled: true,
          frequency: 'instant',
          newEpisodes: true,
          completedSeries: true,
          authorUpdates: false,
        },
        recommendations: {
          enabled: true,
          basedOnReadingHistory: true,
          basedOnRatings: true,
          basedOnSimilarUsers: true,
          newReleases: true,
          trendingWebtoons: true,
        },
        social: {
          comments: true,
          replies: true,
          likes: true,
          follows: true,
          mentions: true,
          friendActivity: false,
        },
        events: {
          promotions: true,
          newFeatures: true,
          surveys: false,
          contests: true,
          seasonalEvents: true,
        },
        system: {
          maintenance: true,
          security: true,
          updates: true,
        },
        delivery: {
          email: true,
          push: true,
          sms: false,
          inApp: true,
        },
      });
      setHasChanges(true);
    }
  };

  const getNotificationCount = () => {
    let count = 0;
    Object.values(settings).forEach(category => {
      Object.values(category).forEach(value => {
        if (typeof value === 'boolean' && value) count++;
      });
    });
    return count;
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={() => navigate(-1)}>
          <FiArrowLeft />
        </button>
        <h1 className={styles.title}>알림 설정</h1>
        <div className={styles.headerActions}>
          <button 
            className={styles.resetButton}
            onClick={handleReset}
            title="기본값으로 초기화"
          >
            <FiRotateCcw />
          </button>
          <button 
            className={`${styles.saveButton} ${hasChanges ? styles.active : ''}`}
            onClick={handleSave}
            disabled={!hasChanges || isSaving}
          >
            {isSaving ? '저장 중...' : '저장'}
          </button>
        </div>
      </div>

      <div className={styles.statsCard}>
        <div className={styles.statsInfo}>
          <FiBell className={styles.statsIcon} />
          <div className={styles.statsText}>
            <span className={styles.statsCount}>{getNotificationCount()}</span>
            <span className={styles.statsLabel}>활성화된 알림</span>
          </div>
        </div>
        <div className={styles.statsDescription}>
          현재 {getNotificationCount()}개의 알림이 활성화되어 있습니다.
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              <FiBell />
              웹툰 업데이트
            </h2>
            <p className={styles.sectionDescription}>
              구독 중인 웹툰의 업데이트를 알려드립니다.
            </p>
          </div>
          
          <div className={styles.settingItem}>
            <div className={styles.settingInfo}>
              <span className={styles.settingLabel}>업데이트 알림</span>
              <span className={styles.settingDescription}>
                새로운 에피소드와 시리즈 완결 소식을 받아보세요
              </span>
            </div>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={settings.webtoonUpdates.enabled}
                onChange={() => handleToggle('webtoonUpdates', 'enabled')}
              />
              <span className={styles.slider}></span>
            </label>
          </div>

          {settings.webtoonUpdates.enabled && (
            <>
              <div className={styles.frequencySelector}>
                <span className={styles.frequencyLabel}>알림 빈도</span>
                <div className={styles.frequencyOptions}>
                  <label className={styles.frequencyOption}>
                    <input
                      type="radio"
                      name="frequency"
                      checked={settings.webtoonUpdates.frequency === 'instant'}
                      onChange={() => handleFrequencyChange('instant')}
                    />
                    <span className={styles.radioLabel}>즉시 알림</span>
                  </label>
                  <label className={styles.frequencyOption}>
                    <input
                      type="radio"
                      name="frequency"
                      checked={settings.webtoonUpdates.frequency === 'daily'}
                      onChange={() => handleFrequencyChange('daily')}
                    />
                    <span className={styles.radioLabel}>일일 요약</span>
                  </label>
                  <label className={styles.frequencyOption}>
                    <input
                      type="radio"
                      name="frequency"
                      checked={settings.webtoonUpdates.frequency === 'weekly'}
                      onChange={() => handleFrequencyChange('weekly')}
                    />
                    <span className={styles.radioLabel}>주간 요약</span>
                  </label>
                </div>
              </div>

              <div className={styles.subSettings}>
                <div className={styles.settingItem}>
                  <span>새로운 에피소드</span>
                  <label className={styles.switch}>
                    <input
                      type="checkbox"
                      checked={settings.webtoonUpdates.newEpisodes}
                      onChange={() => handleToggle('webtoonUpdates', 'newEpisodes')}
                    />
                    <span className={styles.slider}></span>
                  </label>
                </div>
                <div className={styles.settingItem}>
                  <span>시리즈 완결</span>
                  <label className={styles.switch}>
                    <input
                      type="checkbox"
                      checked={settings.webtoonUpdates.completedSeries}
                      onChange={() => handleToggle('webtoonUpdates', 'completedSeries')}
                    />
                    <span className={styles.slider}></span>
                  </label>
                </div>
                <div className={styles.settingItem}>
                  <span>작가 업데이트</span>
                  <label className={styles.switch}>
                    <input
                      type="checkbox"
                      checked={settings.webtoonUpdates.authorUpdates}
                      onChange={() => handleToggle('webtoonUpdates', 'authorUpdates')}
                    />
                    <span className={styles.slider}></span>
                  </label>
                </div>
              </div>
            </>
          )}
        </div>

        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              <FiHeart />
              추천 알림
            </h2>
            <p className={styles.sectionDescription}>
              맞춤 웹툰 추천을 받아보세요.
            </p>
          </div>
          
          <div className={styles.settingItem}>
            <div className={styles.settingInfo}>
              <span className={styles.settingLabel}>추천 알림</span>
              <span className={styles.settingDescription}>
                개인화된 웹툰 추천을 받아보세요
              </span>
            </div>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={settings.recommendations.enabled}
                onChange={() => handleToggle('recommendations', 'enabled')}
              />
              <span className={styles.slider}></span>
            </label>
          </div>

          {settings.recommendations.enabled && (
            <div className={styles.subSettings}>
              <div className={styles.settingItem}>
                <span>읽은 웹툰 기반 추천</span>
                <label className={styles.switch}>
                  <input
                    type="checkbox"
                    checked={settings.recommendations.basedOnReadingHistory}
                    onChange={() => handleToggle('recommendations', 'basedOnReadingHistory')}
                  />
                  <span className={styles.slider}></span>
                </label>
              </div>
              <div className={styles.settingItem}>
                <span>평가 기반 추천</span>
                <label className={styles.switch}>
                  <input
                    type="checkbox"
                    checked={settings.recommendations.basedOnRatings}
                    onChange={() => handleToggle('recommendations', 'basedOnRatings')}
                  />
                  <span className={styles.slider}></span>
                </label>
              </div>
              <div className={styles.settingItem}>
                <span>유사 사용자 기반 추천</span>
                <label className={styles.switch}>
                  <input
                    type="checkbox"
                    checked={settings.recommendations.basedOnSimilarUsers}
                    onChange={() => handleToggle('recommendations', 'basedOnSimilarUsers')}
                  />
                  <span className={styles.slider}></span>
                </label>
              </div>
              <div className={styles.settingItem}>
                <span>신작 알림</span>
                <label className={styles.switch}>
                  <input
                    type="checkbox"
                    checked={settings.recommendations.newReleases}
                    onChange={() => handleToggle('recommendations', 'newReleases')}
                  />
                  <span className={styles.slider}></span>
                </label>
              </div>
              <div className={styles.settingItem}>
                <span>인기 웹툰 알림</span>
                <label className={styles.switch}>
                  <input
                    type="checkbox"
                    checked={settings.recommendations.trendingWebtoons}
                    onChange={() => handleToggle('recommendations', 'trendingWebtoons')}
                  />
                  <span className={styles.slider}></span>
                </label>
              </div>
            </div>
          )}
        </div>

        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              <FiUsers />
              소셜 알림
            </h2>
            <p className={styles.sectionDescription}>
              다른 사용자와의 상호작용 알림을 받아보세요.
            </p>
          </div>
          
          <div className={styles.settingItem}>
            <span>댓글 알림</span>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={settings.social.comments}
                onChange={() => handleToggle('social', 'comments')}
              />
              <span className={styles.slider}></span>
            </label>
          </div>
          <div className={styles.settingItem}>
            <span>답글 알림</span>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={settings.social.replies}
                onChange={() => handleToggle('social', 'replies')}
              />
              <span className={styles.slider}></span>
            </label>
          </div>
          <div className={styles.settingItem}>
            <span>좋아요 알림</span>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={settings.social.likes}
                onChange={() => handleToggle('social', 'likes')}
              />
              <span className={styles.slider}></span>
            </label>
          </div>
          <div className={styles.settingItem}>
            <span>팔로우 알림</span>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={settings.social.follows}
                onChange={() => handleToggle('social', 'follows')}
              />
              <span className={styles.slider}></span>
            </label>
          </div>
          <div className={styles.settingItem}>
            <span>멘션 알림</span>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={settings.social.mentions}
                onChange={() => handleToggle('social', 'mentions')}
              />
              <span className={styles.slider}></span>
            </label>
          </div>
          <div className={styles.settingItem}>
            <span>친구 활동 알림</span>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={settings.social.friendActivity}
                onChange={() => handleToggle('social', 'friendActivity')}
              />
              <span className={styles.slider}></span>
            </label>
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              <FiGift />
              이벤트 알림
            </h2>
            <p className={styles.sectionDescription}>
              특별한 이벤트와 프로모션 소식을 받아보세요.
            </p>
          </div>
          
          <div className={styles.settingItem}>
            <span>프로모션 알림</span>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={settings.events.promotions}
                onChange={() => handleToggle('events', 'promotions')}
              />
              <span className={styles.slider}></span>
            </label>
          </div>
          <div className={styles.settingItem}>
            <span>신규 기능 알림</span>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={settings.events.newFeatures}
                onChange={() => handleToggle('events', 'newFeatures')}
              />
              <span className={styles.slider}></span>
            </label>
          </div>
          <div className={styles.settingItem}>
            <span>설문 조사 알림</span>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={settings.events.surveys}
                onChange={() => handleToggle('events', 'surveys')}
              />
              <span className={styles.slider}></span>
            </label>
          </div>
          <div className={styles.settingItem}>
            <span>콘테스트 알림</span>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={settings.events.contests}
                onChange={() => handleToggle('events', 'contests')}
              />
              <span className={styles.slider}></span>
            </label>
          </div>
          <div className={styles.settingItem}>
            <span>시즌 이벤트 알림</span>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={settings.events.seasonalEvents}
                onChange={() => handleToggle('events', 'seasonalEvents')}
              />
              <span className={styles.slider}></span>
            </label>
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              <FiShield />
              시스템 알림
            </h2>
            <p className={styles.sectionDescription}>
              중요한 시스템 업데이트와 보안 알림을 받아보세요.
            </p>
          </div>
          
          <div className={styles.settingItem}>
            <span>시스템 점검 알림</span>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={settings.system.maintenance}
                onChange={() => handleToggle('system', 'maintenance')}
              />
              <span className={styles.slider}></span>
            </label>
          </div>
          <div className={styles.settingItem}>
            <span>보안 알림</span>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={settings.system.security}
                onChange={() => handleToggle('system', 'security')}
              />
              <span className={styles.slider}></span>
            </label>
          </div>
          <div className={styles.settingItem}>
            <span>앱 업데이트 알림</span>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={settings.system.updates}
                onChange={() => handleToggle('system', 'updates')}
              />
              <span className={styles.slider}></span>
            </label>
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              <FiSettings />
              알림 전송 방법
            </h2>
            <p className={styles.sectionDescription}>
              알림을 받을 방법을 선택하세요.
            </p>
          </div>
          
          <div className={styles.settingItem}>
            <div className={styles.settingInfo}>
              <span className={styles.settingLabel}>
                <FiMail />
                이메일 알림
              </span>
              <span className={styles.settingDescription}>
                중요한 알림을 이메일로 받습니다
              </span>
            </div>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={settings.delivery.email}
                onChange={() => handleToggle('delivery', 'email')}
              />
              <span className={styles.slider}></span>
            </label>
          </div>
          
          <div className={styles.settingItem}>
            <div className={styles.settingInfo}>
              <span className={styles.settingLabel}>
                <FiSmartphone />
                푸시 알림
              </span>
              <span className={styles.settingDescription}>
                실시간 알림을 앱에서 받습니다
              </span>
            </div>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={settings.delivery.push}
                onChange={() => handleToggle('delivery', 'push')}
              />
              <span className={styles.slider}></span>
            </label>
          </div>
          
          <div className={styles.settingItem}>
            <div className={styles.settingInfo}>
              <span className={styles.settingLabel}>
                <FiMessageSquare />
                SMS 알림
              </span>
              <span className={styles.settingDescription}>
                중요한 보안 알림을 문자로 받습니다
              </span>
            </div>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={settings.delivery.sms}
                onChange={() => handleToggle('delivery', 'sms')}
              />
              <span className={styles.slider}></span>
            </label>
          </div>
          
          <div className={styles.settingItem}>
            <div className={styles.settingInfo}>
              <span className={styles.settingLabel}>
                <FiBell />
                앱 내 알림
              </span>
              <span className={styles.settingDescription}>
                앱 내에서 알림을 확인합니다
              </span>
            </div>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={settings.delivery.inApp}
                onChange={() => handleToggle('delivery', 'inApp')}
              />
              <span className={styles.slider}></span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettingsPage; 