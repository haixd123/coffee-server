package com.example.coffee2.service.bill.impl;

import com.example.coffee2.entity.*;
import com.example.coffee2.enums.VoucherType;
import com.example.coffee2.pusher.BillPusher;
import com.example.coffee2.reponsitory.*;
import com.example.coffee2.reponsitory.Customer.BillCustomer;
import com.example.coffee2.request.BillDetailRequest;
import com.example.coffee2.request.BillRequest;
import com.example.coffee2.request.ChangeStatusBillRequest;
import com.example.coffee2.response.BillResponse;
import com.example.coffee2.response.base.ApiBaseResponse;
import com.example.coffee2.service.bill.BillService;
import com.example.coffee2.utils.Constants;
import com.example.coffee2.utils.DateProc;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import com.example.coffee2.utils.ExcelUtil;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.OutputStream;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Log4j2
public class BillServiceImpl implements BillService {
    @Autowired
    private BillRepository respository;

    @Autowired
    private BillDetailRepository billDetailRepository;
    @Autowired
    private BillCustomer billCustomer;

    @Autowired
    private BillPusher billPusher;
    @Autowired
    private UserRespository userRespository;

    @Autowired
    VoucherRepository voucherRepository;
    @Autowired
    private ProductRepository productRepository;

    @Override
    public List<BillResponse> getListBill(BillRequest request) {
        return billCustomer.getListBill(request);
    }

    @Override
    public ResponseEntity<?> getAll(Pageable pageable) {
        return ApiBaseResponse.done("Success", respository.findAll(pageable));
    }

    @Override
    public ResponseEntity<?> getById(Long id) {
        return ApiBaseResponse.done("Success", respository.findById(id).orElse(null));
    }

    @Override
    public ResponseEntity<?> getByUser(Pageable pageable, String name) {
        return ApiBaseResponse.done("Success", respository.findAllByNameContaining(pageable, name));
    }

    @Override
    public ResponseEntity<?> getByUserEmail(Pageable pageable, String email) {
        return ApiBaseResponse.done("Success", respository.findAllByEmail(pageable, email));
    }

    @Override
    public ResponseEntity<?> sortByPriceOrDate(Pageable pageable, boolean isPrice) {
        Page<BillEntity> billEntities = respository.findAll(pageable);
        List<BillEntity> list = billEntities.getContent();
        list.sort(isPrice ? Comparator.comparingLong(BillEntity::getTotal).reversed() : Comparator.comparing(BillEntity::getCreateDate).reversed());
        return ApiBaseResponse.done("Success", new PageImpl<>(list, pageable, billEntities.getTotalElements()));
    }

    @Override
    public Long getCountListBill(BillRequest request) {
        return billCustomer.getCountListBill(request);
    }


    @Override
    public boolean create(BillRequest request) {
        try {
            UserEntity user = userRespository.findByEmail(request.getEmail()).orElse(null);
            if (user == null) {
                return false;
            }
            BillEntity obj = new BillEntity();
            obj.setName(request.getName());
            obj.setEmail(request.getEmail());
            obj.setPhone(request.getPhone());
            obj.setAddress(request.getAddress());
            obj.setCreateDate(DateProc.stringToDateDDMMYYYY(request.getCreateDate()));
            obj.setTotal(request.getTotal());
            applyVoucher(request.getVoucherIds(), obj);
            BillEntity savedBill = respository.save(obj);
            savedBill.setDetails(createBillDetail(request.getBillDetails(), savedBill));
            respository.save(savedBill);
            return true;
        } catch (Exception e) {
            log.error("error: " + e.getMessage());
            return false;
        }
    }

    public void applyVoucher(Set<String> voucherId, BillEntity bill) {
        if (voucherId.isEmpty()) {
            return;
        }
        int discountAllBillVoucher = 0;
        // get all user voucher and delete
        UserEntity user = userRespository.findByEmail(bill.getEmail()).orElse(null);
        if (user == null) {
            return;
        }
        for (String s : voucherId) {
            Voucher voucher = voucherRepository.findById(s).orElse(null);
            if (voucher != null) {
                if (voucher.getVoucherType() == VoucherType.DISCOUNT_ALL_BILL.getValue()) {
                    if (discountAllBillVoucher >= 1) {
                        // toi da duoc dung 1 voucher giam gia tong thoi
                        return;
                    }
                    if (voucher.getExpiredAt().before(new Date())) {
                        // voucher het han
                        return;
                    }
                    discountAllBillVoucher++;
                    Long discountPrice = ((bill.getTotal() / 100) * voucher.getPercentDiscount()) <= voucher.getMaxDiscount() ? ((bill.getTotal() / 100) * voucher.getPercentDiscount()) : voucher.getMaxDiscount();
                    bill.setTotal(bill.getTotal() - discountPrice);
                    bill.addVoucher(voucher);
                    user.deleteVoucher(voucher);
                }
            }
        }
        userRespository.save(user);
    }

    public Set<BillDetail> createBillDetail(Set<BillDetailRequest> requests, BillEntity bill) {
        Set<BillDetail> billDetails = new HashSet<>();
        for (BillDetailRequest billDetailRequest : requests) {
            BillDetail billDetail = new BillDetail();
            ProductEntity productEntity = productRepository.findById(billDetailRequest.getProductId()).orElse(null);
            if (productEntity != null) {
                billDetail.setAmount(productEntity.getPrice() * billDetailRequest.getQuantity());
            }
            billDetail.setQuantity(billDetailRequest.getQuantity());
            billDetail.setProduct(productEntity);
            billDetail.setBill(bill);
            billDetails.add(billDetailRepository.save(billDetail));
        }
        return new HashSet<>(billDetailRepository.saveAll(billDetails));
    }

    @Override
    public BillEntity create(BillRequest request, boolean payed) {
        BillEntity obj = new BillEntity();
        obj.setName(request.getName());
        obj.setEmail(request.getEmail());
        obj.setPhone(request.getPhone());
        obj.setAddress(request.getAddress());
        try {
            obj.setCreateDate(DateProc.stringToDateDDMMYYYY(request.getCreateDate()));
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
        obj.setTotal(request.getTotal());
        return respository.save(obj);
    }

    @Override
    public void updateBillPayed(Long id) {
        BillEntity bill = respository.findById(id).orElseThrow(() -> new RuntimeException("Not found bill"));
        log.info(id);
        log.info(bill);
        respository.save(bill);
    }

    @Override
    public boolean delete(ChangeStatusBillRequest request) {
        BillEntity bill = respository.findById(request.getBillId()).orElse(null);
        if (bill != null) {
            billDetailRepository.deleteAllByBill(bill);
            respository.delete(bill);
            return true;
        }
        return false;
    }

    @Override
    public ResponseEntity<?> updateBillStatus(Integer status, Long billId) {
        BillEntity bill = respository.findById(billId).orElseThrow(() -> new RuntimeException("Not found bill"));
        bill.setStatus(status);
        respository.save(bill);
        if (status == Constants.BILL_STATUS_CANCEL) {
            billPusher.pushBillCancelEvent(bill.getEmail());
        }
        return ApiBaseResponse.done("Success", new HashMap<>());
    }


    @Override
    public void exprot(HttpServletResponse response, List<BillResponse> listResponse, BillRequest request) throws IOException {
        XSSFWorkbook workbook = new XSSFWorkbook();
        XSSFSheet sheetTheND = workbook.createSheet("Công cụ khai báo tài khoản truy cập hệ thống api MYVNPT");
        //????
        int rowNum = 2;
        int columNum = 0;

        XSSFCellStyle boldAlignmentCenterBorder12 = ExcelUtil.cellStyleCustom(workbook, "bold", "center", (short) 12, true);
        XSSFCellStyle boldAlignmentCenterBorder14 = ExcelUtil.cellStyleCustom(workbook, "bold", "center", (short) 14, true);

        rowNum++;
        rowNum++;
        ExcelUtil.mergeCellCustom(1, 1, 0, 5, sheetTheND, workbook, false);
        ExcelUtil.createCell(sheetTheND, 1, 0, "Công cụ thống kê hóa đơn bán hàng", boldAlignmentCenterBorder14);
        ExcelUtil.createCell(sheetTheND, rowNum, 0, "STT", boldAlignmentCenterBorder12);
        ExcelUtil.createCell(sheetTheND, rowNum, 1, "id", boldAlignmentCenterBorder12);
        ExcelUtil.createCell(sheetTheND, rowNum, 2, "Tên người dùng", boldAlignmentCenterBorder12);
        ExcelUtil.createCell(sheetTheND, rowNum, 3, "Email", boldAlignmentCenterBorder12);
        ExcelUtil.createCell(sheetTheND, rowNum, 4, "Số điện thoại", boldAlignmentCenterBorder12);
        ExcelUtil.createCell(sheetTheND, rowNum, 5, "Địa chỉ", boldAlignmentCenterBorder12);
        ExcelUtil.createCell(sheetTheND, rowNum, 6, "Chi tiết hóa đơn", boldAlignmentCenterBorder12);
        ExcelUtil.createCell(sheetTheND, rowNum, 7, "Ngày mua hàng", boldAlignmentCenterBorder12);
        ExcelUtil.createCell(sheetTheND, rowNum, 8, "Tổng tiền", boldAlignmentCenterBorder12);
        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
        XSSFCellStyle normalAlignmentCenterBorder = ExcelUtil.cellStyleCustom(workbook, "", "center", (short) 12, true);
        int index = 1;
        log.info("Bat dau export du lieu ra file: " + System.currentTimeMillis());

        for (BillResponse item : listResponse) {
            columNum = 0;
            rowNum++;
            ExcelUtil.createLongCell(sheetTheND, rowNum, columNum++, index++, boldAlignmentCenterBorder12);
            ExcelUtil.createCell(sheetTheND, rowNum, columNum++, String.valueOf(item.getId()), normalAlignmentCenterBorder);
            ExcelUtil.createCell(sheetTheND, rowNum, columNum++, item.getName(), normalAlignmentCenterBorder);
            ExcelUtil.createCell(sheetTheND, rowNum, columNum++, item.getEmail(), normalAlignmentCenterBorder);
            ExcelUtil.createCell(sheetTheND, rowNum, columNum++, item.getPhone(), normalAlignmentCenterBorder);
            ExcelUtil.createCell(sheetTheND, rowNum, columNum++, item.getAddress(), normalAlignmentCenterBorder);
            ExcelUtil.createCell(sheetTheND, rowNum, columNum++, item.getDetail(), normalAlignmentCenterBorder);
            ExcelUtil.createCell(sheetTheND, rowNum, columNum++, item.getCreateDate(), normalAlignmentCenterBorder);
            ExcelUtil.createCell(sheetTheND, rowNum, columNum++, item.getTotal(), normalAlignmentCenterBorder);
            log.info("Du lieu: " + item);
        }
        log.info("Ket thuc export du lieu ra file: " + System.currentTimeMillis());
        for (int i = 0; i < 10; i++)
            sheetTheND.autoSizeColumn(i, true);
        String file_name = "Thong-ke-hoa-don-ban-hang " + System.currentTimeMillis();
        response.setHeader("Content-Disposition", "attachment; filename=\"" + file_name + ".xlsx\"");
        OutputStream out = response.getOutputStream();
        workbook.write(out);
        out.close();

    }

}
