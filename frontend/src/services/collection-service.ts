import { api, Response, PagedResponse } from '@api';
import { Collection, CollectionCreateRequest, CollectionUpdateRequest, CollectionAddWebtoonRequest, CollectionRemoveWebtoonRequest } from '@models/collection';
import { dummyCollections } from '@dummy';

const isDev = process.env.NODE_ENV === 'development';

class CollectionService {
  private static instance: CollectionService;

  private constructor() {}

  public static getInstance(): CollectionService {
    if (!CollectionService.instance) {
      CollectionService.instance = new CollectionService();
    }
    return CollectionService.instance;
  }

  // 컬렉션 목록 조회
  public async getCollections(): Promise<Response<Collection[]>> {
    if (isDev) {
      return { success: true, data: dummyCollections };
    }
    try {
      const response = await api.get<Collection[]>('/api/secure/collections');
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error fetching collections:', error);
      return { success: false, message: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  // 특정 컬렉션 조회
  public async getCollectionById(collectionId: number): Promise<Response<Collection>> {
    if (isDev) {
      const collection = dummyCollections.find(c => c.id === collectionId);
      if (collection) {
        return { success: true, data: collection };
      }
      return { success: false, message: 'Collection not found' };
    }
    try {
      const response = await api.get<Collection>(`/api/secure/collections/${collectionId}`);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error fetching collection:', error);
      return { success: false, message: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  // 컬렉션 생성
  public async createCollection(collectionData: CollectionCreateRequest): Promise<Response<Collection>> {
    if (isDev) {
      const newCollection: Collection = {
        id: Math.max(...dummyCollections.map(c => c.id)) + 1,
        name: collectionData.name,
        description: collectionData.description,
        thumbnail: 'https://via.placeholder.com/300x200/667eea/ffffff?text=New',
        webtoonCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isPublic: collectionData.isPublic,
        tags: collectionData.tags,
        webtoons: []
      };
      return { success: true, data: newCollection };
    }
    try {
      const response = await api.post<Collection>('/api/secure/collections', collectionData);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error creating collection:', error);
      return { success: false, message: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  // 컬렉션 수정
  public async updateCollection(collectionId: number, updateData: CollectionUpdateRequest): Promise<Response<Collection>> {
    if (isDev) {
      const collectionIndex = dummyCollections.findIndex(c => c.id === collectionId);
      if (collectionIndex !== -1) {
        dummyCollections[collectionIndex] = {
          ...dummyCollections[collectionIndex],
          ...updateData,
          updatedAt: new Date().toISOString()
        };
        return { success: true, data: dummyCollections[collectionIndex] };
      }
      return { success: false, message: 'Collection not found' };
    }
    try {
      const response = await api.put<Collection>(`/api/secure/collections/${collectionId}`, updateData);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error updating collection:', error);
      return { success: false, message: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  // 컬렉션 삭제
  public async deleteCollection(collectionId: number): Promise<Response<void>> {
    if (isDev) {
      const collectionIndex = dummyCollections.findIndex(c => c.id === collectionId);
      if (collectionIndex !== -1) {
        dummyCollections.splice(collectionIndex, 1);
        return { success: true };
      }
      return { success: false, message: 'Collection not found' };
    }
    try {
      await api.delete(`/api/secure/collections/${collectionId}`);
      return { success: true };
    } catch (error) {
      console.error('Error deleting collection:', error);
      return { success: false, message: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  // 컬렉션에 웹툰 추가
  public async addWebtoonsToCollection(collectionId: number, webtoonIds: number[]): Promise<Response<Collection>> {
    if (isDev) {
      const collection = dummyCollections.find(c => c.id === collectionId);
      if (collection) {
        // 실제로는 웹툰 데이터를 가져와서 추가해야 함
        collection.webtoonCount += webtoonIds.length;
        collection.updatedAt = new Date().toISOString();
        return { success: true, data: collection };
      }
      return { success: false, message: 'Collection not found' };
    }
    try {
      const response = await api.post<Collection>(`/api/secure/collections/${collectionId}/webtoons`, { webtoonIds });
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error adding webtoons to collection:', error);
      return { success: false, message: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  // 컬렉션에서 웹툰 제거
  public async removeWebtoonsFromCollection(collectionId: number, webtoonIds: number[]): Promise<Response<Collection>> {
    if (isDev) {
      const collection = dummyCollections.find(c => c.id === collectionId);
      if (collection) {
        collection.webtoonCount = Math.max(0, collection.webtoonCount - webtoonIds.length);
        collection.updatedAt = new Date().toISOString();
        return { success: true, data: collection };
      }
      return { success: false, message: 'Collection not found' };
    }
    try {
      const response = await api.delete<Collection>(`/api/secure/collections/${collectionId}/webtoons`, { data: { webtoonIds } });
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error removing webtoons from collection:', error);
      return { success: false, message: error instanceof Error ? error.message : 'Unknown error' };
    }
  }
}

export default CollectionService.getInstance(); 