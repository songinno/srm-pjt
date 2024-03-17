package com.srmpjt.boardback.service;

import com.srmpjt.boardback.dto.request.board.PatchBoardRequestDto;
import com.srmpjt.boardback.dto.request.board.PostBoardRequestDto;
import com.srmpjt.boardback.dto.request.board.PostCommentRequestDto;
import com.srmpjt.boardback.dto.response.board.*;
import org.springframework.http.ResponseEntity;

public interface BoardService {
    // * 게시글 작성
    ResponseEntity<? super PostBoardResponseDto> postBoard(PostBoardRequestDto dto, String email); // # 인증을 통해 작성되므로, 작성하는 유저의 email 정보를 받을 수 있음

    // * 게시물 상세
    ResponseEntity<? super GetBoardResponseDto> getBoard(Integer boardNumber); // # @PathVariable을 통해 게시물 번호를 받아옴

    // * 게시물 삭제
    ResponseEntity<? super DeleteBoardResponseDto> deleteBoard(Integer boardNumber, String email);

    // * 게시물 수정
    ResponseEntity<? super PatchBoardResponseDto> patchBoard(PatchBoardRequestDto dto, Integer boardNumber, String email);

    // * 좋아요 기능
    ResponseEntity<? super PutFavoriteResponseDto> putFavorite(Integer boardNumber, String email);

    // * 좋아요 리스트
    ResponseEntity<? super GetFavoriteListResponseDto> getFavoriteList(Integer boardNumber);

    // * 댓글 작성
    ResponseEntity<? super PostCommentResponseDto> postComment(PostCommentRequestDto dto, Integer boardNumber, String email);

    // * 댓글 리스트
    ResponseEntity<? super GetCommentListResponseDto> getCommentList(Integer boardNumber);

    // * 조회수 카운트업
    ResponseEntity<? super ViewCountUpResponseDto> viewCountUp(Integer boardNumber);

    // * 최신 게시물 리스트
    ResponseEntity<? super GetLatestBoardListResponseDto> getLatestBoardList();

    // * 월간 TOP3 게시물 리스트
    ResponseEntity<? super GetTop3BoardListResponseDto> getTop3BoardList();

    // * 검색 게시물 리스트
    ResponseEntity<? super GetSearchBoardListResponseDto> getSearchBoardList(String searchWord, String preSearchWord);

    // * 특정 유저 게시물 리스트
    ResponseEntity<? super GetUserBoardListResponseDto> getUserBoardList(String email);

}
