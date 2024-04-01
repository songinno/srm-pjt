package com.srmpjt.boardback.repository.board;

import com.srmpjt.boardback.entity.board.CommentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
public interface CommentRepository extends JpaRepository<CommentEntity, Integer> {

    @Transactional
    void deleteByBoardNumberAndUserEmail(Integer boardNumber, String email);
}
