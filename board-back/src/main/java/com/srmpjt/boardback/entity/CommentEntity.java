package com.srmpjt.boardback.entity;

import com.srmpjt.boardback.dto.request.board.PostCommentRequestDto;
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
@Entity(name = "comment")
@Table(name = "comment")
public class CommentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int commentNumber;

    private String content;

    private String writeDatetime;

    private String userEmail;

    private int boardNumber;

    public CommentEntity(PostCommentRequestDto dto, Integer boardNumber, String email) {

        // ! 현재 시간 (format : yyyy-MM-dd HH:mm:ss)
        Date now = Date.from(Instant.now());
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String writeDatetime = simpleDateFormat.format(now);

        this.content = dto.getContent();
        this.writeDatetime = writeDatetime;
        this.userEmail = email;
        this.boardNumber = boardNumber;
    }
}
