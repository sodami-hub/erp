package com.erp.staff_management_server.repository;

import com.erp.staff_management_server.entity.CommonCode;
import com.erp.staff_management_server.entity.CommonCodeId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommonCodeRepository extends JpaRepository<CommonCode, CommonCodeId> {

}
