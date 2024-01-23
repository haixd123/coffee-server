package com.example.coffee2.listener;

import com.example.coffee2.entity.CommentEntity;
import com.example.coffee2.entity.Notification;
import com.example.coffee2.entity.UserEntity;
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
public class CommentListener {
    private final SimpMessagingTemplate simpMessagingTemplate;

    private final CommentRepository commentRepository;

    private final UserRespository userRespository;

    private final NotificationRepository notificationRepository;

    @EventListener
    public void commentHide(CommentHideEvent commentHideEvent) {
        CommentEntity comment = commentRepository.findById(commentHideEvent.getCommentId()).orElse(null);
        if (comment == null) {
            log.error("Comment null");
            return;
        }
        UserEntity user = userRespository.findById(comment.getUserId()).orElse(null);
        if (user == null) {
            log.error("user null");
            return;
        }
        Notification notification = new Notification();
        notification.setImagePost(user.getImage());
        notification.setNotificationType(Constants.NOTIFICATION_COMMENT_HIDE_TYPE);
        notification.setUser(user);
        notification.setContent("Bình luận của bạn đã bị xóa do vi phạm nguyên tắc cộng đồng");
        notification.setReaded(false);
        notification.setPostId(comment.getPostId());
        notification.setFromUser("Admin");
        notificationRepository.save(notification);
        simpMessagingTemplate.convertAndSend("/notifications", new HashMap<>());
    }
}
