package com.example.coffee2.request;

import lombok.Data;

@Data
public class PostsRequest {
    private Long id;
    private Long like1;
    private Long share;
    private Long comment;
    private String title;
    private String contentPost;
    private String contentDetail;
    private Long status;
    private String imagePath;
    private Long userId;
    private String createdAt;
    private String updatedAt;
    private String category;
    private int sortLikeDown;
    private int sortLikeUp;
    private int sortCommentDown;
    private int sortCommentUp;
    private float rating;

    private String reasonDeline;
    private int pageIndex;
    private int pageSize;
}
