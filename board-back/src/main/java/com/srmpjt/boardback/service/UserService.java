package com.srmpjt.boardback.service;

import com.srmpjt.boardback.dto.response.user.GetSignInUserResponseDto;
import com.srmpjt.boardback.repository.UserRepository;
import org.springframework.http.ResponseEntity;

public interface UserService {

    // ! 로그인 유저 정보 가져오기
    ResponseEntity<? super GetSignInUserResponseDto> getSignInUser(String email);

}
