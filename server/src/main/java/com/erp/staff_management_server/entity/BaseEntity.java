package com.erp.staff_management_server.entity;

import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
@Getter
public class BaseEntity {

     @Column(name = "created_at")
     @CreatedDate
     private LocalDateTime createdAt;

     @Column(name = "updated_at")
     @LastModifiedDate
     private LocalDateTime updatedAt;

     @Column(name = "creator_id")
     @CreatedBy  // User ID 를 인식하려면, AuditorAware 를 구현한 클래스를 만들어야 된다.
     private String creatorId;

     @Column(name = "updater_id")
     @LastModifiedBy
     private String updaterId;
}
