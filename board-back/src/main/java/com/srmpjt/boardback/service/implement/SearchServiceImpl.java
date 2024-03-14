package com.srmpjt.boardback.service.implement;

import com.srmpjt.boardback.dto.response.ResponseDto;
import com.srmpjt.boardback.dto.response.search.GetPopularListResponseDto;
import com.srmpjt.boardback.entity.SearchLogEntity;
import com.srmpjt.boardback.repository.SearchLogRepository;
import com.srmpjt.boardback.repository.resultSet.GetPopularListResultSet;
import com.srmpjt.boardback.service.SearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SearchServiceImpl implements SearchService {

    private final SearchLogRepository searchLogRepository;
    @Override
    public ResponseEntity<? super GetPopularListResponseDto> getPopularList() {

        List<GetPopularListResultSet> popularListResultSetList = new ArrayList<>();

        try {
            popularListResultSetList = searchLogRepository.getPopularList();

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }

        return GetPopularListResponseDto.success(popularListResultSetList);
    }
}
