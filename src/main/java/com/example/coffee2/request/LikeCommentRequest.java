package com.example.coffee2.request;

import lombok.Data;

import javax.persistence.Column;

@Data
public class LikeCommentRequest {
    private String id;
    private String commentId;
    private String userId;
    private String isLikeComment;
    private String postId;
}
