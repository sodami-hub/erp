package com.erp.staff_management_server.staff_management.service;

import com.erp.staff_management_server.staff_management.dto.CommonCodeResponseDTO;
import com.erp.staff_management_server.staff_management.dto.jwt.JwtToken;
import com.erp.staff_management_server.staff_management.entity.CommonCode;
import com.erp.staff_management_server.staff_management.repository.CommonCodeRepository;
import com.erp.staff_management_server.util.jwt.JwtTokenProvider;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class CommonCodeRespService {

  private final CommonCodeRepository commonCodeRepository;
  private final JwtTokenProvider jwtTokenProvider;


  public CommonCodeRespService(CommonCodeRepository commonCodeRepository,
      JwtTokenProvider jwtTokenProvider) {
    this.commonCodeRepository = commonCodeRepository;
    this.jwtTokenProvider = jwtTokenProvider;
  }

  public CommonCodeResponseDTO getCommonCodeList(JwtToken jwtToken) {
    if (jwtToken == null | !jwtTokenProvider.validateToken(jwtToken.getAccessToken())) {
      return new CommonCodeResponseDTO(false, null, null, null, null);
    }
    System.out.println("jwt 검증 완료");

    List<CommonCode> authList = commonCodeRepository.findCodeNameByGroupName("auth");
    List<CommonCode> workTypeList = commonCodeRepository.findCodeNameByGroupName("work_type");
    List<CommonCode> workList = commonCodeRepository.findCodeNameByGroupName("work_list");
    List<CommonCode> workStatusList = commonCodeRepository.findCodeNameByGroupName("work_status");
    return new CommonCodeResponseDTO(
        true,
        authList.stream().map(CommonCode::getCodeName).toList(),
        workTypeList.stream().map(CommonCode::getCodeName).toList(),
        workList.stream().map(CommonCode::getCodeName).toList(),
        workStatusList.stream().map(CommonCode::getCodeName).toList()
    );
  }
}
