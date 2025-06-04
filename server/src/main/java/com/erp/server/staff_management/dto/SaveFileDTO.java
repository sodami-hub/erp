package com.erp.server.staff_management.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SaveFileDTO {

  private Long id;
  private String originalName;
  private String saveName;
}
