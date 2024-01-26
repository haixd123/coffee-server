package com.example.coffee2.request;

import lombok.Data;

import java.util.Date;

@Data
public class VoucherRequest {

    private Date expiredAt;
    private int percentDiscount;
    private String description;

    private int voucherType;
}
