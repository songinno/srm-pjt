package com.srmpjt.boardback.repository;

import com.srmpjt.boardback.entity.BoardEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardRepository extends JpaRepository<BoardEntity, Integer> {
}
