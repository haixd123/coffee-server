package com.example.coffee2.controller;


import com.example.coffee2.entity.BillEntity;
import com.example.coffee2.request.BillRequest;
import com.example.coffee2.request.ChangeStatusBillRequest;
import com.example.coffee2.request.CoffeeBeanRequest;
import com.example.coffee2.response.BillResponse;
import com.example.coffee2.response.CoffeeBeanResponse;
import com.example.coffee2.response.base.ApiBaseResponse;
import com.example.coffee2.service.bill.BillService;
import com.example.coffee2.utils.Constants;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
@Log4j2
//@CrossOrigin(origins = "*")
@RequestMapping(path = "api")
public class BillController {
    @Autowired
    private BillService billService;

    @PostMapping("/authors/bill/search")
    public ApiBaseResponse getListBill(@RequestBody BillRequest request) {
        List<BillResponse> listResult = billService.getListBill(request);
        log.info("listResult: " + listResult);
        Long count = billService.getCountListBill(request);
        ApiBaseResponse apiBaseResponse = new ApiBaseResponse();
        apiBaseResponse.setData(listResult);
        apiBaseResponse.setOptional(count);
        return apiBaseResponse;
    }

    @GetMapping("/authors/bill")
    public ResponseEntity<?> getAllBill(Pageable pageable) {
        try {
            return billService.getAll(pageable);
        } catch (Exception e) {
            return ApiBaseResponse.fail(e.getMessage());
        }
    }

    @GetMapping("/authors/bill/{id}")
    public ResponseEntity<?> getById(@PathVariable(name = "id") Long id) {
        try {
            return billService.getById(id);
        } catch (Exception e) {
            return ApiBaseResponse.fail(e.getMessage());
        }
    }

    @GetMapping("/authors/bill/by-user")
    public ResponseEntity<?> getAllByUser(@RequestParam(name = "name", defaultValue = "") String name, Pageable pageable) {
        try {
            return billService.getByUser(pageable, name);
        } catch (Exception e) {
            return ApiBaseResponse.fail(e.getMessage());
        }
    }

    @GetMapping("/authors/bill/by-user/{email}")
    public ResponseEntity<?> getAllByUserEmail(@PathVariable(name = "email") String email, Pageable pageable) {
        try {
            return billService.getByUserEmail(pageable, email);
        } catch (Exception e) {
            return ApiBaseResponse.fail(e.getMessage());
        }
    }


    @GetMapping("/authors/bill/sort")
    public ResponseEntity<?> sortByPriceOrDate(@RequestParam(name = "sortBy", defaultValue = "price") String sortBy, Pageable pageable) {
        try {
            return billService.sortByPriceOrDate(pageable, sortBy.equals("price"));
        } catch (Exception e) {
            return ApiBaseResponse.fail(e.getMessage());
        }
    }

    @PostMapping("/authors/bill/change-status")
    public ResponseEntity<?> changeStatus(@RequestBody ChangeStatusBillRequest request) {
        try {
            return billService.updateBillStatus(request.getStatus(), request.getBillId());
        } catch (Exception e) {
            return ApiBaseResponse.fail(e.getMessage());
        }
    }

    @PostMapping("/authors/bill/create")
    public ApiBaseResponse create(@RequestBody BillRequest request) {
        ApiBaseResponse apiBaseResponse = new ApiBaseResponse();
        boolean rs = billService.create(request);
//        if(!rs) {
//            apiBaseResponse.setErrorCode(Constants.CALL_API_CODE_FAIL);
//            apiBaseResponse.setErrorDescription("Loại cafe đã tồn tại");
//            apiBaseResponse.setData(request);
//            apiBaseResponse.setOptional(1L);
//            return apiBaseResponse;
//        }
//        apiBaseResponse.setErrorCode(Constants.CALL_API_CODE_SUCCESS);
//        apiBaseResponse.setErrorDescription("Đã thêm loại cafe mới");
//        apiBaseResponse.setData(request);
//        apiBaseResponse.setOptional(1L);
        return apiBaseResponse;
    }


    @PostMapping("/authors/bill/delete")
    public ApiBaseResponse delete(@RequestBody ChangeStatusBillRequest request) {
        ApiBaseResponse apiBaseResponse = new ApiBaseResponse();
        boolean rs = billService.delete(request);
        if (!rs) {
            apiBaseResponse.setErrorCode(Constants.CALL_API_CODE_FAIL);
            apiBaseResponse.setErrorDescription("Không tìm thấy hóa đơn");
            apiBaseResponse.setData(request);
            apiBaseResponse.setOptional(1L);
            return apiBaseResponse;
        }
        apiBaseResponse.setErrorCode(Constants.CALL_API_CODE_SUCCESS);
        apiBaseResponse.setErrorDescription("Xóa hóa đơn thành cng");
        apiBaseResponse.setData(request);
        apiBaseResponse.setOptional(1L);
        return apiBaseResponse;
    }

    @PostMapping("/authors/bill/export")
    public void export(HttpServletResponse response, @RequestBody BillRequest request, Pageable pageable) throws Exception {
//        List<BillResponse> listResult = billService.getListBill(request);

        billService.exprot(response, request);
//        log.info("listResult: " + listResult);
//        Long count = billService.getCountListBill(request);
//        ApiBaseResponse apiBaseResponse = new ApiBaseResponse();
//        apiBaseResponse.setData(listResult);
//        apiBaseResponse.setOptional(count);
//        return apiBaseResponse;
    }

//    @PostMapping("/exprotFmisAccountNumber")
//    public void exprotFmisAccountNumber(HttpServletResponse response, @RequestBody FmisAccountNumberRequest request) throws Exception {
//        List<FmisAccountNumberResponse> listResponse = responsitoryInterface.listManagerAccountNumber(request);
//        responsitoryInterface.exprot(response, listResponse, request);
//    }
}
