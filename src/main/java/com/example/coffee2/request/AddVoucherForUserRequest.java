package com.example.coffee2.request;

import lombok.Data;

@Data
public class AddVoucherForUserRequest {
    private Long userId;
    private String voucherId;
}
