package com.example.coffee2.entity;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "vouchers")
public class Voucher {

    @javax.persistence.Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long Id;

    private LocalDateTime expiredAt;

    private int percentDiscount;
    private int voucherType;

}
