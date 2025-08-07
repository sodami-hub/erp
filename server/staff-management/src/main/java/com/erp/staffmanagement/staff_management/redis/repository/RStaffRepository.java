package com.erp.staffmanagement.staff_management.redis.repository;

import com.erp.staffmanagement.staff_management.redis.entity.RStaff;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RStaffRepository extends CrudRepository<RStaff, String> {

}
