package com.example.coffee2.pusher;

import com.example.coffee2.event.BillCancelEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class BillPusher {
    ApplicationEventPublisher applicationEventPublisher;

    public void pushBillCancelEvent(String email) {
        applicationEventPublisher.publishEvent(new BillCancelEvent(this, email));
    }
}
