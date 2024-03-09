package com.srmpjt.boardback.service;

import com.srmpjt.boardback.dto.request.board.PostBoardRequestDto;
import com.srmpjt.boardback.dto.response.board.GetBoardResponseDto;
import com.srmpjt.boardback.dto.response.board.PostBoardResponseDto;
import com.srmpjt.boardback.dto.response.board.PutFavoriteResponseDto;
import org.springframework.http.ResponseEntity;

public interface BoardService {
    // * 게시글 작성
    ResponseEntity<? super PostBoardResponseDto> postBoard(PostBoardRequestDto dto, String email); // # 인증을 통해 작성되므로, 작성하는 유저의 email 정보를 받을 수 있음

    // * 게시물 상세
    ResponseEntity<? super GetBoardResponseDto> getBoard(Integer boardNumber); // # @PathVariable을 통해 게시물 번호를 받아옴

    // * 좋아요 기능
    ResponseEntity<? super PutFavoriteResponseDto> putFavorite(Integer boardNumber, String email);

}
