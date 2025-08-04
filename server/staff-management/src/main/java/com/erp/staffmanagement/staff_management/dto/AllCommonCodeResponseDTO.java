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
  private List<CommonCodeByGroup> work_status;
  private List<CommonCodeByGroup> work_type;
  private List<CommonCodeByGroup> work_list;
  private String errorMessage;
}
