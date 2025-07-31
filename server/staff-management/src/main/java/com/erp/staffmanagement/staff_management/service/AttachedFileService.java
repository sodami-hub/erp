package com.erp.staffmanagement.staff_management.service;

import com.erp.staffmanagement.staff_management.dto.FileUploadResponseDTO;
import com.erp.staffmanagement.staff_management.dto.SaveFileDTO;
import com.erp.staffmanagement.staff_management.entity.Certificates;
import com.erp.staffmanagement.staff_management.entity.DependencyDocuments;
import com.erp.staffmanagement.staff_management.repository.CertificateRepository;
import com.erp.staffmanagement.staff_management.repository.DocumentRepository;
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
  private final CertificateRepository certificateRepository;

  public AttachedFileService(DocumentRepository documentRepository,
      CertificateRepository certificateRepository) {
    this.documentRepository = documentRepository;
    this.certificateRepository = certificateRepository;
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
  private SaveFileDTO saveFileStorage(MultipartFile file, String check)
      throws FileUploadException {
    String originalName = file.getOriginalFilename();

    // 파일 타입 확인
    String mimeType = file.getContentType();
    if (mimeType == null || !mimeType.startsWith("image")) {
      throw new RuntimeException("File type not supported :" + mimeType);
    }

    String dirPath = switch (check) {
      case "dependent" -> "attachedFile/dependentDocuments";
      case "certificate" -> "attachedFile/certificateDocuments";
      default -> "";
    };
    // 파일 저장 처리

    String saveName = generateUniqueFileName(originalName);
    Path filePath = Paths.get(dirPath + File.separator + saveName);

    try {
      Files.copy(file.getInputStream(), filePath);
    } catch (IOException e) {
      throw new FileUploadException("File upLoad exception. " + Arrays.toString(e.getStackTrace()));
    }

    return new SaveFileDTO(null, originalName, saveName);
  }

  public FileUploadResponseDTO dependentFileService(MultipartFile file01, MultipartFile file02,
      Long userId) throws FileUploadException {

    try {
      if (!file01.isEmpty()) {
        SaveFileDTO saveFileDTO = saveFileStorage(file01, "dependent");
        saveFileDTO.setId(userId);
        // 파일 정보 DB 저장 처리
        documentRepository.save(
            new DependencyDocuments(saveFileDTO));
      }
      if (!file02.isEmpty()) {
        SaveFileDTO saveFileDTO = saveFileStorage(file02, "dependent");
        saveFileDTO.setId(userId);

        // 파일 정보 DB 저장 처리
        documentRepository.save(
            new DependencyDocuments(saveFileDTO));
      }
    } catch (RuntimeException e) {
      return new FileUploadResponseDTO(false, e.getMessage());
    }

    return new FileUploadResponseDTO(true, "첨부문서 저장 성공");
  }

  public FileUploadResponseDTO certFileService(MultipartFile file, Long certificateId) {
    try {
      SaveFileDTO saveFileDTO = saveFileStorage(file, "certificate");

      Certificates cert = certificateRepository.findById(certificateId).orElse(null);
      if (cert == null) {
        return new FileUploadResponseDTO(false, "파일의 정보를 저장할 자격증 정보가 없습니다.(certificateId error)");
      }
      cert.setOriginalName(saveFileDTO.getOriginalName());
      cert.setSaveName(saveFileDTO.getSaveName());

      certificateRepository.save(cert);

      return new FileUploadResponseDTO(true, null);
    } catch (Exception e) {
      return new FileUploadResponseDTO(false, e.getMessage());
    }
  }
}
