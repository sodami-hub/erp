package com.erp.staff_management_server.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "documents")
public class DependencyDocuments extends BaseEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "document_id")
  private Long documentId;

  @Column(name = "staff_id", nullable = false)
  private Long staffId;

  @Column(name = "original_name", nullable = false)
  private String originalName;

  @Column(name = "save_name", nullable = false)
  private String saveName;
}
