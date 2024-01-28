package com.example.coffee2.reponsitory.Customer.impl;

import com.example.coffee2.reponsitory.Customer.CommentCustomer;
import com.example.coffee2.request.CommentRequest;
import com.example.coffee2.request.LikePostsRequest;
import com.example.coffee2.response.CommentPostResponse;
import com.example.coffee2.response.CommentResponse;
import com.example.coffee2.response.LikePostsResponse;
import com.example.coffee2.utils.FunctionUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.math.BigInteger;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Repository
public class CommentCustomerImpl implements CommentCustomer {

    @Autowired
    private final EntityManager entityManager;

    public CommentCustomerImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public List<CommentResponse> getListComment(CommentRequest request) {
        try {
            StringBuilder sql = new StringBuilder();
            Map<String, Object> params = new HashMap<>();
            createSqlGetListCommentPosts(request, sql, params, false);
            Query query = entityManager.createNativeQuery(sql.toString());
            if (params.size() > 0) {
                params.forEach((key, value) -> {
                    query.setParameter(key, value);
                });
            }
            if (request.getPageIndex() != 0 && request.getPageSize() != 0) {
                query.setFirstResult((request.getPageIndex() - 1) * request.getPageSize());
                query.setMaxResults(request.getPageSize());
            }
            return FunctionUtils.mapping(query.getResultList(), CommentResponse.class);
        } catch (Exception e) {
            log.error("error1: " + e.getMessage());
        }
        return null;
    }

    @Override
    public Long getCountListComment(CommentRequest request) {
        try {
            StringBuilder sql = new StringBuilder();
            Map<String, Object> params = new HashMap<>();
            createSqlGetListCommentPosts(request, sql, params, true);
            Query query = entityManager.createNativeQuery(sql.toString());
            if (params.size() > 0) {
                params.forEach((key, value) -> {
                    query.setParameter(key, value);
                });
            }

            Long count = ((BigInteger) query.getSingleResult()).longValue();
            return count;
        } catch (Exception e) {
            log.error("error2: " + e.getMessage());
        }
        return null;
    }


    private void createSqlGetListCommentPosts(CommentRequest request, StringBuilder sql, Map<String, Object> params, boolean isCount) {
        if (isCount) {
            sql.append("select count(*) \n");
            sql.append("from \n");
            sql.append("comment f \n");
//            sql.append("where f.status = 1 \n");
//            if (request.getPostId() != null) {
//                sql.append(" where 1=1 ");
//                sql.append(" and f.post_id = :postId \n");
//                params.put("postId", request.getPostId());
//                sql.append("update dbo.posts set total_comment = (select count(comment_id) from comment where post_id= :postId ) where id= :postId");
//                params.put("postId", request.getPostId());
//            }
        } else {
            sql.append("select \n");
            sql.append("f.id, \n");
            sql.append("f.comment_id, \n");
            sql.append("f.user_id, \n");
            sql.append("f.post_id, \n");
            sql.append("f.comment_text, \n");
            sql.append("f.create_at, \n");
            sql.append("f.update_at, \n");
            sql.append("f.like_comment, \n");
            sql.append("f.status \n");
            sql.append("from \n");
            sql.append(" comment f \n");
            sql.append(" where 1 = 1 \n");
            if (request.getStatus() != null) {
                sql.append(" and f.status = :status \n");
                params.put("status", request.getStatus());
            }
            sql.append(" order by create_at desc \n");
        }

    }

    public Long getTotalCommentPosts(CommentRequest request) {
        try {
            StringBuilder sql = new StringBuilder();
            Map<String, Object> params = new HashMap<>();
            createSqlGetTotalCommentPosts(request, sql, params);
            Query query = entityManager.createNativeQuery(sql.toString());
            if (params.size() > 0) {
                params.forEach((key, value) -> {
                    query.setParameter(key, value);
                });
            }

            Long count = ((BigInteger) query.getSingleResult()).longValue();
            return count;
        } catch (Exception e) {
            log.error("error2: " + e.getMessage());
        }
        return null;
    }

    @Override
    public List<CommentPostResponse> getCommentPost(CommentRequest request) {
        try {
            StringBuilder sql = new StringBuilder();
            Map<String, Object> params = new HashMap<>();
            createSqlGetCommentPost(request, sql, params);
            Query query = entityManager.createNativeQuery(sql.toString());
            if (params.size() > 0) {
                params.forEach((key, value) -> {
                    query.setParameter(key, value);
                });
            }
            if (request.getPageIndex() != 0 && request.getPageSize() != 0) {
                query.setFirstResult((request.getPageIndex() - 1) * request.getPageSize());
                query.setMaxResults(request.getPageSize());
            }
            return FunctionUtils.mapping(query.getResultList(), CommentPostResponse.class);
        } catch (Exception e) {
            log.error("error1: " + e.getMessage());
        }
        return null;
    }

    private void createSqlGetTotalCommentPosts(CommentRequest request, StringBuilder sql, Map<String, Object> params) {
        sql.append("select count(*) " +
                " from comment c " +
                " join posts p " +
                " on c.post_id=p.id " +
                " where 1=1 and p.user_id = :userId  \n");
//        sql.append("where 1 = 1 \n");
//        sql.append("and user_id = :userId \n");
        params.put("userId", request.getUserId());
    }

    private void createSqlGetCommentPost(CommentRequest request, StringBuilder sql, Map<String, Object> params) {
        sql.append("SELECT c.id AS commentId,c.comment_text AS commentText,u.user_name AS username,u.image AS avatarUser,(CASE WHEN lc.user_id = :userId AND lc.is_like_comment = 1 THEN 1 ELSE 0 END) AS userLiked,c.create_at AS createAt,c.update_at AS updateAt,c.like_comment AS amountLike,c.status AS status FROM comment c LEFT JOIN like_comments lc ON c.id = lc.comment_id LEFT JOIN user1 u ON c.user_id = u.id WHERE c.post_id = :postId AND c.status = 1");
        params.put("postId", request.getPostId());
        params.put("userId", request.getUserId());
    }
}
