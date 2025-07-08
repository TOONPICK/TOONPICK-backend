import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@contexts/auth-context';
import { Routes } from '@constants/routes';
import collectionService from '@services/collection-service';
import { CollectionCreateRequest } from '@models/collection';
import Spinner from '@components/spinner';
import styles from './style.module.css';

const CollectionCreatePage: React.FC = () => {
  const { state } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<CollectionCreateRequest>({
    name: '',
    description: '',
    isPublic: true,
    tags: []
  });

  const [tagInput, setTagInput] = useState('');

  // 인증 확인
  if (!state.isAuthenticated) {
    navigate(Routes.LOGIN);
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      setError('컬렉션 이름을 입력해주세요.');
      return false;
    }
    if (formData.name.length > 50) {
      setError('컬렉션 이름은 50자 이하여야 합니다.');
      return false;
    }
    if (formData.description.length > 500) {
      setError('컬렉션 설명은 500자 이하여야 합니다.');
      return false;
    }
    if (formData.tags.length > 10) {
      setError('태그는 최대 10개까지 추가할 수 있습니다.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) {
      return;
    }

    try {
      setIsLoading(true);
      const response = await collectionService.createCollection(formData);
      
      if (response.success && response.data) {
        // 생성 성공 시 컬렉션 상세 페이지로 이동
        navigate(`/user/collections/${response.data.id}`);
      } else {
        setError(response.message || '컬렉션 생성에 실패했습니다.');
      }
    } catch (error) {
      setError('컬렉션 생성 중 오류가 발생했습니다.');
      console.error('Error creating collection:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (formData.name || formData.description || formData.tags.length > 0) {
      if (window.confirm('작성 중인 내용이 있습니다. 정말로 나가시겠습니까?')) {
        navigate(Routes.COLLECTIONS);
      }
    } else {
      navigate(Routes.COLLECTIONS);
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <div className={styles.collectionCreatePage}>
      <div className={styles.container}>
        <div className={styles.header}>
          <button onClick={handleCancel} className={styles.backButton}>
            ← 뒤로가기
          </button>
          <h1 className={styles.title}>새 컬렉션 만들기</h1>
          <div className={styles.headerActions}>
            <button 
              type="submit" 
              form="collectionForm" 
              className={styles.createButton}
              disabled={isLoading}
            >
              {isLoading ? '생성 중...' : '컬렉션 만들기'}
            </button>
          </div>
        </div>

        {error && (
          <div className={styles.errorMessage}>
            {error}
          </div>
        )}

        <div className={styles.content}>
          <form id="collectionForm" onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formSection}>
              <h2 className={styles.sectionTitle}>기본 정보</h2>
              
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.label}>
                  컬렉션 이름 *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={styles.input}
                  placeholder="컬렉션 이름을 입력하세요"
                  maxLength={50}
                  required
                />
                <div className={styles.characterCount}>
                  {formData.name.length}/50
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="description" className={styles.label}>
                  설명
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className={styles.textarea}
                  placeholder="컬렉션에 대한 설명을 입력하세요"
                  maxLength={500}
                  rows={4}
                />
                <div className={styles.characterCount}>
                  {formData.description.length}/500
                </div>
              </div>
            </div>

            <div className={styles.formSection}>
              <h2 className={styles.sectionTitle}>태그</h2>
              <div className={styles.formGroup}>
                <label htmlFor="tagInput" className={styles.label}>
                  태그 추가
                </label>
                <div className={styles.tagInputContainer}>
                  <input
                    type="text"
                    id="tagInput"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className={styles.tagInput}
                    placeholder="태그를 입력하고 Enter를 누르세요"
                    maxLength={20}
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className={styles.addTagButton}
                    disabled={!tagInput.trim()}
                  >
                    추가
                  </button>
                </div>
                <div className={styles.tagList}>
                  {formData.tags.map((tag, index) => (
                    <span key={index} className={styles.tag}>
                      #{tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className={styles.removeTagButton}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div className={styles.tagInfo}>
                  최대 10개까지 추가 가능 ({formData.tags.length}/10)
                </div>
              </div>
            </div>

            <div className={styles.formSection}>
              <h2 className={styles.sectionTitle}>설정</h2>
              <div className={styles.formGroup}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    name="isPublic"
                    checked={formData.isPublic}
                    onChange={handleInputChange}
                    className={styles.checkbox}
                  />
                  <span className={styles.checkboxText}>
                    공개 컬렉션으로 만들기
                  </span>
                </label>
                <p className={styles.helpText}>
                  공개 컬렉션은 다른 사용자들이 볼 수 있습니다.
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CollectionCreatePage; 