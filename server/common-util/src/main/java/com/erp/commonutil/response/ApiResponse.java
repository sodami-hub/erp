package com.erp.commonutil.response;

import org.springframework.http.HttpStatus;

/**
 * 공통응답객체
 * @param <T>
 */
public class ApiResponse<T> {
    /** status code */
    private HttpStatus status;

    /** 메시지 */
    private String message;

    /** Body */
    private T data;

    /**
     * ApiResponse 생성자
     * @param status
     * @param message
     * @param data
     */
    public ApiResponse(HttpStatus status, String message, T data) {
        this.status = status;
        this.message = message;
        this.data = data;
    }

    /**
     * 성공 응답 생성
     * @param data
     * @return
     * @param <T>
     */
    public static <T> ApiResponse<T> success(T data) {
        return new ApiResponse<>(HttpStatus.OK, "success", data);
    }

    /**
     * 실패 응답 생성
     * @param message
     * @return
     * @param <T>
     */
    public static <T> ApiResponse<T> error(String message) {
        return new ApiResponse<>(HttpStatus.INTERNAL_SERVER_ERROR, message, null);
    }

    /**
     * 실패 응답 생성
     * @param status
     * @param message
     * @return
     * @param <T>
     */
    public static <T> ApiResponse<T> error(HttpStatus status, String message) {
        return new ApiResponse<>(status, message, null);
    }
}
