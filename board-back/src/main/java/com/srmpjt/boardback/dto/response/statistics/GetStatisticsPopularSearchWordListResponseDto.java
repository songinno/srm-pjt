package com.srmpjt.boardback.dto.response.statistics;

import com.srmpjt.boardback.common.ResponseCode;
import com.srmpjt.boardback.common.ResponseMessage;
import com.srmpjt.boardback.dto.object.StatisticsPopularSearchWordListItem;
import com.srmpjt.boardback.dto.response.ResponseDto;
import com.srmpjt.boardback.entity.statistics.HourlySearchWordCountStatisticsEntity;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

@Getter
public class GetStatisticsPopularSearchWordListResponseDto extends ResponseDto {

    List<StatisticsPopularSearchWordListItem> statisticsPopularSearchWordList;

    private GetStatisticsPopularSearchWordListResponseDto(List<HourlySearchWordCountStatisticsEntity> statisticsEntityList) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        // ! Entity List -> DTO`s property
        List<StatisticsPopularSearchWordListItem> statisticsSearchWordList = HourlySearchWordCountStatisticsEntity.getList(statisticsEntityList);
        this.statisticsPopularSearchWordList = statisticsSearchWordList;
    }

    // * Success
    public static ResponseEntity<GetStatisticsPopularSearchWordListResponseDto> success(List<HourlySearchWordCountStatisticsEntity> statisticsEntityList) {
        GetStatisticsPopularSearchWordListResponseDto result = new GetStatisticsPopularSearchWordListResponseDto(statisticsEntityList);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }
}
