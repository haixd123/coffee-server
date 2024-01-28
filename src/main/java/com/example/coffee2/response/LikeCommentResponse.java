package com.example.coffee2.response;

import lombok.Data;

@Data
public class LikeCommentResponse {
    private String lcCommentId;
    private String LcUserId;
//    private String commentId;
    private String userId;
    private String postId;
    private String contentText;
    private String createAt;
    private String likeComment;
    private String name;
    private String userName;
    private String image;
}
