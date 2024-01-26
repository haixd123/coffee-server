package com.example.coffee2.event;

import org.springframework.context.ApplicationEvent;

public class BillCancelEvent extends ApplicationEvent {

    private String email;
    public BillCancelEvent(Object source,String email) {
        super(source);
        this.email = email;
    }

    public String getEmail() {
        return email;
    }
}
