package com.erp.staff_management_server.controller;


import com.erp.staff_management_server.service.AttachedFileService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
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

  @PostMapping("/fileUpload")
  public String fileUpload(
      @RequestParam(value = "file01", required = false) MultipartFile file01,
      @RequestParam(value = "file02", required = false) MultipartFile file02,
      @RequestParam("userId") Long userId) {

    // 파일 처리 로직
//    for (MultipartFile file : files) {
//      System.out.println("파일 이름: " + file.getOriginalFilename());
//    }

    // userId 처리 로직
    System.out.println("userId: " + userId);

    return "업로드 성공";
  }

}
