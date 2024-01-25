package com.example.coffee2.request;

import lombok.Data;

@Data
public class ChangeStatusBillRequest {
    private Long billId;
    private Integer status;
}
