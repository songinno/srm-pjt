package com.srmpjt.boardback.repository.board;

import com.srmpjt.boardback.entity.board.FavoriteEntity;
import com.srmpjt.boardback.entity.primaryKey.FavoritePk;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Optional;

@Repository
public interface FavoriteRepository extends JpaRepository<FavoriteEntity, FavoritePk> {

    Optional<FavoriteEntity> findByBoardNumberAndUserEmail(Integer boardNumber, String email);

    @Transactional
    void deleteByBoardNumberAndUserEmail(Integer boardNumber, String email);

}
