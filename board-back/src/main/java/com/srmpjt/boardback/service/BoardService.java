package com.srmpjt.boardback.service;

import com.srmpjt.boardback.dto.request.board.PostBoardRequestDto;
import com.srmpjt.boardback.dto.response.board.PostBoardResponseDto;
import org.springframework.http.ResponseEntity;

public interface BoardService {
    // * 게시글 작성
    ResponseEntity<? super PostBoardResponseDto> postBoard(PostBoardRequestDto dto, String email); // # 인증을 통해 작성되므로, 작성하는 유저의 email 정보를 받을 수 있음

}
