package com.erp.commonutil.exception;

/**
 * ERP 시스템에서 발생하는 예외의 최상위 클래스
 */
public class BaseException extends RuntimeException {
    private static final long serialVersionUID = -166857657035941702L;

    private String messageId; // 메시지 아이디

    /**
     * 생성자
     * @param messageId 메시지 아이디
     */
    public BaseException(String messageId) {
        super(messageId);
        this.messageId = messageId;
    }

    /**
     * 생성자
     * @param messageId 메시지 아이디
     * @param cause     caused Throwable
     */
    public BaseException(String messageId, Throwable cause) {
        super(messageId, cause);
        this.messageId = messageId;
    }

    /**
     * 메시지 아이디 반환
     * @return 메시지 아이디
     */
    public String getMessageId() {
        return messageId;
    }

    /**
     * 예외의 원인(Throwable)을 반환
     * @return 예외의 원인(Throwable)
     */
    public Throwable getCause() {
        return super.getCause();
    }
}
