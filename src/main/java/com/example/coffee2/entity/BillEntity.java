package com.example.coffee2.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@Table(name = "bill")
public class BillEntity {
    @Id
    @SequenceGenerator(name = "bill_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "bill_seq")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "email")
    private String email;

    @Column(name = "phone")
    private String phone;

    @Column(name = "address")
    private String address;

    @Column(name = "detail")
    private String detail;

    @Column(name = "create_date")
    private Date createDate;

    @Column(name = "payed")
    private boolean payed;

    @Column(name = "total")
    private String total;
}
