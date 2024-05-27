package com.srmpjt.boardback.dto.response.statistics;


import com.srmpjt.boardback.common.ResponseCode;
import com.srmpjt.boardback.common.ResponseMessage;
import com.srmpjt.boardback.dto.object.StatisticsPopularBoardListItem;
import com.srmpjt.boardback.dto.response.ResponseDto;

import com.srmpjt.boardback.entity.statistics.HourlyBoardViewCountStatisticsEntity;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;


import java.util.List;

@Getter
public class GetStatisticsPopularBoardListResponseDto extends ResponseDto {

    List<StatisticsPopularBoardListItem> statisticsPopularBoardListItemList ;

    private GetStatisticsPopularBoardListResponseDto(List<HourlyBoardViewCountStatisticsEntity> statisticsEntityList) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.statisticsPopularBoardListItemList = HourlyBoardViewCountStatisticsEntity.getList(statisticsEntityList);
    }

    // * 성공
    public static ResponseEntity<? super GetStatisticsPopularBoardListResponseDto> success(List<HourlyBoardViewCountStatisticsEntity> statisticsEntityList) {
        GetStatisticsPopularBoardListResponseDto result = new GetStatisticsPopularBoardListResponseDto(statisticsEntityList);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }
}
