package com.srmpjt.boardback.repository;

import com.srmpjt.boardback.entity.ImageEntity;
import com.srmpjt.boardback.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImageRepository extends JpaRepository<ImageEntity, Integer> {
    // ! 게시글 번호로 이미지 엔터티 가져오기
    List<ImageEntity> findByBoardNumber(Integer boardNumber);
}
