package com.srmpjt.boardback.service.implement;

import com.srmpjt.boardback.dto.object.CommentListItem;
import com.srmpjt.boardback.dto.request.board.PatchBoardRequestDto;
import com.srmpjt.boardback.dto.request.board.PostBoardRequestDto;
import com.srmpjt.boardback.dto.request.board.PostCommentRequestDto;
import com.srmpjt.boardback.dto.response.ResponseDto;
import com.srmpjt.boardback.dto.response.board.*;
import com.srmpjt.boardback.entity.*;
import com.srmpjt.boardback.repository.*;
import com.srmpjt.boardback.repository.resultSet.GetBoardResultSet;
import com.srmpjt.boardback.repository.resultSet.GetCommentListResultSet;
import com.srmpjt.boardback.repository.resultSet.GetFavoriteListResultSet;
import com.srmpjt.boardback.service.BoardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
@Slf4j
public class BoardServiceImpl implements BoardService {

    private final UserRepository userRepository;

    private final BoardRepository boardRepository;

    private final ImageRepository imageRepository;

    private final FavoriteRepository favoriteRepository;

    private final CommentRepository commentRepository;

    private final BoardListViewRepository boardListViewRepository;

    private final SearchLogRepository searchLogRepository;

    // * 게시물 등록
    @Override
    public ResponseEntity<? super PostBoardResponseDto> postBoard(PostBoardRequestDto dto, String email) {
        try {
            // ! 유저 존재 여부 확인
            boolean userExists = userRepository.existsByEmail(email);
            if (!userExists) return PostBoardResponseDto.noExistUser();

            // ! Board 엔티티 생성 및 DB 저장
            // ! BoardEntity에 dto, email을 인자로 받는 생성자를 정의해서 처리
            BoardEntity boardEntity = new BoardEntity(dto, email);
            BoardEntity saved = boardRepository.save(boardEntity);
            log.info("boardEntity`s boardNumber = " + boardEntity.getBoardNumber());
            log.info("saved`s boardNumber = " + saved.getBoardNumber());


            // ! 첨부 이미지 엔티티 생성 및 DB 저장
            List<String> boardImageList = dto.getBoardImageList();
            List<ImageEntity> imageEntityList = new ArrayList<>();

            Stream<String> stream = boardImageList.stream();
            // # ImageEntity에 boardNumber, image를 인자로 받는 생성자 정의
            stream.forEach(img -> imageEntityList.add(new ImageEntity(saved.getBoardNumber(), img)));
            imageRepository.saveAll(imageEntityList);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();

        }

        return PostBoardResponseDto.success();
    }

    // * 게시물 조회
    @Override
    public ResponseEntity<? super GetBoardResponseDto> getBoard(Integer boardNumber) {

        GetBoardResultSet resultSet = null;
        List<ImageEntity> imageEntityList = new ArrayList<>();

        try {
            // ! 게시글 데이터 가져오기
            resultSet = boardRepository.getBoard(boardNumber);

            if (resultSet == null) return GetBoardResponseDto.noExistBoard();

            // ! 이미지 데이터 가져오기
            imageEntityList = imageRepository.findByBoardNumber(boardNumber);

            // ! 조회수 카운트업
            /*Optional<BoardEntity> ob = boardRepository.findByBoardNumber(boardNumber);
            if (ob.isEmpty()) return GetBoardResponseDto.noExistBoard();

            BoardEntity boardEntity = ob.get();
            boardEntity.boardViewCountUp();
            boardRepository.save(boardEntity);*/
            // # BoardRepository에서 Native Query로 UPDATE 쿼리문을 실행해도 O

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }

        return GetBoardResponseDto.success(resultSet, imageEntityList);
    }


    // * 게시물 삭제
    @Override
    public ResponseEntity<? super DeleteBoardResponseDto> deleteBoard(Integer boardNumber, String email) {

        try {

            // ! 게시물 확인
            Optional<BoardEntity> ob = boardRepository.findByBoardNumber(boardNumber);
            if (ob.isEmpty()) return DeleteBoardResponseDto.noExistBoard();

            // ! 유저 존재 여부 확인
            boolean existsEmail = userRepository.existsByEmail(email);
            if (!existsEmail) return DeleteBoardResponseDto.noExistUser();

            // ! 현재 게시물 작성자 - 인증된 유저 일치 여부 확인
            BoardEntity boardEntity = ob.get();
            if (!boardEntity.getWriterEmail().equals(email)) {
                return DeleteBoardResponseDto.noPermission();
            }

            // ! 게시물 및 관련 데이터 전부 삭제
            // TODO : JPA - 연관 관계 설정(@OneToMany 등) - cascade 옵션
            imageRepository.deleteByBoardNumber(boardNumber);
            favoriteRepository.deleteByBoardNumberAndUserEmail(boardNumber, email);
            commentRepository.deleteByBoardNumberAndUserEmail(boardNumber, email);
            boardRepository.delete(boardEntity);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return DeleteBoardResponseDto.success();
    }


    // * 게시물 수정
    @Override
    public ResponseEntity<? super PatchBoardResponseDto> patchBoard(PatchBoardRequestDto dto, Integer boardNumber, String email) {

        try {
            // ! 유저 존재 여부 확인
            boolean existsEmail = userRepository.existsByEmail(email);
            if (!existsEmail) return PatchBoardResponseDto.noExistUser();

            // ! 게시물 불러오기
            Optional<BoardEntity> ob = boardRepository.findByBoardNumber(boardNumber);
            if (ob.isEmpty()) return PatchBoardResponseDto.noExistBoard();

            BoardEntity boardEntity = ob.get();

            // ! 게시물 작성자-사용자 일치 여부 확인
            if (!boardEntity.getWriterEmail().equals(email)) {
                return PatchBoardResponseDto.noPermission();
            }

            // ! 게시물 수정
            // # title, content 수정 및 저장
            boardEntity.patchBoard(dto);
            boardRepository.save(boardEntity);

            // # 이미지 리스트 수정
            // 기존 이미지 리스트 삭제
            imageRepository.deleteByBoardNumber(boardNumber);
            List<String> boardImageList = dto.getBoardImageList();

            // 새로운 이미지 엔터티 리스트 생성 및 저장
            List<ImageEntity> imageEntityList = new ArrayList<>();

            boardImageList.forEach(boardImage -> {
                ImageEntity imageEntity = new ImageEntity(boardNumber, boardImage);
                imageEntityList.add(imageEntity);
            });
            imageRepository.saveAll(imageEntityList);





        } catch (Exception e) {
            e.printStackTrace();
            return PatchBoardResponseDto.databaseError();
        }
        return PatchBoardResponseDto.success();
    }

    // * 좋아요 기능
    @Override
    public ResponseEntity<? super PutFavoriteResponseDto> putFavorite(Integer boardNumber, String email) {

        FavoriteEntity favoriteEntity = null;

        try {
            // ! 유저 확인
            boolean userExists = userRepository.existsByEmail(email);
            if (!userExists) return PutFavoriteResponseDto.noExistUser();

            // ! 게시물 가져오기
            Optional<BoardEntity> ob = boardRepository.findByBoardNumber(boardNumber);
            if (ob.isEmpty()) return PutFavoriteResponseDto.noExistBoard();

            BoardEntity boardEntity = ob.get();

            // ! FavoriteEntity 가져오기 및 좋아요 기능 로직
            Optional<FavoriteEntity> of = favoriteRepository.findByBoardNumberAndUserEmail(boardNumber, email);
            if (of.isEmpty()) {
                favoriteEntity = new FavoriteEntity(email, boardNumber);
                favoriteRepository.save(favoriteEntity);
                boardEntity.favoriteCountUp();
            } else {
                favoriteEntity = of.get();
                favoriteRepository.delete(favoriteEntity);
                boardEntity.favoriteCountDown();
            }
            boardRepository.save(boardEntity);


        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }

        return PutFavoriteResponseDto.success();

    }

    // * 좋아요 리스트
    @Override
    public ResponseEntity<? super GetFavoriteListResponseDto> getFavoriteList(Integer boardNumber) {

        List<GetFavoriteListResultSet> resultSetList = new ArrayList<>();

        try {
            boolean boardExsits = boardRepository.existsByBoardNumber(boardNumber);
            if (!boardExsits) return GetFavoriteListResponseDto.noExsitBoard();

            resultSetList = boardRepository.getFavoriteList(boardNumber);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return GetFavoriteListResponseDto.success(resultSetList);
    }

    // * 댓글 작성
    @Override
    public ResponseEntity<? super PostCommentResponseDto> postComment(PostCommentRequestDto dto, Integer boardNumber, String email) {
        try {

            // ! 게시물
            Optional<BoardEntity> ob = boardRepository.findByBoardNumber(boardNumber);
            if (ob.isEmpty()) return PostCommentResponseDto.noExistBoard();

            // ! 댓글 수 카운트 업
            BoardEntity boardEntity = ob.get();
            boardEntity.commentViewCountUp();
            boardRepository.save(boardEntity);

            // ! 유저 확인
            boolean userExists = userRepository.existsByEmail(email);
            if (!userExists) return PostCommentResponseDto.noExsitUser();

            // ! Comment Entity 생성 및 DB 저장
            CommentEntity commentEntity = new CommentEntity(dto, boardNumber, email);
            commentRepository.save(commentEntity);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }

        return PostCommentResponseDto.success();
    }

    // * 댓글 리스트
    @Override
    public ResponseEntity<? super GetCommentListResponseDto> getCommentList(Integer boardNumber) {

        List<GetCommentListResultSet> commentListResultSets = new ArrayList<>();

        try {
            // ! 게시물 존재 여부 확인
            boolean existsBoard = boardRepository.existsByBoardNumber(boardNumber);
            if (!existsBoard) return GetCommentListResponseDto.noExistBoard();

            // ! 댓글 리스트 조회
            commentListResultSets = boardRepository.getCommentList(boardNumber);

        } catch (Exception e) {
            e.printStackTrace();
            return GetCommentListResponseDto.databaseError();
        }

        return GetCommentListResponseDto.success(commentListResultSets);

    }

    // * 조회수 카운트업
    @Override
    public ResponseEntity<? super ViewCountUpResponseDto> viewCountUp(Integer boardNumber) {
        try {
            Optional<BoardEntity> ob = boardRepository.findByBoardNumber(boardNumber);
            if (ob.isEmpty()) return ViewCountUpResponseDto.noExistBoard();

            BoardEntity boardEntity = ob.get();
            boardEntity.boardViewCountUp();
            boardRepository.save(boardEntity);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return ViewCountUpResponseDto.success();
    }

    // * 최신 게시물 리스트
    @Override
    public ResponseEntity<? super GetLatestBoardListResponseDto> getLatestBoardList() {

        List<BoardListViewEntity> boardListViewEntityList = new ArrayList<>();

        try {

            boardListViewEntityList = boardListViewRepository.findAllByOrderByWriteDatetimeDesc();

        } catch (Exception e) {
            e.printStackTrace();
            return GetLatestBoardListResponseDto.databaseError();
        }

        return GetLatestBoardListResponseDto.success(boardListViewEntityList);
    }

    // * 월간 TOP3 게시물 리스트
    @Override
    public ResponseEntity<? super GetTop3BoardListResponseDto> getTop3BoardList() {

        List<BoardListViewEntity> boardListViewEntityList = new ArrayList<>();

        try {
            // ! 주간 TOP3
            // # 현재 주의 월요일, 일요일
            /*SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
            Calendar calendar = Calendar.getInstance();
            calendar.set(Calendar.DAY_OF_WEEK, Calendar.MONDAY);
            String monday = simpleDateFormat.format(calendar.getTime());

            calendar.set(Calendar.DAY_OF_WEEK, Calendar.SUNDAY);
            calendar.add(Calendar.DATE, 7);
            String sunday = simpleDateFormat.format(calendar.getTime());

            boardListViewEntityList = boardListViewRepository.findTop3(monday, sunday);*/

            // ! 월간 TOP3
            // # 월초, 월말
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
            Calendar calendar = Calendar.getInstance();
            int minimum = calendar.getActualMinimum(Calendar.DAY_OF_MONTH);
            int maximum = calendar.getActualMaximum(Calendar.DAY_OF_MONTH);

            calendar.set(Calendar.DAY_OF_MONTH, minimum);
            String firstDay = simpleDateFormat.format(calendar.getTime());

            calendar.set(Calendar.DAY_OF_MONTH, maximum);
            String lastDay = simpleDateFormat.format(calendar.getTime());

            boardListViewEntityList = boardListViewRepository.findTop3(firstDay, lastDay);

        } catch (Exception e) {
            e.printStackTrace();
            return GetTop3BoardListResponseDto.databaseError();
        }

        return GetTop3BoardListResponseDto.success(boardListViewEntityList);
    }

    // * 검색 게시물 리스트
    @Override
    public ResponseEntity<? super GetSearchBoardListResponseDto> getSearchBoardList(String searchWord, String preSearchWord) {

        List<BoardListViewEntity> boardListViewEntityList = new ArrayList<>();

        try {

            boardListViewEntityList = boardListViewRepository.findByTitleContainsOrContentContainsOrderByWriteDatetimeDesc(searchWord, searchWord);

            // ! SearchLog
            // # SearchLog 엔터티 생성
            SearchLogEntity searchLogEntity = new SearchLogEntity(searchWord, preSearchWord, false);

            // # relation : 이전 검색어 존재 여부
            boolean relation = (preSearchWord != null);

            if (relation) {
                searchLogEntity = new SearchLogEntity(preSearchWord, searchWord, true);
            }
            searchLogRepository.save(searchLogEntity);

        } catch (Exception e) {
            e.printStackTrace();
            return GetSearchBoardListResponseDto.databaseError();
        }
        return GetSearchBoardListResponseDto.success(boardListViewEntityList);

    }

    @Override
    public ResponseEntity<? super GetUserBoardListResponseDto> getUserBoardList(String email) {

        List<BoardListViewEntity> boardListViewEntityList = new ArrayList<>();

        try {

            // ! 유저 확인
            boolean existsUser = userRepository.existsByEmail(email);
            if (!existsUser) return GetUserBoardListResponseDto.noExistUser();

            boardListViewEntityList = boardListViewRepository.findByWriterEmailOrderByWriteDatetimeDesc(email);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }

        return GetUserBoardListResponseDto.success(boardListViewEntityList);

    }


}
