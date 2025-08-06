package com.erp.staffmanagement.staff_management.redis.controller;

import com.erp.staffmanagement.staff_management.redis.service.RedisDataServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;

// @CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequiredArgsConstructor
public class RedisController {

  private final RedisDataServiceImpl redisDataService;

  /* 레디스 데이터 불러오기 기능 테스트 완료
  @GetMapping("/redis/getValue")
  public ResponseEntity<String> getValue(@RequestHeader String key) {
    String result = redisDataService.getSingleStringData(key);
    return new ResponseEntity<>(result, HttpStatus.OK);
  }
  */
}
