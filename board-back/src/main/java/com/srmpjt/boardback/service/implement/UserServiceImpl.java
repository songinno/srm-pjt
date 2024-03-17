package com.srmpjt.boardback.service.implement;

import com.srmpjt.boardback.dto.request.user.PatchNicknameRequestDto;
import com.srmpjt.boardback.dto.response.ResponseDto;
import com.srmpjt.boardback.dto.response.user.GetSignInUserResponseDto;
import com.srmpjt.boardback.dto.response.user.GetUserResponseDto;
import com.srmpjt.boardback.dto.response.user.PatchNicknameResponseDto;
import com.srmpjt.boardback.entity.UserEntity;
import com.srmpjt.boardback.repository.UserRepository;
import com.srmpjt.boardback.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public ResponseEntity<? super GetSignInUserResponseDto> getSignInUser(String email) {

        UserEntity userEntity = null;

        try {

            Optional<UserEntity> ou = userRepository.findByEmail(email);
            if (ou.isEmpty()) return GetSignInUserResponseDto.noExistUser();

            userEntity = ou.get();

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }

        return GetSignInUserResponseDto.success(userEntity);
    }

    @Override
    public ResponseEntity<? super GetUserResponseDto> getUser(String email) {

        UserEntity userEntity = null;

        try {

            Optional<UserEntity> ou = userRepository.findByEmail(email);
            if (ou.isEmpty()) return GetUserResponseDto.noExistUser();

            userEntity = ou.get();

        } catch (Exception e) {
            e.printStackTrace();
            return GetUserResponseDto.databaseError();
        }

        return GetUserResponseDto.success(userEntity);
    }

    @Override
    public ResponseEntity<? super PatchNicknameResponseDto> patchNickname(PatchNicknameRequestDto dto, String email) {
        try {

            // ! 유저 존재 유무 확인
            Optional<UserEntity> ou = userRepository.findByEmail(email);
            if (ou.isEmpty()) return PatchNicknameResponseDto.noExistUser();

            // ! 닉네임 중복 확인
            boolean existsNickname = userRepository.existsByNickname(dto.getNickname());
            if (existsNickname) return PatchNicknameResponseDto.duplicateNickname();

            // ! 닉네임 수정
            UserEntity userEntity = ou.get();
            userEntity.updateNickname(dto.getNickname());
            userRepository.save(userEntity);

        } catch (Exception e) {
            e.printStackTrace();
            return PatchNicknameResponseDto.databaseError();
        }
        return PatchNicknameResponseDto.success();
    }
}
