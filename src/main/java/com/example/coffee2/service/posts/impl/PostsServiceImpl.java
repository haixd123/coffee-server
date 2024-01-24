package com.example.coffee2.service.posts.impl;

import com.example.coffee2.entity.CoffeeBeanEntity;
import com.example.coffee2.entity.CommentEntity;
import com.example.coffee2.entity.PostsEntity;
import com.example.coffee2.event.PostAcceptEvent;
import com.example.coffee2.event.PostDelineEvent;
import com.example.coffee2.event.PostHideEvent;
import com.example.coffee2.pusher.PostPusher;
import com.example.coffee2.reponsitory.PostsRepository;
import com.example.coffee2.request.PostsRequest;
import com.example.coffee2.response.PostsResponse;
import com.example.coffee2.reponsitory.Customer.PostsRespositoryCustomer;
import com.example.coffee2.response.base.ApiBaseResponse;
import com.example.coffee2.service.posts.PostsService;
import com.example.coffee2.utils.Constants;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
@Log4j2
public class PostsServiceImpl implements PostsService {
    @Autowired
    private PostsRespositoryCustomer postsRespositoryCustomer;

    @Autowired
    private PostPusher postPusher;
    @Autowired
    private PostsRepository repository;

    @Override
    public List<PostsResponse> getListPosts(PostsRequest request) {
        return postsRespositoryCustomer.getListPosts(request);
    }

    @Override
    public Long getCountListPosts(PostsRequest request) {
        return postsRespositoryCustomer.getCountListPosts(request);
    }

    @Override
    public Long getTotalPosts(PostsRequest request) {
        return postsRespositoryCustomer.getTotalPosts(request);
    }

    @Override
    public boolean create(PostsRequest request) {
        Date now = new Date();
        try {
            if (request.getStatus() != 2) {
                List<String> checkNameExist = repository.findByTitle(request.getTitle());
                if (checkNameExist.contains(request.getTitle())) {
                    log.error("create | Tài khoản đã tồn tại");
                    return false;
                }
            }
            PostsEntity obj = new PostsEntity();
            obj.setLike1(request.getLike1());
            obj.setComment(request.getComment());
            obj.setContentPost(request.getContentPost());
            obj.setContentDetail(request.getContentDetail());
            obj.setTitle(request.getTitle());
            obj.setStatus(request.getStatus());
            obj.setImagePath(request.getImagePath());
            obj.setUserId(request.getUserId());
            obj.setCreatedAt(now);
            obj.setUpdatedAt(null);
            obj.setCategory(request.getCategory());

            repository.save(obj);
            return true;
        } catch (Exception e) {
            log.info("not success: " + e.getMessage());
            return false;
        }
    }

    @Override
    public boolean update(PostsRequest request) {
        Date now = new Date();
        try {
            PostsEntity obj = repository.findById(request.getId()).orElse(null);
//            PostsEntity obj = repository.getPostsId(request.getId());
//            PostsEntity obj = repository.getPostsEntityByID(request.getId());
            PostsEntity checkNameExist = repository.getPostsName((request.getTitle()));
            if (checkNameExist != null && !Objects.equals(request.getId(), checkNameExist.getId())) {
                log.error("Loại cafe đã tồn tại!");
                return false;
            }
            obj.setLike1(request.getLike1());
            obj.setComment(request.getComment());
            obj.setContentPost(request.getContentPost());
            obj.setTitle(request.getTitle());
            obj.setStatus(request.getStatus());
            obj.setImagePath(request.getImagePath());
            obj.setUserId(request.getUserId());
//            obj.setCreatedAt(DateProc.stringToDateDDMMYYYY(request.getCreatedAt()));
            obj.setUpdatedAt(now);
//            obj.setTotalComment(request.getTotalComment());
            obj.setCategory(request.getCategory());
            obj.setReason_deline(request.getReasonDeline());
            repository.save(obj);
            if (request.getStatus() == Constants.POST_STATUS_DELINE) {
                PostDelineEvent.PostDelineReq postDelineReq = new PostDelineEvent.PostDelineReq();
                postDelineReq.setPostId(request.getId());
                postDelineReq.setReasonDeline(request.getReasonDeline());
                postPusher.postDelineEvent(postDelineReq);
            } else if (request.getStatus() == Constants.POST_STATUS_ACCEPT) {
                PostAcceptEvent.PostAcceptEventReq postAcceptEventReq = new PostAcceptEvent.PostAcceptEventReq();
                postAcceptEventReq.setPostId(request.getId());
                postPusher.postAcceptEvent(postAcceptEventReq);
            } else if (request.getStatus() == Constants.POST_STATUS_HIDE) {
                PostHideEvent.PostHideReq postHideReq = new PostHideEvent.PostHideReq();
                postHideReq.setPostId(request.getId());
                postPusher.postHideEvent(postHideReq);
            }
            return true;
        } catch (Exception e) {
            log.info("not success: " + e.getMessage());
            return false;
        }
    }

    @Override
    public boolean delete(PostsRequest request) {
        try {
            PostsEntity obj = repository.findById(request.getId()).orElse(null);
//            PostsEntity obj = repository.getPostsEntityByID(request.getId());
            if (obj == null) {
                log.error("delete | không tìm thấy bản ghi");
                return false;
            }
            obj.setStatus(-1L);
            repository.save(obj);
            return true;
        } catch (Exception e) {
            log.info("not success: " + e.getMessage());
            return false;
        }
    }

    @Override
    public boolean changeStatus(Long postId, Long status) {
        try {
            PostsEntity obj = repository.findById(postId).orElse(null);

            obj.setStatus(status);
            if (status == Constants.POST_STATUS_HIDE) {
                PostHideEvent.PostHideReq postHideReq = new PostHideEvent.PostHideReq();
                postHideReq.setPostId(obj.getId());
                postPusher.postHideEvent(postHideReq);
            }
            repository.save(obj);
            return true;
        } catch (Exception e) {
            log.error("error: " + e.getMessage());
            return false;
        }
    }

    @Override
    public ResponseEntity<?> getAllPostByStatus(Pageable pageable, long status) {
        return ApiBaseResponse.done("Success", repository.findAllByStatus(pageable, status));
    }

    @Override
    public ResponseEntity<?> getPostByTypeAndTime(Pageable pageable, String type, String time) {
        Page<PostsEntity> result = null;
        LocalDateTime endDate = LocalDateTime.now();
        LocalDateTime startDate = endDate;
        switch (time) {
            case "week":
                startDate = endDate.minusWeeks(1);
                break;
            case "month":
                startDate = endDate.minusMonths(1);
                break;
            case "year":
                startDate = endDate.minusYears(1);
                break;
        }
        List<PostsEntity> postsEntities = repository.findAllByCreatedAtBetweenOrderByLike1(startDate, endDate);
        switch (type) {
            case "comment":
                postsEntities.sort(Comparator.comparingLong(PostsEntity::getComment).reversed());
                break;
            case "rating":
                postsEntities.sort(Comparator.comparingLong(PostsEntity::getRating).reversed());
                break;
        }
        return ApiBaseResponse.done("Success", new PageImpl<>(postsEntities, pageable, postsEntities.size()));
    }

    @Override
    public ResponseEntity<?> getPostByAuthor(Pageable pageable, Long postId) {
        PostsEntity postsEntity = repository.findById(postId).orElse(null);
        if (postsEntity != null) {
            List<PostsEntity> postsEntities = repository.findAllByUserIdAndStatus(postsEntity.getUserId(), 1L);
            return ApiBaseResponse.done("Success", new PageImpl<>(postsEntities, pageable, postsEntities.size()));
        }
        return ApiBaseResponse.fail("Post null with id : " + postId);
    }
}
