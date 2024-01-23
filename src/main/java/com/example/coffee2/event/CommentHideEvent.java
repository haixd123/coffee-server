package com.example.coffee2.event;

import org.springframework.context.ApplicationEvent;

public class CommentHideEvent extends ApplicationEvent {

    private long commentId;

    public CommentHideEvent(Object source, long commentId) {
        super(source);
        this.commentId = commentId;
    }

    public long getCommentId() {
        return commentId;
    }
}
