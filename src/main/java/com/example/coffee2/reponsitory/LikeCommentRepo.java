package com.example.coffee2.reponsitory;

import com.example.coffee2.entity.LikeCommentEntity;
import com.example.coffee2.response.CommentPostResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LikeCommentRepo extends JpaRepository<LikeCommentEntity,Long> {

    Optional<LikeCommentEntity> findByPostIdAndCommentIdAndUserId(Long postId,Long commentId,Long userId);
}
