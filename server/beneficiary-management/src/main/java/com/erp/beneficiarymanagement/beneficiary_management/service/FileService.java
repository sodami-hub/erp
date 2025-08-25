package com.erp.beneficiarymanagement.beneficiary_management.service;

import com.erp.beneficiarymanagement.beneficiary_management.dto.FileUploadDTO;
import com.erp.beneficiarymanagement.beneficiary_management.entity.RecognitionDocs;
import com.erp.beneficiarymanagement.beneficiary_management.repository.RecognitionDocsRepository;
import com.erp.commonutil.response.ApiResponse;
import jakarta.transaction.Transactional;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Random;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.http.fileupload.FileUploadException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class FileService {

  private final RecognitionDocsRepository recognitionDocsRepository;
  private final String recognitionDocPath = "docs/beneficiary/attachedFile/recognitionDocs";

  private String generateUniqueFileName(String originalFileName) {
    SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
    Random random = new Random();
    String randomNum = Integer.toString(random.nextInt(Integer.MAX_VALUE));
    String timeStamp = sdf.format(new Date());
    return timeStamp + randomNum + originalFileName;
  }

  private FileUploadDTO saveFile(MultipartFile file) throws FileUploadException {
    String originalName = file.getOriginalFilename();

    String mimeType = file.getContentType();
    if (mimeType == null || !mimeType.startsWith("image")) {
      return new FileUploadDTO(false, "이미지 파일만 저장 가능합니다.", null, null);
    }

    String saveName = generateUniqueFileName(originalName);
    Path filePath = Paths.get(recognitionDocPath + File.separator + saveName);

    try {
      Files.copy(file.getInputStream(), filePath);
      return new FileUploadDTO(true, null, saveName, originalName);
    } catch (IOException e) {
      return new FileUploadDTO(false, "파일 저장중 에러 발생 // " + e.getMessage(), null, null);
    }
  }

  @Transactional
  public ApiResponse recognitionFileService(List<MultipartFile> files, Integer beneficiaryId) {
    try {
      for (MultipartFile file : files) {
        FileUploadDTO fileUploadDTO = saveFile(file);
        recognitionDocsRepository.save(new RecognitionDocs(fileUploadDTO, beneficiaryId));
      }
      return ApiResponse.success(null);
    } catch (Exception e) {
      return ApiResponse.error("인정서류 저장 에러" + e.getMessage());
    }
  }
}
