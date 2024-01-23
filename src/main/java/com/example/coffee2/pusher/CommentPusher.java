package com.example.coffee2.pusher;

import com.example.coffee2.event.CommentHideEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CommentPusher {
    private final ApplicationEventPublisher publisher;

    public void pushCommentHide(long commentId) {
        publisher.publishEvent(new CommentHideEvent(this, commentId));
    }
}
