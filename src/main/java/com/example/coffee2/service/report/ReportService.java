package com.example.coffee2.service.report;

import com.example.coffee2.request.ReportRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

public interface ReportService {
    ResponseEntity<?> getById(Long id);

    ResponseEntity<?> create(ReportRequest request);

    ResponseEntity<?> update(ReportRequest request, Long id);

    ResponseEntity<?> delete(Long id);

    ResponseEntity<?> getAllReport(Pageable pageable);

    ResponseEntity<?> searchReportByReason(Pageable pageable, String reason);
}
