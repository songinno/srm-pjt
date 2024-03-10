package com.srmpjt.boardback.dto.request.board;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@NoArgsConstructor
public class PostCommentRequestDto {

    @NotBlank
    private String comment;
}
