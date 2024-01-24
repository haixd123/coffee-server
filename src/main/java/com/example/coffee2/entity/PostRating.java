package com.example.coffee2.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "post_ratings")
@Data
public class PostRating {

    @javax.persistence.Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    private Long userId;
    private Long postId;

    private Float rating;
}
