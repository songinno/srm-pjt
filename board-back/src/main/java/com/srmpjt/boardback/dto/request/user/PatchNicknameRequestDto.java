package com.srmpjt.boardback.dto.request.user;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@NoArgsConstructor
public class PatchNicknameRequestDto {

    @NotBlank
    private String nickname;

}
