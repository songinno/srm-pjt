package com.srmpjt.boardback.repository;

import com.srmpjt.boardback.entity.SearchLogEntity;
import com.srmpjt.boardback.entity.UserEntity;
import com.srmpjt.boardback.repository.resultSet.GetPopularListResultSet;
import com.srmpjt.boardback.repository.resultSet.GetRelationListResultSet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SearchLogRepository extends JpaRepository<SearchLogEntity, Integer> {

    @Query(value = "" +
        "SELECT " +
            "search_word AS searchWord, " +
            "count(search_word) AS count " +
        "FROM search_log " +
        "GROUP BY search_word " +
        "ORDER BY count DESC " +
        "LIMIT 15"
    , nativeQuery = true)
    List<GetPopularListResultSet> getPopularList();

    @Query(value = "" +
        "SELECT relation_word as searchWord, count(relation_word) AS count " +
        "FROM search_log " +
        "WHERE search_word = :searchWord " +
        "AND relation_word IS NOT NULL " +
        "GROUP BY relation_word " +
        "ORDER BY count DESC " +
        "LIMIT 15"
    , nativeQuery = true)
    List<GetRelationListResultSet> getRelationList(@Param(value = "searchWord") String searchWord);
}
