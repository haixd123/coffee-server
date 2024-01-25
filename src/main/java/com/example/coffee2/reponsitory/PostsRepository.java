package com.example.coffee2.reponsitory;

import com.example.coffee2.entity.PostsEntity;
import com.example.coffee2.response.PostsResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.web.bind.annotation.RequestParam;

import javax.swing.text.html.Option;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface PostsRepository extends JpaRepository<PostsEntity, Long> {
    @Query(
            value = "SELECT * FROM posts",
            nativeQuery = true
    )
    List<PostsEntity> findAllPosts();

    List<PostsEntity> findAllByCreatedAtBetweenOrderByLike1(Date start, Date end);

    List<PostsEntity> findAllByUserIdAndStatus(Long userId, Long status);

    Page<PostsEntity> findAllByStatus(Pageable pageable,Long status);
    @Query(
            value = "SELECT top 5 * FROM posts ORDER BY total_like DESC",
            nativeQuery = true
    )
    List<PostsEntity> findLikePost();

    @Query(
            value = "SELECT top 5 * FROM posts ORDER BY total_comment DESC",
            nativeQuery = true
    )
    List<PostsEntity> findCommentPost();

    @Query(
            value = "select e.title from posts e where e.title = :title",
            nativeQuery = true
    )
    List<String> findByTitle(@RequestParam String title);

    @Query(
            value = "select DISTINCT category from posts where category is not null",
            nativeQuery = true
    )
    List<String> getListCategory();

    @Query(
            value = "select e.* from posts e where e.title = :title",
            nativeQuery = true
    )
    PostsEntity getPostsName(String title);

    Page<PostsEntity> findAllByStatus(Pageable pageable, long status);

    Optional<PostsEntity> findByIdAndStatus(Long postId, Long status);

    Optional<PostsEntity> findById(Long postId);
}
