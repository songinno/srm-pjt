package com.srmpjt.boardback.repository;

import com.srmpjt.boardback.entity.BoardEntity;
import com.srmpjt.boardback.repository.resultSet.GetBoardResultSet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardRepository extends JpaRepository<BoardEntity, Integer> {

    @Query(value = "select " +
            "board_number as boardNumber, " +
            "title, " +
            "content, " +
            "write_datetime as writeDatetime, " +
            "writer_email as writerEmail, " +
            "nickname as writerNickname, " +
            "profile_image as writerProfileImage " +
            "from board.board b " +
            "inner join board.user as u " +
            "on b.writer_email = u.email " +
            "where board_number = :boardNumber"
    , nativeQuery = true)
    GetBoardResultSet getBoard(@Param(value = "boardNumber") Integer boardNumber);

    BoardEntity findByBoardNumber(Integer boardNumber);

    boolean existsByBoardNumber(Integer boardNumber);
}
