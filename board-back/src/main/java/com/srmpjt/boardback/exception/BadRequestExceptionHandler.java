package com.srmpjt.boardback.exception;

import com.srmpjt.boardback.dto.response.ResponseDto;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.util.NestedServletException;

@RestControllerAdvice
public class BadRequestExceptionHandler {
    @ExceptionHandler({MethodArgumentNotValidException.class, HttpMessageNotReadableException.class})
    public ResponseEntity<ResponseDto> validationExceptionHandler(Exception exception) {
        return ResponseDto.validationFailed();
    }

    // ! 테스트) BoardRepository에서 Native Query 사용 시, 발생하는 Exception에 대해 핸들링
    // TODO : 전역으로 적용되지 않음
    /*@ExceptionHandler({NestedServletException.class})
    public ResponseEntity<ResponseDto> customQueryExceptionHandler(Exception e) {
        return ResponseDto.databaseError();
    }*/
    /*
       - 결과 -
    {
        "timestamp": "2024-03-08T09:55:02.697+00:00",
        "status": 500,
        "error": "Internal Server Error",
        "path": "/api/v1/board/12"
    }
    * */
}
