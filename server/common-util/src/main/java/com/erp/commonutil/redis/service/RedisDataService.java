package com.erp.commonutil.redis.service;

import org.springframework.stereotype.Service;

@Service
public interface RedisDataService {

  int setData(String key, Object value);  // 레디스에 단일 데이타 저장

  int setDataWithExpire(String key, Object value, long expireTime);

  Object getObjectData(String key);   // 레디스에 단일 오브젝트 가져오기

  String getStringData(String key);

  int deleteData(String key);   // 레디스에 단일 데이터 삭제
}
