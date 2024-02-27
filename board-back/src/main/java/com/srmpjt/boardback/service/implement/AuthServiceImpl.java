package com.srmpjt.boardback.service.implement;

import com.srmpjt.boardback.dto.request.auth.SignUpRequestDto;
import com.srmpjt.boardback.dto.response.ResponseDto;
import com.srmpjt.boardback.dto.response.auth.SignUpResponseDto;
import com.srmpjt.boardback.entity.UserEntity;
import com.srmpjt.boardback.repository.UserRepository;
import com.srmpjt.boardback.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    // signUp() : USER 테이블에 데이터 INSERT
    @Override
    public ResponseEntity<? super SignUpResponseDto> signUp(SignUpRequestDto dto) {

        try {
            // 중복 검사
            String email = dto.getEmail();
            boolean emailExists = userRepository.existsByEmail(email);

            String nickname = dto.getNickname();
            boolean nicknameExists = userRepository.existsByNickname(nickname);

            String telNumber = dto.getTelNumber();
            boolean telnumberExists = userRepository.existsByTelNumber(telNumber);

            if (emailExists) return SignUpResponseDto.duplicateEmail();
            if (nicknameExists) return SignUpResponseDto.duplicateNickname();
            if (telnumberExists) return SignUpResponseDto.duplicateTelNumber();

            // 패스워드 암호화
            String password = dto.getPassword();

            String encodedPassword = passwordEncoder.encode(password);
            dto.setPassword(encodedPassword);

            // 엔티티 생성 및 DB 저장
            UserEntity userEntity = new UserEntity(dto);
            userRepository.save(userEntity);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }

        return SignUpResponseDto.success();
    }
}
