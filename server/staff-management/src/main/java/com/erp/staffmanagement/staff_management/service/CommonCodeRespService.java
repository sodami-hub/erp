package com.erp.staffmanagement.staff_management.service;

import com.erp.commonutil.jwt.JwtTokenProvider;
import com.erp.staffmanagement.staff_management.dto.CommonCodeRequestDTO;
import com.erp.staffmanagement.staff_management.dto.CommonCodeResponseDTO;
import com.erp.staffmanagement.staff_management.entity.CommonCode;
import com.erp.staffmanagement.staff_management.repository.CommonCodeRepository;
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

  public CommonCodeResponseDTO getCommonCodeList(CommonCodeRequestDTO requestDTO) {

    List<CommonCode> commonCodeList = commonCodeRepository.findCodeNameByGroupName(requestDTO.getGroupName());
    return new CommonCodeResponseDTO(
        true,
            commonCodeList.stream().map(CommonCode::getCodeName).toList()
    );
  }
}
