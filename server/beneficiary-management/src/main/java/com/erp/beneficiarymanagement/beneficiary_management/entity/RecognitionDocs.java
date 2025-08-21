package com.erp.beneficiarymanagement.beneficiary_management.entity;

import com.erp.commonutil.jpa.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "recognition_docs")
public class RecognitionDocs extends BaseEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "document_id")
  private Integer documentId;

  @Column(name = "beneficiary_id")
  private Integer beneficiaryId;

  @Column(name = "original_name")
  private String originalName;

  @Column(name = "save_name")
  private String saveName;
}
