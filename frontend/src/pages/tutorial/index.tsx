import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@contexts/auth-context';
import MemberService from '@services/member-service';
import styles from './style.module.css';
import { Routes } from '@constants/routes';
import BasicInfoForm from './sections/basic-info'
import GenrePreferenceForm from './sections/genre-preference';
import WebtoonRatingForm from './sections/webtoon-rating';

const TutorialPage: React.FC = () => {
  const navigate = useNavigate();
  const { updateProfile } = useAuth();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [basicInfo, setBasicInfo] = useState<{ 
    gender: string; 
    ageGroup: string; 
    ageDigit: number 
  } | null>(null);

  const handleBasicInfoComplete = async (data: { 
    gender: string; 
    ageGroup: string; 
    ageDigit: number 
  }) => {
    setBasicInfo(data);
    try {
      const response = await MemberService.updateBasicInfo({
        ...data,
        gender: data.gender as 'male' | 'female' | 'other' | 'prefer_not_to_say'
      });
      if (response.success && response.data) {
        updateProfile(response.data);
      }
      setCurrentStep(2);
    } catch (error) {
      setCurrentStep(2); 
    }
  };

  const handleGenrePreferenceComplete = (genres: string[]) => {
    setCurrentStep(3);
  };

  const handleWebtoonRatingComplete = async () => {
    try {
      // 튜토리얼 완료 처리
      const response = await MemberService.completeTutorial();
      if (response.success && response.data) {
        updateProfile(response.data);
      }
      navigate(Routes.HOME);
    } catch (error) {
      console.error('튜토리얼 완료 처리 중 오류:', error);
      navigate(Routes.HOME);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {currentStep === 1 && (
          <div className={styles.step}>
            <BasicInfoForm onComplete={handleBasicInfoComplete} />
          </div>
        )}
        
        {currentStep === 2 && (
          <div className={styles.step}>
            <GenrePreferenceForm onComplete={handleGenrePreferenceComplete} onSkip={() => setCurrentStep(3)} />
          </div>
        )}
        
        {currentStep === 3 && (
          <div className={styles.step}>
            <WebtoonRatingForm onComplete={handleWebtoonRatingComplete} />
          </div>
        )}
      </div>
    </div>
  );
};

export default TutorialPage; 