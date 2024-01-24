package com.example.coffee2.request;

import lombok.Data;

@Data
public class PostRatingRequest {
    private Long postId;
    private Long userId;
    private Float rating;
}
