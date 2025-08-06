package com.erp.staffmanagement.staff_management.redis.service;

import com.erp.staffmanagement.staff_management.redis.RedisHandler;
import com.erp.staffmanagement.staff_management.redis.config.RedisConfigure;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RedisDataServiceImpl implements RedisDataService {

  private final RedisHandler redisHandler;
  private final RedisConfigure redisConfig;


  /**
   * Redis 단일 데이터 값을 등록/수정합니다.
   *
   * @param key   : redis key
   * @param value : redis value
   * @return {int} 성공(1), 실패(0)
   */
  @Override
  public int setSingleData(String key, Object value) {
    return redisHandler.executeOperation(() -> redisHandler.getValueOperations().set(key, value));
  }


  @Override
  public Object getSingleObjectData(String key) {
    if (redisHandler.getValueOperations().get(key) == null) {
      return "";
    }
    return redisHandler.executeOperation(() -> redisHandler.getValueOperations().get(key));
  }

  @Override
  public String getSingleStringData(String key) {
    if (redisHandler.getValueOperations().get(key) == null) {
      return "";
    }
    return Objects.requireNonNull(redisHandler.getValueOperations().get(key)).toString();
  }

  @Override
  public int deleteSingleData(String key) {
    return redisHandler.executeOperation(() -> redisConfig.redisTemplate().delete(key));
  }
}
