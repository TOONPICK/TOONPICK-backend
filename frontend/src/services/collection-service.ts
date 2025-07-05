import { Response } from '@api/types';
import { Collection, CollectionCreateRequest, CollectionUpdateRequest } from '@models/collection';
import { dummyCollections } from '@dummy/collection-dummy';

class CollectionService {
  private baseUrl = process.env.REACT_APP_API_BASE_URL || '';

  // 컬렉션 목록 조회
  async getCollections(): Promise<Response<Collection[]>> {
    try {
      if (process.env.NODE_ENV === 'development') {
        // 개발 환경에서는 더미 데이터 반환
        return {
          success: true,
          data: dummyCollections,
          message: '컬렉션 목록을 성공적으로 불러왔습니다.'
        };
      }

      const response = await fetch(`${this.baseUrl}/collections`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });

      if (!response.ok) {
        throw new Error('컬렉션 목록 조회에 실패했습니다.');
      }

      const data = await response.json();
      return {
        success: true,
        data: data.collections,
        message: '컬렉션 목록을 성공적으로 불러왔습니다.'
      };
    } catch (error) {
      console.error('Error fetching collections:', error);
      return {
        success: false,
        message: '컬렉션 목록을 불러오는데 실패했습니다.'
      };
    }
  }

  // 컬렉션 상세 조회
  async getCollectionById(id: number): Promise<Response<Collection>> {
    try {
      if (process.env.NODE_ENV === 'development') {
        // 개발 환경에서는 더미 데이터에서 찾기
        const collection = dummyCollections.find((c: Collection) => c.id === id);
        if (!collection) {
          return {
            success: false,
            message: '컬렉션을 찾을 수 없습니다.'
          };
        }
        return {
          success: true,
          data: collection,
          message: '컬렉션을 성공적으로 불러왔습니다.'
        };
      }

      const response = await fetch(`${this.baseUrl}/collections/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });

      if (!response.ok) {
        throw new Error('컬렉션 조회에 실패했습니다.');
      }

      const data = await response.json();
      return {
        success: true,
        data: data.collection,
        message: '컬렉션을 성공적으로 불러왔습니다.'
      };
    } catch (error) {
      console.error('Error fetching collection:', error);
      return {
        success: false,
        message: '컬렉션을 불러오는데 실패했습니다.'
      };
    }
  }

  // 컬렉션 생성
  async createCollection(request: CollectionCreateRequest): Promise<Response<Collection>> {
    try {
      if (process.env.NODE_ENV === 'development') {
        // 개발 환경에서는 더미 데이터로 시뮬레이션
        const newCollection: Collection = {
          id: Math.max(...dummyCollections.map((c: Collection) => c.id)) + 1,
          name: request.name,
          description: request.description,
          isPublic: request.isPublic,
          tags: request.tags,
          thumbnail: 'https://via.placeholder.com/300x200/667eea/ffffff?text=New+Collection',
          webtoonCount: 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          webtoons: []
        };
        
        // 실제로는 더미 데이터에 추가하지 않음 (메모리에서만)
        return {
          success: true,
          data: newCollection,
          message: '컬렉션이 성공적으로 생성되었습니다.'
        };
      }

      const response = await fetch(`${this.baseUrl}/collections`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify(request)
      });

      if (!response.ok) {
        throw new Error('컬렉션 생성에 실패했습니다.');
      }

      const data = await response.json();
      return {
        success: true,
        data: data.collection,
        message: '컬렉션이 성공적으로 생성되었습니다.'
      };
    } catch (error) {
      console.error('Error creating collection:', error);
      return {
        success: false,
        message: '컬렉션 생성에 실패했습니다.'
      };
    }
  }

  // 컬렉션 수정
  async updateCollection(id: number, request: CollectionUpdateRequest): Promise<Response<Collection>> {
    try {
      if (process.env.NODE_ENV === 'development') {
        // 개발 환경에서는 더미 데이터로 시뮬레이션
        const collectionIndex = dummyCollections.findIndex((c: Collection) => c.id === id);
        if (collectionIndex === -1) {
          return {
            success: false,
            message: '컬렉션을 찾을 수 없습니다.'
          };
        }

        const updatedCollection: Collection = {
          ...dummyCollections[collectionIndex],
          name: request.name || '',
          description: request.description || '',
          isPublic: request.isPublic || false,
          tags: request.tags || [],
          updatedAt: new Date().toISOString()
        };

        // 실제로는 더미 데이터를 업데이트하지 않음 (메모리에서만)
        return {
          success: true,
          data: updatedCollection,
          message: '컬렉션이 성공적으로 수정되었습니다.'
        };
      }

      const response = await fetch(`${this.baseUrl}/collections/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify(request)
      });

      if (!response.ok) {
        throw new Error('컬렉션 수정에 실패했습니다.');
      }

      const data = await response.json();
      return {
        success: true,
        data: data.collection,
        message: '컬렉션이 성공적으로 수정되었습니다.'
      };
    } catch (error) {
      console.error('Error updating collection:', error);
      return {
        success: false,
        message: '컬렉션 수정에 실패했습니다.'
      };
    }
  }

  // 컬렉션 삭제
  async deleteCollection(id: number): Promise<Response<void>> {
    try {
      if (process.env.NODE_ENV === 'development') {
        // 개발 환경에서는 더미 데이터로 시뮬레이션
        const collectionIndex = dummyCollections.findIndex((c: Collection) => c.id === id);
        if (collectionIndex === -1) {
          return {
            success: false,
            message: '컬렉션을 찾을 수 없습니다.'
          };
        }

        // 실제로는 더미 데이터에서 삭제하지 않음 (메모리에서만)
        return {
          success: true,
          message: '컬렉션이 성공적으로 삭제되었습니다.'
        };
      }

      const response = await fetch(`${this.baseUrl}/collections/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });

      if (!response.ok) {
        throw new Error('컬렉션 삭제에 실패했습니다.');
      }

      return {
        success: true,
        message: '컬렉션이 성공적으로 삭제되었습니다.'
      };
    } catch (error) {
      console.error('Error deleting collection:', error);
      return {
        success: false,
        message: '컬렉션 삭제에 실패했습니다.'
      };
    }
  }

  // 웹툰을 컬렉션에 추가
  async addWebtoonToCollection(collectionId: number, webtoonId: number): Promise<Response<void>> {
    try {
      if (process.env.NODE_ENV === 'development') {
        // 개발 환경에서는 더미 데이터로 시뮬레이션
        const collection = dummyCollections.find((c: Collection) => c.id === collectionId);
        if (!collection) {
          return {
            success: false,
            message: '컬렉션을 찾을 수 없습니다.'
          };
        }

        // 실제로는 더미 데이터를 업데이트하지 않음 (메모리에서만)
        return {
          success: true,
          message: '웹툰이 컬렉션에 성공적으로 추가되었습니다.'
        };
      }

      const response = await fetch(`${this.baseUrl}/collections/${collectionId}/webtoons`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify({ webtoonId })
      });

      if (!response.ok) {
        throw new Error('웹툰 추가에 실패했습니다.');
      }

      return {
        success: true,
        message: '웹툰이 컬렉션에 성공적으로 추가되었습니다.'
      };
    } catch (error) {
      console.error('Error adding webtoon to collection:', error);
      return {
        success: false,
        message: '웹툰 추가에 실패했습니다.'
      };
    }
  }

  // 웹툰을 컬렉션에서 제거
  async removeWebtoonFromCollection(collectionId: number, webtoonId: number): Promise<Response<void>> {
    try {
      if (process.env.NODE_ENV === 'development') {
        // 개발 환경에서는 더미 데이터로 시뮬레이션
        const collection = dummyCollections.find((c: Collection) => c.id === collectionId);
        if (!collection) {
          return {
            success: false,
            message: '컬렉션을 찾을 수 없습니다.'
          };
        }

        // 실제로는 더미 데이터를 업데이트하지 않음 (메모리에서만)
        return {
          success: true,
          message: '웹툰이 컬렉션에서 성공적으로 제거되었습니다.'
        };
      }

      const response = await fetch(`${this.baseUrl}/collections/${collectionId}/webtoons/${webtoonId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });

      if (!response.ok) {
        throw new Error('웹툰 제거에 실패했습니다.');
      }

      return {
        success: true,
        message: '웹툰이 컬렉션에서 성공적으로 제거되었습니다.'
      };
    } catch (error) {
      console.error('Error removing webtoon from collection:', error);
      return {
        success: false,
        message: '웹툰 제거에 실패했습니다.'
      };
    }
  }
}

export default new CollectionService(); 