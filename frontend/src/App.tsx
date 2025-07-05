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
import WebtoonDetailsPage from '@pages/webtoon/webtoon-details';

import { Routes as AppRoutes } from '@constants/routes';

const AppContent: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path={AppRoutes.HOME} element={<HomePage />} />
          <Route path={AppRoutes.LOGIN} element={<LoginPage />} />
          <Route path={AppRoutes.SIGNUP} element={<SignupPage />} />
          <Route path={AppRoutes.SOCIAL_LOGIN_CALLBACK} element={<SocialLoginCallbackPage />} />
          <Route path={AppRoutes.ERROR} element={<ErrorPage />} />
          <Route path={AppRoutes.TUTORIAL} element={<TutorialPage />} />
          <Route path={AppRoutes.PROFILE} element={<ProfilePage />} />
          <Route path={AppRoutes.PROFILE_EDIT} element={<ProfileEditPage />} />
          <Route path={AppRoutes.ADULT_VERIFICATION} element={<AdultVerificationPage />} />
          <Route path={AppRoutes.NOTIFICATION_SETTINGS} element={<NotificationSettingsPage />} />
          <Route path={AppRoutes.BOOKMARKED_WEBTOONS} element={<BookmarkedWebtoonsPage />} />
          <Route path={AppRoutes.MASTERPIECE_WEBTOONS} element={<MasterpieceWebtoonsPage />} />
          <Route path={AppRoutes.READING_HISTORY} element={<ReadingHistoryPage />} />
          <Route path={AppRoutes.COLLECTIONS} element={<CollectionsPage />} />
          <Route path={AppRoutes.COLLECTION_CREATE} element={<CollectionCreatePage />} />
          <Route path="/user/collections/:collectionId" element={<CollectionDetailPage />} />
          <Route path="/user/collections/:collectionId/edit" element={<CollectionEditPage />} />
          <Route path={AppRoutes.ACHIEVEMENTS} element={<AchievementsPage />} />
          <Route path={AppRoutes.ONGOING_WEBTOONS} element={<OngoingWebtoonsPage />} />
          <Route path="/webtoon/:webtoonId" element={<WebtoonDetailsPage />} />
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