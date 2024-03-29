package com.example.coffee2.reponsitory;

import com.example.coffee2.entity.Report;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReportRepository extends JpaRepository<Report, Long> {
    Page<Report> findAllByReasonContaining(Pageable pageable, String reason);

    Page<Report> findAllByUserReportId(Pageable pageable, Long userReportId);

    List<Report> findAllByDataReportIdAndReportType(long dataReportId, long type);

    Page<Report> findAllByDataReportIdAndReportType(Pageable pageable, long dataReportId, long type);

    List<Report> findAllByDataReportIdAndUserReportId(long dataReportId, long userReportId);
}
