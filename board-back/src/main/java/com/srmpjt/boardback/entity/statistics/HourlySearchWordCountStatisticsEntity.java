package com.srmpjt.boardback.entity.statistics;

import com.srmpjt.boardback.dto.object.StatisticsPopularSearchWordListItem;
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

    // ! Entity List를 DTO의 속성(List<SearchWordListItem>)으로 변환하는 메서드
    public static List<StatisticsPopularSearchWordListItem> getList(List<HourlySearchWordCountStatisticsEntity> statisticsEntityList) {
        List<StatisticsPopularSearchWordListItem> searchWordList = new ArrayList<>();

        statisticsEntityList.forEach(entity -> {
            StatisticsPopularSearchWordListItem statisticsPopularSearchWordListItem = new StatisticsPopularSearchWordListItem(
                    entity.getSequence(),
                    // TODO : 날짜 포맷 변환 필요
                    entity.getCreateDate().toString(),
                    entity.getSearchCount(),
                    entity.getSearchWord()
            );
            searchWordList.add(statisticsPopularSearchWordListItem);
        });

        return searchWordList;
    }
}
