package com.example.coffee2.service.comment;

import com.example.coffee2.entity.CommentEntity;
import com.example.coffee2.request.CommentRequest;
import com.example.coffee2.response.CommentPostResponse;
import com.example.coffee2.response.CommentResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface CommentService {
    List<CommentResponse> getListComment(CommentRequest request);

    Long getCountListComment(CommentRequest request);

    Long getTotalCommentPosts(CommentRequest request);

    boolean create(CommentRequest request);

    boolean update(CommentRequest request);

    boolean delete(CommentRequest request);

    List<CommentPostResponse> getAllCommentPost(CommentRequest commentRequest);

    boolean updateLikeComment(CommentRequest commentRequest);

    boolean changeStatus(Long id,Long status);
    CommentEntity getById(Long commentId);

    ResponseEntity<?> getCommentByStatus(Pageable pageable, long status);

    ResponseEntity<?> getCommentByContent(Pageable pageable, String text);

    ResponseEntity<?> getCommentByPostId(Pageable pageable, long postId, long status);

    ResponseEntity<?> getCommentByUserId(Pageable pageable, long userId, long status);

}
