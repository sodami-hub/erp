package com.erp.staffmanagement.staff_management.dto;

import com.erp.staffmanagement.staff_management.entity.CommonCode;
import java.util.List;
import java.util.stream.Collectors;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CommonCodeByGroupResponseDTO {

  private boolean ok;
  private List<CommonCodeByGroup> listByGroup;
  private String message;

  public CommonCodeByGroupResponseDTO(boolean ok, List<CommonCode> commonCode) {
    this.ok = ok;
    this.listByGroup = commonCode.stream().map(CommonCodeByGroup::new).collect(Collectors.toList());
  }

  public CommonCodeByGroupResponseDTO(boolean ok, String message) {
    this.ok = ok;
    this.message = message;
  }
}
