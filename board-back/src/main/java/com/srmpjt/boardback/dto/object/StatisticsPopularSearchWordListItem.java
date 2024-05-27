package com.srmpjt.boardback.dto.object;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class StatisticsPopularSearchWordListItem {
    private int sequence;
    private String createDate;
    private int searchCount;
    private String searchWord;
}
