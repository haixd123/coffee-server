package com.example.coffee2.reponsitory.Customer;

import com.example.coffee2.request.CommentRequest;
import com.example.coffee2.request.LikeCommentRequest;
import com.example.coffee2.request.LikePostsRequest;
import com.example.coffee2.response.CommentPostResponse;
import com.example.coffee2.response.CommentResponse;
import com.example.coffee2.response.LikeCommentResponse;
import com.example.coffee2.response.LikePostsResponse;

import java.util.List;

public interface CommentCustomer {

    List<LikeCommentResponse> getListLikeComment(LikeCommentRequest request);

    List<CommentResponse> getListComment(CommentRequest request);

    Long getCountListComment(CommentRequest request);

    Long getTotalCommentPosts(CommentRequest request);

    List<CommentPostResponse> getCommentPost(CommentRequest request);
}
