package com.srmpjt.boardback.repository.board;

import com.srmpjt.boardback.entity.board.BoardEntity;
import com.srmpjt.boardback.repository.resultSet.GetBoardResultSet;
import com.srmpjt.boardback.repository.resultSet.GetCommentListResultSet;
import com.srmpjt.boardback.repository.resultSet.GetFavoriteListResultSet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

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

    Optional<BoardEntity> findByBoardNumber(Integer boardNumber);

    boolean existsByBoardNumber(Integer boardNumber);

    // TODO : 테이블 관계 매핑, @JoinColumn 이용해보기
    @Query(value = "" +
            "SELECT " +
            "user_email as email, " +
            "nickname, " +
            "profile_image as profileImage " +
            "from favorite f " +
            "inner join user u on f.user_email = u.email " +
            "where board_number = :boardNumber"
    , nativeQuery = true)
    List<GetFavoriteListResultSet> getFavoriteList(@Param(value = "boardNumber") Integer boardNumber);

    @Query(value = "" +
            "SELECT " +
                "u.nickname, " +
                "u.profile_image as profileImage, " +
                "c.write_datetime as writeDatetime, " +
                "c.content " +
            "from comment c " +
            "inner join  user u " +
            "on c.user_email  = u.email " +
            "where board_number = :boardNumber " +
            "order by write_datetime desc"
    , nativeQuery = true)
    List<GetCommentListResultSet> getCommentList(@Param(value = "boardNumber") Integer boardNumber);
}
