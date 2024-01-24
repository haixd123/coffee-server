package com.example.coffee2.service.comment.impl;

import com.example.coffee2.entity.CommentEntity;
import com.example.coffee2.entity.PostsEntity;
import com.example.coffee2.entity.Report;
import com.example.coffee2.pusher.CommentPusher;
import com.example.coffee2.reponsitory.CommentRepository;
import com.example.coffee2.reponsitory.Customer.CommentCustomer;
import com.example.coffee2.reponsitory.PostsRepository;
import com.example.coffee2.reponsitory.ReportRepository;
import com.example.coffee2.request.CommentRequest;
import com.example.coffee2.response.CommentResponse;
import com.example.coffee2.response.base.ApiBaseResponse;
import com.example.coffee2.service.comment.CommentService;
import com.example.coffee2.utils.Constants;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.xml.stream.events.Comment;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Log4j2
public class CommentServiceImpl implements CommentService {
    @Autowired
    private CommentPusher commentPusher;
    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private CommentCustomer commentCustomer;

    @Autowired
    private PostsRepository postsRepository;
    @Autowired
    private ReportRepository reportRepository;

    @Override
    public List<CommentResponse> getListComment(CommentRequest request) {
        return commentCustomer.getListComment(request);
    }

    @Override
    public Long getCountListComment(CommentRequest request) {
        return commentCustomer.getCountListComment(request);
    }

    @Override
    public Long getTotalCommentPosts(CommentRequest request) {
        return commentCustomer.getTotalCommentPosts(request);
    }


    @Override
    public boolean create(CommentRequest request) {
        Date now = new Date();
        try {
            CommentEntity obj = new CommentEntity();
            obj.setCommentId(request.getCommentId());
            obj.setUserId(request.getUserId());
            obj.setPostId(request.getPostId());
            obj.setCommentText(request.getCommentText());
            obj.setCreateAt(request.getCreateAt());
            obj.setUpdateAt(request.getUpdateAt());
            obj.setLikeComment(request.getLikeComment());
            obj.setStatus(1L);
            commentRepository.save(obj);
            PostsEntity postsEntity = postsRepository.findById(request.getPostId()).orElse(null);
            if (postsEntity != null) {
                postsEntity.setComment(postsEntity.getComment() + 1);
                postsRepository.save(postsEntity);
            }
            return true;
        } catch (Exception e) {
            log.error("error: " + e.getMessage());
            return false;
        }
    }


    @Override
    public boolean update(CommentRequest request) {
        Date now = new Date();

        try {
            CommentEntity obj = commentRepository.findById(request.getId()).orElse(null);
            obj.setCommentId(request.getCommentId());
            obj.setUserId(request.getUserId());
            obj.setPostId(request.getPostId());
            obj.setCommentText(request.getCommentText());
//            obj.setCreateAt(DateProc.dateToStringYYYYMMDD(request.getCreateAt()));
//            requestMail.setRequestDate(DateProc.getDatetimeFormatYYYYMMDDHH24MISS());
//            groupEntity.setFileName(DateProc.dateToStringYYYYMMDD(new Date()) + getFileName(request.getBankId()));
//            rsModel.setApprovedDateStr(DateProc.dateToStringDDMMYYYYMMSS(rsModel.getApprovedDate()));

            obj.setUpdateAt(request.getUpdateAt());
            obj.setLikeComment(request.getLikeComment());
            obj.setStatus(request.getStatus());
            if (request.getStatus() == Constants.COMMENT_HIDE) {
                commentPusher.pushCommentHide(request.getPostId());
                List<Report> reports = reportRepository.findAllByDataReportIdAndReportType(request.getId(), Constants.REPORT_TYPE_COMMENT);
                reportRepository.deleteAll(reports);
            }
            commentRepository.save(obj);
            return true;
        } catch (Exception e) {
            log.error("error: " + e.getMessage());
            return false;
        }


    }

    @Override
    public boolean delete(CommentRequest request) {
        try {
            CommentEntity obj = commentRepository.findById(request.getId()).orElse(null);
            obj.setStatus(-1L);
            commentRepository.save(obj);
            List<Report> reports = reportRepository.findAllByDataReportIdAndReportType(request.getId(), Constants.REPORT_TYPE_COMMENT);
            reportRepository.deleteAll(reports);
            return true;
        } catch (Exception e) {
            log.error("error: " + e.getMessage());
            return false;
        }


    }

    @Override
    public boolean changeStatus(Long id, Long status) {
        try {
            CommentEntity obj = commentRepository.findById(id).orElse(null);

            obj.setStatus(status);
            if (status == Constants.COMMENT_HIDE) {
                commentPusher.pushCommentHide(obj.getPostId());
            }
            commentRepository.save(obj);

            return true;
        } catch (Exception e) {
            log.error("error: " + e.getMessage());
            return false;
        }
    }

    @Override
    public CommentEntity getById(Long commentId) {
        return commentRepository.findById(commentId).orElse(null);
    }

    @Override
    public ResponseEntity<?> getCommentByStatus(Pageable pageable, long status) {
        Page<CommentEntity> comments = commentRepository.findAllByStatus(pageable, status);
        Page<CommentResponse> commentResponses = new PageImpl<>(mapTo(comments), pageable, comments.getTotalElements());
        return ApiBaseResponse.done("Success", commentResponses);
    }

    @Override
    public ResponseEntity<?> getCommentByContent(Pageable pageable, String text) {
        Page<CommentEntity> comments = commentRepository.findAllByCommentTextContainingAndStatus(pageable, text, 1l);
        Page<CommentResponse> commentResponses = new PageImpl<>(mapTo(comments), pageable, comments.getTotalElements());
        return ApiBaseResponse.done("Success", commentResponses);
    }

    public List<CommentResponse> mapTo(Page<CommentEntity> entities) {
        return entities.getContent().stream().map((cm) -> new ModelMapper().map(cm, CommentResponse.class)).collect(Collectors.toList());
    }

    @Override
    public ResponseEntity<?> getCommentByPostId(Pageable pageable, long postId, long status) {
        Page<CommentEntity> comments = commentRepository.findAllByPostIdAndStatus(pageable, postId, status);
        Page<CommentResponse> commentResponses = new PageImpl<>(mapTo(comments), pageable, comments.getTotalElements());
        return ApiBaseResponse.done("Success", commentResponses);
    }

    @Override
    public ResponseEntity<?> getCommentByUserId(Pageable pageable, long userId, long status) {
        Page<CommentEntity> comments = commentRepository.findAllByUserIdAndStatus(pageable, userId, status);
        Page<CommentResponse> commentResponses = new PageImpl<>(mapTo(comments), pageable, comments.getTotalElements());
        return ApiBaseResponse.done("Success", commentResponses);
    }
}
