package com.example.coffee2.request;

import lombok.Data;

import java.util.HashSet;
import java.util.Set;

@Data
public class BillRequest {
    private Long id;
    private String name;
    private String email;
    private String phone;
    private String address;
    private String detail;
    private String createDate;
    private Long total;

    private int pageIndex;
    private int pageSize;

    private Set<BillDetailRequest> billDetails = new HashSet<>();
}
