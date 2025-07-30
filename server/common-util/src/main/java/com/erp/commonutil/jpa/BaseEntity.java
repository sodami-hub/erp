package com.erp.commonutil.jpa;

import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;


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
  // @CreatedBy  User ID 를 인식하려면, AuditorAware 를 구현한 클래스를 만들어야 된다. 실패!! 나중에 구현해보도록
  private Long creatorId;

  @LastModifiedBy
  @Column(name = "updater_id")
  // @LastModifiedBy
  private Long updaterId;
}
