package com.example.coffee2.response;

import lombok.Data;

@Data
public class LikeCommentResponse {
    private Long lcCommentId;
    private Long lcUserId;
    private Long commentId;
    private Long userId;
    private Long postId;
    private String contentText;
    private String createAt;
}
