package com.example.coffee2.service.report;

import com.example.coffee2.entity.CommentEntity;
import com.example.coffee2.entity.PostsEntity;
import com.example.coffee2.entity.Report;
import com.example.coffee2.entity.UserEntity;
import com.example.coffee2.event.PostReportEvent;
import com.example.coffee2.pusher.PostPusher;
import com.example.coffee2.reponsitory.CommentRepository;
import com.example.coffee2.reponsitory.PostsRepository;
import com.example.coffee2.reponsitory.ReportRepository;
import com.example.coffee2.reponsitory.UserRespository;
import com.example.coffee2.request.ReportRequest;
import com.example.coffee2.response.ReportResponse;
import com.example.coffee2.response.base.ApiBaseResponse;
import com.example.coffee2.utils.Constants;
import com.example.coffee2.utils.Mapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class ReportServiceIpm implements ReportService {
    private final ReportRepository reportRepository;

    private final PostPusher postPusher;
    private final PostsRepository postsRepository;

    private final CommentRepository commentRepository;

    private final UserRespository userRespository;

    @Override
    public ResponseEntity<?> getById(Long id) {
        Report report = reportRepository.findById(id).orElse(null);
        if (report == null) {
            return ApiBaseResponse.fail("Không tìm thấy báo cáo với id : " + id);
        }
        return ApiBaseResponse.done("Success", report);
    }

    @Override
    public ResponseEntity<?> create(ReportRequest request) {
        if (Objects.equals(request.getReportType(), Constants.REPORT_TYPE_POST)) {
            PostsEntity postsEntity = postsRepository.findByIdAndStatus(request.getDataReportId(), 1L).orElse(null);
            if (postsEntity == null) {
                return ApiBaseResponse.fail("Bài viết bạn báo cáo không tồn tại trên hệ thống");
            }
            List<Report> reports = reportRepository.findAllByDataReportIdAndUserReportId(postsEntity.getId(), request.getUserReportId());
            if (reports.size() >= 3) {
                return ApiBaseResponse.fail("Một bài viết bạn chỉ được báo cáo tối đa 3 lần");
            }

        } else if (Objects.equals(request.getReportType(), Constants.REPORT_TYPE_COMMENT)) {
            CommentEntity comment = commentRepository.findById(request.getDataReportId()).orElse(null);
            if (comment == null) {
                return ApiBaseResponse.fail("Bình luận bạn báo cáo không tồn tại trên hệ thống");
            }
        }
        return processToAddReport(request);
    }

    public ResponseEntity<?> processToAddReport(ReportRequest request) {
        Report report = new Report();
        report.setDataReportId(request.getDataReportId());
        report.setReportType(request.getReportType());
        report.setUserReportId(request.getUserReportId());
        report.setReason(request.getReason());
        reportRepository.save(report);
//        reportRepository.save(new ModelMapper().map(request, Report.class));
        if (request.getReportType() == Constants.REPORT_TYPE_POST) {
            PostReportEvent.PostReportReq postReportReq = new PostReportEvent.PostReportReq();
            postReportReq.setPostId(request.getDataReportId());
            postPusher.postReportEvent(postReportReq);
        }
        return ApiBaseResponse.done("Đã báo cáo bài viết đợi admin kiểm tra", new HashMap<>());
    }

    @Override
    public ResponseEntity<?> update(ReportRequest request, Long id) {
        Report report = reportRepository.findById(id).orElse(null);
        if (report == null) {
            return ApiBaseResponse.fail("Không tìm thấy dữ liệu của báo cáo.");
        }
        Mapper.copyNonNullProperties(request, report);
        return ApiBaseResponse.done("Update success", reportRepository.save(report));
    }

    @Override
    public ResponseEntity<?> delete(Long id) {
        reportRepository.deleteById(id);
        return ApiBaseResponse.done("Delete success", new HashMap<>());
    }

    @Override
    public ResponseEntity<?> getAllReport(Pageable pageable) {
        Page<Report> reports = reportRepository.findAll(pageable);
        Page<ReportResponse> data = new PageImpl<>(mapTo(reports), pageable, reports.getTotalElements());
        return ApiBaseResponse.done("Get data success", data);
    }

    public List<ReportResponse> mapTo(Page<Report> reports) {
        return reports.getContent().stream().map((rp) -> {
            ReportResponse reportResponse = new ModelMapper().map(rp, ReportResponse.class);
            UserEntity reporter = userRespository.findById(reportResponse.getUserReportId()).orElse(null);
            if (Objects.equals(rp.getReportType(), Constants.REPORT_TYPE_COMMENT)) {
                reportResponse.setData(commentRepository.findById(rp.getDataReportId()).orElse(null));
            } else if (Objects.equals(rp.getReportType(), Constants.REPORT_TYPE_POST)) {
                reportResponse.setData(postsRepository.findById(rp.getDataReportId()).orElse(null));
            }
            reportResponse.setUserReport(reporter);
            return reportResponse;
        }).collect(Collectors.toList());
    }

    @Override
    public ResponseEntity<?> searchReportByReason(Pageable pageable, String reason) {
        Page<Report> reports = reportRepository.findAllByReasonContaining(pageable, reason);
        Page<ReportResponse> data = new PageImpl<>(mapTo(reports), pageable, reports.getTotalElements());
        return ApiBaseResponse.done("Get data success", data);
    }

    @Override
    public ResponseEntity<?> getAllReportByUser(String username, Pageable pageable) {
        UserEntity user = userRespository.findByName(username).orElse(null);
        if (user != null) {
            Page<Report> reports = reportRepository.findAllByUserReportId(pageable, user.getId());
            Page<ReportResponse> data = new PageImpl<>(mapTo(reports), pageable, reports.getTotalElements());
            return ApiBaseResponse.done("Success", data);
        } else {
            return ApiBaseResponse.done("Success", new PageImpl<>(new ArrayList<>(), pageable, 0));
        }
    }

    @Override
    public ResponseEntity<?> getAllReportByPost(Long postId, Pageable pageable) {
        Page<Report> reports = reportRepository.findAllByDataReportIdAndReportType(pageable, postId, Constants.REPORT_TYPE_POST);
        Page<ReportResponse> data = new PageImpl<>(mapTo(reports), pageable, reports.getTotalElements());
        return ApiBaseResponse.done("Success", data);
    }

    @Override
    public ResponseEntity<?> getAllReportByIdAndType(Long postId, Long type, Pageable pageable) {
        Page<Report> reports = reportRepository.findAllByDataReportIdAndReportType(pageable, postId, type);
        Page<ReportResponse> data = new PageImpl<>(mapTo(reports), pageable, reports.getTotalElements());
        return ApiBaseResponse.done("Success", data);
    }
}
