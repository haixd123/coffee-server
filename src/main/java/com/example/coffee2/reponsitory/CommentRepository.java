package com.example.coffee2.reponsitory;

import com.example.coffee2.entity.CommentEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.parameters.P;

import java.util.Optional;

public interface CommentRepository extends JpaRepository<CommentEntity, Long> {

    Optional<CommentEntity> findByCommentId(Long commentId);

    Page<CommentEntity> findAllByStatus(Pageable pageable, long status);

    Page<CommentEntity> findAllByPostId(Pageable pageable, long postId);

    Page<CommentEntity> findAllByUserId(Pageable pageable, long userId);

    Long countByPostId(Long postId);
}
