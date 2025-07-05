import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '@contexts/auth-context';
import { Routes } from '@constants/routes';
import collectionService from '@services/collection-service';
import { Collection } from '@models/collection';
import WebtoonGrid from '@components/webtoon-grid';
import Spinner from '@components/spinner';
import styles from './style.module.css';

const CollectionDetailPage: React.FC = () => {
  const { state } = useAuth();
  const navigate = useNavigate();
  const { collectionId } = useParams<{ collectionId: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [collection, setCollection] = useState<Collection | null>(null);

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

    const fetchCollection = async () => {
      try {
        setIsLoading(true);
        const response = await collectionService.getCollectionById(parseInt(collectionId));
        
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

    fetchCollection();
  }, [state.isAuthenticated, navigate, collectionId]);

  const handleEditCollection = () => {
    // TODO: 컬렉션 편집 모달 또는 페이지로 이동
    alert('컬렉션 편집 기능은 준비 중입니다.');
  };

  const handleDeleteCollection = () => {
    if (window.confirm('정말로 이 컬렉션을 삭제하시겠습니까?')) {
      // TODO: 컬렉션 삭제 API 호출
      alert('컬렉션 삭제 기능은 준비 중입니다.');
    }
  };

  const handleAddWebtoon = () => {
    // TODO: 웹툰 추가 모달 또는 페이지로 이동
    alert('웹툰 추가 기능은 준비 중입니다.');
  };

  const handleWebtoonClick = (webtoonId: number) => {
    navigate(`/webtoon/${webtoonId}`);
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
            <button onClick={handleDeleteCollection} className={styles.deleteButton}>
              삭제
            </button>
          </div>
        </div>

        <div className={styles.collectionInfo}>
          <div className={styles.collectionHeader}>
            <div className={styles.collectionThumbnail}>
              <img src={collection.thumbnail} alt={collection.name} />
              <div className={styles.publicBadge}>
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
              <WebtoonGrid 
                webtoons={collection.webtoons}
              />
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
    </div>
  );
};

export default CollectionDetailPage; 