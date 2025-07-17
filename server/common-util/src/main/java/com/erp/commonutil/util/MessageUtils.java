package com.erp.commonutil.util;

import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;

import java.util.Locale;

/**
 * 메시지 유틸리티 클래스
 */
public class MessageUtils {

    /**
     * 메시지를 가져오는 메소드
     * @param code 메시지 코드
     * @return 메시지 문자열
     */
    public static String getMessage(String code) {
        return getMessage(code, new Object[]{});
    }

    /**
     * 메시지를 가져오는 메소드
     * @param code 메시지 코드
     * @param args 메시지에 삽입될 인자
     * @return 메시지 문자열
     */
    public static String getMessage(String code, Object... args) {
        MessageSource messageSource = BeanUtils.getBean(MessageSource.class);

        if(messageSource != null) {
            return messageSource.getMessage(code, args, Locale.KOREA);
        }

        return code;
    }
}
