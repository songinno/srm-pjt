package com.srmpjt.boardback.service;

import com.srmpjt.boardback.dto.request.auth.SignInRequestDto;
import com.srmpjt.boardback.dto.request.auth.SignUpRequestDto;
import com.srmpjt.boardback.dto.response.auth.SignInResponseDto;
import com.srmpjt.boardback.dto.response.auth.SignUpResponseDto;
import org.springframework.http.ResponseEntity;

public interface AuthService {

    // ! 회원가입 기능
    ResponseEntity<? super SignUpResponseDto> signUp(SignUpRequestDto dto);

    // ! 로그인 기능
    ResponseEntity<? super SignInResponseDto> signIn(SignInRequestDto dto);


}
