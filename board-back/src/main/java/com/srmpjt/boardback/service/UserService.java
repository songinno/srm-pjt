package com.srmpjt.boardback.service;

import com.srmpjt.boardback.dto.request.user.PatchNicknameRequestDto;
import com.srmpjt.boardback.dto.request.user.PatchProfileImageRequestDto;
import com.srmpjt.boardback.dto.response.user.GetSignInUserResponseDto;
import com.srmpjt.boardback.dto.response.user.GetUserResponseDto;
import com.srmpjt.boardback.dto.response.user.PatchNicknameResponseDto;
import com.srmpjt.boardback.dto.response.user.PatchProfileImageResponseDto;
import com.srmpjt.boardback.repository.UserRepository;
import org.springframework.http.ResponseEntity;

public interface UserService {

    // ! 로그인 유저 정보 가져오기
    ResponseEntity<? super GetSignInUserResponseDto> getSignInUser(String email);

    // ! 유저 정보 가져오기
    ResponseEntity<? super GetUserResponseDto> getUser(String email);

    // ! 닉네임 수정
    ResponseEntity<? super PatchNicknameResponseDto> patchNickname(PatchNicknameRequestDto dto, String email);

    // ! 프로필 이미지 수정
    ResponseEntity<? super PatchProfileImageResponseDto> patchProfileImage(PatchProfileImageRequestDto dto, String email);

}
