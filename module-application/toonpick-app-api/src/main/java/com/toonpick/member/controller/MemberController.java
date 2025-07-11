package com.toonpick.member.controller;

import com.toonpick.internal.security.annotation.CurrentUser;
import com.toonpick.member.request.MemberProfileRequestDTO;
import com.toonpick.member.response.MemberProfileDetailsResponse;
import com.toonpick.member.response.MemberResponseDTO;
import com.toonpick.member.service.MemberService;
import com.toonpick.internal.security.dto.CustomUserDetails;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "Member", description = "회원 관련 API (접근 권한 : Private)")
@RestController
@RequestMapping("/api/secure/member")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    private final Logger logger = LoggerFactory.getLogger(MemberController.class);

    @Operation(summary = "회원 정보 조회", description = "현재 인증된 사용자의 기본 정보를 조회합니다")
    @GetMapping
    public ResponseEntity<MemberResponseDTO> getMemberByUsername(
            @CurrentUser CustomUserDetails user
    ) {
        MemberResponseDTO memberResponseDTO = memberService.getMemberByUsername(user.getUsername());
        return ResponseEntity.ok(memberResponseDTO);
    }

    @Operation(summary = "회원 상세 프로필 조회", description = "현재 인증된 사용자의 상세 프로필 정보를 조회합니다")
    @GetMapping("/profile")
    public ResponseEntity<MemberProfileDetailsResponse> getUserProfile(
            @CurrentUser CustomUserDetails user
    ) {
        MemberProfileDetailsResponse memberResponseDTO = memberService.getProfileDetails(user.getUsername());
        return ResponseEntity.ok(memberResponseDTO);
    }

    @Operation(summary = "회원 프로필 업데이트", description = "현재 인증된 사용자의 프로필 정보를 업데이트합니다")
    @PutMapping("/profile")
    public ResponseEntity<Void> updateProfile(
            @Parameter(description = "회원 프로필 수정 요청 양식 (닉네임 등)", required = true)
            @RequestBody MemberProfileRequestDTO memberProfileRequestDTO,
            @CurrentUser CustomUserDetails user
    ) {
        memberService.updateProfile(user.getUsername(), memberProfileRequestDTO);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "회원 패스워드 변경", description = "회원의 패스워드를 변경합니다")
    @PutMapping("/password")
    public ResponseEntity<Void> changePassword(
            @Parameter(description = "새로운 패스워드", required = true)
            @RequestBody String newPassword,
            @CurrentUser CustomUserDetails user
    ) {
        memberService.changePassword(user.getUsername(), newPassword);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "회원 성인인증", description = "회원의 성인 인증 상태를 업데이트합니다. 해당 인증은 추가적인 권한을 필요로 할 수 있습니다")
    @PutMapping("/verify-adult")
    public ResponseEntity<Void> verifyAdult(
            @CurrentUser CustomUserDetails user
    ) {
        memberService.verifyAdult(user.getUsername());
        return ResponseEntity.noContent().build();
    }

}
