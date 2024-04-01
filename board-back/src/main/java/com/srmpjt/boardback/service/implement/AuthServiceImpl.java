package com.srmpjt.boardback.service.implement;

import com.srmpjt.boardback.dto.request.auth.SignInRequestDto;
import com.srmpjt.boardback.dto.request.auth.SignUpRequestDto;
import com.srmpjt.boardback.dto.response.ResponseDto;
import com.srmpjt.boardback.dto.response.auth.SignInResponseDto;
import com.srmpjt.boardback.dto.response.auth.SignUpResponseDto;
import com.srmpjt.boardback.entity.board.UserEntity;
import com.srmpjt.boardback.provider.JwtProvider;
import com.srmpjt.boardback.repository.board.UserRepository;
import com.srmpjt.boardback.service.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final JwtProvider jwtProvider;

    // *** 회원가입 기능 구현 -> USER 테이블에 데이터 INSERT
    @Override
    public ResponseEntity<? super SignUpResponseDto> signUp(SignUpRequestDto dto) {

        try {
            // ! 중복 검사
            // TODO : UserEntity에서 @Column 애너테이션으로 처리해도
            String email = dto.getEmail();
            boolean emailExists = userRepository.existsByEmail(email);

            String nickname = dto.getNickname();
            boolean nicknameExists = userRepository.existsByNickname(nickname);

            String telNumber = dto.getTelNumber();
            boolean telnumberExists = userRepository.existsByTelNumber(telNumber);

            if (emailExists) return SignUpResponseDto.duplicateEmail();
            if (nicknameExists) return SignUpResponseDto.duplicateNickname();
            if (telnumberExists) return SignUpResponseDto.duplicateTelNumber();

            // ! 패스워드 암호화
            String password = dto.getPassword();

            String encodedPassword = passwordEncoder.encode(password);
            dto.setPassword(encodedPassword);

            // ! 엔티티 생성 및 DB 저장
            UserEntity userEntity = new UserEntity(dto);
            userRepository.save(userEntity);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }

        return SignUpResponseDto.success();
    }

    // *** 로그인 기능 구현
    @Override
    public ResponseEntity<? super SignInResponseDto> signIn(SignInRequestDto dto) {
        String token = null;

        try {
            // ! 회원으로 등록된 email인지 검사
            String email = dto.getEmail();
            Optional<UserEntity> ou = userRepository.findByEmail(email);
            if (!ou.isPresent()) return SignInResponseDto.signInFailed();

            UserEntity userEntity = ou.get();

            // ! 비밀번호 검사
            String password = dto.getPassword();
            String encodedPassword = userEntity.getPassword();

            // # 평문 비밀번호 - 암호화된 비밀번호 비교
            boolean isMatched = passwordEncoder.matches(password, encodedPassword);
            if (!isMatched) return SignInResponseDto.signInFailed();

            System.out.println("---------------------------------------------");
            // ! JWT Token 발급
            token = jwtProvider.create(email);
//            log.info(token);

        } catch (Exception e) {
            e.printStackTrace();
            return SignInResponseDto.databaseError();
        }
        return SignInResponseDto.success(token);
    }
}
