package com.srmpjt.boardback.repository.statistics;

import com.srmpjt.boardback.entity.statistics.HourlySearchWordCountStatisticsEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HourlySearchWordCountStatisticsRepository extends JpaRepository<HourlySearchWordCountStatisticsEntity, Integer> {

}
