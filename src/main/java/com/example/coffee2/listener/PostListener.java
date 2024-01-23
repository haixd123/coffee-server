package com.example.coffee2.listener;

import com.example.coffee2.entity.Notification;
import com.example.coffee2.entity.PostsEntity;
import com.example.coffee2.entity.UserEntity;
import com.example.coffee2.event.PostAcceptEvent;
import com.example.coffee2.event.PostDelineEvent;
import com.example.coffee2.event.PostHideEvent;
import com.example.coffee2.event.PostReportEvent;
import com.example.coffee2.reponsitory.NotificationRepository;
import com.example.coffee2.reponsitory.PostsRepository;
import com.example.coffee2.reponsitory.UserRespository;
import com.example.coffee2.response.NotificationResponse;
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
public class PostListener {

    private final SimpMessagingTemplate simpMessagingTemplate;


    private final NotificationRepository notificationRepository;

    private final UserRespository userRespository;

    private final PostsRepository postsRepository;

    @EventListener
    public void listenPostDeline(PostDelineEvent postDelineEvent) {
        PostDelineEvent.PostDelineReq req = postDelineEvent.getData();
        Notification notification = new Notification();
        PostsEntity postsEntity = postsRepository.findById(req.getPostId()).orElse(null);
        if (postsEntity == null) {
            log.error("post not found");
            return;
        }
        UserEntity user = userRespository.findById(postsEntity.getUserId()).orElse(null);
        if (user == null) {
            log.error("author not found");
            return;
        }
        notification.setPostId(postsEntity.getId());
        notification.setUser(user);
        notification.setReaded(false);
        notification.setNotificationType(Constants.NOTIFICATION_POST_DELINE);
        notification.setFromUser("Admin");
        notification.setContent("Bài viết của bạn đã bị từ chối.");
        notification.setImagePost(user.getImage() != null ? user.getImage() : postsEntity.getImagePath());
        Notification savedNotification = notificationRepository.save(notification);
        simpMessagingTemplate.convertAndSend("/notifications", NotificationResponse.mapTo(savedNotification));
    }

    @EventListener
    public void listenPostHide(PostHideEvent postHideEvent) {
        PostsEntity postsEntity = postsRepository.findById(postHideEvent.getPostHideReq().getPostId()).orElse(null);
        if (postsEntity == null) {
            log.error("post not found");
            return;
        }
        UserEntity author = userRespository.findById(postsEntity.getUserId()).orElse(null);
        if (author == null) {
            log.error("author not found");
            return;
        }
        Notification notification = new Notification();
        notification.setPostId(postsEntity.getId());
        notification.setUser(author);
        notification.setReaded(false);
        notification.setNotificationType(Constants.NOTIFICATION_POST_HIDE);
        notification.setFromUser("Admin");
        notification.setContent("Bài viết của bạn đã bị gỡ.");
        notification.setImagePost(author.getImage() != null ? author.getImage() : postsEntity.getImagePath());
        Notification savedNotification = notificationRepository.save(notification);
        simpMessagingTemplate.convertAndSend("/notifications", NotificationResponse.mapTo(savedNotification));
    }

    @EventListener
    public void listenPostAccept(PostAcceptEvent postAcceptEvent) {
        PostAcceptEvent.PostAcceptEventReq req = postAcceptEvent.getData();
        Notification notification = new Notification();
        PostsEntity postsEntity = postsRepository.findById(req.getPostId()).orElse(null);
        if (postsEntity == null) {
            log.error("post not found");
            return;
        }
        UserEntity user = userRespository.findById(postsEntity.getUserId()).orElse(null);
        if (user == null) {
            log.error("author not found");
            return;
        }
        notification.setPostId(postsEntity.getId());
        notification.setUser(user);
        notification.setReaded(false);
        notification.setNotificationType(Constants.NOTIFICATION_POST_ACCEPT);
        notification.setFromUser("Admin");
        notification.setContent("Bài viết của bạn đã được duyệt.");
        notification.setImagePost(user.getImage() != null ? user.getImage() : postsEntity.getImagePath());
        Notification savedNotification = notificationRepository.save(notification);
        simpMessagingTemplate.convertAndSend("/notifications", NotificationResponse.mapTo(savedNotification));
    }

    @EventListener
    public void listenPostReport(PostReportEvent postReportEvent) {
        PostReportEvent.PostReportReq req = postReportEvent.getPostReportReq();
        Notification notification = new Notification();
        PostsEntity postsEntity = postsRepository.findById(req.getPostId()).orElse(null);
        if (postsEntity == null) {
            log.error("post not found");
            return;
        }
        UserEntity user = userRespository.findById(postsEntity.getUserId()).orElse(null);
        if (user == null) {
            log.error("author not found");
            return;
        }
        notification.setPostId(postsEntity.getId());
        notification.setUser(user);
        notification.setReaded(false);
        notification.setNotificationType(Constants.NOTIFICATION_POST_ACCEPT);
        notification.setFromUser("Admin");
        notification.setContent("Bài viết của bạn đã bị báo cáo.");
        notification.setImagePost(user.getImage() != null ? user.getImage() : postsEntity.getImagePath());
        Notification savedNotification = notificationRepository.save(notification);
        simpMessagingTemplate.convertAndSend("/notifications", NotificationResponse.mapTo(savedNotification));
    }
}
