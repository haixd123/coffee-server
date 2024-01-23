package com.example.coffee2.event;

import lombok.Data;
import org.springframework.context.ApplicationEvent;

public class PostAcceptEvent extends ApplicationEvent {

    @Data
    public static class PostAcceptEventReq {
        private Long postId;
    }

    private PostAcceptEventReq data;

    public PostAcceptEventReq getData() {
        return data;
    }

    public PostAcceptEvent(Object source, PostAcceptEventReq data) {
        super(source);
        this.data = data;
    }
}
