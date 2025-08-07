package com.erp.staffmanagement.staff_management.redis.entity;

import com.erp.staffmanagement.staff_management.entity.Staff;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

/*
@RedisHash("staff")를 사용하면, 해당 엔티티는 Redis의 Hash 타입으로 저장됩니다.
예를 들어, RStaff 객체를 저장하면 아래와 같이 Redis에 데이터가 들어갑니다.

Key: staff:1
-------------------------
staff_id | 1
name     | 홍길동
email    | hong@test.com
phone    | 010-1234-5678

staff:1은 @RedisHash("staff") + @Id 값으로 생성된 키입니다.
각 필드는 Hash의 field-value 쌍으로 저장됩니다.
실제 Redis 명령어로 보면:
> HGETALL staff:1
1) "staff_id"
2) "1"
3) "name"
4) "홍길동"
5) "email"
6) "hong@test.com"
7) "phone"
8) "010-1234-5678"
 */

@Getter
@Setter
@RedisHash("staff")
public class RStaff {

  @Id
  private String staffId;
  private String name;
  private String email;
  private String phone;

  public RStaff(Staff staff) {
    this.staffId = staff.getStaffId().toString();
    this.name = staff.getName();
    this.email = staff.getEmail();
    this.phone = staff.getPhone();
  }
}
