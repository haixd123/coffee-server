package com.example.coffee2.controller;

import com.example.coffee2.request.AddVoucherForUserRequest;
import com.example.coffee2.request.VoucherRequest;
import com.example.coffee2.response.base.ApiBaseResponse;
import com.example.coffee2.service.voucher.VoucherService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/authors/voucher")
public class VoucherController {

    private final VoucherService voucherService;

    @PostMapping
    public ResponseEntity<?> create(@RequestBody VoucherRequest voucherRequest) {
        try {
            return voucherService.store(voucherRequest);
        } catch (Exception e) {
            return ApiBaseResponse.fail(e.getMessage());
        }
    }

    @PostMapping("/add-for-user")
    public ResponseEntity<?> addVoucherForUser(@RequestBody AddVoucherForUserRequest request) {
        try {
            return voucherService.addVoucherForUser(request.getUserId(), request.getVoucherId());
        } catch (Exception e) {
            return ApiBaseResponse.fail(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> edit(@RequestBody VoucherRequest voucherRequest, @PathVariable(name = "id") String id) {
        try {
            return voucherService.update(voucherRequest, id);
        } catch (Exception e) {
            return ApiBaseResponse.fail(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> destroy(@PathVariable(name = "id") String id) {
        try {
            return voucherService.delete(id);
        } catch (Exception e) {
            return ApiBaseResponse.fail(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> getAll(Pageable pageable) {
        try {
            return voucherService.getAll(pageable);
        } catch (Exception e) {
            return ApiBaseResponse.fail(e.getMessage());
        }
    }

    @GetMapping("/by-not-user/{userId}")
    public ResponseEntity<?> getNotByUser(@PathVariable(name = "userId") Long userId, Pageable pageable) {
        try {
            return voucherService.getNotByUser(userId, pageable);
        } catch (Exception e) {
            return ApiBaseResponse.fail(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable(name = "id") String id) {
        try {
            return voucherService.getById(id);
        } catch (Exception e) {
            return ApiBaseResponse.fail(e.getMessage());
        }
    }

    @GetMapping("/sort-by-type")
    public ResponseEntity<?> sortByType(@RequestParam(name = "type", defaultValue = "created_at") String type, Pageable pageable) {
        try {
            switch (type) {
                case "discount":
                    return voucherService.sortByDiscount(pageable);
                default:
                    return voucherService.sortByCreatedAt(pageable);
            }
        } catch (Exception e) {
            return ApiBaseResponse.fail(e.getMessage());
        }
    }

    @GetMapping("/by-user/{userId}")
    public ResponseEntity<?> getByUser(@PathVariable(name = "userId") Long userId, Pageable pageable) {
        try {
            return voucherService.getByUser(userId, pageable);
        } catch (Exception e) {
            return ApiBaseResponse.fail(e.getMessage());
        }
    }
}
