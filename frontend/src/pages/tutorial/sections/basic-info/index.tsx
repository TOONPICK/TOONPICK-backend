import React, { useState } from 'react';
import styles from './style.module.css';

interface BasicInfoFormProps {
  onComplete: (data: { 
    gender: string; 
    ageGroup: string; 
    ageDigit: number 
  }) => void;
}

const GENDERS = [
  { value: 'male' as const, label: '남자' },
  { value: 'female' as const, label: '여자' },
  { value: 'other' as const, label: '기타' },
  { value: 'prefer_not_to_say' as const, label: '선택하지 않음' },
];

const AGE_GROUPS = [
  { value: '10', label: '10대' },
  { value: '20', label: '20대' },
  { value: '30', label: '30대' },
  { value: '40', label: '40대' },
  { value: '50', label: '50대' },
  { value: '60', label: '60세 이상' },
];

const BasicInfoForm: React.FC<BasicInfoFormProps> = ({ onComplete }) => {
  const [gender, setGender] = useState<'male' | 'female' | 'other' | 'prefer_not_to_say' | ''>('');
  const [ageGroup, setAgeGroup] = useState<string>('');
  const [ageDigit, setAgeDigit] = useState<number | null>(null);

  const isValid = gender !== '' && ageGroup !== '' && ageDigit !== null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      onComplete({ 
        gender, 
        ageGroup, 
        ageDigit: ageDigit! 
      });
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.title}>내 정보 입력</div>
      <div className={styles.description}>더 나은 추천을 위해 정보를 입력해 주세요.</div>

      <div className={styles.row}>
        <label className={styles.label}>성별</label>
        <div className={styles.inlineButtons}>
          {GENDERS.map((g) => (
            <button
              key={g.value}
              type="button"
              className={`${styles.inlineButton} ${gender === g.value ? styles.selected : ''}`}
              onClick={() => setGender(g.value)}
            >
              {g.label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.row}>
        <label className={styles.label}>연령대</label>
        <div className={styles.inlineButtons}>
          {AGE_GROUPS.map((ag) => (
            <button
              key={ag.value}
              type="button"
              className={`${styles.inlineButton} ${ageGroup === ag.value ? styles.selected : ''}`}
              onClick={() => { setAgeGroup(ag.value); setAgeDigit(null); }}
            >
              {ag.label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.row}>
        <label className={styles.label}>나이 (끝자리)</label>
        <select
          className={styles.ageDigitSelect}
          value={ageDigit !== null ? ageDigit : ''}
          onChange={e => setAgeDigit(Number(e.target.value))}
          disabled={!ageGroup}
        >
          <option value="">선택</option>
          {[...Array(10)].map((_, i) => (
            <option key={i} value={i}>{i}</option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className={`${styles.submitButton} ${!isValid ? styles.disabled : ''}`}
        disabled={!isValid}
      >
        다음
      </button>
    </form>
  );
};

export default BasicInfoForm; 