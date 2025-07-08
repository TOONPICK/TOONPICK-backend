import React from 'react';
import styles from './style.module.css';
import { Platform } from '@models/webtoon';

interface PlatformIconProps {
  platform: Platform;
  size?: 'small' | 'medium' | 'large' | number;
}

const PlatformIcon: React.FC<PlatformIconProps> = ({ platform, size = 24 }) => {
  const getSizeStyle = () => {
    if (typeof size === 'number') {
      return {
        width: `${size}px`,
        height: `${size}px`
      };
    }
    return {};
  };

  const getPlatformIcon = () => {
    switch (platform) {
      case Platform.NAVER:
        return '/images/platforms/naverwebtoon.svg';
      case Platform.KAKAO:
        return '/images/platforms/kakaowebtoon.svg';
      case Platform.KAKAOPAGE:
        return '/images/platforms/kakaopage.svg';
      case Platform.LEZHIN:
        return '/images/platforms/lezhincomics.svg';
      default:
        return '/images/platforms/btn_other.svg';
    }
  };

  return (
    <img
      src={getPlatformIcon()}
      alt={`${platform} 플랫폼`}
      className={styles.platformIcon}
      style={typeof size === 'number' ? getSizeStyle() : undefined}
    />
  );
};

export default PlatformIcon;
