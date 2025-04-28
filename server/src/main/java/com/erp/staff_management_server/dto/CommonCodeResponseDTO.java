package com.erp.staff_management_server.dto;

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
  private List<String> authList;
  private List<String> workTypeList;
  private List<String> workList;
  private List<String> workStatusList;

}
