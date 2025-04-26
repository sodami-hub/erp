package com.erp.staff_management_server.service;

import com.erp.staff_management_server.dto.CommonCodeResponseDTO;
import com.erp.staff_management_server.entity.CommonCode;
import com.erp.staff_management_server.repository.CommonCodeRepository;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class CommonCodeRespService {

  private final CommonCodeRepository commonCodeRepository;

  public CommonCodeRespService(CommonCodeRepository commonCodeRepository) {
    this.commonCodeRepository = commonCodeRepository;
  }

  public CommonCodeResponseDTO getCommonCodeList() {
    List<CommonCode> authList = commonCodeRepository.findCodeNameByGroupName("auth");
    List<CommonCode> workTypeList = commonCodeRepository.findCodeNameByGroupName("work_type");
    List<CommonCode> workList = commonCodeRepository.findCodeNameByGroupName("work_list");
    List<CommonCode> workStatusList = commonCodeRepository.findCodeNameByGroupName("work_status");
    return new CommonCodeResponseDTO(
        authList.stream().map(CommonCode::getCodeName).toList(),
        workTypeList.stream().map(CommonCode::getCodeName).toList(),
        workList.stream().map(CommonCode::getCodeName).toList(),
        workStatusList.stream().map(CommonCode::getCodeName).toList()
    );
  }
}
