package com.example.coffee2.reponsitory;

import com.example.coffee2.entity.BillEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BillRepository extends JpaRepository<BillEntity, Long> {
    Page<BillEntity> findAllByNameContaining(Pageable pageable, String name);
    Page<BillEntity> findAllByEmail(Pageable pageable,String email);
}
