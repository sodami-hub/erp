package com.erp.commonutil.exception.biz;

import com.erp.commonutil.exception.BaseException;

/**
 * 비즈니스 로직에서 발생하는 예외를 나타내는 클래스
 * <pre>어플리케이션 로직에서 에러를 표현하기 위해 사용하는 런타임 예외.</pre>
 */
public class BusinessException extends BaseException {
    private static final long serialVersionUID = -4618118489892558729L;

    /**
     * 생성자
     * @param messageId 에러(메시지) ID
     */
    public BusinessException(String messageId) {
        super(messageId);
    }

    /**
     * 생성자
     * @param messageId 에러(메시지) ID
     * @param cause  caused Throwable
     */
    public BusinessException(String messageId, Throwable cause) {
        super(messageId, cause);
    }
}
