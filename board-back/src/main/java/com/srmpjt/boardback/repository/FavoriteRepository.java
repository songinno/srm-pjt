package com.srmpjt.boardback.repository;

import com.srmpjt.boardback.entity.FavoriteEntity;
import com.srmpjt.boardback.entity.UserEntity;
import com.srmpjt.boardback.entity.primaryKey.FavoritePk;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FavoriteRepository extends JpaRepository<FavoriteEntity, FavoritePk> {

}
