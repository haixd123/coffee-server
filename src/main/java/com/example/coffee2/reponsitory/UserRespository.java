package com.example.coffee2.reponsitory;

import com.example.coffee2.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Optional;

@EnableJpaRepositories
@Repository
public interface UserRespository extends JpaRepository<UserEntity, Long> {
    @Query(
            value = "SELECT * FROM user1",
            nativeQuery = true
    )
    List<UserEntity> findAllUser();

    List<UserEntity> findByUserName(@RequestParam String userName);

    Optional<UserEntity> findByName(String name);

    @Query(
            value = "select user_name from user1",
            nativeQuery = true
    )
    List<String> findAllUserName();

    Optional<UserEntity> findById(Long id);

    Optional<UserEntity> findByEmail(String email);

    Optional<UserEntity> findByUserNameAndStatus(String username, Long status);
}
