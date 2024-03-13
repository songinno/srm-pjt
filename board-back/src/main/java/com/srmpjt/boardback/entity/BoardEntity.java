package com.srmpjt.boardback.entity;

import com.srmpjt.boardback.dto.request.board.PatchBoardRequestDto;
import com.srmpjt.boardback.dto.request.board.PostBoardRequestDto;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.util.Date;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Entity(name = "board")
@Table(name = "board")
public class BoardEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int boardNumber;

    private String title;

    private String content;

    private String writeDatetime;

    private int favoriteCount;

    private int commentCount;

    private int viewCount;

    private String writerEmail;

    // * BoardServiceImpl - 게시글 작성을 위한 생성자
    public BoardEntity(PostBoardRequestDto dto, String email) {
        // ! 현재 시간 (format : yyyy-MM-dd HH:mm:ss)
        Date now = Date.from(Instant.now());
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String writeDatetime = simpleDateFormat.format(now);

        this.title = dto.getTitle();
        this.content = dto.getContent();
        this.writeDatetime = writeDatetime;
        this.favoriteCount = 0;
        this.commentCount = 0;
        this.viewCount = 0;
        this.writerEmail = email;
    }

    // * 조회수 카운트업 메서드
    public void boardViewCountUp() {
        this.viewCount++;
    }

    // * 좋아요 수 카운트 업 메서드
    public void favoriteCountUp() {
        this.favoriteCount++;
    }

    // * 좋아요 수 카운트 다운 메서드
    public void favoriteCountDown() {
        this.favoriteCount--;
    }

    // * 댓글 수 카운트 업 메서드
    public void commentViewCountUp() {
        this.commentCount++;
    }

    // * 게시물 Title, Content 수정 메서드
    public void patchBoard(PatchBoardRequestDto dto) {
        this.title = dto.getTitle();
        this.content = dto.getContent();
    }

}
