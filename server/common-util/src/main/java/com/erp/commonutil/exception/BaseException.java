package com.erp.commonutil.exception;

/**
 * ERP 시스템의 기본 예외 클래스
 */
public class BaseException extends RuntimeException {
    public BaseException(String message) {
        super(message);
    }
}
