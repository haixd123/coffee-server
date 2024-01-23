package com.example.coffee2.event;

import lombok.Data;
import org.springframework.context.ApplicationEvent;

public class PostHideEvent extends ApplicationEvent {

    @Data
    public static class PostHideReq {
        private Long postId;
    }

    private PostHideReq postHideReq;

    public PostHideEvent(Object source, PostHideReq postHideReq) {
        super(source);
        this.postHideReq = postHideReq;
    }

    public PostHideReq getPostHideReq() {
        return postHideReq;
    }
}
