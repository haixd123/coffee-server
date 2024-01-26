package com.example.coffee2.service.voucher;

import com.example.coffee2.request.VoucherRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

public interface VoucherService {
    ResponseEntity<?> addVoucherForUser(Long userId, String voucherId);

    ResponseEntity<?> store(VoucherRequest request);

    ResponseEntity<?> update(VoucherRequest request, String id);

    ResponseEntity<?> delete(String id);

    ResponseEntity<?> getAll(Pageable pageable);

    ResponseEntity<?> getById(String id);

    ResponseEntity<?> sortByCreatedAt(Pageable pageable);

    ResponseEntity<?> sortByDiscount(Pageable pageable);

    ResponseEntity<?> getByUser(Long userId, Pageable pageable);
}
