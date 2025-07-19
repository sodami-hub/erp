package com.erp.commonutil.config;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * ApplicationContext 제공하는 클래스
 */
@Configuration
public class ApplicationContextSupport {

    /**
     * ApplicationContext를 제공하는 빈을 생성합니다.
     * @param applicationContext  스프링 컨테이너
     * @return ApplicationContextProvider
     */
    @Bean
    public ApplicationContextProvider applicationContextHolder(ApplicationContext applicationContext) {
        ApplicationContextProvider provider = new ApplicationContextProvider();
        provider.setApplicationContext(applicationContext);
        return provider;
    }

    /**
     * ApplicationContextAware를 구현하여 ApplicationContext를 제공
     */
    public static class ApplicationContextProvider implements ApplicationContextAware {
        private static ApplicationContext context;

        @Override
        public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
            context = applicationContext;
        }

        public static ApplicationContext getContext() {
            return context;
        }
    }
}
