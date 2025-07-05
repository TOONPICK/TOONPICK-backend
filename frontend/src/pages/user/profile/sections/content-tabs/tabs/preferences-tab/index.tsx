import React from 'react';
import { MemberProfile } from '@models/member';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import styles from './style.module.css';

interface PreferencesTabProps {
  memberProfile: MemberProfile;
}

const PreferencesTab: React.FC<PreferencesTabProps> = ({ memberProfile }) => {
  const genrePreferences = memberProfile.preferences?.genrePreferences || [];
  const emotionalTags = memberProfile.preferences?.emotionalTags || [];
  const aiTags = memberProfile.preferences?.aiTags || [];

  return (
    <div className={styles.preferencesTab}>
      <div className={styles.chartSection}>
        <h3 className={styles.sectionTitle}>장르 선호도</h3>
        <div className={styles.chartContainer}>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={genrePreferences}>
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis 
                dataKey="name" 
                tick={{ fontSize: 12, fill: '#4a5568' }}
              />
              <PolarRadiusAxis 
                tick={{ fontSize: 10, fill: '#718096' }}
                domain={[0, 100]}
              />
              <Radar
                name="Genre Preference"
                dataKey="value"
                stroke="#667eea"
                fill="#667eea"
                fillOpacity={0.3}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className={styles.tagsSection}>
        <div className={styles.tagGroup}>
          <h3 className={styles.tagTitle}>감정 태그</h3>
          <div className={styles.tagList}>
            {emotionalTags.map((tag, index) => (
              <span key={index} className={styles.emotionTag}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className={styles.tagGroup}>
          <h3 className={styles.tagTitle}>AI 추천 태그</h3>
          <div className={styles.tagList}>
            {aiTags.map((tag, index) => (
              <span key={index} className={styles.aiTag}>
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.insightsSection}>
        <h3 className={styles.sectionTitle}>취향 분석 인사이트</h3>
        <div className={styles.insightsGrid}>
          <div className={styles.insightCard}>
            <div className={styles.insightIcon}>🎯</div>
            <h4>선호 장르</h4>
            <p>{genrePreferences.length > 0 ? genrePreferences[0]?.name : '데이터 없음'}</p>
          </div>
          <div className={styles.insightCard}>
            <div className={styles.insightIcon}>💭</div>
            <h4>주요 감정</h4>
            <p>{emotionalTags.length > 0 ? emotionalTags[0] : '데이터 없음'}</p>
          </div>
          <div className={styles.insightCard}>
            <div className={styles.insightIcon}>🤖</div>
            <h4>AI 추천</h4>
            <p>{aiTags.length > 0 ? aiTags[0] : '데이터 없음'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreferencesTab; 