package com.srmpjt.boardback.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "user")
@Table(name = "user") // Database의 user 테이블과 매핑
public class UserEntity {

    @Id /* PK */
    private String email;

    private String password;

    private String nickname;

    private String telNumber;

    private String address;

    private String addressDetail;

    private String profileImage;
}
