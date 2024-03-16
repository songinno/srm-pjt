package com.srmpjt.boardback.service;

import com.srmpjt.boardback.dto.response.search.GetPopularListResponseDto;
import com.srmpjt.boardback.dto.response.search.GetRelationListResponseDto;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

public interface SearchService {

    // * 인기 검색어 리스트
    ResponseEntity<? super GetPopularListResponseDto> getPopularList();

    // * 연관 검색어 리스트
    ResponseEntity<? super GetRelationListResponseDto> getRelationList(String searchWord);

}
