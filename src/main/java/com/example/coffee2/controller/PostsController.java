package com.example.coffee2.controller;


import com.example.coffee2.entity.PostsEntity;
import com.example.coffee2.entity.ResponseObject;
import com.example.coffee2.entity.UserEntity;
import com.example.coffee2.reponsitory.Customer.impl.PostsCustomerImpl;
import com.example.coffee2.reponsitory.PostsRepository;
import com.example.coffee2.reponsitory.UserRespository;
import com.example.coffee2.request.PostsRequest;
import com.example.coffee2.response.PostsResponse;
import com.example.coffee2.response.base.ApiBaseResponse;
import com.example.coffee2.service.posts.PostsService;
import com.example.coffee2.utils.MemoriesStorage;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import com.example.coffee2.utils.Constants;

import java.util.List;
import java.util.Optional;

@RestController
@Log4j2
//@CrossOrigin(origins = "*")
@RequestMapping(path = "api")
public class PostsController {
    @Autowired
    private PostsRepository repository;

    @Autowired
    private PostsCustomerImpl repositoryCustomer;

    @Autowired
    private UserRespository userRespository;

    @Autowired
    private PostsService postsService;

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/authors/posts")
    ResponseEntity<ResponseObject> findAllPosts() {
        List<PostsEntity> foundProduct = repository.findAllPosts();
        log.info("foundProduct: " + foundProduct);
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject("ok", "get full product successfully", foundProduct));
    }

    @GetMapping("/authors/posts/by-status/{status}")
    ResponseEntity<?> getAllPostByStatus(@PathVariable(name = "status") long status, Pageable pageable) {
        try {
            return postsService.getAllPostByStatus(pageable, status);
        } catch (Exception e) {
            return ApiBaseResponse.fail(e.getMessage());
        }
    }

    @GetMapping("/authors/posts/by-favor")
    ResponseEntity<?> getAllPostByTypeAndTime(@RequestParam(name = "type", defaultValue = "like") String type, @RequestParam(name = "time", defaultValue = "week") String time, Pageable pageable) {
        try {
            return postsService.getPostByTypeAndTime(pageable, type, time);
        } catch (Exception e) {
            return ApiBaseResponse.fail(e.getMessage());
        }
    }

    @GetMapping("/authors/posts/by-author/{postId}")
    ResponseEntity<?> getAllPostByAuthor(@PathVariable(name = "postId") Long postId, Pageable pageable) {
        try {
            return postsService.getPostByAuthor(pageable, postId);
        } catch (Exception e) {
            return ApiBaseResponse.fail(e.getMessage());
        }
    }

    @GetMapping("/authors/posts/like-post")
    ResponseEntity<ResponseObject> findLikePost() {
        List<PostsEntity> foundProduct = repository.findLikePost();
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject("ok", "get full product successfully", foundProduct));
    }

    @GetMapping("/authors/posts/comment-post")
    ResponseEntity<ResponseObject> findCommentPost() {
        List<PostsEntity> foundProduct = repository.findCommentPost();
        log.info("foundProduct: " + foundProduct);
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject("ok", "get full product successfully", foundProduct));
    }

    @GetMapping("/authors/posts/search-list-category")
    ResponseEntity<ResponseObject> searchListCategory() {
        List<String> listCategory = repository.getListCategory();
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject("ok", "get AccountNumber successfully", listCategory));
    }

    @PostMapping("/authors/posts/searchTotalPost")
    public ApiBaseResponse getTotalPost(@RequestBody PostsRequest request) {
        Long count = postsService.getTotalPosts(request);
        ApiBaseResponse apiBaseResponse = new ApiBaseResponse();
        apiBaseResponse.setOptional(count);
        return apiBaseResponse;
    }

    @PostMapping("/authors/posts/searchDetail")
//    public ResponseEntity<?> getListPosts(@RequestBody PostsRequest request) {
    public ApiBaseResponse getDetailPosts(@RequestBody PostsRequest request) {
        Optional<PostsEntity> listResult = repository.findById(request.getId());
        ApiBaseResponse apiBaseResponse = new ApiBaseResponse();
        apiBaseResponse.setData(listResult);
//        ApiBaseResponse response = ApiBaseResponse.success(listResult, count);
//        log.info("response: " + listResult);
//        return new ResponseEntity<>(listResult, HttpStatus.OK);
//        return new ResponseEntity<> (HttpStatus.OK);
        return apiBaseResponse;
    }

    @PostMapping("/authors/posts/searchAdmin")
//    public ResponseEntity<?> getListPosts(@RequestBody PostsRequest request) {
    public ApiBaseResponse getListPostsAdmin(@RequestBody PostsRequest request) {
        List<PostsResponse> listResult = repositoryCustomer.getListPostsAdmin(request);
        Long count = repositoryCustomer.getCountListPostsAdmin(request);
        ApiBaseResponse apiBaseResponse = new ApiBaseResponse();
        apiBaseResponse.setData(listResult);
        apiBaseResponse.setOptional(count);
//        ApiBaseResponse response = ApiBaseResponse.success(listResult, count);
//        log.info("response: " + listResult);
//        return new ResponseEntity<>(listResult, HttpStatus.OK);
//        return new ResponseEntity<> (HttpStatus.OK);
        return apiBaseResponse;
    }

    @PostMapping("/authors/posts/search")
//    public ResponseEntity<?> getListPosts(@RequestBody PostsRequest request) {
    public ApiBaseResponse getListPosts(@RequestBody PostsRequest request) {
        List<PostsResponse> listResult = postsService.getListPosts(request);
        Long count = postsService.getCountListPosts(request);
        ApiBaseResponse apiBaseResponse = new ApiBaseResponse();
        apiBaseResponse.setData(listResult);
        apiBaseResponse.setOptional(count);
//        ApiBaseResponse response = ApiBaseResponse.success(listResult, count);
//        log.info("response: " + listResult);
//        return new ResponseEntity<>(listResult, HttpStatus.OK);
//        return new ResponseEntity<> (HttpStatus.OK);
        return apiBaseResponse;
    }


//    @PostMapping("/search-item-category")
//    ApiBaseResponse searchItemCategory(@RequestBody PostsRequest request) {
//        List<PostsResponse> listResult = postsService.getListPosts(request);
//        ApiBaseResponse apiBaseResponse = new ApiBaseResponse();
//        apiBaseResponse.setData(listResult);
//
//        return apiBaseResponse;
//    }


//    @PostMapping("/search/{title}")
//    ResponseEntity<ResponseObject> findByIdPost(@PathVariable String title) {
//        List<String> foundAccountNumber = repository.findByTitle(title);
//        log.info("foundAccountNumber: " + foundAccountNumber);
//        return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject("ok", "get AccountNumber successfully", foundAccountNumber));
//    }

    @PreAuthorize("hasRole('USER')")
    @PostMapping("/posts/create")
    public ApiBaseResponse create(@RequestBody PostsRequest request) {
        ApiBaseResponse apiBaseResponse = new ApiBaseResponse();
        if (checkOffisentive(request, apiBaseResponse)) return apiBaseResponse;
        if (request.getStatus() != 2 && request.getStatus() != 0) {
            List<String> list = repository.findByTitle(request.getTitle());
            if (list.size() > 0) {
                apiBaseResponse.setErrorCode(Constants.CALL_API_CODE_FAIL);
                apiBaseResponse.setErrorDescription("Bài viết đã tồn tại trong hệ thống");
                apiBaseResponse.setData(request);
                apiBaseResponse.setOptional(1l);
                return apiBaseResponse;
            }
        }
        UserEntity user = userRespository.findById(request.getUserId()).orElse(null);
        if (user != null) {
            if (user.getDelineCount() >= Constants.MAX_DELINE_POST_PUSH_COUNT) {
                apiBaseResponse.setErrorCode(Constants.CALL_API_CODE_FAIL);
                apiBaseResponse.setErrorDescription("Bạn đã bị khóa chức năng viết bài do bị từ chối quá nhiều lần");
                apiBaseResponse.setData(request);
                apiBaseResponse.setOptional(1l);
                return apiBaseResponse;
            }
        } else {
            apiBaseResponse.setErrorCode(Constants.CALL_API_CODE_FAIL);
            apiBaseResponse.setErrorDescription("Có lỗi xảy ra hãy thử lại sau.");
            apiBaseResponse.setData(request);
            apiBaseResponse.setOptional(1l);
            return apiBaseResponse;
        }
        boolean rs = postsService.create(request);
        if (!rs) {
            apiBaseResponse.setErrorCode(Constants.CALL_API_CODE_FAIL);
            apiBaseResponse.setErrorDescription("Tạo mới bài viết Không thành công");
            apiBaseResponse.setData(request);
            apiBaseResponse.setOptional(1L);
            return apiBaseResponse;
        }
        apiBaseResponse.setErrorCode(Constants.CALL_API_CODE_SUCCESS);
        apiBaseResponse.setErrorDescription("Tạo mới bài viết thành công");
        apiBaseResponse.setData(request);
        apiBaseResponse.setOptional(1L);
        return apiBaseResponse;
    }

    @PreAuthorize("hasRole('USER')")
    @PostMapping("/posts/update")
    public ApiBaseResponse updatePosts(@RequestBody PostsRequest request) {
        ApiBaseResponse apiBaseResponse = new ApiBaseResponse();
        if (checkOffisentive(request, apiBaseResponse)) return apiBaseResponse;
        boolean rs = postsService.update(request);
        if (!rs) {
            apiBaseResponse.setErrorCode(Constants.CALL_API_CODE_FAIL);
            apiBaseResponse.setErrorDescription("Cập nhật bài viết không thành công");
            apiBaseResponse.setData(request);
            apiBaseResponse.setOptional(1l);
            return apiBaseResponse;

        }
        apiBaseResponse.setErrorCode(Constants.CALL_API_CODE_SUCCESS);
        apiBaseResponse.setErrorDescription("Cập nhật bài viết thành công");
        apiBaseResponse.setData(request);
        apiBaseResponse.setOptional(1l);
        return apiBaseResponse;
    }

    private boolean checkOffisentive(@RequestBody PostsRequest request, ApiBaseResponse apiBaseResponse) {
        if (MemoriesStorage.contain(request.getTitle().toLowerCase())) {

            apiBaseResponse.setErrorCode(Constants.CALL_API_CODE_FAIL);
            apiBaseResponse.setErrorDescription("Tiêu đề bài viết chứa từ ngữ thô tục không thể tạo");
            apiBaseResponse.setData(request);
            apiBaseResponse.setOptional(1l);
            return true;
        }
        if (MemoriesStorage.contain(request.getContentPost().toLowerCase())) {
            apiBaseResponse.setErrorCode(Constants.CALL_API_CODE_FAIL);
            apiBaseResponse.setErrorDescription("Nội dung bài viết chứa từ ngữ thô tục không thể tạo");
            apiBaseResponse.setData(request);
            apiBaseResponse.setOptional(1l);
            return true;
        }
        if (MemoriesStorage.contain(request.getContentDetail().toLowerCase())) {
            apiBaseResponse.setErrorCode(Constants.CALL_API_CODE_FAIL);
            apiBaseResponse.setErrorDescription("Nội dung bài viết chứa từ ngữ thô tục không thể tạo");
            apiBaseResponse.setData(request);
            apiBaseResponse.setOptional(1l);
            return true;
        }
        return false;
    }

    @PreAuthorize("hasRole('USER')")
    @PostMapping("/posts/delete")
    public ApiBaseResponse delete(@RequestBody PostsRequest request) {
        ApiBaseResponse apiBaseResponse = new ApiBaseResponse();
        boolean rs = postsService.delete(request);
        if (!rs) {
            apiBaseResponse.setErrorCode(Constants.CALL_API_CODE_FAIL);
            apiBaseResponse.setErrorDescription("Xóa bài viết không thành công");
            apiBaseResponse.setData(request);
            apiBaseResponse.setOptional(1l);
            return apiBaseResponse;

        }
        apiBaseResponse.setErrorCode(Constants.CALL_API_CODE_SUCCESS);
        apiBaseResponse.setErrorDescription("Xóa bài viết thành công");
        apiBaseResponse.setData(request);
        apiBaseResponse.setOptional(1l);
        return apiBaseResponse;
    }

    @PostMapping("/posts/{postId}/change-status/{status}")
    public boolean changeStatus(@PathVariable Long postId, @PathVariable Long status) {
        return postsService.changeStatus(postId, status);
    }
}
