package com.erp.commonutil.jpa;

import com.erp.commonutil.config.security.UserContext;
import com.erp.commonutil.util.SecurityUtils;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.LocalDateTime;

/**
 * Audit 데이터 생성
 */
public class CustomAuditingEntityListener {
    private static final Logger log = LoggerFactory.getLogger(CustomAuditingEntityListener.class);

    /**
     * 엔티티 생성 시점에서 생성일시와 생성자 ID를 설정
     * @param entity
     */
    @PrePersist
    public void setCreateOn(Object entity) {
        log.info("entity setCreateOn = {}", entity);

        if(entity instanceof BaseEntity baseEntity) {
            baseEntity.setCreatedAt(LocalDateTime.now());
            baseEntity.setCreatorId(getCurrentAuditor());
        }
    }

    /**
     * 엔티티 수정 시점에서 수정일시와 수정자 ID를 설정
     * @param entity
     */
    @PreUpdate
    public void setUpdateOn(Object entity) {
        log.info("entity setUpdateOn = {}", entity);

        if (entity instanceof BaseEntity baseEntity) {
            baseEntity.setUpdatedAt(LocalDateTime.now());
            baseEntity.setUpdaterId(getCurrentAuditor());
        }
    }

    /**
     * 현재 사용자의 ID를 반환
     * @return 사용자 ID, 없으면 "SYSTEM"
     */
    private Long getCurrentAuditor() {
        UserContext userContext = SecurityUtils.getUserContext();

        if(userContext != null) {
            return userContext.getStaffId();
        }

        return 0L;  // 시스템계정?
    }
}
