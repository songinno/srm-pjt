package com.srmpjt.boardback.repository.board;

import com.srmpjt.boardback.entity.board.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, String> {
    boolean existsByEmail(String email);
    boolean existsByNickname(String nickname);
    boolean existsByTelNumber(String telNumber);
    Optional<UserEntity> findByEmail(String email);

    @Transactional
    void deleteByEmail(String email);
}
