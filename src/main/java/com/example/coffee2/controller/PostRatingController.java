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
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/authors/post-rating")
public class PostRatingController {

    private final PostRatingRepository postRatingRepository;

    private final PostsRepository postsRepository;

    @PostMapping(value = "/getListRating")
//    public ResponseEntity<?> getListRating(@RequestParam("userId") Long userId) {
    public ResponseEntity<?> getListRating(@RequestBody PostRatingRequest request) {
        List<PostRating> listResult = postRatingRepository.findAllByUserId(request.getUserId());
        return ApiBaseResponse.done("get Rating Success", listResult);
    }

    @PostMapping()
    public ResponseEntity<?> ratePost(@RequestBody PostRatingRequest request) {
        try {
            PostsEntity postsEntity = postsRepository.findById(request.getPostId()).orElse(null);
            if (postsEntity == null) {
                return ApiBaseResponse.fail("Không tìm thấy bài viết trên hệ thống");
            }
            PostRating postRating = postRatingRepository.findByPostIdAndUserId(request.getPostId(), request.getUserId()).orElse(null);
            if (postRating != null) {
                postRating.setRating(request.getRating());
                postRatingRepository.save(postRating);
            } else {
                PostRating obj = new PostRating();
                obj.setPostId(request.getPostId());
                obj.setUserId(request.getUserId());
                obj.setRating(request.getRating());
//                postRating = new ModelMapper().map(request, PostRating.class);
                postRatingRepository.save(obj);
            }
            // process to calc post rating
            List<PostRating> postRatings = postRatingRepository.findAllByPostId(request.getPostId());
            float totalRating = 0;
            for (PostRating postRating1 : postRatings) {
                totalRating += postRating1.getRating();
            }
            float rate = totalRating / postRatings.size();
            postsEntity.setRating(rate);
            postsRepository.save(postsEntity);
            return ApiBaseResponse.done("Rating success", postRating);
        } catch (Exception e) {
            return ApiBaseResponse.fail(e.getMessage());
        }
    }

}
