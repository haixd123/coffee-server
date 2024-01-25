package com.example.coffee2.enums;

public enum BillStatus {

    WAITING_PAYMENT(0), ACCEPT_PAYMENT(1), DONE(2),

    CANCEL(3);
    final int value;

    BillStatus(int val) {
        value = val;
    }

    public int getValue() {
        return value;
    }
}
