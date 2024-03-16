package com.srmpjt.boardback.dto.response.search;

import com.srmpjt.boardback.common.ResponseCode;
import com.srmpjt.boardback.common.ResponseMessage;
import com.srmpjt.boardback.dto.response.ResponseDto;
import com.srmpjt.boardback.repository.resultSet.GetRelationListResultSet;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;

@Getter
public class GetRelationListResponseDto extends ResponseDto {

    List<String> relativeWordList;

    private GetRelationListResponseDto(List<GetRelationListResultSet> resultSetList) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);

        List<String> relativeWordList = new ArrayList<>();

        resultSetList.forEach(resultSet -> relativeWordList.add(resultSet.getSearchWord()));

        this.relativeWordList = relativeWordList;

    }

    // * 성공
    public static ResponseEntity<GetRelationListResponseDto> success(List<GetRelationListResultSet> resultSetList) {
        GetRelationListResponseDto result = new GetRelationListResponseDto(resultSetList);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

}
