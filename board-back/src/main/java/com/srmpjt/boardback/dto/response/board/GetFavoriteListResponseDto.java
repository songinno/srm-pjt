package com.srmpjt.boardback.dto.response.board;

import com.srmpjt.boardback.common.ResponseCode;
import com.srmpjt.boardback.common.ResponseMessage;
import com.srmpjt.boardback.dto.object.FavoriteListItem;
import com.srmpjt.boardback.dto.response.ResponseDto;
import com.srmpjt.boardback.repository.resultSet.GetFavoriteListResultSet;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

@Getter
public class GetFavoriteListResponseDto extends ResponseDto {

    private List<FavoriteListItem> favoriteList;

    private GetFavoriteListResponseDto(List<GetFavoriteListResultSet> resultSetList) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.favoriteList = FavoriteListItem.copyList(resultSetList);
    }

    // * 성공
    public static ResponseEntity<GetFavoriteListResponseDto> success(List<GetFavoriteListResultSet> resultSets) {

        GetFavoriteListResponseDto result = new GetFavoriteListResponseDto(resultSets);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    // * 실패
    // ! 존재하지 않는 게시물
    public static ResponseEntity<ResponseDto> noExsitBoard() {
        ResponseDto result = new ResponseDto(ResponseCode.NOT_EXISTED_BOARD, ResponseMessage.NOT_EXISTED_BOARD);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);

    }
}
