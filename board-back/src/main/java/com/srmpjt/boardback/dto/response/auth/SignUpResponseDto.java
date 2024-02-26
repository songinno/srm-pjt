package com.srmpjt.boardback.dto.response.auth;


import com.srmpjt.boardback.common.ResponseCode;
import com.srmpjt.boardback.common.ResponseMessage;
import com.srmpjt.boardback.dto.response.ResponseDto;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class SignUpResponseDto extends ResponseDto {

    // 기본 생성자 - 성공
    private SignUpResponseDto() {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
    }

    /* 성공 */
    public static ResponseEntity<SignUpResponseDto> success() {
        SignUpResponseDto result = new SignUpResponseDto();
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    /* 실패 */
    // 중복된 이메일
    public static ResponseEntity<ResponseDto> duplicateEmail() {
        ResponseDto result = new ResponseDto(ResponseCode.DUPLICATE_EMAIL, ResponseMessage.DUPLICATE_EMAIL);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
    }

    // 중복된 닉네임
    public static ResponseEntity<ResponseDto> duplicateNickname() {
        ResponseDto result = new ResponseDto(ResponseCode.DUPLICATE_NICKNAME, ResponseMessage.DUPLICATE_NICKNAME);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
    }

    // 중복된 전화번호
    public static ResponseEntity<ResponseDto> duplicateTelNumber() {
        ResponseDto result = new ResponseDto(ResponseCode.DUPLICATE_TEL_NUMBER, ResponseMessage.DUPLICATE_TEL_NUMBER);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
    }
}
