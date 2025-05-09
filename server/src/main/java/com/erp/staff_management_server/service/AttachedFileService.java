package com.erp.staff_management_server.service;

import com.erp.staff_management_server.dto.DependencyDocumentDTO;
import com.erp.staff_management_server.dto.FileUploadResponseDTO;
import com.erp.staff_management_server.dto.jwt.JwtToken;
import com.erp.staff_management_server.entity.DependencyDocuments;
import com.erp.staff_management_server.repository.DocumentRepository;
import com.erp.staff_management_server.util.jwt.JwtTokenProvider;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.Random;
import org.apache.tomcat.util.http.fileupload.FileUploadException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class AttachedFileService {

  private final DocumentRepository documentRepository;
  private final JwtTokenProvider jwtTokenProvider;

  public AttachedFileService(DocumentRepository documentRepository,
      JwtTokenProvider jwtTokenProvider) {
    this.documentRepository = documentRepository;
    this.jwtTokenProvider = jwtTokenProvider;
  }

  // 서버에 저장할 파일 이름 생성
  private String generateUniqueFileName(String originalFileName) {
    SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMddHHmmss");
    // Random 객체 생성
    Random random = new Random();
    String randomNumber = Integer.toString(random.nextInt(Integer.MAX_VALUE));
    // timeStamp 생성
    String timeStamp = dateFormat.format(new Date());
    return timeStamp + randomNumber + originalFileName;
  }

  // 서버 스토리지에 파일 저장
  private DependencyDocumentDTO saveFileStorage(MultipartFile file) throws FileUploadException {
    String originalName = file.getOriginalFilename();

    // 파일 타입 확인
    String mimeType = file.getContentType();
    if (mimeType == null || !mimeType.startsWith("image")) {
      throw new RuntimeException("File type not supported :" + mimeType);
    }

    // 파일 저장 처리
    String dependentDocumentDirPath = "attachedFile/dependentDocuments";
    File directory = new File(dependentDocumentDirPath);
    if (!directory.exists()) {
      boolean check = directory.mkdirs();
      if (!check) {
        throw new RuntimeException("Failed to create directory: " + dependentDocumentDirPath);
      }
    }

    String saveName = generateUniqueFileName(originalName);
    Path filePath = Paths.get(dependentDocumentDirPath + File.separator + saveName);

    try {
      Files.copy(file.getInputStream(), filePath);
    } catch (IOException e) {
      throw new FileUploadException("File upLoad exception. " + Arrays.toString(e.getStackTrace()));
    }

    return new DependencyDocumentDTO(null, originalName, saveName);
  }

  public FileUploadResponseDTO dependentFileService(MultipartFile file01, MultipartFile file02,
      Long userId, JwtToken jwtToken)
      throws FileUploadException {

    Long managerId = jwtTokenProvider.getClaims(jwtToken.getAccessToken()).getStaffId();

    if (!file01.isEmpty()) {
      DependencyDocumentDTO dependencyDocumentDTO = saveFileStorage(file01);
      dependencyDocumentDTO.setStaffId(userId);

      // 파일 정보 DB 저장 처리
      documentRepository.save(
          new DependencyDocuments(dependencyDocumentDTO, managerId));
    }
    if (!file02.isEmpty()) {
      DependencyDocumentDTO dependencyDocumentDTO = saveFileStorage(file02);
      dependencyDocumentDTO.setStaffId(userId);

      // 파일 정보 DB 저장 처리
      documentRepository.save(
          new DependencyDocuments(dependencyDocumentDTO, managerId));
    }

    return new FileUploadResponseDTO(true, null);
  }
}
