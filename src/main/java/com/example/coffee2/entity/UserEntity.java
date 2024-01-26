package com.example.coffee2.entity;

import lombok.Data;

import javax.persistence.*;
import java.sql.Blob;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@Table(name = "user1")
public class UserEntity {
    @Id
    @SequenceGenerator(name = "user1_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user1_seq")

    private Long id;

    @Column(name = "user_name")
    private String userName;
    @Column(name = "password")
    private String passWord;
    @Column(name = "email")
    private String email;
    @Column(name = "name")
    private String name;
    @Column(name = "role")
    private String role;
    @Column(name = "phone_number")
    private Long phoneNumber;
    @Column(name = "date_of_birth")
    private Date dateOfBirth;
    @Column(name = "sex")
    private Long sex;
    @Column(name = "create_date")
    private Date createDate;
    @Column(name = "status")
    private Long status;

    @Column(name = "image")
    private String image;

    private Long delineCount;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "users_vouchers",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "voucher_id")
    )
    private Set<Voucher> vouchers = new HashSet<>();

    public void addVoucher(Voucher voucher) {
        this.vouchers.add(voucher);
    }

    public void deleteVoucher(Voucher voucher) {
        this.vouchers.remove(voucher);
    }
//
//    @Column(name = "image_data")
//    @Lob
//    private byte[] data;


//    @Override
//    public String toString() {
//        return "UserEntity{" +
//                "id=" + id +
//                ", userName='" + userName + '\'' +
//                ", passWord='" + passWord + '\'' +
//                ", email='" + email + '\'' +
//                ", firstName='" + firstName + '\'' +
//                ", lastName='" + lastName + '\'' +
//                ", address='" + address + '\'' +
//                ", age=" + age +
//                ", role=" + role +
//                ", phoneNumber=" + phoneNumber +
//                ", dateOfBirth=" + dateOfBirth +
//                ", sex=" + sex +
//                ", createDate=" + createDate +
//                ", status=" + status +
//                '}';
//    }
}
