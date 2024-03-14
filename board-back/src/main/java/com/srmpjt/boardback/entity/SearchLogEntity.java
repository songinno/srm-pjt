package com.srmpjt.boardback.entity;

import com.srmpjt.boardback.repository.resultSet.GetPopularListResultSet;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Entity(name = "search_log")
@Table(name = "search_log")
public class SearchLogEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int sequence;

    private String searchWord;

    private String relation_word;

    private boolean relation;
}
