package com.erp.staffmanagement.staff_management.repository;

import com.erp.staffmanagement.staff_management.entity.CommonCode;
import com.erp.staffmanagement.staff_management.entity.CommonCodeId;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommonCodeRepository extends JpaRepository<CommonCode, CommonCodeId> {

  List<CommonCode> findCodeNameByGroupName(String groupName);

}
