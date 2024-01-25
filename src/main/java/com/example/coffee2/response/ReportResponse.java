package com.example.coffee2.response;

import com.example.coffee2.entity.CommentEntity;
import com.example.coffee2.entity.PostsEntity;
import com.example.coffee2.entity.Report;
import com.example.coffee2.entity.UserEntity;
import com.example.coffee2.reponsitory.UserRespository;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;

@RequiredArgsConstructor
public class ReportResponse extends Report {

    public static ReportResponse mapTo(Report report, UserEntity user, Object data) {
        ReportResponse reportResponse = new ModelMapper().map(report, ReportResponse.class);
        reportResponse.setUserReport(user);
        reportResponse.setData(data);
        return reportResponse;
    }

    private UserEntity userReport;

    private Object data;

    public void setData(Object data) {
        this.data = data;
    }

    public Object getData() {
        return data;
    }

    public UserEntity getUserReport() {
        return userReport;
    }

    public void setUserReport(UserEntity userReport) {
        this.userReport = userReport;
    }
}
