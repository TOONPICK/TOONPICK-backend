import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Header from '@components/header';

import { AuthProvider, useAuth } from '@contexts/auth-context';
import { ModalProvider } from '@contexts/modal-context';

import HomePage from '@pages/home';
import SignInPage from '@pages/auth/login';
import SignUpPage from '@pages/auth/signup';
import WebtoonDetailPage from '@pages/webtoon/webtoon-details';
import MyProfilePage from '@pages/user/profile';
import SocialLoginCallbackPage from '@pages/auth/sociallogin-callback-page';
import OngoingWebtoonsPage from '@pages/webtoon/ongoing-webtoons';
import ProfileEditPage from '@pages/user/profile-edit';
import ErrorPage from '@pages/error';
import NotificationSettingsPage from '@pages/user/notification-settings';
import ReadingHistoryPage from '@pages/user/reading-history';
import MasterpieceWebtoonsPage from '@pages/user/masterpiece-webtoons';
import AdultVerificationPage from '@pages/user/adult-verification';
import TutorialPage from '@pages/tutorial';

import { Routes as RoutePaths } from '@constants/routes';

// 튜토리얼 리다이렉트 처리를 위한 컴포넌트
const TutorialRedirectHandler: React.FC = () => {
  const { state, clearTutorialRedirect } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('TutorialRedirectHandler - shouldRedirectToTutorial:', state.shouldRedirectToTutorial); // 디버깅용
    if (state.shouldRedirectToTutorial) {
      console.log('Redirecting to tutorial...'); // 디버깅용
      navigate(RoutePaths.TUTORIAL);
      clearTutorialRedirect();
    }
  }, [state.shouldRedirectToTutorial, navigate, clearTutorialRedirect]);

  return null;
};

const AppContent: React.FC = () => {
  return (
    <>
      <TutorialRedirectHandler />
      <Header />
      <main style={{ maxWidth: '1200px', width: '100%', minHeight: '1000px', margin: '0 auto', padding: '20px' }}>
        <Routes>
          <Route path={RoutePaths.HOME} element={<HomePage />} />
          <Route path={RoutePaths.TUTORIAL} element={<TutorialPage />} />

          {/* 웹툰 관련 페이지 */}
          <Route path={RoutePaths.WEBTOON_ONGOING} element={<OngoingWebtoonsPage />} />
          <Route path={RoutePaths.WEBTOON_DETAIL(':id')} element={<WebtoonDetailPage />} />

          {/* Auth 관련 페이지 */}
          <Route path={RoutePaths.LOGIN} element={<SignInPage />} />
          <Route path={RoutePaths.SIGNUP} element={<SignUpPage />} />
          <Route path={RoutePaths.LOGIN_CALLBACK} element={<SocialLoginCallbackPage />} />

          {/* 유저 관련 페이지 */}
          <Route path={RoutePaths.USER_PROFILE} element={<MyProfilePage />} />
          <Route path={RoutePaths.USER_PROFILE_EDIT} element={<ProfileEditPage />} />
          <Route path={RoutePaths.NOTIFICATION_SETTINGS} element={<NotificationSettingsPage />} />
          <Route path={RoutePaths.ERROR} element={<ErrorPage />} />
          <Route path={RoutePaths.READING_HISTORY} element={<ReadingHistoryPage />} />
          <Route path={RoutePaths.MASTERPIECE_WEBTOONS} element={<MasterpieceWebtoonsPage />} />
          <Route path={RoutePaths.ADULT_VERIFICATION} element={<AdultVerificationPage/>} />

        </Routes>
      </main>
    </>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ModalProvider>
        <Router>
          <AppContent />
        </Router>
      </ModalProvider>
    </AuthProvider>
  );
};

export default App; 