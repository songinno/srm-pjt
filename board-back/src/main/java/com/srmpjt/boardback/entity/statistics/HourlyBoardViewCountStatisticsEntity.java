package com.srmpjt.boardback.entity.statistics;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

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
}
