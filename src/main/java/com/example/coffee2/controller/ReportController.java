package com.example.coffee2.controller;

import com.example.coffee2.request.ReportRequest;
import com.example.coffee2.response.base.ApiBaseResponse;
import com.example.coffee2.service.report.ReportService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("api/authors/reports")
public class ReportController {

    private final ReportService reportService;


    //    @PreAuthorize("hasRole('USER')")
    @PostMapping
    public ResponseEntity<?> store(@RequestBody ReportRequest request) {
        try {
            return reportService.create(request);
        } catch (Exception e) {
            return ApiBaseResponse.fail(e.getMessage());
        }
    }

    @GetMapping("/by-user")
    public ResponseEntity<?> getReportByUser(@RequestParam(name = "username", defaultValue = "") String username, Pageable pageable) {
        try {
            return reportService.getAllReportByUser(username, pageable);
        } catch (Exception e) {
            return ApiBaseResponse.fail(e.getMessage());
        }
    }

    @GetMapping("/by-post/{postId}")
    public ResponseEntity<?> getReportByPost(@PathVariable(name = "postId") Long postId, Pageable pageable) {
        try {
            return reportService.getAllReportByPost(postId, pageable);
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
            return reportService.getById(id);
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

    @GetMapping("/search/{reason}")
    public ResponseEntity<?> searchByReason(@PathVariable(name = "reason") String reason, Pageable pageable) {
        try {
            return reportService.searchReportByReason(pageable, reason);
        } catch (Exception e) {
            return ApiBaseResponse.fail(e.getMessage());
        }
    }
}
