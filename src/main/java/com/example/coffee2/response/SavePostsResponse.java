package com.example.coffee2.response;

import lombok.Data;
@Data
public class SavePostsResponse {
    private Long id;
    private Long userId;
    private Long postId;
    private Long isSave;
    private String title;
    private String createAt;
    private String category;
    private String contentPost;
    private String image;
}
