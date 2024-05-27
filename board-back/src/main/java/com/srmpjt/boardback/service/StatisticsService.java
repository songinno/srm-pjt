package com.srmpjt.boardback.service;

import com.srmpjt.boardback.dto.response.statistics.GetStatisticsPopularBoardListResponseDto;
import com.srmpjt.boardback.dto.response.statistics.GetStatisticsPopularSearchWordListResponseDto;
import org.springframework.http.ResponseEntity;

public interface StatisticsService {
    // * 인기 검색어 TOP 10 집계 데이터 가져오기
    ResponseEntity<? super GetStatisticsPopularSearchWordListResponseDto> getStatisticsPopularSearchWordList(String searchStartDate, String searchEndDate);

    // * 인기 게시글 TOP 10 집계 데이터 가져오기
    ResponseEntity<? super GetStatisticsPopularBoardListResponseDto> getStatisticsPopularBoardList(String searchStartDate, String searchEndDate);

    // * 우수 회원 TOP 3 집계 데이터 가져오기
}
