package com.srmpjt.boardback.repository;

import com.srmpjt.boardback.entity.ImageEntity;
import com.srmpjt.boardback.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageRepository extends JpaRepository<ImageEntity, Integer> {

}
