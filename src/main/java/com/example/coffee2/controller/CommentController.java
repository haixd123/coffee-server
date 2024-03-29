package com.example.coffee2.controller;

import com.example.coffee2.entity.CommentEntity;
import com.example.coffee2.entity.UserEntity;
import com.example.coffee2.pusher.UserCommentPusher;
import com.example.coffee2.request.*;
import com.example.coffee2.response.CommentPostResponse;
import com.example.coffee2.response.CommentResponse;
import com.example.coffee2.response.LikeCommentResponse;
import com.example.coffee2.response.base.ApiBaseResponse;
import com.example.coffee2.service.author.JwtService;
import com.example.coffee2.service.comment.CommentService;
import com.example.coffee2.service.user.UserService;
import com.example.coffee2.utils.Constants;
import com.example.coffee2.utils.MemoriesStorage;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Log4j2
//@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(path = "api")
public class CommentController {
    @Autowired
    private CommentService commentService;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserService userService;

    @Autowired
    private UserCommentPusher userCommentPusher;


    @PostMapping("/authors/comment/findTotalLikeCommentByPost1")
    public ApiBaseResponse getListEquipment(@RequestBody LikeCommentRequest request) {
        List<LikeCommentResponse> listResult = commentService.getListLikeComment(request);
//        Long count = equipmentService.getCountListEquipment(request);
        ApiBaseResponse apiBaseResponse = new ApiBaseResponse();
        apiBaseResponse.setData(listResult);
//        apiBaseResponse.setOptional(count);
        return apiBaseResponse;
    }

    @PostMapping("/authors/comment/searchTotalCommentPost")
    public ApiBaseResponse getTotalLikePost(@RequestBody CommentRequest request) {
        Long count = commentService.getTotalCommentPosts(request);
        log.info("count: " + count);
        ApiBaseResponse apiBaseResponse = new ApiBaseResponse();
        apiBaseResponse.setOptional(count);
        return apiBaseResponse;
    }

    @PostMapping("/authors/comment/search") // cái này dc goi là endpoint
    public ApiBaseResponse getListLikePosts(@RequestBody CommentRequest request) {
        List<CommentResponse> listResult = commentService.getListComment(request);
        Long count = commentService.getCountListComment(request);
        ApiBaseResponse apiBaseResponse = new ApiBaseResponse();
        apiBaseResponse.setData(listResult);
        apiBaseResponse.setOptional(count);
        return apiBaseResponse;
    }

    @PostMapping("/authors/post/comment")
    public ResponseEntity<List<CommentPostResponse>> getCommentOfPost(@RequestBody CommentRequest commentRequest) {
        return ResponseEntity.ok(commentService.getAllCommentPost(commentRequest));
    }

    @PostMapping("/authors/likeComment/update")
    public boolean updateLikeComment(@RequestBody CommentRequest commentRequest) {
        return commentService.updateLikeComment(commentRequest);
    }

    @PreAuthorize("hasRole('USER')")
    @PostMapping("/authors/comment/create")
    public ApiBaseResponse create(@RequestBody CommentRequest request) {
        ApiBaseResponse apiBaseResponse = new ApiBaseResponse();
        if (MemoriesStorage.contain(request.getCommentText())) {
            apiBaseResponse.setErrorCode(Constants.CALL_API_CODE_FAIL);
            apiBaseResponse.setErrorDescription("Nội dung bình luận không phù hợp hãy xem lại");
            apiBaseResponse.setData(request);
            apiBaseResponse.setOptional(1L);
            return apiBaseResponse;
        }
        boolean rs = commentService.create(request);
        if (!rs) {
            apiBaseResponse.setErrorCode(Constants.CALL_API_CODE_FAIL);
            apiBaseResponse.setErrorDescription("Thêm mới bình luận không thành công");
            apiBaseResponse.setData(request);
            apiBaseResponse.setOptional(1L);
            return apiBaseResponse;
        }
        Long count = commentService.getCountListComment(request);
        apiBaseResponse.setErrorCode(Constants.CALL_API_CODE_SUCCESS);
        apiBaseResponse.setErrorDescription("Thêm mới bình luận thành công");
        apiBaseResponse.setData(request);
        apiBaseResponse.setOptional(count);
        // push notification
        if (request.getReplyCommentId() != null) {
            CommentEntity comment = commentService.getById(request);
            if (comment != null) {
                pushUserCommentNotification(request.getPostId(), request.getUserId(), comment.getUserId());
            }
        } else {
            pushUserCommentNotification(request.getPostId(), request.getUserId(), null);
        }
        return apiBaseResponse;
    }

    public void pushUserCommentNotification(Long postId, Long fromUserId, Long replyFrom) {
        UserCommentEventRequest userCommentEventRequest = new UserCommentEventRequest();
        userCommentEventRequest.setFromUser(fromUserId);
        userCommentEventRequest.setReplyUser(replyFrom);
        userCommentEventRequest.setPostId(postId);
        userCommentPusher.pushCommentNotificationForUser(userCommentEventRequest);
    }

    @PreAuthorize("hasRole('USER')")
    @PostMapping("/comment/update")
    public ApiBaseResponse update(@RequestBody CommentRequest request) {
        ApiBaseResponse apiBaseResponse = new ApiBaseResponse();
        if (MemoriesStorage.contain(request.getCommentText().toLowerCase())) {
            apiBaseResponse.setErrorCode(Constants.CALL_API_CODE_FAIL);
            apiBaseResponse.setErrorDescription("Nội dung bình luận không phù hợp hãy xem lại");
            apiBaseResponse.setData(request);
            apiBaseResponse.setOptional(1L);
            return apiBaseResponse;
        }
        boolean rs = commentService.update(request);
        if (!rs) {
            apiBaseResponse.setErrorCode(Constants.CALL_API_CODE_FAIL);
            apiBaseResponse.setErrorDescription("Chỉnh sửa bình luận không thành công");
            apiBaseResponse.setData(request);
            apiBaseResponse.setOptional(1L);
            return apiBaseResponse;
        }
        apiBaseResponse.setErrorCode(Constants.CALL_API_CODE_SUCCESS);
        apiBaseResponse.setErrorDescription("Chỉnh sửa bình luận thành công");
        apiBaseResponse.setData(request);
        apiBaseResponse.setOptional(1L);
        return apiBaseResponse;
    }

    //    @PreAuthorize("hasRole('USER')")
    @PostMapping("/comment/delete")
    public ApiBaseResponse delete(@RequestBody CommentRequest request) {
        ApiBaseResponse apiBaseResponse = new ApiBaseResponse();
        boolean rs = commentService.delete(request);
        if (!rs) {
            apiBaseResponse.setErrorCode(Constants.CALL_API_CODE_FAIL);
            apiBaseResponse.setErrorDescription("Xóa bình luận không thành công");
            apiBaseResponse.setData(request);
            apiBaseResponse.setOptional(1L);
            return apiBaseResponse;
        }
        apiBaseResponse.setErrorCode(Constants.CALL_API_CODE_SUCCESS);
        apiBaseResponse.setErrorDescription("Xóa bình luận thành công");
        apiBaseResponse.setData(request);
        apiBaseResponse.setOptional(1L);
        return apiBaseResponse;
    }

    @PostMapping("/authors/comment/{commentId}/change-status/{status}")
    public boolean changeStatus(@PathVariable Long commentId, @PathVariable Long status) {
        return commentService.changeStatus(commentId, status);
    }

    //    @PreAuthorize("hasRole('USER')")
    @GetMapping("/authors/comment/by-status/{status}")
    public ResponseEntity<?> getAllCommentByStatus(@PathVariable(name = "status") long status, Pageable pageable) {
        try {
            return commentService.getCommentByStatus(pageable, status);
        } catch (Exception e) {
            return ApiBaseResponse.fail(e.getMessage());
        }
    }

    //    @PreAuthorize("hasRole('USER')")
    @GetMapping("/authors/comment/by-post/{postId}")
    public ResponseEntity<?> getAllCommentByPost(@PathVariable(name = "postId") long postId, @RequestParam(name = "status", defaultValue = "1") String status, Pageable pageable) {
        try {
            return commentService.getCommentByPostId(pageable, postId, Long.parseLong(status));
        } catch (Exception e) {
            return ApiBaseResponse.fail(e.getMessage());
        }
    }

    //    @PreAuthorize("hasRole('USER')")
    @GetMapping("/authors/comment/by-content")
    public ResponseEntity<?> getAllCommentByPost(@RequestParam(name = "text", defaultValue = "") String text, Pageable pageable) {
        try {
            return commentService.getCommentByContent(pageable, text);
        } catch (Exception e) {
            return ApiBaseResponse.fail(e.getMessage());
        }
    }

    //    @PreAuthorize("hasRole('USER')")
    @GetMapping("/authors/comment/by-user/{userId}")
    public ResponseEntity<?> getAllCommentByUser(@PathVariable(name = "userId") long userId, @RequestParam(name = "status", defaultValue = "1") String status, Pageable pageable) {
        try {
            return commentService.getCommentByUserId(pageable, userId, Long.parseLong(status));
        } catch (Exception e) {
            return ApiBaseResponse.fail(e.getMessage());
        }
    }

}
