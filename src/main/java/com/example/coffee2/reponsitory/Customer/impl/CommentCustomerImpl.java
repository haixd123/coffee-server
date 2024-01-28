package com.example.coffee2.reponsitory.Customer.impl;

import com.example.coffee2.reponsitory.Customer.CommentCustomer;
import com.example.coffee2.request.CommentRequest;
import com.example.coffee2.request.LikeCommentRequest;
import com.example.coffee2.request.LikePostsRequest;
import com.example.coffee2.response.CommentPostResponse;
import com.example.coffee2.response.CommentResponse;
import com.example.coffee2.response.LikeCommentResponse;
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


    public List<LikeCommentResponse> getListLikeComment(LikeCommentRequest request) {
        try {
            StringBuilder sql = new StringBuilder();
            Map<String, Object> params = new HashMap<>();
            createSqlGetListLikeComment(request, sql, params, false);
            Query query = entityManager.createNativeQuery(sql.toString());
            if (params.size() > 0) {
                params.forEach((key, value) -> {
                    query.setParameter(key, value);
                });
            }
            return FunctionUtils.mapping(query.getResultList(), LikeCommentResponse.class);
        } catch (Exception e) {
            log.error("error1: " + e.getMessage());
        }
        return null;
    }

    private void createSqlGetListLikeComment(LikeCommentRequest request, StringBuilder sql, Map<String, Object> params, boolean isCount) {
//        if (!isCount) {
        sql.append(" select lc.comment_id as lcCommentId, lc.user_id, c.user_id as lcUserId, \n" +
                " c.post_id, c.comment_text, \n" +
                "c.create_at, c.like_comment, u.name, u.user_name, u.image \n" +
                "from comment c \n" +
                "left join user1 u \n" +
                "on c.user_id = u.id \n" +
                "right join like_comments lc on c.id = lc.comment_id \n" +
                "where 1 = 1 and c.status != -1 \n");
        if (request.getPostId() != null) {
            sql.append(" and c.post_id = :postId \n");
            params.put("postId", request.getPostId());
        }

        sql.append(" order by c.create_at desc ");
//        }
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

            return ((BigInteger) query.getSingleResult()).longValue();

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

            return ((Long) query.getSingleResult()).longValue();
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
        sql.append("select c.id, c.user_id, c.post_id, c.comment_text, c.create_at, u.name, u.image from comment c left join user1 u on u.id = c.user_id\n" +
                "where c.status != -1");
        if(request.getPostId() != null) {
        sql.append(" and c.post_id = :postId \n");
        params.put("postId", request.getPostId());

        }
//        params.put("postId", request.getPostId());
//        params.put("userId", request.getUserId());
    }
}
