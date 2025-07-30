package com.erp.staffmanagement.staff_management.repository.data;

public enum LoginStatus {
    SUCCESS("SUCCESS"), FAILED("FAILED");

    private String value;

    LoginStatus(String value) {
        this.value = value;
    }
}
