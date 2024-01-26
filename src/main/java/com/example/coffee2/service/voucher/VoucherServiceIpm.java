package com.example.coffee2.service.voucher;

import com.example.coffee2.entity.UserEntity;
import com.example.coffee2.entity.Voucher;
import com.example.coffee2.reponsitory.BillRepository;
import com.example.coffee2.reponsitory.UserRespository;
import com.example.coffee2.reponsitory.VoucherRepository;
import com.example.coffee2.request.VoucherRequest;
import com.example.coffee2.response.base.ApiBaseResponse;
import com.example.coffee2.utils.Mapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class VoucherServiceIpm implements VoucherService {
    private final VoucherRepository voucherRepository;

    private final UserRespository userRespository;


    @Override
    public ResponseEntity<?> addVoucherForUser(Long userId, String voucherId) {
        Voucher voucher = voucherRepository.findById(voucherId).orElse(null);
        UserEntity user = userRespository.findById(userId).orElse(null);
        if (voucher == null) {
            return ApiBaseResponse.fail("Not found voucher with id" + voucherId);
        }
        if (user == null) {
            return ApiBaseResponse.fail("Not found user with id" + userId);
        }
        user.addVoucher(voucher);
        userRespository.save(user);
        return ApiBaseResponse.done("Success", new HashMap<>());
    }

    @Override
    public ResponseEntity<?> store(VoucherRequest request) {
        Voucher voucher = new Voucher();
        BeanUtils.copyProperties(request, voucher);
        return ApiBaseResponse.done("Success", voucherRepository.saveAndFlush(voucher));
    }

    @Override
    public ResponseEntity<?> update(VoucherRequest request, String id) {
        Voucher voucher = voucherRepository.findById(id).orElse(null);
        if (voucher == null) {
            return ApiBaseResponse.fail("Voucher not found with id " + id);
        }
        Mapper.copyNonNullProperties(request, voucher);
        voucherRepository.save(voucher);
        return ApiBaseResponse.done("Success", voucherRepository.saveAndFlush(voucher));
    }

    @Override
    public ResponseEntity<?> delete(String id) {
        voucherRepository.deleteById(id);
        return ApiBaseResponse.done("Delete success", new HashMap<>());
    }

    @Override
    public ResponseEntity<?> getAll(Pageable pageable) {
        return ApiBaseResponse.done("Success", voucherRepository.findAll(pageable));
    }

    @Override
    public ResponseEntity<?> getNotByUser(Long userId, Pageable pageable) {
        List<Voucher> vouchers = voucherRepository.findAll();
        UserEntity user = userRespository.findById(userId).orElse(null);
        List<Voucher> notByUser = new ArrayList<>();
        if (user != null) {
            vouchers.forEach((v) -> {
                if (!user.getVouchers().contains(v)) {
                    notByUser.add(v);
                }
            });
        }
        notByUser.sort(Comparator.comparingInt(Voucher::getPercentDiscount));
        return ApiBaseResponse.done("Success", new PageImpl<>(notByUser, pageable, notByUser.size()));
    }

    @Override
    public ResponseEntity<?> getById(String id) {
        return ApiBaseResponse.done("Success", voucherRepository.findById(id));
    }

    @Override
    public ResponseEntity<?> sortByCreatedAt(Pageable pageable) {
        return getResponseEntity(pageable, Comparator.comparing(Voucher::getCreatedAt));
    }

    @Override
    public ResponseEntity<?> sortByDiscount(Pageable pageable) {
        return getResponseEntity(pageable, Comparator.comparingInt(Voucher::getPercentDiscount));
    }

    @Override
    public ResponseEntity<?> getByUser(Long userId, Pageable pageable) {
        UserEntity user = userRespository.findById(userId).orElse(null);
        if (user == null) {
            return ApiBaseResponse.fail("User not found with id " + userId);
        }
        return ApiBaseResponse.done("Success", new PageImpl<>(Arrays.asList(user.getVouchers().toArray()), pageable, user.getVouchers().size()));
    }

    private ResponseEntity<?> getResponseEntity(Pageable pageable, Comparator<Voucher> comparing) {
        Page<Voucher> vouchers = voucherRepository.findAll(pageable);
        List<Voucher> list = vouchers.getContent();
        list.sort(comparing);
        return ApiBaseResponse.done("Success", new PageImpl<>(list, pageable, vouchers.getTotalElements()));
    }
}
