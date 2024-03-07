package com.srmpjt.boardback.service.implement;

import com.srmpjt.boardback.dto.request.board.PostBoardRequestDto;
import com.srmpjt.boardback.dto.response.ResponseDto;
import com.srmpjt.boardback.dto.response.board.PostBoardResponseDto;
import com.srmpjt.boardback.entity.BoardEntity;
import com.srmpjt.boardback.entity.ImageEntity;
import com.srmpjt.boardback.repository.BoardRepository;
import com.srmpjt.boardback.repository.ImageRepository;
import com.srmpjt.boardback.repository.UserRepository;
import com.srmpjt.boardback.service.BoardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
@Slf4j
public class BoardServiceImpl implements BoardService {

    private final UserRepository userRepository;

    private final BoardRepository boardRepository;

    private final ImageRepository imageRepository;

    @Override
    public ResponseEntity<? super PostBoardResponseDto> postBoard(PostBoardRequestDto dto, String email) {
        try {
            // * 유저 존재 여부 확인
            boolean userExists = userRepository.existsByEmail(email);
            if (!userExists) return PostBoardResponseDto.noExistUser();

            // * Board 엔티티 생성 및 DB 저장
            // ! BoardEntity에 dto, email을 인자로 받는 생성자를 정의해서 처리
            BoardEntity boardEntity = new BoardEntity(dto, email);
            BoardEntity saved = boardRepository.save(boardEntity);
            log.info("boardEntity`s boardNumber = " + boardEntity.getBoardNumber());
            log.info("saved`s boardNumber = " + saved.getBoardNumber());


            // * 첨부 이미지 엔티티 생성 및 DB 저장
            List<String> boardImageList = dto.getBoardImageList();
            List<ImageEntity> imageEntityList = new ArrayList<>();

            Stream<String> stream = boardImageList.stream();
            // ! ImageEntity에 boardNumber, image를 인자로 받는 생성자 정의
            stream.forEach(img -> imageEntityList.add(new ImageEntity(saved.getBoardNumber(), img)));
            imageRepository.saveAll(imageEntityList);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();

        }

        return PostBoardResponseDto.success();
    }
}
