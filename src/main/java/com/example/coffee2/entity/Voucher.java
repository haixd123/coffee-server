package com.example.coffee2.entity;

import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.UUID;

@Entity
@Data
@Table(name = "vouchers")
public class Voucher {

    @javax.persistence.Id
    private String Id;

    public Voucher() {
        this.Id = UUID.randomUUID().toString().substring(0, 6).toUpperCase();
    }

    private String description;

    private Date expiredAt;

    @CreationTimestamp
    private Date createdAt;

    private int percentDiscount;
    private int voucherType;
    private Long maxDiscount;

}
