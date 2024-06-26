package com.srmpjt.boardback.service.implement;

import com.srmpjt.boardback.dto.response.ResponseDto;
import com.srmpjt.boardback.dto.response.search.GetPopularListResponseDto;
import com.srmpjt.boardback.dto.response.search.GetRelationListResponseDto;
import com.srmpjt.boardback.repository.board.SearchLogRepository;
import com.srmpjt.boardback.repository.resultSet.GetPopularListResultSet;
import com.srmpjt.boardback.repository.resultSet.GetRelationListResultSet;
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

    @Override
    public ResponseEntity<? super GetRelationListResponseDto> getRelationList(String searchWord) {

        List<GetRelationListResultSet> resultSetList = new ArrayList<>();

        try {

            resultSetList  = searchLogRepository.getRelationList(searchWord);

        } catch (Exception e) {
            e.printStackTrace();
            return GetRelationListResponseDto.databaseError();
        }
        return GetRelationListResponseDto.success(resultSetList);
    }
}
