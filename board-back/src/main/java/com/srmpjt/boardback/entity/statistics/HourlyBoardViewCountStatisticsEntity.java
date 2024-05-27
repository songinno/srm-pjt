package com.srmpjt.boardback.entity.statistics;

import com.srmpjt.boardback.dto.object.StatisticsPopularBoardListItem;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Entity(name = "hourly_board_view_count_statistics")
@Table(name = "hourly_board_view_count_statistics")
public class HourlyBoardViewCountStatisticsEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int sequence;

    private int boardNumber;

    private int viewCount;

    @CreationTimestamp
    private LocalDateTime createDate;

    public HourlyBoardViewCountStatisticsEntity(int boardNumber, int viewCount) {
        this.boardNumber = boardNumber;
        this.viewCount = viewCount;
    }

    // * Entity -> DTO`s property
    public static List<StatisticsPopularBoardListItem> getList(List<HourlyBoardViewCountStatisticsEntity> statisticsEntityList) {
        List<StatisticsPopularBoardListItem> statisticsPopularBoardList = new ArrayList<>();
        statisticsEntityList.forEach(entity -> {
            StatisticsPopularBoardListItem statisticsPopularBoardListItem = new StatisticsPopularBoardListItem(
                    entity.getSequence(),
                    entity.getCreateDate().toString(),
                    entity.boardNumber,
                    entity.viewCount,
                    entity.boardTitle
            );
            statisticsPopularBoardList.add(statisticsPopularBoardListItem);
        });
        return statisticsPopularBoardList;
    }
}
