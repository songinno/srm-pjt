package com.srmpjt.boardback.repository.statistics;

import com.srmpjt.boardback.entity.statistics.HourlyBoardViewCountStatisticsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HourlyBoardViewCountStatisticsRepository extends JpaRepository<HourlyBoardViewCountStatisticsEntity, Integer> {

    @Query(value = "" +
            "SELECT sequence, create_date, board_number, view_count " +
            "FROM (" +
                "SELECT board_number, ROW_NUMBER() over(PARTITION BY board_number ORDER BY create_date DESC) AS rn, view_count, create_date, sequence " +
                "FROM hourly_board_view_count_statistics hbvcs " +
                "ORDER BY view_count DESC, create_date DESC" +
            ") AS vi " +
            "WHERE vi.rn = 1"
            , nativeQuery = true)
    List<HourlyBoardViewCountStatisticsEntity> getPopularBoardList(
            @Param(value = "searchStartDate") String searchStartDate,
            @Param(value = "searchEndDate") String searchEndDate
    );
}
