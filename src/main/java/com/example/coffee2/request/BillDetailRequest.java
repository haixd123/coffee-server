package com.example.coffee2.request;

import lombok.Data;

@Data
public class BillDetailRequest {
    private Long productId;
    private Long quantity;
}
