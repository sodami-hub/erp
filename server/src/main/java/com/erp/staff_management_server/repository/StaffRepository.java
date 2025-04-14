package com.erp.staff_management_server.repository;

import com.erp.staff_management_server.entity.Staff;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StaffRepository extends JpaRepository<Staff, Integer> {

  Staff getStaffIdByPhone(String phone);  // id(phone)로 스태프 정보 조회
}
