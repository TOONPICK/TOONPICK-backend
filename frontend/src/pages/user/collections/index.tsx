import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@contexts/auth-context';
import { Routes } from '@constants/routes';
import memberService from '@services/member-service';
import { Collection } from '@dummy';
import Spinner from '@components/spinner';
import styles from './style.module.css';

const CollectionsPage: React.FC = () => {
  const { state } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [collections, setCollections] = useState<Collection[]>([]);

  useEffect(() => {
    if (!state.isAuthenticated) {
      navigate(Routes.LOGIN);
      return;
    }

    const fetchCollections = async () => {
      try {
        setIsLoading(true);
        const response = await memberService.getCollections();
        
        if (response.success && response.data) {
          setCollections(response.data);
        } else {
          setError(response.message || '컬렉션을 불러오는데 실패했습니다.');
        }
      } catch (error) {
        setError('컬렉션을 불러오는데 실패했습니다.');
        console.error('Error fetching collections:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCollections();
  }, [state.isAuthenticated, navigate]);

  const handleCreateCollection = () => {
    // TODO: 컬렉션 생성 모달 또는 페이지로 이동
    alert('컬렉션 생성 기능은 준비 중입니다.');
  };

  const handleCollectionClick = (collectionId: number) => {
    // TODO: 컬렉션 상세 페이지로 이동
    alert(`컬렉션 ${collectionId} 상세 페이지로 이동합니다.`);
  };

  if (error) return <div className={styles.error}>{error}</div>;
  if (isLoading) return <Spinner />;

  return (
    <div className={styles.collectionsPage}>
      <div className={styles.container}>
        <div className={styles.header}>
          <button onClick={() => navigate(-1)} className={styles.backButton}>
            ← 뒤로가기
          </button>
          <h1 className={styles.title}>내 컬렉션</h1>
          <button onClick={handleCreateCollection} className={styles.createButton}>
            + 새 컬렉션
          </button>
        </div>
        
        <div className={styles.statsSection}>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>{collections.length}</div>
            <div className={styles.statLabel}>만든 컬렉션</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>
              {collections.reduce((sum, collection) => sum + collection.webtoonCount, 0)}
            </div>
            <div className={styles.statLabel}>총 웹툰 수</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>
              {collections.length > 0 
                ? Math.round(collections.reduce((sum, collection) => sum + collection.webtoonCount, 0) / collections.length)
                : 0
              }
            </div>
            <div className={styles.statLabel}>평균 웹툰 수</div>
          </div>
        </div>

        <div className={styles.content}>
          {collections.length > 0 ? (
            <>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>내가 만든 컬렉션들</h2>
                <p className={styles.sectionDescription}>
                  관심 있는 웹툰들을 주제별로 모아놓은 컬렉션입니다
                </p>
              </div>
              <div className={styles.collectionsGrid}>
                {collections.map((collection) => (
                  <div 
                    key={collection.id} 
                    className={styles.collectionCard}
                    onClick={() => handleCollectionClick(collection.id)}
                  >
                    <div className={styles.collectionThumbnail}>
                      <img src={collection.thumbnail} alt={collection.name} />
                      <div className={styles.webtoonCount}>
                        {collection.webtoonCount}개
                      </div>
                    </div>
                    <div className={styles.collectionInfo}>
                      <h3 className={styles.collectionName}>{collection.name}</h3>
                      <p className={styles.collectionDescription}>{collection.description}</p>
                      <div className={styles.collectionMeta}>
                        <span className={styles.createdAt}>
                          {new Date(collection.createdAt).toLocaleDateString('ko-KR')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className={styles.emptyState}>
              <span className={styles.emptyIcon}>📁</span>
              <h2>컬렉션이 없습니다</h2>
              <p>관심 있는 웹툰들을 모아서 컬렉션을 만들어보세요!</p>
              <button onClick={handleCreateCollection} className={styles.createButton}>
                첫 컬렉션 만들기
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CollectionsPage; 