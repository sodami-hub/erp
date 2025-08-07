package com.erp.staffmanagement.staff_management.redis.service;

import com.erp.staffmanagement.staff_management.redis.config.RedisConfigure;
import com.erp.staffmanagement.staff_management.redis.config.RedisHandler;
import java.util.Objects;
import java.util.concurrent.TimeUnit;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RedisDataServiceImpl implements RedisDataService {

  private final RedisHandler redisHandler;
  private final RedisConfigure redisConfig;


  @Override
  public int setData(String key, Object value) {
    return redisHandler.executeOperation(() -> redisHandler.getValueOperations().set(key, value));
  }

  @Override
  public int setDataWithExpire(String key, Object value, long expireTime) {
    return redisHandler.executeOperation(
        () -> redisHandler.getValueOperations().set(key, value, expireTime,
            TimeUnit.SECONDS));
  }

  @Override
  public Object getObjectData(String key) {
    if (redisHandler.getValueOperations().get(key) == null) {
      return "";
    }
    return redisHandler.executeOperation(() -> redisHandler.getValueOperations().get(key));
  }

  @Override
  public String getStringData(String key) {
    if (redisHandler.getValueOperations().get(key) == null) {
      return "";
    }
    return Objects.requireNonNull(redisHandler.getValueOperations().get(key)).toString();
  }

  @Override
  public int deleteData(String key) {
    return redisHandler.executeOperation(() -> redisConfig.redisTemplate().delete(key));
  }
}
