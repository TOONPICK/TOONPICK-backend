package com.toonpick.webtoon.controller;

import com.toonpick.domain.dto.PagedResponseDTO;
import com.toonpick.domain.webtoon.dto.WebtoonFilterDTO;
import com.toonpick.webtoon.response.WebtoonDetailsResponse;
import com.toonpick.webtoon.response.WebtoonSummaryResponse;
import com.toonpick.webtoon.service.WebtoonService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@Tag(name = "Webtoon", description = "웹툰 정보 조회 및 필터링 API (접근 권한 : Public)")
@RestController
@RequestMapping("/api/v1/webtoons")
@RequiredArgsConstructor
public class WebtoonController {

    private final WebtoonService webtoonService;

    @Operation(summary = "웹툰 필터 조회", description = "필터 옵션과 페이징 정보를 통해 웹툰 리스트를 조회합니다")
    @ApiResponse(responseCode = "200", description = "필터링된 웹툰 리스트를 성공적으로 반환")
    @PostMapping()
    public ResponseEntity<PagedResponseDTO<WebtoonSummaryResponse>> getWebtoonsByFilter(
            @Parameter(description = "필터 옵션 (제목, 장르 등)", required = false)
            @RequestBody WebtoonFilterDTO filter,
            @Parameter(description = "페이지 번호 (0부터 시작)", required = false, example = "0")
            @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "페이지당 항목 수", required = false, example = "30")
            @RequestParam(defaultValue = "60") int size,
            @Parameter(description = "정렬 기준 필드", required = false, example = "title")
            @RequestParam(defaultValue = "title") String sortBy,
            @Parameter(description = "정렬 방향 (asc/desc)", required = false, example = "asc")
            @RequestParam(defaultValue = "asc") String sortDir
    ) {
        PagedResponseDTO<WebtoonSummaryResponse> webtoons = webtoonService.getWebtoonsOptions(filter, page, size, sortBy, sortDir);
        return ResponseEntity.ok(webtoons);
    }


    @Operation(summary = "웹툰 상세 페이지 정보 조회", description = "웹툰 ID를 통해 특정 웹툰의 상세 페이지 정보를 조회합니다")
    @ApiResponse(responseCode = "200", description = "웹툰 정보를 성공적으로 반환")
    @GetMapping("/detail/{id}")
    public ResponseEntity<WebtoonDetailsResponse> getWebtoonDetailsPageInfo(
            @Parameter(description = "웹툰 ID", required = true, example = "1")
            @PathVariable Long id
    ) {
        WebtoonDetailsResponse webtoonDTO = webtoonService.getWebtoonDetails(id);
        return ResponseEntity.ok(webtoonDTO);
    }
    
}

