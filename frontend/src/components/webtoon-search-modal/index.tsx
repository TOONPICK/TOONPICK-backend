import React, { useState, useEffect } from 'react';
import { WebtoonSummary } from '@models/webtoon';
import webtoonService from '@services/webtoon-service';
import WebtoonGrid from '@components/webtoon-grid';
import Spinner from '@components/spinner';
import styles from './style.module.css';

interface WebtoonSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddWebtoon: (webtoonId: number) => Promise<void>;
  existingWebtoonIds: number[];
}

const WebtoonSearchModal: React.FC<WebtoonSearchModalProps> = ({
  isOpen,
  onClose,
  onAddWebtoon,
  existingWebtoonIds
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<WebtoonSummary[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isAdding, setIsAdding] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && searchTerm.trim()) {
      const timeoutId = setTimeout(() => {
        performSearch();
      }, 500);

      return () => clearTimeout(timeoutId);
    }
  }, [searchTerm, isOpen]);

  const performSearch = async () => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      setIsSearching(true);
      setError(null);
      
      // 실제로는 웹툰 검색 API를 호출해야 함
      const response = await webtoonService.searchWebtoons(searchTerm);
      
      if (response.success && response.data) {
        // 이미 추가된 웹툰은 제외
        const filteredResults = response.data.filter(
          (webtoon: WebtoonSummary) => !existingWebtoonIds.includes(webtoon.id)
        );
        setSearchResults(filteredResults);
      } else {
        setError(response.message || '검색에 실패했습니다.');
      }
    } catch (error) {
      setError('검색 중 오류가 발생했습니다.');
      console.error('Error searching webtoons:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleAddWebtoon = async (webtoonId: number) => {
    try {
      setIsAdding(webtoonId);
      await onAddWebtoon(webtoonId);
      
      // 추가 성공 시 검색 결과에서 제거
      setSearchResults(prev => prev.filter(webtoon => webtoon.id !== webtoonId));
    } catch (error) {
      console.error('Error adding webtoon:', error);
    } finally {
      setIsAdding(null);
    }
  };

  const handleClose = () => {
    setSearchTerm('');
    setSearchResults([]);
    setError(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={handleClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>웹툰 추가</h2>
          <button onClick={handleClose} className={styles.closeButton}>
            ×
          </button>
        </div>

        <div className={styles.searchSection}>
          <div className={styles.searchInputContainer}>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="웹툰 제목이나 작가명을 입력하세요"
              className={styles.searchInput}
            />
            <button 
              onClick={performSearch}
              className={styles.searchButton}
              disabled={!searchTerm.trim() || isSearching}
            >
              {isSearching ? '검색 중...' : '검색'}
            </button>
          </div>
        </div>

        {error && (
          <div className={styles.errorMessage}>
            {error}
          </div>
        )}

        <div className={styles.searchResults}>
          {isSearching ? (
            <div className={styles.loadingContainer}>
              <Spinner />
              <p>검색 중...</p>
            </div>
          ) : searchResults.length > 0 ? (
            <>
              <div className={styles.resultsHeader}>
                <h3>검색 결과 ({searchResults.length}개)</h3>
                <p>추가하려는 웹툰을 클릭하세요</p>
              </div>
              <div className={styles.webtoonGridContainer}>
                <WebtoonGrid
                  webtoons={searchResults}
                />
              </div>
            </>
          ) : searchTerm.trim() && !isSearching ? (
            <div className={styles.noResults}>
              <span className={styles.noResultsIcon}>🔍</span>
              <h3>검색 결과가 없습니다</h3>
              <p>다른 키워드로 검색해보세요</p>
            </div>
          ) : (
            <div className={styles.initialState}>
              <span className={styles.initialIcon}>📚</span>
              <h3>웹툰을 검색해보세요</h3>
              <p>제목이나 작가명으로 검색할 수 있습니다</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WebtoonSearchModal; 