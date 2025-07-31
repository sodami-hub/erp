package com.erp.commonutil.jpa;

import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;


@Getter
@Setter
@MappedSuperclass
@NoArgsConstructor
@EntityListeners(CustomAuditingEntityListener.class)
public class BaseEntity {

  @Column(name = "created_at")
  @CreatedDate
  private LocalDateTime createdAt;

  @LastModifiedDate
  @Column(name = "updated_at")
  private LocalDateTime updatedAt;

  @CreatedBy
  @Column(name = "creator_id")
  private Long creatorId;

  @LastModifiedBy
  @Column(name = "updater_id")
  private Long updaterId;
}
