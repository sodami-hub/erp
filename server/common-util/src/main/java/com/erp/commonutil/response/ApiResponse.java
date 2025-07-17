package com.erp.commonutil.response;

import lombok.Getter;
import org.springframework.http.HttpStatus;

import java.io.Serializable;

/**
 * 공통응답객체
 * @param <T>
 */
@Getter
public class ApiResponse<T> implements Serializable {
    private static final long serialVersionUID = 1L;

    /** 성공 여부 */
    private boolean ok;

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
    public ApiResponse(boolean ok, HttpStatus status, String message, T data) {
        this.ok = ok;
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
        return new ApiResponse<>(true, HttpStatus.OK, "success", data);
    }

    /**
     * 실패 응답 생성
     * @param message
     * @return
     * @param <T>
     */
    public static <T> ApiResponse<T> error(String message) {
        return new ApiResponse<>(false, HttpStatus.INTERNAL_SERVER_ERROR, message, null);
    }

    /**
     * 실패 응답 생성
     * @param status
     * @param message
     * @return
     * @param <T>
     */
    public static <T> ApiResponse<T> error(HttpStatus status, String message) {
        return new ApiResponse<>(false, status, message, null);
    }
}
