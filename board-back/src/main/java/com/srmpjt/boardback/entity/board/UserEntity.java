package com.srmpjt.boardback.entity.board;

import com.srmpjt.boardback.dto.request.auth.SignUpRequestDto;
import lombok.*;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
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

    private boolean agreedPersonal;

    // ! 회원 가입을 위한 생성자
    public UserEntity(SignUpRequestDto dto) {
        this.email = dto.getEmail();
        this.password = dto.getPassword();
        this.nickname = dto.getNickname();
        this.telNumber = dto.getTelNumber();
        this.address = dto.getAddress();
        this.addressDetail = dto.getAddressDetail();
        this.agreedPersonal = dto.getAgreedPersonal();
    }

    // ! 닉네임 수정 메서드
    public void updateNickname(String nickname) {
        this.nickname = nickname;
    }

    // ! 프로필 이미지 수정 메서드
    public void updateProfileImage(String profileImage) {
        this.profileImage = profileImage;
    }
}
