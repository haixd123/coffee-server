package com.example.coffee2.response;

import com.example.coffee2.entity.Notification;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class NotificationResponse {
    public static NotificationResponse mapTo(Notification notification) {
        NotificationResponse notificationResponse = new NotificationResponse();
        notificationResponse.setPostId(notificationResponse.getPostId());
        notificationResponse.setContent(notification.getContent());
        notificationResponse.setFromUser(notification.getFromUser());
        notificationResponse.setUsername(notification.getUser().getUserName());
        notificationResponse.setReaded(false);
        notificationResponse.setImagePost(notification.getImagePost());
        notificationResponse.setCreatedAt(notification.getCreatedAt());
        return notificationResponse;
    }

    private Long id;
    private String username;
    private Long postId;
    private String content;
    private boolean readed;
    private int notificationType;

    private String fromUser;

    private String postCategory;

    private LocalDateTime createdAt;
    private String imagePost;

//    private String createdAt;
}
