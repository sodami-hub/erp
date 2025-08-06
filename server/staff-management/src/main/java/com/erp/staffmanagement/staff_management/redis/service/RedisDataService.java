package com.erp.staffmanagement.staff_management.redis.service;

import org.springframework.stereotype.Service;

@Service
public interface RedisDataService {

  int setSingleData(String key, Object value);  // 레디스에 단일 데이타 저장

  Object getSingleData(String key);   // 레디스에 단일 데이타 가져오기

  int deleteSingleData(String key);   // 레디스에 단일 데이터 삭제
}
