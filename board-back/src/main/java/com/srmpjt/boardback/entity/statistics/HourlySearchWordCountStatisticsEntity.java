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
@Entity(name = "hourly_search_word_count_statistics")
@Table(name = "hourly_search_word_count_statistics")
public class HourlySearchWordCountStatisticsEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int sequence;

    private String searchWord;

    private int searchCount;

    @CreationTimestamp
    private LocalDateTime createDate;

    public HourlySearchWordCountStatisticsEntity(String searchWord, int searchCount) {
        this.searchWord = searchWord;
        this.searchCount = searchCount;
    }
}
