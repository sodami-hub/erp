package com.erp.server.staff_management.controller;


import com.erp.server.staff_management.dto.FileUploadResponseDTO;
import com.erp.server.staff_management.dto.jwt.JwtToken;
import com.erp.server.staff_management.service.AttachedFileService;
import org.apache.tomcat.util.http.fileupload.FileUploadException;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class AttachedFileController {

  private final AttachedFileService attachedFileService;

  public AttachedFileController(AttachedFileService attachedFileService) {
    this.attachedFileService = attachedFileService;
  }

  // 부양가족 관련 첨부 서류 처리
  @Transactional
  @PostMapping("/staff/saveDependentDocument")
  public ResponseEntity<FileUploadResponseDTO> fileUpload(
      @RequestParam(value = "file01", required = false) MultipartFile file01,
      @RequestParam(value = "file02", required = false) MultipartFile file02,
      @RequestParam("userId") Long userId,
      @RequestHeader(value = "Authorization", required = true) JwtToken jwtToken)
      throws FileUploadException {

    // 넘어오는 데이터 확인
    System.out.println("userId: " + userId);
    System.out.println("file01: " + file01.getOriginalFilename());
    System.out.println("file02: " + file02.getOriginalFilename());

    FileUploadResponseDTO fileUploadResponseDTO;

    fileUploadResponseDTO = attachedFileService.dependentFileService(file01, file02, userId,
        jwtToken);

    return ResponseEntity.ok(fileUploadResponseDTO);
  }

  // 자격증 첨부 서류 처리
  @Transactional
  @PostMapping("/staff/saveCertFile/{certificateId}")
  public ResponseEntity<FileUploadResponseDTO> saveCertFile(
      @PathVariable Long certificateId,
      @RequestParam(value = "file", required = true) MultipartFile file,
      @RequestHeader(value = "Authorization", required = true) JwtToken jwtToken
  ) throws FileUploadException {
    FileUploadResponseDTO fileUploadResponseDTO = attachedFileService.certFileService(file,
        certificateId, jwtToken);
    return ResponseEntity.ok(fileUploadResponseDTO);
  }

}
