package com.erp.staffmanagement.staff_management.service;

import com.erp.staffmanagement.staff_management.dto.CommonCodeResponseDTO;
import com.erp.staffmanagement.staff_management.entity.CommonCode;
import com.erp.staffmanagement.staff_management.repository.CommonCodeRepository;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class CommonCodeRespService {

  private final CommonCodeRepository commonCodeRepository;


  public CommonCodeRespService(CommonCodeRepository commonCodeRepository) {
    this.commonCodeRepository = commonCodeRepository;
  }

  public CommonCodeResponseDTO getCommonCodeList(String groupName) {

    try {
      List<CommonCode> commonCodeList = commonCodeRepository.findCodeNameByGroupName(
          groupName);
      return new CommonCodeResponseDTO(
          true,
          groupName,
          commonCodeList.stream().map(CommonCode::getCodeName).toList()
      );
    } catch (Exception e) {
      return new CommonCodeResponseDTO(false, groupName, null);
    }
  }
}
