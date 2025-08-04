package com.erp.staffmanagement.staff_management.dto;

import com.erp.staffmanagement.staff_management.entity.CommonCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CommonCodeByGroup {

  private String subCode;
  private String codeName;

  public CommonCodeByGroup(CommonCode commonCode) {
    this.subCode = commonCode.getSubCode();
    this.codeName = commonCode.getCodeName();
  }
}
