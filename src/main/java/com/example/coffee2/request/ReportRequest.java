package com.example.coffee2.request;

import lombok.Data;

@Data
public class ReportRequest {

    private Long dataReportId;
    private Long reportType;
    private Long userReportId;

    private String reason;
}
