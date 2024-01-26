package com.example.coffee2.reponsitory;

import com.example.coffee2.entity.BillDetail;
import com.example.coffee2.entity.BillEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BillDetailRepository extends JpaRepository<BillDetail, Long> {
    void deleteAllByBill(BillEntity bill);
}
