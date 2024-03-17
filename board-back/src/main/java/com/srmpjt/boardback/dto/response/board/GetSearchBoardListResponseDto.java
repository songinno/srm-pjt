package com.srmpjt.boardback.dto.response.board;

import com.srmpjt.boardback.common.ResponseCode;
import com.srmpjt.boardback.common.ResponseMessage;
import com.srmpjt.boardback.dto.object.BoardListItem;
import com.srmpjt.boardback.dto.response.ResponseDto;
import com.srmpjt.boardback.entity.BoardListViewEntity;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

@Getter
public class GetSearchBoardListResponseDto extends ResponseDto {

    private List<BoardListItem> searchList;

    private GetSearchBoardListResponseDto(List<BoardListViewEntity> boardListViewEntityList) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.searchList = BoardListItem.getList(boardListViewEntityList);
    }

    // * 성공
    public static ResponseEntity<? super GetSearchBoardListResponseDto> success(List<BoardListViewEntity> boardListViewEntityList) {
        GetSearchBoardListResponseDto result = new GetSearchBoardListResponseDto(boardListViewEntityList);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }
}