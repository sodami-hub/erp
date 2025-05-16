package com.erp.staff_management_server.service;

import com.erp.staff_management_server.dto.StaffInfoDTO;
import com.erp.staff_management_server.entity.Staff;
import com.erp.staff_management_server.repository.StaffRepository;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class ManageStaffsService {

  private final StaffRepository staffRepository;

  public ManageStaffsService(StaffRepository staffRepository) {
    this.staffRepository = staffRepository;
  }

  public List<StaffInfoDTO> getAllStaffs() {
    List<Staff> staffs = staffRepository.findAll();
    return staffs.stream().map(StaffInfoDTO::new).toList();
  }
}
