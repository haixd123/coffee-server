package com.example.coffee2.reponsitory;

import com.example.coffee2.entity.PostRating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRatingRepository extends JpaRepository<PostRating, Long> {
    List<PostRating> findAllByPostId(Long postId);
}
