import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '@components/header';

import { AuthProvider } from '@contexts/auth-context';
import { ModalProvider } from '@contexts/modal-context';

import HomePage from '@pages/home';
import LoginPage from '@pages/auth/login';
import SignupPage from '@pages/auth/signup';
import SocialLoginCallbackPage from '@pages/auth/sociallogin-callback-page';
import ErrorPage from '@pages/error';
import TutorialPage from '@pages/tutorial';
import ProfilePage from '@pages/user/profile';
import ProfileEditPage from '@pages/user/profile-edit';
import PasswordChangePage from '@pages/user/password-change';
import AdultVerificationPage from '@pages/user/adult-verification';
import NotificationSettingsPage from '@pages/user/notification-settings';
import BookmarkedWebtoonsPage from '@pages/user/bookmarked-webtoons';
import MasterpieceWebtoonsPage from '@pages/user/masterpiece-webtoons';
import ReadingHistoryPage from '@pages/user/reading-history';
import CollectionsPage from '@pages/user/collections';
import CollectionCreatePage from '@pages/user/collection-create';
import CollectionDetailPage from '@pages/user/collection-detail';
import CollectionEditPage from '@pages/user/collection-edit';
import AchievementsPage from '@pages/user/achievements';
import OngoingWebtoonsPage from '@pages/webtoon/ongoing-webtoons';
import ExplorePage from '@pages/webtoon/explore';
import WebtoonDetailsPage from '@pages/webtoon/webtoon-details';

import { Routes as RoutePaths } from '@constants/routes';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ModalProvider>
        <Router>
          <Header />
          <main style={{ maxWidth: '1200px', width: '100%', minHeight: '1000px', margin: '0 auto', padding: '20px' }}>
            <Routes>
              <Route path={RoutePaths.HOME} element={<HomePage />} />
              <Route path={RoutePaths.TUTORIAL} element={<TutorialPage />} />

              {/* 웹툰 관련 페이지 */}
              <Route path={RoutePaths.WEBTOON_ONGOING} element={<OngoingWebtoonsPage />} />
              <Route path={RoutePaths.WEBTOON_EXPLORE} element={<ExplorePage />} />
              <Route path={RoutePaths.WEBTOON_DETAIL(':id')} element={<WebtoonDetailsPage />} />

              {/* Auth 관련 페이지 */}
              <Route path={RoutePaths.LOGIN} element={<LoginPage />} />
              <Route path={RoutePaths.SIGNUP} element={<SignupPage />} />
              <Route path={RoutePaths.SOCIAL_LOGIN_CALLBACK} element={<SocialLoginCallbackPage />} />

              {/* 유저 관련 페이지 */}
              <Route path={RoutePaths.USER_PROFILE} element={<ProfilePage />} />
              <Route path={RoutePaths.USER_PROFILE_EDIT} element={<ProfileEditPage />} />
              <Route path={RoutePaths.PASSWORD_CHANGE} element={<PasswordChangePage />} />
              <Route path={RoutePaths.ADULT_VERIFICATION} element={<AdultVerificationPage />} />
              <Route path={RoutePaths.NOTIFICATION_SETTINGS} element={<NotificationSettingsPage />} />
              <Route path={RoutePaths.BOOKMARKED_WEBTOONS} element={<BookmarkedWebtoonsPage />} />
              <Route path={RoutePaths.MASTERPIECE_WEBTOONS} element={<MasterpieceWebtoonsPage />} />
              <Route path={RoutePaths.READING_HISTORY} element={<ReadingHistoryPage />} />
              <Route path={RoutePaths.COLLECTIONS} element={<CollectionsPage />} />
              <Route path={RoutePaths.COLLECTION_CREATE} element={<CollectionCreatePage />} />
              <Route path="/user/collections/:collectionId" element={<CollectionDetailPage />} />
              <Route path="/user/collections/:collectionId/edit" element={<CollectionEditPage />} />
              <Route path={RoutePaths.ACHIEVEMENTS} element={<AchievementsPage />} />
              <Route path={RoutePaths.ERROR} element={<ErrorPage />} />
            </Routes>
          </main>
        </Router>
      </ModalProvider>
    </AuthProvider>
  );
};

export default App; 