package com.example.coffee2.service.LikeComment.impl;

import com.example.coffee2.entity.BillEntity;
import com.example.coffee2.entity.CommentEntity;
import com.example.coffee2.entity.LikeCommentEntity;
import com.example.coffee2.reponsitory.CommentRepository;
import com.example.coffee2.reponsitory.Customer.LikeCommentCustomer;
import com.example.coffee2.reponsitory.LikeCommentRepository;
import com.example.coffee2.request.LikeCommentRequest;
import com.example.coffee2.response.LikeCommentResponse;
import com.example.coffee2.service.LikeComment.LikeCommentService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Log4j2
public class LikeCommentServiceImpl implements LikeCommentService {
    @Autowired
    private LikeCommentRepository likeCommentRepository;

    @Autowired
    private LikeCommentCustomer likeCommentCustomer;

    @Autowired
    private CommentRepository commentRepository;

    @Override
    public List<LikeCommentResponse> getTableLikeCommentListLikeComment(LikeCommentRequest request) {
        return likeCommentCustomer.getTableLikeCommentListLikeComment(request);

    }

    @Override
    public boolean update(LikeCommentRequest request) {
        try {
            LikeCommentEntity obj1 = likeCommentRepository.findByCommentIdAndUserId(Long.valueOf(request.getCommentId()), Long.valueOf(request.getUserId()));
//            List<LikeCommentEntity> checkExist = likeCommentRepository.findAllByPostIdAndUserIdAndCommentId(request.getPostId(), request.getUserId(), request.getCommentId());
            if (obj1 != null) {
                likeCommentRepository.delete(obj1);
//                CommentEntity findCommentId = commentRepository.findById(Long.valueOf(request.getCommentId())).orElse(null);
//                findCommentId.setLikeComment(findCommentId.getLikeComment() - 1);
//                commentRepository.save(findCommentId);
                return true;
            } else {
                LikeCommentEntity obj = new LikeCommentEntity();
                obj.setCommentId(Long.valueOf(request.getCommentId()));
                obj.setUserId(Long.valueOf(request.getUserId()));
//                obj.setIsLikeComment(1L);
//                obj.setPostId(request.getPostId());
//                BillEntity savedBill = respository.save(obj);

                likeCommentRepository.save(obj);
//                Long commentId = likeCommentRepository.save(obj).getCommentId();
//                CommentEntity findCommentId = commentRepository.findById(commentId).orElse(null);
//                findCommentId.setLikeComment(findCommentId.getLikeComment() + 1);
//                commentRepository.save(findCommentId);
                return true;
            }
        } catch (Exception e) {
            log.error("not success: " + e.getMessage());
            return false;
        }
    }

}
