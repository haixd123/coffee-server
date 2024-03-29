package com.example.coffee2.service.posts;

import com.example.coffee2.request.PostsRequest;
import com.example.coffee2.response.PostsResponse;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.List;

public interface PostsService {
    List<PostsResponse> getListPosts(PostsRequest request);

    Long getCountListPosts(PostsRequest request);

    Long getTotalPosts(PostsRequest request);

    boolean create(PostsRequest request);

    boolean update(PostsRequest request);

    boolean delete(PostsRequest request);

    boolean changeStatus(Long postId, Long status);

    ResponseEntity<?> getAllPostByStatus(Pageable pageable, long status);

    ResponseEntity<?> getPostByTypeAndTime(Pageable pageable, String type, String time);

    ResponseEntity<?> getPostByAuthor(Pageable pageable, Long postId);
}
