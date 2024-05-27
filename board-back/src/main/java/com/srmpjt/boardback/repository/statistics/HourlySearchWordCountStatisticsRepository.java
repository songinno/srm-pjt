package com.srmpjt.boardback.repository.statistics;

import com.srmpjt.boardback.entity.statistics.HourlySearchWordCountStatisticsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HourlySearchWordCountStatisticsRepository extends JpaRepository<HourlySearchWordCountStatisticsEntity, Integer> {
    @Query(value = "" +
            "SELECT sequence, create_date, search_word, search_count " +
            "FROM (" +
                "SELECT search_word, ROW_NUMBER() OVER(PARTITION BY search_word ORDER BY create_date DESC) AS rn, search_count, create_date, sequence " +
                "FROM hourly_search_word_count_statistics hswcs " +
                "ORDER BY search_count DESC, create_date desc" +
            ") AS vi " +
            "WHERE vi.rn = 1"
            , nativeQuery = true)
    List<HourlySearchWordCountStatisticsEntity> getPopularSearchWordList
            (
                @Param(value = "searchStartDate") String searchStartDate,
                @Param(value = "searchEndDate") String searchEndDate
            );
}
