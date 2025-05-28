package com.erp.staff_management_server.staff_management.entity;

import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommonCodeId implements Serializable {

  private String groupName;
  private String subCode;
}
