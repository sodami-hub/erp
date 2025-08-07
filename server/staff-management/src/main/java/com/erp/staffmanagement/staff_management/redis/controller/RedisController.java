package com.erp.staffmanagement.staff_management.redis.controller;

import com.erp.staffmanagement.staff_management.redis.entity.RStaff;
import com.erp.staffmanagement.staff_management.redis.service.RedisCrudService;
import com.erp.staffmanagement.staff_management.redis.service.RedisDataServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;

// @CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequiredArgsConstructor
public class RedisController {

  private final RedisDataServiceImpl redisDataService;
  private final RedisCrudService redisCrudService;

  public void setStaffDataToRedis(RStaff staff) {
    redisCrudService.setStaffData(staff);
  }
}
