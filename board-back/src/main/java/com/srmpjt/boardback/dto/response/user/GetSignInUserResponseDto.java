package com.srmpjt.boardback.dto.response.user;

import com.srmpjt.boardback.common.ResponseCode;
import com.srmpjt.boardback.common.ResponseMessage;
import com.srmpjt.boardback.dto.response.ResponseDto;
import com.srmpjt.boardback.entity.board.UserEntity;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class GetSignInUserResponseDto extends ResponseDto {
    private String email;
    private String nickname;
    private String profileImage;

    private GetSignInUserResponseDto(UserEntity user) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.email = user.getEmail();
        this.nickname = user.getNickname();
        this.profileImage = user.getProfileImage();
    }

    // * 로그인 성공한 유저
    public static ResponseEntity<GetSignInUserResponseDto> success(UserEntity user) {
        GetSignInUserResponseDto result = new GetSignInUserResponseDto(user);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    // * 존재하지 않는 유저
    public static ResponseEntity<ResponseDto> noExistUser() {
        ResponseDto result = new ResponseDto(ResponseCode.NOT_EXISTED_USER, ResponseMessage.NOT_EXISTED_USER);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(result);
    }
}
