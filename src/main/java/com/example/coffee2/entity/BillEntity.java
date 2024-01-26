package com.example.coffee2.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

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
    @Column(name = "create_date")
    private Date createDate;

    private Integer status;

    @OneToMany(mappedBy = "bill")
    private Set<BillDetail> details = new HashSet<>();

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "bill_vouchers", joinColumns = @JoinColumn(name = "bill_id"), inverseJoinColumns = @JoinColumn(name = "voucher_id"))
    private Set<Voucher> vouchers = new HashSet<>();
    @Column(name = "total")
    private Long total;

    public void addVoucher(Voucher voucher) {
        this.vouchers.add(voucher);
    }
}
