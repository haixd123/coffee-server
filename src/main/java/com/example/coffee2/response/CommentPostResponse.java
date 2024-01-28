package com.example.coffee2.response;

import lombok.Data;

@Data
public class CommentPostResponse {
    private Long commentId;
    private String commentText;
    private String username;
    private String avatarUser;
    private Long userLiked;
    private String createAt;
    private String updateAt;
    private Long amountLike;
    private Long status;
}
