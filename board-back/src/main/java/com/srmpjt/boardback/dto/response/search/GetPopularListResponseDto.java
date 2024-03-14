package com.srmpjt.boardback.dto.response.search;

import com.srmpjt.boardback.common.ResponseCode;
import com.srmpjt.boardback.common.ResponseMessage;
import com.srmpjt.boardback.dto.response.ResponseDto;
import com.srmpjt.boardback.repository.resultSet.GetPopularListResultSet;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;

@Getter
public class GetPopularListResponseDto extends ResponseDto {

    List<String> popularWordList;

    private GetPopularListResponseDto(List<GetPopularListResultSet> resultSetList) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);

        List<String> popularWordList = new ArrayList<>();
        resultSetList.forEach(resultSet -> {
            String popularWord = resultSet.getSearchWord();
            popularWordList.add(popularWord);
        });

        this.popularWordList = popularWordList;
    }

    // * 성공
    public static ResponseEntity<GetPopularListResponseDto> success(List<GetPopularListResultSet> resultSetList) {
        GetPopularListResponseDto result = new GetPopularListResponseDto(resultSetList);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

}
