package com.erp.staff_management_server.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DependencyDocumentDTO {

  private Long staffId;
  private String originalName;
  private String saveName;
}
