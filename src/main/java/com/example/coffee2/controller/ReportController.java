package com.example.coffee2.controller;

import com.example.coffee2.request.ReportRequest;
import com.example.coffee2.response.base.ApiBaseResponse;
import com.example.coffee2.service.report.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/authors/reports")
public class ReportController {

    private final ReportService reportService;

    @PostMapping
    public ResponseEntity<?> store(@RequestBody ReportRequest request) {
        try {
            return reportService.create(request);
        } catch (Exception e) {
            return ApiBaseResponse.fail(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> edit(@RequestBody ReportRequest request, @PathVariable(name = "id") Long id) {
        try {
            return reportService.update(request, id);
        } catch (Exception e) {
            return ApiBaseResponse.fail(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> destroy(@PathVariable(name = "id") Long id) {
        try {
            return reportService.delete(id);
        } catch (Exception e) {
            return ApiBaseResponse.fail(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable(name = "id") Long id) {
        try {
            return reportService.delete(id);
        } catch (Exception e) {
            return ApiBaseResponse.fail(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> getAll(Pageable pageable) {
        try {
            return reportService.getAllReport(pageable);
        } catch (Exception e) {
            return ApiBaseResponse.fail(e.getMessage());
        }
    }

    @GetMapping("/{reason}")
    public ResponseEntity<?> searchByReason(@PathVariable(name = "reason") String reason, Pageable pageable) {
        try {
            return reportService.searchReportByReason(pageable, reason);
        } catch (Exception e) {
            return ApiBaseResponse.fail(e.getMessage());
        }
    }
}
