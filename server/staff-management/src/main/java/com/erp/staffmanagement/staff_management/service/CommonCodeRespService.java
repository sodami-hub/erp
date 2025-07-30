package com.erp.staffmanagement.staff_management.service;

import com.erp.staffmanagement.staff_management.dto.AllCommonCodeResponseDTO;
import com.erp.staffmanagement.staff_management.dto.CommonCodeResponseDTO;
import com.erp.staffmanagement.staff_management.entity.CommonCode;
import com.erp.staffmanagement.staff_management.repository.CommonCodeRepository;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class CommonCodeRespService {

  private final CommonCodeRepository commonCodeRepository;

  public CommonCodeRespService(CommonCodeRepository commonCodeRepository) {
    this.commonCodeRepository = commonCodeRepository;
  }

  public AllCommonCodeResponseDTO getAllCommonCodeList() {
    try {
      List<String> work_status = new ArrayList<>();
      List<String> work_type = new ArrayList<>();
      List<String> work_list = new ArrayList<>();
      List<CommonCode> allCommonCodeList = commonCodeRepository.findAll();
      for (CommonCode commonCode : allCommonCodeList) {
        String groupName = commonCode.getGroupName();
        switch (groupName) {
          case "work_status":
            work_status.add(commonCode.getSubCode());
            break;
          case "work_type":
            work_type.add(commonCode.getSubCode());
            break;
          case "work_list":
            work_list.add(commonCode.getSubCode());
            break;
          default:
            break;
        }
      }
      return new AllCommonCodeResponseDTO(true, work_status, work_type, work_list, null);
    } catch (Exception e) {
      return new AllCommonCodeResponseDTO(false, null, null, null, e.getMessage());
    }
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
