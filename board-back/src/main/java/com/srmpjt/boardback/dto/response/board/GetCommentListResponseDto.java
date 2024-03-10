package com.srmpjt.boardback.dto.response.board;

import com.srmpjt.boardback.common.ResponseCode;
import com.srmpjt.boardback.common.ResponseMessage;
import com.srmpjt.boardback.dto.object.CommentListItem;
import com.srmpjt.boardback.dto.response.ResponseDto;
import com.srmpjt.boardback.repository.resultSet.GetCommentListResultSet;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

@Getter
public class GetCommentListResponseDto extends ResponseDto {

    private List<CommentListItem> commentListItems;

    private GetCommentListResponseDto(List<GetCommentListResultSet> resultSet) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.commentListItems = CommentListItem.copyList(resultSet);
    }

    // * 성공
    public static ResponseEntity<GetCommentListResponseDto> success(List<GetCommentListResultSet> resultSetList) {
        GetCommentListResponseDto result = new GetCommentListResponseDto(resultSetList);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    // * 실패
    // ! 존재하지 않는 게시물
    public static ResponseEntity<ResponseDto> noExistBoard() {
        ResponseDto result = new ResponseDto(ResponseCode.NOT_EXISTED_BOARD, ResponseMessage.NOT_EXISTED_BOARD);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
    }
}
