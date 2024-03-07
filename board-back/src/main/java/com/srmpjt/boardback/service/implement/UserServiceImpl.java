package com.srmpjt.boardback.service.implement;

import com.srmpjt.boardback.dto.response.ResponseDto;
import com.srmpjt.boardback.dto.response.user.GetSignInUserResponseDto;
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
            if (ou.isEmpty()) return GetSignInUserResponseDto.notExistUser();

            userEntity = ou.get();

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }

        return GetSignInUserResponseDto.success(userEntity);
    }
}
