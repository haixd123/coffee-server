package com.example.coffee2.pusher;

import com.example.coffee2.event.PostAcceptEvent;
import com.example.coffee2.event.PostDelineEvent;
import com.example.coffee2.event.PostHideEvent;
import com.example.coffee2.event.PostReportEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class PostPusher {
    private final ApplicationEventPublisher applicationEventPublisher;

    public void postDelineEvent(PostDelineEvent.PostDelineReq postDelineReq) {
        applicationEventPublisher.publishEvent(new PostDelineEvent(this, postDelineReq));
    }

    public void postAcceptEvent(PostAcceptEvent.PostAcceptEventReq postAcceptEventReq) {
        applicationEventPublisher.publishEvent(new PostAcceptEvent(this, postAcceptEventReq));
    }

    public void postHideEvent(PostHideEvent.PostHideReq postHideReq) {
        applicationEventPublisher.publishEvent(new PostHideEvent(this, postHideReq));
    }

    public void postReportEvent(PostReportEvent.PostReportReq postReportReq) {
        applicationEventPublisher.publishEvent(new PostReportEvent(this, postReportReq));
    }
}
