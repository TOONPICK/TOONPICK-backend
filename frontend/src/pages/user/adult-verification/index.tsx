import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiArrowLeft, 
  FiCheck, 
  FiX, 
  FiPhone, 
  FiCreditCard, 
  FiShield, 
  FiAlertTriangle,
  FiEye,
  FiEyeOff,
  FiUpload
} from 'react-icons/fi';
import styles from './style.module.css';
import { Routes } from '@constants/routes';

const AdultVerificationPage: React.FC = () => {
  const navigate = useNavigate();
  const [verificationMethod, setVerificationMethod] = useState<'phone' | 'idCard' | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleSendCode = async () => {
    if (!phoneNumber) {
      setErrors({ phone: '휴대폰 번호를 입력해주세요.' });
      return;
    }

    if (!/^01[0-9]-\d{3,4}-\d{4}$/.test(phoneNumber)) {
      setErrors({ phone: '올바른 휴대폰 번호 형식을 입력해주세요.' });
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      // TODO: 인증번호 전송 API 연동
      await new Promise(resolve => setTimeout(resolve, 2000)); // 임시 딜레이
      setIsCodeSent(true);
      alert('인증번호가 전송되었습니다.');
    } catch (error) {
      console.error('인증번호 전송 실패:', error);
      setErrors({ submit: '인증번호 전송에 실패했습니다. 다시 시도해주세요.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!verificationCode) {
      setErrors({ code: '인증번호를 입력해주세요.' });
      return;
    }

    if (verificationCode.length !== 6) {
      setErrors({ code: '인증번호는 6자리입니다.' });
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      // TODO: 인증번호 확인 API 연동
      await new Promise(resolve => setTimeout(resolve, 2000)); // 임시 딜레이
      setIsVerified(true);
      setTimeout(() => {
        navigate(Routes.USER_PROFILE_EDIT);
      }, 3000);
    } catch (error) {
      console.error('인증번호 확인 실패:', error);
      setErrors({ code: '인증번호가 올바르지 않습니다.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB 제한
        setErrors({ file: '파일 크기는 10MB 이하여야 합니다.' });
        return;
      }

      if (!file.type.startsWith('image/')) {
        setErrors({ file: '이미지 파일만 업로드 가능합니다.' });
        return;
      }

      setUploadedFile(file);
      setErrors({});

      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadPreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleIdCardSubmit = async () => {
    if (!uploadedFile) {
      setErrors({ file: '신분증 사진을 업로드해주세요.' });
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      // TODO: 신분증 인증 API 연동
      await new Promise(resolve => setTimeout(resolve, 3000)); // 임시 딜레이
      setIsVerified(true);
      setTimeout(() => {
        navigate(Routes.USER_PROFILE_EDIT);
      }, 3000);
    } catch (error) {
      console.error('신분증 인증 실패:', error);
      setErrors({ submit: '신분증 인증에 실패했습니다. 다시 시도해주세요.' });
    } finally {
      setIsLoading(false);
    }
  };

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/[^\d]/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 7) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhoneNumber(formatted);
    if (errors.phone) setErrors(prev => ({ ...prev, phone: '' }));
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d]/g, '').slice(0, 6);
    setVerificationCode(value);
    if (errors.code) setErrors(prev => ({ ...prev, code: '' }));
  };

  if (isVerified) {
    return (
      <div className={styles.container}>
        <div className={styles.successContainer}>
          <div className={styles.successIcon}>
            <FiCheck />
          </div>
          <h1 className={styles.successTitle}>성인 인증 완료!</h1>
          <p className={styles.successDescription}>
            성인 인증이 성공적으로 완료되었습니다.
            <br />
            잠시 후 프로필 페이지로 이동합니다.
          </p>
          <div className={styles.progressBar}>
            <div className={styles.progressFill}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={() => navigate(-1)}>
          <FiArrowLeft />
        </button>
        <h1 className={styles.title}>성인 인증</h1>
      </div>

      <div className={styles.content}>
        <div className={styles.infoCard}>
          <div className={styles.infoIcon}>
            <FiShield />
          </div>
          <h2 className={styles.infoTitle}>성인 인증이 필요합니다</h2>
          <p className={styles.infoDescription}>
            성인 콘텐츠를 이용하기 위해서는 본인 인증이 필요합니다.
            안전하고 신뢰할 수 있는 방법으로 인증을 진행해주세요.
          </p>
        </div>

        {!verificationMethod ? (
          <div className={styles.methodSelection}>
            <h2 className={styles.sectionTitle}>인증 방법 선택</h2>
            <div className={styles.methodCards}>
              <div 
                className={`${styles.methodCard} ${verificationMethod === 'phone' ? styles.selected : ''}`}
                onClick={() => setVerificationMethod('phone')}
              >
                <div className={styles.methodIcon}>
                  <FiPhone />
                </div>
                <h3 className={styles.methodTitle}>휴대폰 인증</h3>
                <p className={styles.methodDescription}>
                  본인 명의의 휴대폰으로 간편하게 인증
                </p>
                <div className={styles.methodFeatures}>
                  <span>• 빠른 인증 (1-2분)</span>
                  <span>• 무료 서비스</span>
                  <span>• 높은 보안성</span>
                </div>
              </div>

              <div 
                className={`${styles.methodCard} ${verificationMethod === 'idCard' ? styles.selected : ''}`}
                onClick={() => setVerificationMethod('idCard')}
              >
                <div className={styles.methodIcon}>
                  <FiCreditCard />
                </div>
                <h3 className={styles.methodTitle}>신분증 인증</h3>
                <p className={styles.methodDescription}>
                  신분증 사진을 업로드하여 인증
                </p>
                <div className={styles.methodFeatures}>
                  <span>• 정확한 본인 확인</span>
                  <span>• 24시간 내 처리</span>
                  <span>• 안전한 보관</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className={styles.methodHeader}>
              <button 
                className={styles.backToMethods}
                onClick={() => setVerificationMethod(null)}
              >
                <FiArrowLeft />
                인증 방법 다시 선택
              </button>
            </div>

            {verificationMethod === 'phone' && (
              <div className={styles.phoneVerification}>
                <div className={styles.verificationHeader}>
                  <FiPhone className={styles.verificationIcon} />
                  <h2 className={styles.verificationTitle}>휴대폰 인증</h2>
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>휴대폰 번호</label>
                  <div className={styles.phoneInput}>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={handlePhoneChange}
                      placeholder="010-1234-5678"
                      className={`${styles.input} ${errors.phone ? styles.error : ''}`}
                      disabled={isCodeSent}
                    />
                    <button
                      className={`${styles.sendButton} ${isCodeSent ? styles.sent : ''}`}
                      onClick={handleSendCode}
                      disabled={isLoading || isCodeSent}
                    >
                      {isLoading ? '전송 중...' : isCodeSent ? '전송됨' : '인증번호 전송'}
                    </button>
                  </div>
                  {errors.phone && (
                    <span className={styles.errorMessage}>
                      <FiAlertTriangle />
                      {errors.phone}
                    </span>
                  )}
                </div>

                {isCodeSent && (
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>인증번호</label>
                    <div className={styles.codeInput}>
                      <input
                        type={showCode ? 'text' : 'password'}
                        value={verificationCode}
                        onChange={handleCodeChange}
                        placeholder="인증번호 6자리"
                        className={`${styles.input} ${errors.code ? styles.error : ''}`}
                        maxLength={6}
                      />
                      <button
                        className={styles.eyeButton}
                        onClick={() => setShowCode(!showCode)}
                        type="button"
                      >
                        {showCode ? <FiEyeOff /> : <FiEye />}
                      </button>
                      <button
                        className={styles.verifyButton}
                        onClick={handleVerifyCode}
                        disabled={isLoading || verificationCode.length !== 6}
                      >
                        {isLoading ? '확인 중...' : '확인'}
                      </button>
                    </div>
                    {errors.code && (
                      <span className={styles.errorMessage}>
                        <FiAlertTriangle />
                        {errors.code}
                      </span>
                    )}
                  </div>
                )}
              </div>
            )}

            {verificationMethod === 'idCard' && (
              <div className={styles.idCardVerification}>
                <div className={styles.verificationHeader}>
                  <FiCreditCard className={styles.verificationIcon} />
                  <h2 className={styles.verificationTitle}>신분증 인증</h2>
                </div>

                <div className={styles.uploadSection}>
                  {!uploadPreview ? (
                    <label className={styles.uploadArea}>
                      <FiUpload className={styles.uploadIcon} />
                      <span className={styles.uploadText}>신분증 사진을 업로드하세요</span>
                      <span className={styles.uploadSubtext}>
                        주민등록증, 운전면허증, 여권 중 하나를 선택해주세요
                      </span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        className={styles.fileInput}
                        onChange={handleFileUpload}
                      />
                    </label>
                  ) : (
                    <div className={styles.previewSection}>
                      <div className={styles.imagePreview}>
                        <img src={uploadPreview} alt="업로드된 신분증" />
                        <button 
                          className={styles.removeButton}
                          onClick={() => {
                            setUploadedFile(null);
                            setUploadPreview(null);
                          }}
                        >
                          <FiX />
                        </button>
                      </div>
                      <p className={styles.previewText}>
                        업로드된 신분증: {uploadedFile?.name}
                      </p>
                    </div>
                  )}
                  
                  {errors.file && (
                    <span className={styles.errorMessage}>
                      <FiAlertTriangle />
                      {errors.file}
                    </span>
                  )}
                </div>

                <div className={styles.idCardInfo}>
                  <h3 className={styles.infoTitle}>신분증 인증 안내</h3>
                  <ul className={styles.infoList}>
                    <li>• 주민등록증, 운전면허증, 여권만 인증 가능합니다</li>
                    <li>• 사진이 선명하고 모든 정보가 보이는 상태로 촬영해주세요</li>
                    <li>• 개인정보 보호를 위해 인증 후 즉시 삭제됩니다</li>
                    <li>• 인증 처리에는 최대 24시간이 소요될 수 있습니다</li>
                  </ul>
                </div>

                <button
                  className={styles.submitButton}
                  onClick={handleIdCardSubmit}
                  disabled={!uploadedFile || isLoading}
                >
                  {isLoading ? '인증 처리 중...' : '인증 신청하기'}
                </button>
              </div>
            )}
          </>
        )}

        {errors.submit && (
          <div className={styles.submitError}>
            <FiAlertTriangle />
            {errors.submit}
          </div>
        )}

        <div className={styles.securityNotice}>
          <h3 className={styles.noticeTitle}>보안 및 개인정보 보호</h3>
          <ul className={styles.noticeList}>
            <li>• 모든 인증 정보는 암호화되어 안전하게 처리됩니다</li>
            <li>• 인증 목적으로만 사용되며 다른 용도로 활용되지 않습니다</li>
            <li>• 인증 완료 후 관련 정보는 즉시 삭제됩니다</li>
            <li>• 본인 인증은 1회만 진행하면 됩니다</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdultVerificationPage; 