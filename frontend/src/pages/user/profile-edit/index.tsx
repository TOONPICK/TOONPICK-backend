import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiArrowLeft, 
  FiCamera, 
  FiUser, 
  FiMail, 
  FiMapPin, 
  FiGlobe, 
  FiCalendar,
  FiBell,
  FiShield,
  FiTwitter,
  FiInstagram,
  FiYoutube,
  FiSave
} from 'react-icons/fi';
import styles from './style.module.css';
import { Routes } from '@constants/routes';
import { MemberProfile } from '@models/member';
import { useAuth } from '@contexts/auth-context';
import MemberService from '@services/member-service';

const ProfileEditPage: React.FC = () => {
  const navigate = useNavigate();
  const { memberProfile, updateProfile } = useAuth();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'basic' | 'social' | 'privacy' | 'notifications'>('basic');
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // 폼 상태 관리
  const [formData, setFormData] = useState({
    nickname: '',
    bio: '',
    birthDate: '',
    gender: 'prefer_not_to_say' as 'male' | 'female' | 'other' | 'prefer_not_to_say',
    location: '',
    website: '',
    socialLinks: {
      twitter: '',
      instagram: '',
      youtube: ''
    },
    privacySettings: {
      profileVisibility: 'public' as 'public' | 'friends' | 'private',
      showReadingHistory: true,
      showReviews: true,
      showCollections: true,
      allowMessages: true
    },
    notificationPreferences: {
      email: true,
      push: true,
      sms: false
    }
  });

  useEffect(() => {
    if (memberProfile) {
      setFormData({
        nickname: memberProfile.nickname || '',
        bio: memberProfile.bio || '',
        birthDate: memberProfile.birthDate || '',
        gender: memberProfile.gender || 'prefer_not_to_say',
        location: memberProfile.location || '',
        website: memberProfile.website || '',
        socialLinks: {
          twitter: memberProfile.socialLinks?.twitter || '',
          instagram: memberProfile.socialLinks?.instagram || '',
          youtube: memberProfile.socialLinks?.youtube || ''
        },
        privacySettings: {
          profileVisibility: memberProfile.privacySettings?.profileVisibility || 'public',
          showReadingHistory: memberProfile.privacySettings?.showReadingHistory ?? true,
          showReviews: memberProfile.privacySettings?.showReviews ?? true,
          showCollections: memberProfile.privacySettings?.showCollections ?? true,
          allowMessages: memberProfile.privacySettings?.allowMessages ?? true
        },
        notificationPreferences: {
          email: memberProfile.notificationPreferences?.email ?? true,
          push: memberProfile.notificationPreferences?.push ?? true,
          sms: memberProfile.notificationPreferences?.sms ?? false
        }
      });
    }
  }, [memberProfile]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setProfileImage(event.target.result as string);
          setHasChanges(true);
        }
      };
      reader.readAsDataURL(file);

      try {
        const response = await MemberService.updateProfileImage(file);
        if (response.success && memberProfile) {
          const updatedProfile: MemberProfile = {
            ...memberProfile,
            profileImage: response.data || memberProfile.profileImage,
          };
          updateProfile(updatedProfile);
        }
      } catch (error) {
        console.error('프로필 이미지 업로드 실패:', error);
      }
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setHasChanges(true);
  };

  const handleNestedChange = (parent: keyof typeof formData, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...(prev[parent] as any),
        [field]: value
      }
    }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    if (!memberProfile) return;
    
    setIsSaving(true);
    try {
      const updatedProfile: MemberProfile = {
        ...memberProfile,
        ...formData,
        profileImage: profileImage || memberProfile.profileImage
      };
      
      // TODO: API 호출로 실제 저장
      updateProfile(updatedProfile);
      setHasChanges(false);
      
      // 성공 메시지 표시
      alert('프로필이 성공적으로 저장되었습니다!');
    } catch (error) {
      console.error('프로필 저장 실패:', error);
      alert('프로필 저장에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleAdultToggle = () => {
    if (!memberProfile?.adultSettings) return;
    
    if (!memberProfile.adultSettings.adultContentFilter) {
      navigate(Routes.ADULT_VERIFICATION);
    } else {
      const updatedProfile: MemberProfile = {
        ...memberProfile,
        adultSettings: {
          ...memberProfile.adultSettings,
          adultContentFilter: false
        }
      };
      updateProfile(updatedProfile);
    }
  };

  const handleAdultSettingChange = (setting: keyof MemberProfile['adultSettings']) => {
    if (!memberProfile?.adultSettings) return;
    
    const updatedProfile: MemberProfile = {
      ...memberProfile,
      adultSettings: {
        ...memberProfile.adultSettings,
        [setting]: !memberProfile.adultSettings[setting]
      }
    };
    updateProfile(updatedProfile);
  };

  const handleAccountConnect = (provider: keyof MemberProfile['connectedAccounts']) => {
    if (!memberProfile?.connectedAccounts) return;
    
    const updatedProfile: MemberProfile = {
      ...memberProfile,
      connectedAccounts: {
        ...memberProfile.connectedAccounts,
        [provider]: !memberProfile.connectedAccounts[provider]
      }
    };
    updateProfile(updatedProfile);
  };

  const renderBasicInfo = () => (
    <div className={styles.tabContent}>
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>
          <FiUser />
          기본 정보
        </h3>
        
        <div className={styles.profileImageContainer}>
          <div className={styles.profileImageWrapper}>
            <img
              src={profileImage || memberProfile?.profileImage || '/images/profile/default_profile_image.svg'}
              alt="프로필 이미지"
              className={styles.profileImage}
            />
            <label className={styles.imageUploadButton}>
              <FiCamera />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className={styles.imageInput}
              />
            </label>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>
            <FiUser />
            닉네임
          </label>
          <input
            type="text"
            value={formData.nickname}
            onChange={(e) => handleInputChange('nickname', e.target.value)}
            className={styles.input}
            placeholder="닉네임을 입력하세요"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>
            <FiMail />
            자기소개
          </label>
          <textarea
            value={formData.bio}
            onChange={(e) => handleInputChange('bio', e.target.value)}
            className={styles.textarea}
            placeholder="자기소개를 입력하세요"
            maxLength={200}
          />
          <span className={styles.charCount}>{formData.bio.length}/200</span>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label className={styles.label}>
              <FiCalendar />
              생년월일
            </label>
            <input
              type="date"
              value={formData.birthDate}
              onChange={(e) => handleInputChange('birthDate', e.target.value)}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>
              <FiUser />
              성별
            </label>
            <select
              value={formData.gender}
              onChange={(e) => handleInputChange('gender', e.target.value)}
              className={styles.select}
            >
              <option value="prefer_not_to_say">선택하지 않음</option>
              <option value="male">남성</option>
              <option value="female">여성</option>
              <option value="other">기타</option>
            </select>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>
            <FiMapPin />
            위치
          </label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            className={styles.input}
            placeholder="위치를 입력하세요"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>
            <FiGlobe />
            웹사이트
          </label>
          <input
            type="url"
            value={formData.website}
            onChange={(e) => handleInputChange('website', e.target.value)}
            className={styles.input}
            placeholder="https://example.com"
          />
        </div>
      </div>
    </div>
  );

  const renderSocialLinks = () => (
    <div className={styles.tabContent}>
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>
          <FiGlobe />
          소셜 링크
        </h3>
        
        <div className={styles.formGroup}>
          <label className={styles.label}>
            <FiTwitter />
            Twitter
          </label>
          <input
            type="text"
            value={formData.socialLinks.twitter}
            onChange={(e) => handleNestedChange('socialLinks', 'twitter', e.target.value)}
            className={styles.input}
            placeholder="@username"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>
            <FiInstagram />
            Instagram
          </label>
          <input
            type="text"
            value={formData.socialLinks.instagram}
            onChange={(e) => handleNestedChange('socialLinks', 'instagram', e.target.value)}
            className={styles.input}
            placeholder="username"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>
            <FiYoutube />
            YouTube
          </label>
          <input
            type="text"
            value={formData.socialLinks.youtube}
            onChange={(e) => handleNestedChange('socialLinks', 'youtube', e.target.value)}
            className={styles.input}
            placeholder="채널명 또는 URL"
          />
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>
          <FiUser />
          연결된 계정
        </h3>
        
        <div className={styles.connectedAccounts}>
          <div className={styles.accountItem}>
            <div className={styles.accountInfo}>
              <img src="/images/social/btn_google.svg" alt="Google" className={styles.accountIcon} />
              <span className={styles.accountName}>Google</span>
            </div>
            <button
              className={`${styles.connectButton} ${memberProfile?.connectedAccounts?.google ? styles.connected : ''}`}
              onClick={() => handleAccountConnect('google')}
            >
              {memberProfile?.connectedAccounts?.google ? '연결됨' : '연결하기'}
            </button>
          </div>

          <div className={styles.accountItem}>
            <div className={styles.accountInfo}>
              <img src="/images/social/btn_kakao.svg" alt="Kakao" className={styles.accountIcon} />
              <span className={styles.accountName}>Kakao</span>
            </div>
            <button
              className={`${styles.connectButton} ${memberProfile?.connectedAccounts?.kakao ? styles.connected : ''}`}
              onClick={() => handleAccountConnect('kakao')}
            >
              {memberProfile?.connectedAccounts?.kakao ? '연결됨' : '연결하기'}
            </button>
          </div>

          <div className={styles.accountItem}>
            <div className={styles.accountInfo}>
              <img src="/images/social/btn_naver.svg" alt="Naver" className={styles.accountIcon} />
              <span className={styles.accountName}>Naver</span>
            </div>
            <button
              className={`${styles.connectButton} ${memberProfile?.connectedAccounts?.naver ? styles.connected : ''}`}
              onClick={() => handleAccountConnect('naver')}
            >
              {memberProfile?.connectedAccounts?.naver ? '연결됨' : '연결하기'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPrivacySettings = () => (
    <div className={styles.tabContent}>
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>
          <FiShield />
          개인정보 보호
        </h3>
        
        <div className={styles.formGroup}>
          <label className={styles.label}>프로필 공개 설정</label>
          <select
            value={formData.privacySettings.profileVisibility}
            onChange={(e) => handleNestedChange('privacySettings', 'profileVisibility', e.target.value)}
            className={styles.select}
          >
            <option value="public">전체 공개</option>
            <option value="friends">친구만</option>
            <option value="private">비공개</option>
          </select>
        </div>

        <div className={styles.privacyOptions}>
          <div className={styles.privacyItem}>
            <div className={styles.privacyInfo}>
              <span className={styles.privacyLabel}>읽은 웹툰 공개</span>
              <span className={styles.privacyDescription}>다른 사용자가 내가 읽은 웹툰을 볼 수 있습니다</span>
            </div>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={formData.privacySettings.showReadingHistory}
                onChange={(e) => handleNestedChange('privacySettings', 'showReadingHistory', e.target.checked)}
              />
              <span className={styles.slider}></span>
            </label>
          </div>

          <div className={styles.privacyItem}>
            <div className={styles.privacyInfo}>
              <span className={styles.privacyLabel}>리뷰 공개</span>
              <span className={styles.privacyDescription}>내가 작성한 리뷰를 다른 사용자가 볼 수 있습니다</span>
            </div>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={formData.privacySettings.showReviews}
                onChange={(e) => handleNestedChange('privacySettings', 'showReviews', e.target.checked)}
              />
              <span className={styles.slider}></span>
            </label>
          </div>

          <div className={styles.privacyItem}>
            <div className={styles.privacyInfo}>
              <span className={styles.privacyLabel}>컬렉션 공개</span>
              <span className={styles.privacyDescription}>내가 만든 컬렉션을 다른 사용자가 볼 수 있습니다</span>
            </div>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={formData.privacySettings.showCollections}
                onChange={(e) => handleNestedChange('privacySettings', 'showCollections', e.target.checked)}
              />
              <span className={styles.slider}></span>
            </label>
          </div>

          <div className={styles.privacyItem}>
            <div className={styles.privacyInfo}>
              <span className={styles.privacyLabel}>메시지 수신</span>
              <span className={styles.privacyDescription}>다른 사용자로부터 메시지를 받을 수 있습니다</span>
            </div>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={formData.privacySettings.allowMessages}
                onChange={(e) => handleNestedChange('privacySettings', 'allowMessages', e.target.checked)}
              />
              <span className={styles.slider}></span>
            </label>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>성인 인증</h3>
        
        <div className={styles.adultVerification}>
          <div className={styles.adultStatus}>
            <span className={styles.adultLabel}>성인 인증 상태</span>
            <div className={styles.toggleContainer}>
              <span className={styles.toggleLabel}>
                {memberProfile?.adultSettings?.adultContentFilter ? '인증됨' : '미인증'}
              </span>
              <label className={styles.toggleSwitch}>
                <input
                  type="checkbox"
                  checked={memberProfile?.adultSettings?.adultContentFilter}
                  onChange={handleAdultToggle}
                />
                <span className={styles.toggleSlider} />
              </label>
            </div>
          </div>

          {memberProfile?.adultSettings?.adultContentFilter && (
            <div className={styles.adultSettings}>
              <h4 className={styles.settingsTitle}>성인 콘텐츠 설정</h4>
              <div className={styles.settingItem}>
                <label className={styles.settingLabel}>
                  고어 콘텐츠 필터
                  <input
                    type="checkbox"
                    checked={memberProfile.adultSettings.goreFilter}
                    onChange={() => handleAdultSettingChange('goreFilter')}
                  />
                </label>
              </div>
              <div className={styles.settingItem}>
                <label className={styles.settingLabel}>
                  성인 콘텐츠 필터
                  <input
                    type="checkbox"
                    checked={memberProfile.adultSettings.adultContentFilter}
                    onChange={() => handleAdultSettingChange('adultContentFilter')}
                  />
                </label>
              </div>
              <div className={styles.settingItem}>
                <label className={styles.settingLabel}>
                  폭력 콘텐츠 필터
                  <input
                    type="checkbox"
                    checked={memberProfile.adultSettings.violenceFilter}
                    onChange={() => handleAdultSettingChange('violenceFilter')}
                  />
                </label>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className={styles.tabContent}>
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>
          <FiBell />
          알림 설정
        </h3>
        
        <div className={styles.notificationOptions}>
          <div className={styles.notificationItem}>
            <div className={styles.notificationInfo}>
              <span className={styles.notificationLabel}>이메일 알림</span>
              <span className={styles.notificationDescription}>중요한 업데이트와 이벤트를 이메일로 받습니다</span>
            </div>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={formData.notificationPreferences.email}
                onChange={(e) => handleNestedChange('notificationPreferences', 'email', e.target.checked)}
              />
              <span className={styles.slider}></span>
            </label>
          </div>

          <div className={styles.notificationItem}>
            <div className={styles.notificationInfo}>
              <span className={styles.notificationLabel}>푸시 알림</span>
              <span className={styles.notificationDescription}>실시간 알림을 앱에서 받습니다</span>
            </div>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={formData.notificationPreferences.push}
                onChange={(e) => handleNestedChange('notificationPreferences', 'push', e.target.checked)}
              />
              <span className={styles.slider}></span>
            </label>
          </div>

          <div className={styles.notificationItem}>
            <div className={styles.notificationInfo}>
              <span className={styles.notificationLabel}>SMS 알림</span>
              <span className={styles.notificationDescription}>중요한 보안 알림을 문자로 받습니다</span>
            </div>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={formData.notificationPreferences.sms}
                onChange={(e) => handleNestedChange('notificationPreferences', 'sms', e.target.checked)}
              />
              <span className={styles.slider}></span>
            </label>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>
          <FiShield />
          보안 설정
        </h3>
        
        <div className={styles.securityGroup}>
          <div className={styles.securityItem}>
            <div className={styles.securityInfo}>
              <span className={styles.securityLabel}>비밀번호 변경</span>
              <span className={styles.securityDescription}>계정 보안을 위해 정기적으로 비밀번호를 변경하세요</span>
            </div>
            <button 
              className={styles.securityButton}
              onClick={() => navigate(Routes.PASSWORD_CHANGE)}
            >
              변경하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  if (!memberProfile) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>프로필 정보를 불러오는 중...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={() => navigate(-1)}>
          <FiArrowLeft />
        </button>
        <h1 className={styles.title}>프로필 수정</h1>
        <button 
          className={`${styles.saveButton} ${hasChanges ? styles.active : ''}`}
          onClick={handleSave}
          disabled={!hasChanges || isSaving}
        >
          <FiSave />
          {isSaving ? '저장 중...' : '저장'}
        </button>
      </div>

      <div className={styles.tabNavigation}>
        <button 
          className={`${styles.tabButton} ${activeTab === 'basic' ? styles.active : ''}`}
          onClick={() => setActiveTab('basic')}
        >
          <FiUser />
          기본 정보
        </button>
        <button 
          className={`${styles.tabButton} ${activeTab === 'social' ? styles.active : ''}`}
          onClick={() => setActiveTab('social')}
        >
          <FiGlobe />
          소셜
        </button>
        <button 
          className={`${styles.tabButton} ${activeTab === 'privacy' ? styles.active : ''}`}
          onClick={() => setActiveTab('privacy')}
        >
          <FiShield />
          개인정보
        </button>
        <button 
          className={`${styles.tabButton} ${activeTab === 'notifications' ? styles.active : ''}`}
          onClick={() => setActiveTab('notifications')}
        >
          <FiBell />
          알림
        </button>
      </div>

      <div className={styles.content}>
        {activeTab === 'basic' && renderBasicInfo()}
        {activeTab === 'social' && renderSocialLinks()}
        {activeTab === 'privacy' && renderPrivacySettings()}
        {activeTab === 'notifications' && renderNotifications()}
      </div>
    </div>
  );
};

export default ProfileEditPage; 