import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '@contexts/auth-context';
import { Routes } from '@constants/routes';
import collectionService from '@services/collection-service';
import { Collection } from '@models/collection';
import WebtoonGrid from '@components/webtoon-grid';
import WebtoonSearchModal from '@components/webtoon-search-modal';
import Spinner from '@components/spinner';
import styles from './style.module.css';
import WebtoonCard from '@components/webtoon-card';

const CollectionDetailPage: React.FC = () => {
  const { state } = useAuth();
  const navigate = useNavigate();
  const { collectionId } = useParams<{ collectionId: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [collection, setCollection] = useState<Collection | null>(null);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  useEffect(() => {
    if (!state.isAuthenticated) {
      navigate(Routes.LOGIN);
      return;
    }

    if (!collectionId) {
      setError('컬렉션 ID가 없습니다.');
      setIsLoading(false);
      return;
    }

    fetchCollection();
  }, [state.isAuthenticated, navigate, collectionId]);

  const fetchCollection = async () => {
    try {
      setIsLoading(true);
      const response = await collectionService.getCollectionById(parseInt(collectionId!));
      
      if (response.success && response.data) {
        setCollection(response.data);
      } else {
        setError(response.message || '컬렉션을 불러오는데 실패했습니다.');
      }
    } catch (error) {
      setError('컬렉션을 불러오는데 실패했습니다.');
      console.error('Error fetching collection:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditCollection = () => {
    navigate(`/user/collections/${collectionId}/edit`);
  };

  const handleDeleteCollection = async () => {
    if (!collection) return;

    if (!window.confirm(`정말로 "${collection.name}" 컬렉션을 삭제하시겠습니까?\n이 작업은 되돌릴 수 없습니다.`)) {
      return;
    }

    try {
      setIsDeleting(true);
      const response = await collectionService.deleteCollection(collection.id);
      
      if (response.success) {
        // 삭제 성공 시 컬렉션 목록으로 이동
        navigate(Routes.COLLECTIONS);
      } else {
        setError(response.message || '컬렉션 삭제에 실패했습니다.');
      }
    } catch (error) {
      setError('컬렉션 삭제 중 오류가 발생했습니다.');
      console.error('Error deleting collection:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleAddWebtoon = () => {
    setIsSearchModalOpen(true);
  };

  const handleAddWebtoonToCollection = async (webtoonId: number) => {
    if (!collection) return;

    try {
      const response = await collectionService.addWebtoonToCollection(collection.id, webtoonId);
      
      if (response.success) {
        // 성공 시 컬렉션 정보 새로고침
        await fetchCollection();
      } else {
        throw new Error(response.message || '웹툰 추가에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error adding webtoon to collection:', error);
      throw error;
    }
  };

  const handleRemoveWebtoon = async (webtoonId: number) => {
    if (!collection) return;

    const webtoon = collection.webtoons.find(w => w.id === webtoonId);
    if (!webtoon) return;

    if (!window.confirm(`"${webtoon.title}"을(를) 이 컬렉션에서 제거하시겠습니까?`)) {
      return;
    }

    try {
      const response = await collectionService.removeWebtoonFromCollection(collection.id, webtoonId);
      
      if (response.success) {
        // 성공 시 컬렉션 정보 새로고침
        await fetchCollection();
      } else {
        setError(response.message || '웹툰 제거에 실패했습니다.');
      }
    } catch (error) {
      setError('웹툰 제거 중 오류가 발생했습니다.');
      console.error('Error removing webtoon:', error);
    }
  };

  if (error) return <div className={styles.error}>{error}</div>;
  if (isLoading) return <Spinner />;
  if (!collection) return <div className={styles.error}>컬렉션을 찾을 수 없습니다.</div>;

  return (
    <div className={styles.collectionDetailPage}>
      <div className={styles.container}>
        <div className={styles.header}>
          <button onClick={() => navigate(-1)} className={styles.backButton}>
            ← 뒤로가기
          </button>
          <div className={styles.headerActions}>
            <button onClick={handleAddWebtoon} className={styles.addButton}>
              + 웹툰 추가
            </button>
            <button onClick={handleEditCollection} className={styles.editButton}>
              편집
            </button>
            <button 
              onClick={handleDeleteCollection} 
              className={styles.deleteButton}
              disabled={isDeleting}
            >
              {isDeleting ? '삭제 중...' : '삭제'}
            </button>
          </div>
        </div>

        <div className={styles.collectionInfo}>
          <div className={styles.collectionHeader}>
            <div className={styles.collectionThumbnail}>
              <img src={collection.thumbnail} alt={collection.name} />
              <div className={`${styles.publicBadge} ${
                collection.isPublic ? styles.public : styles.private
              }`}>
                {collection.isPublic ? '공개' : '비공개'}
              </div>
            </div>
            <div className={styles.collectionDetails}>
              <h1 className={styles.collectionName}>{collection.name}</h1>
              <p className={styles.collectionDescription}>{collection.description}</p>
              <div className={styles.collectionMeta}>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>웹툰 수:</span>
                  <span className={styles.metaValue}>{collection.webtoonCount}개</span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>생성일:</span>
                  <span className={styles.metaValue}>
                    {new Date(collection.createdAt).toLocaleDateString('ko-KR')}
                  </span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>수정일:</span>
                  <span className={styles.metaValue}>
                    {new Date(collection.updatedAt).toLocaleDateString('ko-KR')}
                  </span>
                </div>
              </div>
              <div className={styles.tags}>
                {collection.tags.map((tag, index) => (
                  <span key={index} className={styles.tag}>
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.content}>
          {collection.webtoons.length > 0 ? (
            <>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>컬렉션 웹툰</h2>
                <p className={styles.sectionDescription}>
                  이 컬렉션에 포함된 웹툰들입니다
                </p>
              </div>
              <div className={styles.webtoonsSection}>
                <h2>웹툰 목록 ({collection.webtoonCount}개)</h2>
                {collection.webtoons.length === 0 ? (
                  <div className={styles.emptyState}>
                    <p>아직 추가된 웹툰이 없습니다.</p>
                    <button onClick={handleAddWebtoon} className={styles.addFirstButton}>
                      첫 번째 웹툰 추가하기
                    </button>
                  </div>
                ) : (
                  <div className={styles.webtoonsGrid}>
                    {collection.webtoons.map((webtoon) => (
                      <div key={webtoon.id} className={styles.webtoonItem}>
                        <WebtoonCard webtoon={webtoon} />
                        <button
                          onClick={() => handleRemoveWebtoon(webtoon.id)}
                          className={styles.removeWebtoonButton}
                          title="컬렉션에서 제거"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className={styles.emptyState}>
              <span className={styles.emptyIcon}>📚</span>
              <h2>웹툰이 없습니다</h2>
              <p>이 컬렉션에 아직 웹툰이 추가되지 않았습니다.</p>
              <button onClick={handleAddWebtoon} className={styles.addButton}>
                첫 웹툰 추가하기
              </button>
            </div>
          )}
        </div>
      </div>

      <WebtoonSearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onAddWebtoon={handleAddWebtoonToCollection}
        existingWebtoonIds={collection.webtoons.map(w => w.id)}
      />
    </div>
  );
};

export default CollectionDetailPage; 