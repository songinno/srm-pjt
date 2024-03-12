package com.srmpjt.boardback.dto.response.board;

import com.srmpjt.boardback.common.ResponseCode;
import com.srmpjt.boardback.common.ResponseMessage;
import com.srmpjt.boardback.dto.response.ResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class ViewCountUpResponseDto extends ResponseDto  {
    private ViewCountUpResponseDto() {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
    }

    // * 성공
    public static ResponseEntity<ViewCountUpResponseDto> success() {
        ViewCountUpResponseDto result = new ViewCountUpResponseDto();
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    // * 실패
    // ! 존재하지 않는 게시물
    public static ResponseEntity<ResponseDto> noExistBoard() {
        ResponseDto result = new ResponseDto(ResponseCode.NOT_EXISTED_BOARD, ResponseMessage.NOT_EXISTED_BOARD);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
    }
}
