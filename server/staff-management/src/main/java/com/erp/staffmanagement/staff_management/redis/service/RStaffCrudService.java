package com.erp.staffmanagement.staff_management.redis.service;

import com.erp.staffmanagement.staff_management.redis.entity.RStaff;
import com.erp.staffmanagement.staff_management.redis.repository.RStaffRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RStaffCrudService {

  private final RStaffRepository rStaffRepository;

  public void setStaffData(RStaff staff) {
    rStaffRepository.save(staff);
  }
}
