import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@contexts/auth-context';
import { Routes } from '@constants/routes';
import memberService from '@services/member-service';
import collectionService from '@services/collection-service';
import { Collection } from '@models/collection';
import Spinner from '@components/spinner';
import styles from './style.module.css';

const CollectionsPage: React.FC = () => {
  const { state } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [collections, setCollections] = useState<Collection[]>([]);
  
  // 선택 모드 관련 상태
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedCollections, setSelectedCollections] = useState<number[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);

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
    navigate('/user/collections/create');
  };

  const handleCollectionClick = (collectionId: number) => {
    if (isSelectionMode) {
      // 선택 모드에서는 선택 토글
      setSelectedCollections(prev => 
        prev.includes(collectionId) 
          ? prev.filter(id => id !== collectionId)
          : [...prev, collectionId]
      );
    } else {
      // 일반 모드에서는 상세 페이지로 이동
      navigate(`/user/collections/${collectionId}`);
    }
  };

  const toggleSelectionMode = () => {
    setIsSelectionMode(!isSelectionMode);
    setSelectedCollections([]);
  };

  const handleSelectAll = () => {
    if (selectedCollections.length === collections.length) {
      setSelectedCollections([]);
    } else {
      setSelectedCollections(collections.map(c => c.id));
    }
  };

  const handleEditSelected = () => {
    if (selectedCollections.length === 1) {
      // 단일 선택 시 편집 페이지로 이동
      navigate(`/user/collections/${selectedCollections[0]}/edit`);
    } else {
      alert('편집하려면 하나의 컬렉션만 선택해주세요.');
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedCollections.length === 0) {
      alert('삭제할 컬렉션을 선택해주세요.');
      return;
    }

    const confirmMessage = selectedCollections.length === 1 
      ? '선택한 컬렉션을 삭제하시겠습니까?' 
      : `선택한 ${selectedCollections.length}개의 컬렉션을 삭제하시겠습니까?`;

    if (!window.confirm(confirmMessage)) {
      return;
    }

    try {
      setIsDeleting(true);
      const deletePromises = selectedCollections.map(id => 
        collectionService.deleteCollection(id)
      );
      
      const results = await Promise.all(deletePromises);
      const failedDeletes = results.filter(result => !result.success);
      
      if (failedDeletes.length > 0) {
        setError(`${failedDeletes.length}개의 컬렉션 삭제에 실패했습니다.`);
      } else {
        // 성공적으로 삭제된 컬렉션들을 목록에서 제거
        setCollections(prev => prev.filter(c => !selectedCollections.includes(c.id)));
        setSelectedCollections([]);
        setIsSelectionMode(false);
      }
    } catch (error) {
      setError('컬렉션 삭제 중 오류가 발생했습니다.');
      console.error('Error deleting collections:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const isCollectionSelected = (collectionId: number) => {
    return selectedCollections.includes(collectionId);
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
          <div className={styles.headerActions}>
            {isSelectionMode ? (
              <>
                <button 
                  onClick={handleSelectAll} 
                  className={styles.selectAllButton}
                >
                  {selectedCollections.length === collections.length ? '전체 해제' : '전체 선택'}
                </button>
                <button 
                  onClick={handleEditSelected} 
                  className={styles.editButton}
                  disabled={selectedCollections.length !== 1}
                >
                  편집
                </button>
                <button 
                  onClick={handleDeleteSelected} 
                  className={styles.deleteButton}
                  disabled={selectedCollections.length === 0 || isDeleting}
                >
                  {isDeleting ? '삭제 중...' : '삭제'}
                </button>
                <button 
                  onClick={toggleSelectionMode} 
                  className={styles.cancelButton}
                >
                  취소
                </button>
              </>
            ) : (
              <>
                <button onClick={toggleSelectionMode} className={styles.selectButton}>
                  선택
                </button>
                <button onClick={handleCreateCollection} className={styles.createButton}>
                  + 새 컬렉션
                </button>
              </>
            )}
          </div>
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
                  {isSelectionMode 
                    ? `${selectedCollections.length}개 선택됨`
                    : '관심 있는 웹툰들을 주제별로 모아놓은 컬렉션입니다'
                  }
                </p>
              </div>
              <div className={styles.collectionsGrid}>
                {collections.map((collection) => (
                  <div 
                    key={collection.id} 
                    className={`${styles.collectionCard} ${
                      isCollectionSelected(collection.id) ? styles.selected : ''
                    }`}
                    onClick={() => handleCollectionClick(collection.id)}
                  >
                    {isSelectionMode && (
                      <div className={styles.selectionOverlay}>
                        <div className={`${styles.checkbox} ${
                          isCollectionSelected(collection.id) ? styles.checked : ''
                        }`}>
                          {isCollectionSelected(collection.id) && '✓'}
                        </div>
                      </div>
                    )}
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
                        <span className={`${styles.publicBadge} ${
                          collection.isPublic ? styles.public : styles.private
                        }`}>
                          {collection.isPublic ? '공개' : '비공개'}
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