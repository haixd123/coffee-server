package com.example.coffee2.utils;

public interface Constants {
    String PHONE_PREFIX_VN = "84";
    String PHONE_PREFIX = "0";
    String START_TIME = " 00:00:00";
    String END_TIME = " 23:59:59";
    String DATE_FORMAT_DDMMYYYYhh24miss = "dd/MM/yyyy hh24:mi:ss";
    String API_THIRD_PARTNER_SIG_NAME = "X-VPayEvent-Signature";
    String CALL_API_CODE_SUCCESS = "00";
    String CALL_API_CODE_FAIL = "01";
    String PATH_FILE_UPLOAD = "/mobile-money";
    String CALL_API_CODE_TIMEOUT = "408";

    String CALL_API_FAIL_DESCRIPTION = "Xử lý thất bại";
    String CALL_API_SUCCESS_DESCRIPTION = "Thành công";

    String FOLDER_TEMP = "/temp";

    String CALL_API_EXCEPTION_DESCRIPTION = "Có lỗi trong quá trình xử lý, vui lòng thử lại";

    String CALL_API_COLLECTION_TRANSACTION = "04";
    Integer NOTIFICATION_USER_COMMENT_POST_TYPE = 1;

    Integer NOTIFICATION_POST_DELINE = -1;
    Integer NOTIFICATION_POST_ACCEPT = 2;
    Long POST_STATUS_DELINE = -2L;
    Integer POST_STATUS_ACCEPT = 1;
    Integer POST_STATUS_DRAFT = 2;
}
