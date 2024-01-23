package com.example.coffee2.event;

import lombok.Data;
import org.springframework.context.ApplicationEvent;

public class PostDelineEvent extends ApplicationEvent {
    @Data
    public static class PostDelineReq {
        private String reasonDeline;
        private Long postId;
    }

    private PostDelineReq data;

    public PostDelineReq getData() {
        return data;
    }

    public PostDelineEvent(Object source, PostDelineReq data) {
        super(source);
        this.data = data;
    }
}
