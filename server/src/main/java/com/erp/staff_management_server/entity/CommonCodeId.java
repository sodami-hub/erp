package com.erp.staff_management_server.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;

@EqualsAndHashCode
@Data
@AllArgsConstructor
public class CommonCodeId implements Serializable {
    private String groupName;
    private String subCode;
}
