package com.example.coffee2.controller;

import com.example.coffee2.entity.PostRating;
import com.example.coffee2.entity.PostsEntity;
import com.example.coffee2.reponsitory.PostRatingRepository;
import com.example.coffee2.reponsitory.PostsRepository;
import com.example.coffee2.request.PostRatingRequest;
import com.example.coffee2.response.base.ApiBaseResponse;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/authors/post-rating")
public class PostRatingController {

    private final PostRatingRepository postRatingRepository;

    private final PostsRepository postsRepository;

    @PostMapping()
    public ResponseEntity<?> ratePost(PostRatingRequest request) {
        try {
            PostsEntity postsEntity = postsRepository.findById(request.getPostId()).orElse(null);
            if (postsEntity == null) {
                return ApiBaseResponse.fail("Không tìm thấy bài viết trên hệ thống");
            }
            PostRating postRating = postRatingRepository.findByPostIdAndUserId(request.getPostId(), request.getUserId()).orElse(null);
            if (postRating != null) {
                postRating.setRating(request.getRating());
            } else {
                postRating = new ModelMapper().map(request, PostRating.class);
            }
            postRatingRepository.save(postRating);
            // process to calc post rating
            List<PostRating> postRatings = postRatingRepository.findAllByPostId(request.getPostId());
            int totalRating = 0;
            for (PostRating postRating1 : postRatings) {
                totalRating += postRating1.getRating();
            }
            int rate = totalRating / 5;
            postsEntity.setRating(rate);
            postsRepository.save(postsEntity);
            return ApiBaseResponse.done("Rating success", postRating);
        } catch (Exception e) {
            return ApiBaseResponse.fail(e.getMessage());
        }
    }

}
