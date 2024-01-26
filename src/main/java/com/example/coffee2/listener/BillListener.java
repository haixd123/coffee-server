package com.example.coffee2.listener;


import com.example.coffee2.entity.CommentEntity;
import com.example.coffee2.entity.Notification;
import com.example.coffee2.entity.UserEntity;
import com.example.coffee2.event.BillCancelEvent;
import com.example.coffee2.event.CommentHideEvent;
import com.example.coffee2.reponsitory.CommentRepository;
import com.example.coffee2.reponsitory.NotificationRepository;
import com.example.coffee2.reponsitory.UserRespository;
import com.example.coffee2.utils.Constants;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

import java.util.HashMap;

@Component
@RequiredArgsConstructor
@Slf4j
public class BillListener {
    private final SimpMessagingTemplate simpMessagingTemplate;

    private final NotificationRepository notificationRepository;

    private final UserRespository userRespository;

    @EventListener
    public void billHide(BillCancelEvent billCancelEvent) {
        UserEntity user = userRespository.findByEmail(billCancelEvent.getEmail()).orElse(null);
        if (user == null) {
            return;
        }
        Notification notification = new Notification();
        notification.setImagePost(user.getImage());
        notification.setNotificationType(Constants.NOTIFICATION_BILL_CANCEL);
        notification.setUser(user);
        notification.setContent("Yêu cầu hủy đơn hàng của bạn đã được xác nhận");
        notification.setReaded(false);
        notification.setPostId(null);
        notification.setFromUser("Admin");
        notificationRepository.save(notification);
        simpMessagingTemplate.convertAndSend("/notifications", new HashMap<>());
    }
}
