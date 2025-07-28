package com.erp.staffmanagement.staff_management.entity;

import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
@NoArgsConstructor
public class BaseEntity {

  @Column(name = "created_at")
  @CreatedDate
  private LocalDateTime createdAt;

  @Column(name = "updated_at")
  @LastModifiedDate
  private LocalDateTime updatedAt;

  @Column(name = "creator_id")
  // @CreatedBy  User ID 를 인식하려면, AuditorAware 를 구현한 클래스를 만들어야 된다. 실패!! 나중에 구현해보도록
  private Long creatorId;

  @Column(name = "updater_id")
  // @LastModifiedBy
  private Long updaterId;
}
