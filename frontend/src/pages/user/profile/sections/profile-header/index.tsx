import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MemberProfile } from '@models/member';
import { Routes } from '@constants/routes';
import styles from './style.module.css';

interface ProfileHeaderProps {
  memberProfile: MemberProfile;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ memberProfile }) => {
  const navigate = useNavigate();

  if (!memberProfile) return null;

  const getLevelTitle = (level: number) => {
    if (level >= 20) return '웹툰 마스터';
    if (level >= 15) return '웹툰 전문가';
    if (level >= 10) return '웹툰 애호가';
    if (level >= 5) return '웹툰 입문자';
    return '웹툰 초보자';
  };

  const handleEditProfile = () => {
    navigate(Routes.USER_PROFILE_EDIT);
  };

  const handleShareProfile = () => {
    // 프로필 공유 기능 (나중에 구현)
    navigator.clipboard.writeText(window.location.href);
    alert('프로필 링크가 클립보드에 복사되었습니다!');
  };

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
              {getLevelTitle(memberProfile.level)} • {memberProfile.readWebtoons}개 작품 감상 • {memberProfile.points}포인트
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
          <button className={styles.editButton} onClick={handleEditProfile}>
            <span>프로필 편집</span>
          </button>
          <button className={styles.shareButton} onClick={handleShareProfile}>
            <span>공유</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader; 