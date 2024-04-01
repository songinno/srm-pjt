package com.srmpjt.boardback.repository.board;

import com.srmpjt.boardback.entity.board.BoardListViewEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BoardListViewRepository extends JpaRepository<BoardListViewEntity, Integer> {

    List<BoardListViewEntity> findAllByOrderByWriteDatetimeDesc();

    @Query(value = "" +
            "SELECT * FROM board_list_view " +
            "WHERE write_datetime BETWEEN :startDate AND :endDate " +
            "ORDER BY view_count DESC, favorite_count DESC, comment_count DESC " +
            "LIMIT 3"
    , nativeQuery = true)
    List<BoardListViewEntity> findTop3(@Param("startDate") String startDate, @Param("endDate") String endDate);

    List<BoardListViewEntity> findByTitleContainsOrContentContainsOrderByWriteDatetimeDesc(String title, String content);

    List<BoardListViewEntity> findByWriterEmailOrderByWriteDatetimeDesc(String email);
}
