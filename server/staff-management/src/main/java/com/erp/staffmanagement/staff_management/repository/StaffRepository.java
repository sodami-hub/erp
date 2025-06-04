package com.erp.staffmanagement.staff_management.repository;

import com.erp.staffmanagement.staff_management.entity.Staff;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StaffRepository extends JpaRepository<Staff, Long> {

  Staff getStaffIdByPhone(String phone);  // id(phone)로 스태프 정보 조회
}
