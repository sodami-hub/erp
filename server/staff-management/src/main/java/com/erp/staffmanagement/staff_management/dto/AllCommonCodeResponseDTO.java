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
public class AllCommonCodeResponseDTO {

  private boolean ok;
  private List<String> work_status;
  private List<String> work_type;
  private List<String> work_list;
  private String errorMessage;
}
