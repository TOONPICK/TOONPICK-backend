import React from 'react';
import { MemberProfile } from '@models/member';
import styles from './style.module.css';

interface ProfileHeaderProps {
  memberProfile: MemberProfile;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ memberProfile }) => {
  if (!memberProfile) return null;

  return (
    <div className={styles.profileHeader}>
      <div className={styles.backgroundGradient} />
      <div className={styles.content}>
        <div className={styles.profileSection}>
          <div className={styles.avatarContainer}>
            <img
              src={memberProfile.profileImage || '/images/profile/default_profile_image.svg'}
              alt="Profile"
              className={styles.avatar}
            />
            <div className={styles.levelIndicator}>
              <span className={styles.levelNumber}>{memberProfile.level}</span>
            </div>
          </div>
          <div className={styles.profileInfo}>
            <h1 className={styles.username}>{memberProfile.nickname}</h1>
            <p className={styles.userBio}>
              웹툰을 사랑하는 독서가 • {memberProfile.readWebtoons}개 작품 감상
            </p>
            <div className={styles.badgePreview}>
              {memberProfile.badges && memberProfile.badges.slice(0, 3).map((badge) => (
                <div key={badge.id} className={styles.badge}>
                  <img src={badge.icon} alt={badge.name} />
                </div>
              ))}
              {memberProfile.badges && memberProfile.badges.length > 3 && (
                <div className={styles.badgeMore}>
                  +{memberProfile.badges.length - 3}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={styles.actionButtons}>
          <button className={styles.editButton}>
            <span>프로필 편집</span>
          </button>
          <button className={styles.shareButton}>
            <span>공유</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader; 