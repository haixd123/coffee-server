package com.example.coffee2.shedule;

import com.example.coffee2.entity.BillEntity;
import com.example.coffee2.reponsitory.BillRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;

@Component
@Transactional
@RequiredArgsConstructor
@Slf4j
public class CheckBillTask {

    private final BillRepository billRepository;

    @Scheduled(cron = "0 0 23 * * ?")
    public void handleCheckBill() {
        log.info("Starting check bill...");
        List<BillEntity> billEntities = billRepository.findAll();
        for (BillEntity billEntity : billEntities) {
            long daysDiff = TimeUnit.DAYS.convert(new Date().getTime() - billEntity.getCreateDate().getTime(), TimeUnit.MICROSECONDS);
            if (daysDiff >= 10) {
                billEntity.setStatus(2);
                billRepository.save(billEntity);
            }
        }
    }
}
