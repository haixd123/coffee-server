package com.example.coffee2.enums;

public enum VoucherType {
    DISCOUNT_ALL_BILL(1),
    FREE_SHIP(2);

    final int value;

    VoucherType(int val) {
        value = val;
    }

    public int getValue() {
        return value;
    }
}
