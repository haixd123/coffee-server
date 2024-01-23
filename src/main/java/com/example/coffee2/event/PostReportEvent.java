package com.example.coffee2.event;

import lombok.Data;
import org.springframework.context.ApplicationEvent;

public class PostReportEvent extends ApplicationEvent {

    @Data
    public static class PostReportReq {
        private long postId;
    }

    private PostReportReq postReportReq;

    public PostReportEvent(Object source, PostReportReq postReportReq) {
        super(source);
        this.postReportReq = postReportReq;
    }

    public PostReportReq getPostReportReq() {
        return postReportReq;
    }
}
