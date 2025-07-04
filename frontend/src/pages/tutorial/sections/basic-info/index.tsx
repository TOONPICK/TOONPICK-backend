import React, { useState } from 'react';
import styles from './style.module.css';

interface BasicInfoFormProps {
  onComplete: (data: { gender: string; ageGroup: string; ageDigit: number }) => void;
}

const GENDERS = [
  { value: 'male', label: '남자' },
  { value: 'female', label: '여자' },
  { value: 'private', label: '비공개' },
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
  const [gender, setGender] = useState<string>('');
  const [ageGroup, setAgeGroup] = useState<string>('');
  const [ageDigit, setAgeDigit] = useState<number | null>(null);

  const isValid = gender !== '' && ageGroup !== '' && ageDigit !== null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      onComplete({ gender, ageGroup, ageDigit: ageDigit! });
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputGroup}>
        <label className={styles.label}>성별</label>
        <div className={styles.genderButtons}>
          {GENDERS.map((g) => (
            <button
              key={g.value}
              type="button"
              className={`${styles.genderButton} ${gender === g.value ? styles.selected : ''}`}
              onClick={() => setGender(g.value)}
            >
              {g.label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>연령대</label>
        <div className={styles.ageGroupButtons}>
          {AGE_GROUPS.map((ag) => (
            <button
              key={ag.value}
              type="button"
              className={`${styles.ageGroupButton} ${ageGroup === ag.value ? styles.selected : ''}`}
              onClick={() => { setAgeGroup(ag.value); setAgeDigit(null); }}
            >
              {ag.label}
            </button>
          ))}
        </div>
      </div>

      {ageGroup && (
        <div className={styles.inputGroup}>
          <label className={styles.label}>나이 (끝자리)</label>
          <div className={styles.ageDigitButtons}>
            {[...Array(10)].map((_, i) => (
              <button
                key={i}
                type="button"
                className={`${styles.ageDigitButton} ${ageDigit === i ? styles.selected : ''}`}
                onClick={() => setAgeDigit(i)}
              >
                {i}
              </button>
            ))}
          </div>
        </div>
      )}

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