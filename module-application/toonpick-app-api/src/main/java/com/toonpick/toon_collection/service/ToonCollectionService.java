package com.toonpick.toon_collection.service;

import com.toonpick.common.exception.EntityNotFoundException;
import com.toonpick.toon_collection.response.ToonCollectionResponseDTO;
import com.toonpick.domain.member.entity.Member;
import com.toonpick.domain.member.entity.ToonCollection;
import com.toonpick.toon_collection.mapper.ToonCollectionMapper;
import com.toonpick.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.toonpick.domain.webtoon.entity.Webtoon;
import com.toonpick.domain.member.repository.ToonCollectionRepository;
import com.toonpick.domain.webtoon.repository.WebtoonRepository;
import com.toonpick.common.type.ErrorCode;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ToonCollectionService {

    private final ToonCollectionRepository toonCollectionRepository;
    private final ToonCollectionMapper toonCollectionMapper;
    private final WebtoonRepository webtoonRepository;
    private final MemberRepository memberRepository;

    @Transactional
    public ToonCollectionResponseDTO createCollection(String username, String title) {
        Member member = memberRepository.findByUsername(username)
                .orElseThrow(() -> new EntityNotFoundException(ErrorCode.MEMBER_NOT_FOUND, username));

        ToonCollection collection = ToonCollection.builder()
            .member(member)
            .title(title)
            .build();
        toonCollectionRepository.save(collection);

        return toonCollectionMapper.toonCollectionToToonCollectionResponseDTO(collection);
    }

    @Transactional
    public void addWebtoon(Long collectionId, Long webtoonId) {
        ToonCollection collection = toonCollectionRepository.findById(collectionId)
            .orElseThrow(() -> new EntityNotFoundException(ErrorCode.COLLECTION_NOT_FOUND, String.valueOf(collectionId)));
        Webtoon webtoon = webtoonRepository.findById(webtoonId)
            .orElseThrow(() -> new EntityNotFoundException(ErrorCode.WEBTOON_NOT_FOUND, String.valueOf(webtoonId)));
        collection.addWebtoon(webtoon);
    }

    @Transactional
    public void removeWebtoon(Long collectionId, Long webtoonId) {
        ToonCollection collection = toonCollectionRepository.findById(collectionId)
            .orElseThrow(() -> new EntityNotFoundException(ErrorCode.COLLECTION_NOT_FOUND, String.valueOf(collectionId)));
        Webtoon webtoon = webtoonRepository.findById(webtoonId)
            .orElseThrow(() -> new EntityNotFoundException(ErrorCode.WEBTOON_NOT_FOUND, String.valueOf(webtoonId)));
        collection.removeWebtoon(webtoon);
    }

    @Transactional
    public void addMultipleWebtoons(Long collectionId, List<Long> webtoonIds) {
        ToonCollection collection = toonCollectionRepository.findById(collectionId)
            .orElseThrow(() -> new EntityNotFoundException(ErrorCode.COLLECTION_NOT_FOUND, String.valueOf(collectionId)));
        List<Webtoon> webtoons = webtoonRepository.findAllById(webtoonIds);
        collection.getWebtoons().addAll(webtoons);
    }

    @Transactional
    public void deleteCollection(Long collectionId) {
        ToonCollection collection = toonCollectionRepository.findById(collectionId)
            .orElseThrow(() -> new EntityNotFoundException(ErrorCode.COLLECTION_NOT_FOUND, String.valueOf(collectionId)));
        toonCollectionRepository.delete(collection);
    }

    @Transactional
    public void updateCollectionTitle(Long collectionId, String newTitle) {
        ToonCollection collection = toonCollectionRepository.findById(collectionId)
            .orElseThrow(() -> new EntityNotFoundException(ErrorCode.COLLECTION_NOT_FOUND, String.valueOf(collectionId)));
        collection.updateTitle(newTitle);
    }

    @Transactional
    public void removeMultipleWebtoons(Long collectionId, List<Long> webtoonIds) {
        ToonCollection collection = toonCollectionRepository.findById(collectionId)
            .orElseThrow(() -> new EntityNotFoundException(ErrorCode.COLLECTION_NOT_FOUND, String.valueOf(collectionId)));
        List<Webtoon> webtoons = webtoonRepository.findAllById(webtoonIds);
        collection.getWebtoons().removeAll(webtoons);
    }

    @Transactional
    public void clearAllWebtoons(Long collectionId) {
        ToonCollection collection = toonCollectionRepository.findById(collectionId)
            .orElseThrow(() -> new EntityNotFoundException(ErrorCode.COLLECTION_NOT_FOUND, String.valueOf(collectionId)));
        collection.clearWebtoons();
    }

    @Transactional(readOnly = true)
    public List<ToonCollectionResponseDTO> getCollectionsByMember(String username) {
        Member member = memberRepository.findByUsername(username)
                .orElseThrow(() -> new EntityNotFoundException(ErrorCode.MEMBER_NOT_FOUND, username));

        List<ToonCollection> toonCollections = toonCollectionRepository.findByMember(member);

        return toonCollectionMapper.toonCollectionsToToonCollectionResponseDTOs(toonCollections);
    }
}
