package com.erp.commonutil.util;


import com.erp.commonutil.config.ApplicationContextSupport;
import org.springframework.context.ApplicationContext;

/**
 * 스프링 빈을 가져오는 유틸리티 클래스
 */
public class BeanUtils {

    /**
     * 스프링 컨테이너에서 지정된 이름의 빈 조회
     * @param beanName 빈 이름
     * @return 빈 객체
     */
    public static Object getBean(String beanName) {
        return getContext().getBean(beanName);
    }

    /**
     * 스프링 컨테이너에서 지정된 클래스 타입의 빈 조회
     * @param clazz  빈타입
     * @return       빈 객체
     * @param <T>    반환타입
     */
    public static <T> T getBean(Class<T> clazz) {
        return getContext().getBean(clazz);
    }

    /**
     * 스프링 컨테이너에서 지정된 이름의 빈 조회
     * @return ApplicationContext
     */
    private static ApplicationContext getContext() {
        return ApplicationContextSupport.ApplicationContextProvider.getContext();
    }
}
