package com.srmpjt.boardback.dto.object;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class StatisticsPopularBoardListItem {
    private int sequence;
    private String createDate;
    private int boardNumber;
    private int viewCount;
    private String boardTitle;
}
