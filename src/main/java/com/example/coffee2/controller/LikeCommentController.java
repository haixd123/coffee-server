package com.example.coffee2.controller;


import com.example.coffee2.request.LikeCommentRequest;
import com.example.coffee2.response.LikeCommentResponse;
import com.example.coffee2.response.base.ApiBaseResponse;
import com.example.coffee2.service.LikeComment.LikeCommentService;
import com.example.coffee2.utils.Constants;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@Log4j2
@RequestMapping(path = "api")
public class LikeCommentController {
    @Autowired
    private LikeCommentService likeCommentService;

    @PostMapping("/authors/likeComment/findAllTableComment")
    public ApiBaseResponse getListEquipment(@RequestBody LikeCommentRequest request) {
        List<LikeCommentResponse> listResult = likeCommentService.getTableLikeCommentListLikeComment(request);
//        Long count = equipmentService.getCountListEquipment(request);
        ApiBaseResponse apiBaseResponse = new ApiBaseResponse();
        apiBaseResponse.setData(listResult);
//        apiBaseResponse.setOptional(count);
        return apiBaseResponse;
    }

//    @PreAuthorize("hasRole('USER')")
    @PostMapping("/authors/likeComment/update1")
    public ApiBaseResponse update(@RequestBody LikeCommentRequest request) {
        ApiBaseResponse apiBaseResponse = new ApiBaseResponse();
        boolean rs = likeCommentService.update(request);
        if(!rs) {
            apiBaseResponse.setErrorCode(Constants.CALL_API_CODE_FAIL);
            apiBaseResponse.setErrorDescription("Thích bình luận thất bại");
            apiBaseResponse.setData(request);
            apiBaseResponse.setOptional(1L);
            return apiBaseResponse;
        }
        apiBaseResponse.setErrorCode(Constants.CALL_API_CODE_SUCCESS);
        apiBaseResponse.setErrorDescription("Thích bình luận thành công");
        apiBaseResponse.setData(request);
        apiBaseResponse.setOptional(1L);
        return apiBaseResponse;
    }
}
