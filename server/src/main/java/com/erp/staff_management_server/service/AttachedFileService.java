package com.erp.staff_management_server.service;

import com.erp.staff_management_server.dto.DependencyDocumentDTO;
import com.erp.staff_management_server.dto.FileUploadResponseDTO;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Random;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class AttachedFileService {

  private String generateUniqueFileName(String originalFileName) {
    SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMddHHmmss");
    // Random 객체 생성
    Random random = new Random();
    // 0 이상 100 미만의 랜덤한 정수 반환
    String randomNumber = Integer.toString(random.nextInt(Integer.MAX_VALUE));
    String timeStamp = dateFormat.format(new Date());
    return timeStamp + randomNumber + originalFileName;
  }

  private DependencyDocumentDTO fileService(MultipartFile file) {
    String originalName = file.getOriginalFilename();
    String saveName = generateUniqueFileName(originalName);

    // 파일 저장 처리

    return new DependencyDocumentDTO(null, originalName, saveName);
  }

  public FileUploadResponseDTO dependentFileService(MultipartFile file01, MultipartFile file02,
      Long userId) {

    DependencyDocumentDTO dependencyDocumentDTO;
    if (!file01.isEmpty()) {
      dependencyDocumentDTO = fileService(file01);
      dependencyDocumentDTO.setStaffId(userId);

      // 파일 정보 DB 저장 처리
    }

    return new FileUploadResponseDTO(true, null);
  }
}
