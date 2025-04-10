package com.erp.staff_management_server.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "institutions")
public class Institution extends BaseEntity {

    @Id
    @Column(name = "institution_id", length = 20)
    private String institutionId;

    @Column(name = "institution_name", nullable = false, length = 255)
    private String institutionName;

    @Column(name = "business_id", length = 20)
    private String businessId;

    @Column(name = "rep_name", length = 20)
    private String repName;

    @Column(name = "rep_phone", length = 20)
    private String repPhone;

    @Column(name = "rep_email", length = 50)
    private String repEmail;

    @Column(name = "rep_fax", length = 20)
    private String repFax;

    @Column(name = "address", length = 255)
    private String address;

    @Column(name = "website", length = 100)
    private String website;
}
