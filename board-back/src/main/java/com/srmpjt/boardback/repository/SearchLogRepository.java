package com.srmpjt.boardback.repository;

import com.srmpjt.boardback.entity.SearchLogEntity;
import com.srmpjt.boardback.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SearchLogRepository extends JpaRepository<SearchLogEntity, Integer> {

}
