package com.erp.server.staff_management.entity;

import com.erp.server.staff_management.dto.SaveFileDTO;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
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

  public DependencyDocuments(SaveFileDTO saveFileDTO, Long managerId) {
    this.staffId = saveFileDTO.getId();
    this.originalName = saveFileDTO.getOriginalName();
    this.saveName = saveFileDTO.getSaveName();
    super.setCreatorId(managerId);
    super.setUpdaterId(managerId);
  }
}
