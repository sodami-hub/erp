package com.erp.staffmanagement.staff_management.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CommonCodeResponseDTO {

  private boolean ok;
  private List<String> codeNames;
}
