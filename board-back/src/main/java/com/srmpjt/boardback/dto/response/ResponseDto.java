package com.srmpjt.boardback.dto.response;

import com.srmpjt.boardback.common.ResponseCode;
import com.srmpjt.boardback.common.ResponseMessage;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
@AllArgsConstructor
public class ResponseDto {
    // 모든 Response는 HTTP Status 코드와 메시지를 가지고 있다.

    private String code;
    private String message;

    public static ResponseEntity<ResponseDto> databaseError() {
        // body 작성(ResponseEntity의 Generic 타입)
        ResponseDto responseBody = new ResponseDto(ResponseCode.DATABASE_ERROR, ResponseMessage.DATABASE_ERROR);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseBody);
    }
}
