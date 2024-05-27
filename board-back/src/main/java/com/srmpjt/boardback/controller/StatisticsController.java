package com.srmpjt.boardback.controller;

import com.srmpjt.boardback.dto.response.statistics.GetStatisticsPopularSearchWordListResponseDto;
import com.srmpjt.boardback.service.StatisticsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/statistics")
@RequiredArgsConstructor
@Slf4j
public class StatisticsController {
    private final StatisticsService statisticsService;

    @GetMapping("/popular-search-word")
    public ResponseEntity<? super GetStatisticsPopularSearchWordListResponseDto> getPopularSearchWordList(
            @RequestParam("start") String searchStartDate,
            @RequestParam("end") String searchEndDate
    ) {
        log.debug("searchStartDate = {}, searchEndDate = {}", searchStartDate, searchEndDate);
        ResponseEntity<? super GetStatisticsPopularSearchWordListResponseDto> response = statisticsService.getStatisticsPopularSearchWordList(searchStartDate, searchEndDate);
        return response;
    }
}
