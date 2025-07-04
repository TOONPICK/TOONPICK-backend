import React, { createContext, useReducer, useEffect, ReactNode, useContext } from 'react';
import AuthService from '@services/auth-service';
import MemberService from '@services/member-service';
import { MemberProfile } from '@models/member';
import TokenManager from '@services/token-manager';

// 인증 상태를 정의하는 인터페이스
interface AuthState {
  isAuthenticated: boolean; // 로그인 여부
  memberProfile: MemberProfile | null; // 회원 프로필 정보
  error: string | null; // 에러 메시지
  shouldRedirectToTutorial: boolean; // 튜토리얼 리다이렉트 필요 여부
}

// 인증 액션 타입 정의
type AuthAction =
  | { type: 'LOGIN_SUCCESS'; payload: MemberProfile | null } // 로그인 성공
  | { type: 'LOGIN_FAILURE'; payload: string } // 로그인 실패
  | { type: 'LOGOUT' } // 로그아웃
  | { type: 'SET_MEMBER_PROFILE'; payload: MemberProfile } // 회원 프로필 설정
  | { type: 'SOCIAL_LOGIN_SUCCESS'; payload: MemberProfile } // 소셜 로그인 성공 액션 추가
  | { type: 'UPDATE_PROFILE'; payload: MemberProfile } // 프로필 업데이트
  | { type: 'CLEAR_TUTORIAL_REDIRECT' }; // 튜토리얼 리다이렉트 플래그 클리어

// 초기 상태 정의
const initialState: AuthState = {
  isAuthenticated: false,
  memberProfile: null,
  error: null,
  shouldRedirectToTutorial: false,
};

// 인증 컨텍스트 타입 정의
interface AuthContextType {
  state: AuthState; // 현재 인증 상태
  login: (username: string, password: string) => Promise<void>; // 로그인 함수
  logout: () => void; // 로그아웃 함수
  setMemberProfile: (profile: MemberProfile) => void; // 회원 프로필 설정 함수
  socialLoginSuccess: () => Promise<MemberProfile>; // 소셜 로그인 성공 함수 추가
  updateProfile: (profile: MemberProfile) => void; // 프로필 업데이트 함수
  memberProfile: MemberProfile | null; // 회원 프로필 정보
  clearTutorialRedirect: () => void; // 튜토리얼 리다이렉트 플래그 클리어
}

// 인증 컨텍스트 생성
const defaultAuthContext: AuthContextType = {
  state: initialState,
  login: async () => {},
  logout: () => {},
  setMemberProfile: () => {},
  socialLoginSuccess: async () => {
    throw new Error('AuthContext not initialized');
  },
  updateProfile: () => {},
  memberProfile: null,
  clearTutorialRedirect: () => {},
};

// 인증 제공자 프로퍼티 타입 정의
interface AuthProviderProps {
  children: ReactNode;
}

// 인증 상태를 관리하는 리듀서 함수
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      const shouldRedirect = action.payload ? !action.payload.tutorial : false;
      console.log('LOGIN_SUCCESS - tutorial:', action.payload?.tutorial, 'shouldRedirect:', shouldRedirect); // 디버깅용
      return { 
        ...state, 
        isAuthenticated: true, 
        memberProfile: action.payload, 
        error: null,
        shouldRedirectToTutorial: shouldRedirect
      };
    case 'LOGIN_FAILURE':
      return { ...state, isAuthenticated: false, memberProfile: null, error: action.payload, shouldRedirectToTutorial: false };
    case 'LOGOUT':
      return { ...state, isAuthenticated: false, memberProfile: null, error: null, shouldRedirectToTutorial: false };
    case 'SET_MEMBER_PROFILE':
      const setRedirect = !action.payload.tutorial;
      console.log('SET_MEMBER_PROFILE - tutorial:', action.payload.tutorial, 'shouldRedirect:', setRedirect); // 디버깅용
      return { 
        ...state, 
        memberProfile: action.payload,
        shouldRedirectToTutorial: setRedirect
      };
    case 'SOCIAL_LOGIN_SUCCESS':
      const socialRedirect = !action.payload.tutorial;
      console.log('SOCIAL_LOGIN_SUCCESS - tutorial:', action.payload.tutorial, 'shouldRedirect:', socialRedirect); // 디버깅용
      return { 
        ...state, 
        isAuthenticated: true, 
        memberProfile: action.payload, 
        error: null,
        shouldRedirectToTutorial: socialRedirect
      };
    case 'UPDATE_PROFILE':
      const updateRedirect = !action.payload.tutorial;
      console.log('UPDATE_PROFILE - tutorial:', action.payload.tutorial, 'shouldRedirect:', updateRedirect); // 디버깅용
      return { 
        ...state, 
        memberProfile: action.payload,
        shouldRedirectToTutorial: updateRedirect
      };
    case 'CLEAR_TUTORIAL_REDIRECT':
      console.log('CLEAR_TUTORIAL_REDIRECT'); // 디버깅용
      return { ...state, shouldRedirectToTutorial: false };
    default:
      return state; // 기본 상태 반환
  }
};

const AuthContext = createContext<AuthContextType>(defaultAuthContext);

// 인증 제공자 컴포넌트
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState); // 상태와 디스패치 함수 초기화

  // 컴포넌트가 마운트될 때 실행되는 효과
  useEffect(() => {
    const accessToken = TokenManager.getAccessToken(); // 저장된 액세스 토큰 가져오기
    const isDev = process.env.NODE_ENV === 'development';
    
    // 토큰이 유효한 경우에만 프로필 가져오기 (로그인된 상태)
    if (accessToken && !TokenManager.isAccessTokenExpired(accessToken)) {
      const fetchMemberProfile = async () => {
        try {
          const profile = await MemberService.getMemberProfile(); // 회원 프로필 가져오기
          console.log('Fetched profile:', profile.data); // 디버깅용
          if (profile.data) {
            console.log('Tutorial status:', profile.data.tutorial); // 디버깅용
            dispatch({ type: 'LOGIN_SUCCESS', payload: profile.data }); // 로그인 성공
          } else {
            dispatch({ type: 'LOGIN_FAILURE', payload: 'Failed to fetch member profile' }); // 프로필 가져오기 실패
          }
        } catch (error) {
          console.error('Error fetching member profile:', error); // 에러 로그
        }
      };
      fetchMemberProfile(); // 프로필 가져오기 함수 호출
    } else if (isDev) {
      // 개발 환경에서 토큰이 없으면 자동으로 로그인 상태 시뮬레이션
      console.log('Development mode: Simulating logged in state');
      const fetchMemberProfile = async () => {
        try {
          const profile = await MemberService.getMemberProfile(); // 회원 프로필 가져오기
          console.log('Fetched profile (dev):', profile.data); // 디버깅용
          if (profile.data) {
            console.log('Tutorial status (dev):', profile.data.tutorial); // 디버깅용
            dispatch({ type: 'LOGIN_SUCCESS', payload: profile.data }); // 로그인 성공
          } else {
            dispatch({ type: 'LOGIN_FAILURE', payload: 'Failed to fetch member profile' }); // 프로필 가져오기 실패
          }
        } catch (error) {
          console.error('Error fetching member profile:', error); // 에러 로그
        }
      };
      fetchMemberProfile(); // 프로필 가져오기 함수 호출
    }
  }, []); // 빈 배열로 의존성 설정하여 컴포넌트가 처음 마운트될 때만 실행

  // 로그인 함수
  const login = async (username: string, password: string) => {
    try {
      const response = await AuthService.login(username, password); // 로그인 요청
      if (response.success) {
        const profile = await MemberService.getMemberProfile(); // 회원 프로필 가져오기
        if (profile.data) {
          dispatch({ type: 'LOGIN_SUCCESS', payload: profile.data }); // 로그인 성공
        } else {
          dispatch({ type: 'LOGIN_FAILURE', payload: 'Failed to fetch member profile' }); // 프로필 가져오기 실패
        }
      } else {
        dispatch({ type: 'LOGIN_FAILURE', payload: response.message || 'Login failed' }); // 로그인 실패
      }
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: 'Login failed due to an unknown error' }); // 에러 처리
    }
  };

  // 로그아웃 함수
  const logout = () => {
    AuthService.logout(); // 로그아웃 요청
    dispatch({ type: 'LOGOUT' }); // 상태 업데이트
  };

  // 회원 프로필 설정 함수
  const setMemberProfile = (profile: MemberProfile) => {
    dispatch({ type: 'SET_MEMBER_PROFILE', payload: profile }); // 상태 업데이트
  };

  const socialLoginSuccess = async () => {
    try {
      const profile = await MemberService.getMemberProfile();
      if (profile.data) {
        dispatch({ type: 'SOCIAL_LOGIN_SUCCESS', payload: profile.data });
        return profile.data;
      } else {
        throw new Error('회원 프로필을 가져올 수 없습니다.');
      }
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: error instanceof Error ? error.message : '회원 프로필 조회 중 오류가 발생했습니다.' });
      throw error;
    }
  };

  const updateProfile = (profile: MemberProfile) => {
    dispatch({ type: 'UPDATE_PROFILE', payload: profile });
  };

  const clearTutorialRedirect = () => {
    dispatch({ type: 'CLEAR_TUTORIAL_REDIRECT' });
  };

  // 컨텍스트 제공
  return (
    <AuthContext.Provider
      value={{
        state,
        login,
        logout,
        setMemberProfile,
        socialLoginSuccess,
        updateProfile,
        memberProfile: state.memberProfile,
        clearTutorialRedirect,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// 인증 컨텍스트 사용을 위한 훅
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};