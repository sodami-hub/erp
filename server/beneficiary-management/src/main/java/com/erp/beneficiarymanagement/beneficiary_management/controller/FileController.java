package com.erp.beneficiarymanagement.beneficiary_management.controller;

import com.erp.beneficiarymanagement.beneficiary_management.service.FileService;
import com.erp.commonutil.response.ApiResponse;
import jakarta.transaction.Transactional;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
public class FileController {

  private final FileService fileService;

  @Transactional
  @PostMapping("/beneficiary/saveRecognitionDocs/{beneficiaryId}")
  public ResponseEntity<ApiResponse> saveRecognitionDocs(
      @RequestParam(value = "document") List<MultipartFile> files,
      @PathVariable Integer beneficiaryId
  ) {
    ApiResponse resp = fileService.recognitionFileService(files, beneficiaryId);

    return ResponseEntity.ok(resp);
  }

}
