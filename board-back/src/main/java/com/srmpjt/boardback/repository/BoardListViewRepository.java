package com.srmpjt.boardback.repository;

import com.srmpjt.boardback.entity.BoardListViewEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardListViewRepository extends JpaRepository<BoardListViewEntity, Integer> {

}
