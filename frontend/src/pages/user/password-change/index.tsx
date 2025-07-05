import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiEye, FiEyeOff, FiLock, FiCheck, FiAlertCircle } from 'react-icons/fi';
import styles from './style.module.css';

const PasswordChangePage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // 에러 메시지 초기화
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.currentPassword) {
      newErrors.currentPassword = '현재 비밀번호를 입력해주세요.';
    }

    if (!formData.newPassword) {
      newErrors.newPassword = '새 비밀번호를 입력해주세요.';
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = '비밀번호는 최소 8자 이상이어야 합니다.';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.newPassword)) {
      newErrors.newPassword = '비밀번호는 영문 대소문자와 숫자를 포함해야 합니다.';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = '비밀번호 확인을 입력해주세요.';
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
    }

    if (formData.currentPassword === formData.newPassword) {
      newErrors.newPassword = '새 비밀번호는 현재 비밀번호와 달라야 합니다.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // TODO: API 호출로 실제 비밀번호 변경
      await new Promise(resolve => setTimeout(resolve, 2000)); // 임시 딜레이
      
      // 성공 메시지 표시
      alert('비밀번호가 성공적으로 변경되었습니다!');
      navigate(-1);
    } catch (error) {
      console.error('비밀번호 변경 실패:', error);
      setErrors({ submit: '비밀번호 변경에 실패했습니다. 다시 시도해주세요.' });
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrength = (password: string) => {
    if (!password) return { score: 0, label: '', color: '' };
    
    let score = 0;
    if (password.length >= 8) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;

    const labels = ['매우 약함', '약함', '보통', '강함', '매우 강함'];
    const colors = ['#ff4444', '#ff8800', '#ffbb33', '#00C851', '#007E33'];
    
    return {
      score: Math.min(score, 5),
      label: labels[Math.min(score - 1, 4)],
      color: colors[Math.min(score - 1, 4)]
    };
  };

  const passwordStrength = getPasswordStrength(formData.newPassword);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={() => navigate(-1)}>
          <FiArrowLeft />
        </button>
        <h1 className={styles.title}>비밀번호 변경</h1>
      </div>

      <div className={styles.content}>
        <div className={styles.infoCard}>
          <div className={styles.infoIcon}>
            <FiLock />
          </div>
          <h2 className={styles.infoTitle}>보안을 위한 비밀번호 변경</h2>
          <p className={styles.infoDescription}>
            안전한 계정 관리를 위해 정기적으로 비밀번호를 변경하는 것을 권장합니다.
            강력한 비밀번호를 사용하여 계정을 보호하세요.
          </p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>
              <FiLock />
              현재 비밀번호
            </label>
            <div className={styles.passwordInput}>
              <input
                type={showPasswords.current ? 'text' : 'password'}
                value={formData.currentPassword}
                onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                className={`${styles.input} ${errors.currentPassword ? styles.error : ''}`}
                placeholder="현재 비밀번호를 입력하세요"
              />
              <button
                type="button"
                className={styles.eyeButton}
                onClick={() => togglePasswordVisibility('current')}
              >
                {showPasswords.current ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            {errors.currentPassword && (
              <span className={styles.errorMessage}>
                <FiAlertCircle />
                {errors.currentPassword}
              </span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>
              <FiLock />
              새 비밀번호
            </label>
            <div className={styles.passwordInput}>
              <input
                type={showPasswords.new ? 'text' : 'password'}
                value={formData.newPassword}
                onChange={(e) => handleInputChange('newPassword', e.target.value)}
                className={`${styles.input} ${errors.newPassword ? styles.error : ''}`}
                placeholder="새 비밀번호를 입력하세요"
              />
              <button
                type="button"
                className={styles.eyeButton}
                onClick={() => togglePasswordVisibility('new')}
              >
                {showPasswords.new ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            
            {formData.newPassword && (
              <div className={styles.passwordStrength}>
                <div className={styles.strengthBar}>
                  {[1, 2, 3, 4, 5].map((level) => (
                    <div
                      key={level}
                      className={`${styles.strengthSegment} ${
                        level <= passwordStrength.score ? styles.active : ''
                      }`}
                      style={{
                        backgroundColor: level <= passwordStrength.score ? passwordStrength.color : ''
                      }}
                    />
                  ))}
                </div>
                <span 
                  className={styles.strengthLabel}
                  style={{ color: passwordStrength.color }}
                >
                  {passwordStrength.label}
                </span>
              </div>
            )}

            {errors.newPassword && (
              <span className={styles.errorMessage}>
                <FiAlertCircle />
                {errors.newPassword}
              </span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>
              <FiLock />
              새 비밀번호 확인
            </label>
            <div className={styles.passwordInput}>
              <input
                type={showPasswords.confirm ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                className={`${styles.input} ${errors.confirmPassword ? styles.error : ''}`}
                placeholder="새 비밀번호를 다시 입력하세요"
              />
              <button
                type="button"
                className={styles.eyeButton}
                onClick={() => togglePasswordVisibility('confirm')}
              >
                {showPasswords.confirm ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            
            {formData.confirmPassword && formData.newPassword === formData.confirmPassword && (
              <div className={styles.passwordMatch}>
                <FiCheck />
                비밀번호가 일치합니다
              </div>
            )}

            {errors.confirmPassword && (
              <span className={styles.errorMessage}>
                <FiAlertCircle />
                {errors.confirmPassword}
              </span>
            )}
          </div>

          {errors.submit && (
            <div className={styles.submitError}>
              <FiAlertCircle />
              {errors.submit}
            </div>
          )}

          <div className={styles.buttonGroup}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={() => navigate(-1)}
              disabled={isLoading}
            >
              취소
            </button>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={isLoading}
            >
              {isLoading ? '변경 중...' : '비밀번호 변경'}
            </button>
          </div>
        </form>

        <div className={styles.securityTips}>
          <h3 className={styles.tipsTitle}>보안 팁</h3>
          <ul className={styles.tipsList}>
            <li>최소 8자 이상의 비밀번호를 사용하세요</li>
            <li>영문 대소문자, 숫자, 특수문자를 조합하세요</li>
            <li>개인정보나 생년월일을 포함하지 마세요</li>
            <li>다른 사이트와 동일한 비밀번호를 사용하지 마세요</li>
            <li>정기적으로 비밀번호를 변경하세요</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PasswordChangePage; 