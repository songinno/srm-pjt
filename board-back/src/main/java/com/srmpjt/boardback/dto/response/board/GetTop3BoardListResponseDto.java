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
public class GetTop3BoardListResponseDto extends ResponseDto {
    private List<BoardListItem> top3List;

    private GetTop3BoardListResponseDto(List<BoardListViewEntity> boardListViewEntityList) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.top3List = BoardListItem.getList(boardListViewEntityList);
    }

    // * 성공
    public static ResponseEntity<GetTop3BoardListResponseDto> success(List<BoardListViewEntity> boardListViewEntityList) {
        GetTop3BoardListResponseDto result = new GetTop3BoardListResponseDto(boardListViewEntityList);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }
}
