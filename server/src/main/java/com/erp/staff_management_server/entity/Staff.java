package com.erp.staff_management_server.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@Table(name = "staffs")
public class Staff extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "staff_id")
    private Long staffId;

    @Column(name = "institution_id", nullable = false)
    private String institutionId;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "gender")
    private Integer gender;

    @Column(name = "birth")
    private LocalDate birth;

    @Column(name = "phone")
    private String phone;

    @Column(name = "password")
    private String password;

    @Column(name = "email")
    private String email;

    @Column(name = "address")
    private String address;

    @Column(name = "join_date")
    private LocalDate joinDate;

    @Column(name = "contract_status")
    private Integer contractStatus;

    @Column(name = "retire_date")
    private LocalDate retireDate;

    @Column(name = "dependents")
    private Integer dependents;

    @Column(name = "w4c")
    private String w4c;

    @Column(name = "auth_id")
    private String authId;

    @Column(name = "possible_work")
    private String possibleWork;

    @Column(name = "work_type")
    private String workType;

    @Column(name = "work_status")
    private String workStatus;

}
