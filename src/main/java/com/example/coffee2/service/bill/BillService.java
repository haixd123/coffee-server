package com.example.coffee2.service.bill;

import com.example.coffee2.entity.BillEntity;
import com.example.coffee2.request.BillRequest;
import com.example.coffee2.request.ChangeStatusBillRequest;
import com.example.coffee2.response.BillResponse;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.ParseException;
import java.util.List;

public interface BillService {

    List<BillResponse> getListBill(BillRequest request);

    ResponseEntity<?> getAll(Pageable pageable);

    ResponseEntity<?> getById(Long id);

    ResponseEntity<?> getByUser(Pageable pageable, String name);

    ResponseEntity<?> getByUserEmail(Pageable pageable, String email);

    ResponseEntity<?> sortByPriceOrDate(Pageable pageable, boolean isPrice);

    Long getCountListBill(BillRequest request);

    boolean create(BillRequest request);

    boolean delete(ChangeStatusBillRequest request);

    BillEntity create(BillRequest request, boolean payed) throws ParseException;

    void updateBillPayed(Long id);

    ResponseEntity<?> updateBillStatus(Integer status, Long billId);

    //    void exprot(HttpServletResponse response, List<BillResponse> listResponse, BillRequest request) throws IOException;
    void exprot(HttpServletResponse response, BillRequest request) throws IOException;

}
