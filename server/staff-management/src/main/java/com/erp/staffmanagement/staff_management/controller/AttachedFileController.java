package com.erp.staffmanagement.staff_management.controller;


import com.erp.commonutil.jwt.dto.JwtToken;
import com.erp.commonutil.response.ApiResponse;
import com.erp.staffmanagement.staff_management.dto.FileUploadResponseDTO;
import com.erp.staffmanagement.staff_management.service.AttachedFileService;
import org.apache.tomcat.util.http.fileupload.FileUploadException;
import org.springframework.http.HttpStatus;
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
  public ResponseEntity<ApiResponse<FileUploadResponseDTO>> fileUpload(
      @RequestParam(value = "file01", required = false) MultipartFile file01,
      @RequestParam(value = "file02", required = false) MultipartFile file02,
      @RequestParam("userId") Long userId,
      @RequestHeader(value = "Authorization") String token)
      throws FileUploadException {

    // 넘어오는 데이터 확인
    System.out.println("userId: " + userId);
    System.out.println("file01: " + file01.getOriginalFilename());
    System.out.println("file02: " + file02.getOriginalFilename());

    String accessToken = token.replace("Bearer ", "");

    FileUploadResponseDTO fileUploadResponseDTO = attachedFileService.dependentFileService(file01,
        file02, userId,
        accessToken);
    if (!fileUploadResponseDTO.isOk()) {
      return ResponseEntity.ok(
          ApiResponse.error(HttpStatus.BAD_REQUEST, fileUploadResponseDTO.getMessage()));
    }
    return ResponseEntity.ok(ApiResponse.success(fileUploadResponseDTO));
  }

  // 자격증 첨부 서류 처리
  @Transactional
  @PostMapping("/staff/saveCertFile/{certificateId}")
  public ResponseEntity<FileUploadResponseDTO> saveCertFile(
      @PathVariable Long certificateId,
      @RequestParam(value = "file") MultipartFile file,
      @RequestHeader(value = "Authorization") JwtToken jwtToken
  ) throws FileUploadException {
    FileUploadResponseDTO fileUploadResponseDTO = attachedFileService.certFileService(file,
        certificateId, jwtToken);
    return ResponseEntity.ok(fileUploadResponseDTO);
  }

}
