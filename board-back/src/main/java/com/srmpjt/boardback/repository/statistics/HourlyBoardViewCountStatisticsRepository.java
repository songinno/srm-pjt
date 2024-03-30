package com.srmpjt.boardback.repository.statistics;

import com.srmpjt.boardback.entity.statistics.HourlyBoardViewCountStatisticsEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HourlyBoardViewCountStatisticsRepository extends JpaRepository<HourlyBoardViewCountStatisticsEntity, Integer> {

}
