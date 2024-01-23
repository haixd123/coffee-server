package com.example.coffee2.entity;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Table;

@Entity
@Data
@Table(name = "reports")
public class Report {

    @javax.persistence.Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    private Long dataReportId;

    private Long reportType;

    private Long userReportId;

    private String reason;

}
