package com.erp.staffmanagement.staff_management.redis.service;

import org.springframework.stereotype.Service;

@Service
public interface RedisDataService {

  int setSingleData(String key, Object value);  // 레디스에 단일 데이타 저장

  Object getSingleObjectData(String key);   // 레디스에 단일 오브젝트 가져오기

  String getSingleStringData(String key);

  int deleteSingleData(String key);   // 레디스에 단일 데이터 삭제
}
