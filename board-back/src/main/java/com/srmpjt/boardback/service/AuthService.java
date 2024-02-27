package com.srmpjt.boardback.service;

import com.srmpjt.boardback.dto.request.auth.SignUpRequestDto;
import com.srmpjt.boardback.dto.response.auth.SignUpResponseDto;
import org.springframework.http.ResponseEntity;

public interface AuthService {

    ResponseEntity<? super SignUpResponseDto> signUp(SignUpRequestDto dto);
    // SignUpResponseDto 타입과 그 상위 타입들까지 제네릭 타입으로 허용

}
