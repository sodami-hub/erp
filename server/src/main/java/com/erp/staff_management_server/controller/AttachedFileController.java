package com.erp.staff_management_server.controller;


import com.erp.staff_management_server.dto.FileUploadResponseDTO;
import com.erp.staff_management_server.dto.jwt.JwtToken;
import com.erp.staff_management_server.service.AttachedFileService;
import org.apache.tomcat.util.http.fileupload.FileUploadException;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
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

  @Transactional
  @PostMapping("/fileUpload")
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

}
