package com.example.coffee2.service.posts.impl;

import com.example.coffee2.entity.CoffeeBeanEntity;
import com.example.coffee2.entity.PostsEntity;
import com.example.coffee2.entity.Report;
import com.example.coffee2.event.PostAcceptEvent;
import com.example.coffee2.event.PostDelineEvent;
import com.example.coffee2.event.PostHideEvent;
import com.example.coffee2.pusher.PostPusher;
import com.example.coffee2.reponsitory.PostsRepository;
import com.example.coffee2.reponsitory.ReportRepository;
import com.example.coffee2.request.LikePostsRequest;
import com.example.coffee2.request.PostsRequest;
import com.example.coffee2.response.PostsResponse;
import com.example.coffee2.reponsitory.Customer.PostsRespositoryCustomer;
import com.example.coffee2.response.base.ApiBaseResponse;
import com.example.coffee2.service.posts.PostsService;
import com.example.coffee2.utils.Constants;
import com.example.coffee2.utils.DateProc;
import lombok.extern.java.Log;
import lombok.extern.log4j.Log4j2;
import org.apache.commons.lang3.RandomUtils;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@Log4j2
public class PostsServiceImpl implements PostsService {
    @Autowired
    private PostsRespositoryCustomer postsRespositoryCustomer;

    private ReportRepository reportRepository;
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
            List<String> checkNameExist = repository.findByTitle(request.getTitle());

            if (checkNameExist.contains(request.getTitle())) {
                log.error("create | Tài khoản đã tồn tại");
                return false;
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
            obj.setReason_deline(request.getReason_deline());
            repository.save(obj);
            if (request.getStatus() == Constants.POST_STATUS_DELINE) {
                PostDelineEvent.PostDelineReq postDelineReq = new PostDelineEvent.PostDelineReq();
                postDelineReq.setPostId(request.getId());
                postDelineReq.setReasonDeline(request.getReason_deline());
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
            List<Report> reports = reportRepository.findAllByDataReportId(request.getId());
            reportRepository.deleteAll(reports);
            obj.setStatus(-1L);
            repository.save(obj);
            return true;
        } catch (Exception e) {
            log.info("not success: " + e.getMessage());
            return false;
        }
    }

    @Override
    public ResponseEntity<?> getAllPostByStatus(Pageable pageable, long status) {
        Page<PostsEntity> postsEntities = repository.findAllByStatus(pageable, status);
        Page<PostsResponse> postsResponses = new PageImpl<>(mapTo(postsEntities), pageable, postsEntities.getTotalElements());
        return ApiBaseResponse.done("Success", postsResponses);
    }

    public List<PostsResponse> mapTo(Page<PostsEntity> postsEntities) {
        return postsEntities.getContent().stream().map((p) -> new ModelMapper().map(p, PostsResponse.class)).collect(Collectors.toList());
    }
}
