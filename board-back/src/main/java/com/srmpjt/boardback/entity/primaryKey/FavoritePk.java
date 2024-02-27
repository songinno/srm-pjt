package com.srmpjt.boardback.entity.primaryKey;

import lombok.*;

import javax.persistence.Column;
import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class FavoritePk implements Serializable {
    @Column(name = "user_email")
    private String userEmail;

    @Column(name = "board_number")
    private int boardNumber;
}
