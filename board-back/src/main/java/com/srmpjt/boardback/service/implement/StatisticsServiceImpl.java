package com.srmpjt.boardback.service.implement;

import com.srmpjt.boardback.dto.response.ResponseDto;
import com.srmpjt.boardback.dto.response.statistics.GetStatisticsPopularBoardListResponseDto;
import com.srmpjt.boardback.dto.response.statistics.GetStatisticsPopularSearchWordListResponseDto;
import com.srmpjt.boardback.entity.statistics.HourlyBoardViewCountStatisticsEntity;
import com.srmpjt.boardback.entity.statistics.HourlySearchWordCountStatisticsEntity;
import com.srmpjt.boardback.repository.board.BoardRepository;
import com.srmpjt.boardback.repository.statistics.HourlyBoardViewCountStatisticsRepository;
import com.srmpjt.boardback.repository.statistics.HourlySearchWordCountStatisticsRepository;
import com.srmpjt.boardback.service.StatisticsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class StatisticsServiceImpl implements StatisticsService {

    private final HourlyBoardViewCountStatisticsRepository hourlyBoardViewCountStatisticsRepository;
    private final HourlySearchWordCountStatisticsRepository hourlySearchWordCountStatisticsRepository;

    private final BoardRepository boardRepository;

    @Override
    public ResponseEntity<? super GetStatisticsPopularSearchWordListResponseDto> getStatisticsPopularSearchWordList(String searchStartDate, String searchEndDate) {
        List<HourlySearchWordCountStatisticsEntity> popularSearchWordList = new ArrayList<>();

        try {
            popularSearchWordList = hourlySearchWordCountStatisticsRepository.getPopularSearchWordList(searchStartDate, searchEndDate);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }

        return GetStatisticsPopularSearchWordListResponseDto.success(popularSearchWordList);
    }

    @Override
    public ResponseEntity<? super GetStatisticsPopularBoardListResponseDto> getStatisticsPopularBoardList(String searchStartDate, String searchEndDate) {
        List<HourlyBoardViewCountStatisticsEntity> popularBoardList = new ArrayList<>();

        try {
            // ! 인기 게시글 TOP 10 데이터 가져오기
            popularBoardList = hourlyBoardViewCountStatisticsRepository.getPopularBoardList(searchStartDate, searchEndDate);

            // ! 게시글 제목 가져오기
            popularBoardList.stream().forEach(e -> {
                int boardNumber = e.getBoardNumber();
//                boardRepository.find
            });

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }

        return GetStatisticsPopularBoardListResponseDto.success(popularBoardList);
    }
}
